import express from 'express';
import path, { resolve } from 'path';
import http, { get } from 'http';
import { promises as fs } from 'fs';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';

let __filename = fileURLToPath(import.meta.url),
__dirname = path.dirname(__filename);

let app = express(),
server = http.createServer(app),
io = new Server(server),
base = '../public',
html = base + '/html',
js = base + '/js',
encode = text => Buffer.from(text).toString('base64'),
decode = encodedText => Buffer.from(encodedText, 'base64').toString('utf-8'),
users = null,
updateUsers = null,
startOptions = {
  "forward": "w",
  "backward": "s",
  "right": "d",
  "left": "a"
};

app.use(express.static(path.join(__dirname, base)));

app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, html + '/index.html')));

app.get('/login', (req, res) => res.status(200).sendFile(path.join(__dirname, html + '/login.html')));

app.get('/game', (req, res) => res.status(200).sendFile(path.join(__dirname, html + '/game.html')));

app.use((req, res) => res.redirect('/'));

function findUser(obj, type = 'tf') {
  return new Promise(resolve => {
    users.forEach((user, i) => {
      if(obj.pass ? user.uname == obj.uname && user.pass == obj.pass : user.uname == obj.uname) {
        resolve(type == 'tf' ? true : user);
        return;
      }
    });
    resolve(false);
  })
}

async function setData(data, username = '', data_name = 'users') {
  return new Promise(async (resolve) => {
    let startPath = data_name == 'users' ? 'data' : 'data/userOptions/';
    let filePath = startPath + username + '/' + data_name + '.json';
    await fs.writeFile(filePath, JSON.stringify(data, {}, 2));
    resolve(true);
    return;
  })
}

async function new_user(username, pass) {
  getUsers().then(async (users) => {
    users.push({uname: username, pass:pass});
    setData(users);
    let folderPath = path.join(__dirname, 'data', 'userOptions', username);
    let options = path.join(folderPath, 'options.json');
    let hero = path.join(folderPath, 'hero.json');
    let inventory = path.join(folderPath, 'inventory.json');

    await fs.mkdir(folderPath, { recursive: true });
    await fs.writeFile(options, JSON.stringify(startOptions, {}, 2));
    await fs.writeFile(hero, JSON.stringify({}, {}, 2));
    await fs.writeFile(inventory, JSON.stringify({}, {}, 2));
  });
}

async function getData(username, data_name) {
  return new Promise(async (resolve) => {
    let content = await fs.readFile('data/userOptions/' + username + '/' + data_name + '.json', 'utf-8');
    resolve(JSON.parse(content));
    return;
  });
}

async function getUsers() {
  return new Promise(async (resolve) => {
    let content = await fs.readFile('data/users.json', 'utf-8');
    resolve(JSON.parse(content));
    return;
  });
}

async function start() {
  users = await getUsers();
  updateUsers = setInterval(async () => {
    users = await getUsers();
  }, 500);
  server.listen(3424);
}

io.on('connection', s => {
  let u_name = null;
  function ban(id) {io.to(id).emit('bye')}
  s.on('process', async (obj, callback) => {
    if(typeof(obj) == 'object' && !Array.isArray(obj)) {
      let uname, pass, sorgu, data, response;
      switch (obj.process) {
        case 'login':
          try {
            uname = obj.uname;
            pass = obj.pass;
          } catch { ban(s.id) }
          response = await findUser({uname:uname,pass:pass});
          if(typeof(callback) == 'function') {
            if(response) callback(true, encode(JSON.stringify({uname:uname,pass:pass})));
            else callback(false);
            return;
          }
          break;
        case 'signup':
          try {uname = obj.uname;pass = obj.pass;} catch {ban(s.id);}
          response = await findUser({uname:uname});
          if(typeof(callback) == 'function') {
            if(!response) {
              new_user(uname,pass)
              callback(encode(JSON.stringify({uname: obj.uname,pass: obj.pass})));
            }
            callback(false);
          }
          break;
        case 'auth':
          try {
            data = JSON.parse(decode(obj.token));
            uname = data.uname;
            pass = data.pass;
          } catch { ban(s.id); }
          response = await findUser({uname:uname,pass:pass}, 'user');
          if(response) {}
          if(typeof(callback) == 'function') {
            if(response) {
              u_name = uname;
              callback(true);
              let data = await getData(uname, 'hero');
              io.to(s.id).emit('yourChar', data);
            } else {
              u_name = null;
              callback(false);
            }
            // u_name = response ? uname : null;
            // callback(response ? true : false);
            return;
          }
          break;
      }
    } else ban(s.id);
  })
  s.on('set_char_class', async (char, callback) => {
    setData(char.hero, u_name, 'hero');
    setData(char.inventory, u_name, 'inventory');
    callback(true);
  })
});

start()