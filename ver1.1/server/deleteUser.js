import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { promises as fsa } from 'fs';
import { exec } from 'child_process';
import rimraf from 'rimraf';
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
  if(userToDelete != "*" && userToDelete != '') {
    folderToDelete = path.join(__dirname, 'data/userOptions/' + userToDelete);
    deleteFolderRecursive();
  } else {
    rimraf("./data/userOptions/*", (hata) => {
      if (hata) {
        console.error(`Hata oluştu: ${hata}`);
      } else {
        console.log("Tüm kullanıcılar silindi.");
      }
    });
    setUsers([]);
  }
  rl.close();
});

async function setUsers(data) {
  return new Promise(async (resolve) => {
    let filePath = 'data/users.json';
    await fsa.writeFile(filePath, JSON.stringify(data));
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

function deleteFolderRecursive() {
  try {
    getUsers().then(users => {
      findIndex(userToDelete).then(index => {
        if(index < 0) {
          console.log(`'${userToDelete}' kullanıcısı bulunamadı`);
        } else {
          users.splice(index, 1);
          klasorSil(folderToDelete);
          setUsers(users);
        }
      });
    })
  } catch (error) {
    console.error(`Klasör silinirken bir hata oluştu: ${error.message}`);
  }
}

function klasorSil(klasorYolu) {
  if (fs.existsSync(klasorYolu)) {
    fs.readdirSync(klasorYolu).forEach((dosyaAdi) => {
      let dosyaYolu = path.join(klasorYolu, dosyaAdi);

      if (fs.lstatSync(dosyaYolu).isDirectory()) {
        klasorSil(dosyaYolu);
      } else {
        fs.unlinkSync(dosyaYolu);
      }
    });

    fs.rmdirSync(klasorYolu);
    console.log(`Klasör "${klasorYolu}" ve içindekileri başarıyla silindi.`);
  } else {
    console.log(`Klasör "${klasorYolu}" bulunamadı.`);
  }
};