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
updateUsers = null;

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

async function setData(data, data_name = 'users') {
  return new Promise(async (resolve) => {
    await fs.writeFile('./' + data_name + '.json', JSON.stringify(data, null, 2));
    resolve(true);
    return;
  });
}

async function getData(data_name = 'users') {
  return new Promise(async (resolve) => {
    let content = await fs.readFile('./' + data_name + '.json', 'utf-8');
    resolve(JSON.parse(content));
    return;
  });
}

async function start() {
  users = await getData();
  updateUsers = setInterval(async () => {
    users = await getData();
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
          sorgu = `SELECT * FROM users WHERE username = '${uname}'`;
          response = await findUser({uname:uname});
          if(typeof(callback) == 'function') {
            if(!response) {
              users.push({ uname: uname, pass: pass });
              await setData(users).then(async function() {
                await getData('chars').then(async (data) => {
                  console.log(data);
                  data[uname] = null;
                  await setData(data, 'chars').then(function() {
                    callback(encode(JSON.stringify({uname:uname,pass:pass})));
                    return;
                  });
                });
              });
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
          if(response) {
            let char = await getData('chars');
            io.to(s.id).emit('yourChar', char[uname]);
          }
          if(typeof(callback) == 'function') {
            u_name = response ? uname : null;
            callback(response ? true : false);
            return;
          }
          break;
      }
    } else ban(s.id);
  })
  s.on('set_char_class', async (char, callback) => {
    callback(char)
  })
});

start()