let ip = require('ip'),
oyunModule = require('./oyunModule');

let express = require('express'),
http = require('http'),
socketIO = require('socket.io'),
cors = require('cors'),
app = express(),
serverAyarlari = { cors: {origin: `http://${ip.address()}:1313`} },
server = http.createServer(app),
sqlite3 = require('sqlite3').verbose(),
db = new sqlite3.Database('database.db'),
io = socketIO(server, serverAyarlari),
sifrele = text => Buffer.from(text).toString('base64')
coz = encodedText => Buffer.from(encodedText, 'base64').toString('utf-8');

io.on('connection', s => {
  let islemYapabilirMi = false;
  function gonder() {
    io.to(s.id).emit('bye');
  }

  function swal(ob) {
    io.to(s.id).emit('swal', ob);
  }

  io.to(s.id).emit('giris_yaptin_mi');

  s.on('islem', async (object = { islem: 'yok', data: 'yok'}) => {
    let { islem, data } = object;
    function temizle(id) {
      io.to(id).emit('temizle');
      return new Promise(resolve => resolve)
    }
    if(islem == 'yok' || data == 'yok')  {
      gonder();
    } else if(islem == 'kayitOl') {
      db.get(`SELECT * FROM kullanicilar WHERE adi = '${data.kullanici_adi}'`, (err, res) => {
        if(res) swal([{title: "Bu kullanıcı adı alınmış",icon: "warning",showConfirmButton: false,allowOutsideClick: false,timer: 1000},() => {document.getElementById('kayit-kadi-input').focus()}]);
        else {
          db.run(`INSERT INTO kullanicilar (adi, sifre, sid) VALUES ('${data.kullanici_adi}','${data.sifre}','${s.id}')`);
          io.to(s.id).emit('giris', sifrele(JSON.stringify({kullanici_adi:data.kullanici_adi,sifre:data.sifre})))
          islemYapabilirMi = true;
        }
      })
    } else if(islem == 'girisYap') {
      let kadi = data.kullanici_adi;
      let sifre = data.sifre;
      let sorgu = `SELECT * FROM kullanicilar WHERE adi = '${kadi}' AND sifre = '${sifre}'`;
      db.get(sorgu, (err, res) => {
        if(res) {
          let sifreliVeri = sifrele(JSON.stringify({ kullanici_adi: kadi, sifre: sifre }));
          if(res.sid != s.id) {
            temizle(res.sid);
            db.run(`UPDATE kullanicilar SET sid = '${s.id}' WHERE sid = '${res.sid}'`)
          }
          io.to(s.id).emit('giris', sifreliVeri)
        }
      })//
    } else if(islem == 'kontrol') {
      let kadi,sifre;
      try {
        kadi = JSON.parse(coz(data.data)).kullanici_adi;
        sifre = JSON.parse(coz(data.data)).sifre;
      } catch {
        temizle(s.id).then(() => {})
        return;
      }
      let ekstraSorgu = data.ilk === false ? ` AND sid = '${s.id}'` : '';
      let sorgu = `SELECT * FROM kullanicilar WHERE adi = '${kadi}' AND sifre = '${sifre}'`;
      db.get(sorgu, (err, res) => {
        if(res) {
          let sifreliVeri = sifrele(JSON.stringify({ kullanici_adi: kadi, sifre: sifre }));
          if(res.sid != s.id) {
            temizle(res.sid);
            db.run(`UPDATE kullanicilar SET sid = '${s.id}' WHERE sid = '${res.sid}'`);
          }
          io.to(s.id).emit('giris', sifreliVeri)
          io.to(s.id).emit('oyun', { islem:"harita", data: { harita: oyunModule.HARITA() } })
        } else temizle(s.id);
      })
    }
  })
});

/*
db.each('SELECT id, username, email FROM users', (err, row) => {
  console.log(`ID: ${row.id}, Kullanıcı Adı: ${row.username}, Email: ${row.email}`);
});

db.run(`
CREATE TABLE IF NOT EXISTS kullanicilar (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  adi VARCHAR(25),
  sifre VARCHAR(50),
  sid VARCHAR(20)
)
`);
*/
server.listen(2313);