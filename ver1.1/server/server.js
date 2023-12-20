import express from 'express';
import path, { resolve } from 'path';
import http from 'http';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';

let __filename = fileURLToPath(import.meta.url),
__dirname = path.dirname(__filename),
db = new sqlite3.Database(__dirname + '/database.db')

let app = express(),
server = http.createServer(app),
io = new Server(server),
base = '../public',
html = base + '/html',
js = base + '/js',
encode = text => Buffer.from(text).toString('base64'),
decode = encodedText => Buffer.from(encodedText, 'base64').toString('utf-8');

app.use(express.static(path.join(__dirname, base)));

app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, html + '/index.html')));

app.get('/login', (req, res) => res.status(200).sendFile(path.join(__dirname, html + '/login.html')));

app.get('/game', (req, res) => res.status(200).sendFile(path.join(__dirname, html + '/game.html')));

app.use((req, res) => res.redirect('/'));

io.on('connection', s => {
  function ban(id) {io.to(id).emit('bye')}
  s.on('process', async (obj, callback) => {
    if(typeof(obj) == 'object' && !Array.isArray(obj)) {
      let uname, pass, sorgu, data, response;
      switch (obj.process) {
        case 'login':
          try {
            uname = obj.uname;
            pass = obj.pass;
          } catch {
            ban(s.id)
          }
          sorgu = `SELECT * FROM users WHERE username = '${uname}' AND password = '${pass}'`;
          db.get(sorgu, (err, res) => {
            if(typeof(callback) == 'function') {
              res ? callback(true, encode(JSON.stringify({uname:uname,pass:pass}))) : callback(false);
            }
          });   
          break;
        case 'signup':
          try {uname = obj.uname;pass = obj.pass;} catch {ban(s.id);}
          sorgu = `SELECT * FROM users WHERE username = '${uname}'`;
          db.get(sorgu, (err, res) => {
            if(res) response = false;
            else {
              sorgu = `INSERT INTO users (username,password,sid) VALUES ('${uname}','${pass}','${s.id}')`;
              db.run(sorgu);
              response = encode(JSON.stringify({uname:uname,pass:pass}));
            }
            if(typeof(callback) == 'function') {
              console.log(response)
              callback(response);
              return;
            }
          });
          break;
        case 'auth':
          try {
            data = JSON.parse(decode(obj.token));
            uname = data.uname;
            pass = data.pass;
          } catch {
            ban(s.id);
          }
          sorgu = `SELECT * FROM users WHERE username = '${uname}' AND password = '${pass}'`;
          db.get(sorgu, (qerr, res) => {
            if(typeof(callback) == 'function') callback(res ? true : false)
          });
          break;
      }
    } else ban(s.id);
  })
});

server.listen(3424);