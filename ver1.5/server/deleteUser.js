import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { promises as fsa } from 'fs';
import * as readline from 'readline';
import fs from 'fs-extra';

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
}),
__filename = fileURLToPath(import.meta.url),
__dirname = dirname(__filename),
userToDelete = '',
folderToDelete = path.join(__dirname, 'data/userOptions/' + 'no_user');

rl.question('silinecek kullanıcı adı: ', (answer) => {
  userToDelete = answer;
  path.join(__dirname, 'data/userOptions/' + userToDelete);
  // deleteFolderRecursive(folderToDelete);
  rl.close();
});

async function setUsers(data) {
  return new Promise(async (resolve) => {
    let filePath = 'data/users.json';
    await fsa.writeFile(filePath, JSON.stringify(data, [], 2));
    resolve(true);
    return;
  })
}

async function getUsers() {
  return new Promise(async (resolve) => {
    let content = await fsa.readFile('data/users.json', 'utf-8');
    resolve(JSON.parse(content));
    return;
  });
}

async function findIndex(username) {
  return new Promise(async (resolve) => {
    getUsers().then(users => {
      if(users.length == 0) resolve(-1);
      else {
        users.forEach((user, i) => {
          if(user.uname == username) {
            resolve(i);
          } else if(i == users.length - 1) resolve(-1);
        });
      }
    })
  });
}

async function deleteFolderRecursive(folderPath) {
  try {
    getUsers().then(async (users) => {
      findIndex(userToDelete).then(index => {
        if(index >= 0) {
          users.splice(index, 1);
          setUsers(users);
          fs.remove(folderPath).then(er => {
            console.log(`'${userToDelete}' kullanıcısı hakkında her şey başarıyla silindi.`);
          });
        } else {
          console.log(`'${userToDelete}' kullanıcısı yok`);
        }
      });
    });
  } catch (error) {
    console.error(`Klasör silinirken bir hata oluştu: ${error.message}`);
  }
}