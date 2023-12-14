import { Functions } from './class/utils.js'
let f = new Functions(),
s = io("http://172.16.16.203:2313"),
gia = fieldName => f.gid(`giris-${fieldName}-input`),
kia = fieldName => f.gid(`kayit-${fieldName}-input`),
kontrol = null,
oranti = 0,
oyunBasladi = false,
harita = null;

s.on('bye', () => {window.location.href = 'https://www.youtube.com'})

s.on('oyun', ob => {
  let { islem, data } = ob;
  if(islem === 'harita') {
    harita = data.harita;
  }
});

function haritaCiz() {
  
}

s.on('temizle', () => {
  console.log('asdfads');
  localStorage.clear();
  window.location.reload();
})

s.on('giris', value => {
  localStorage.setItem('ben', JSON.stringify(value))
  console.log('kontrol: ', localStorage.getItem('ben'))
  formDegis();
  if(!oyunBasladi) {
    animasyon();
    kontrol = setInterval(() => {
      s.emit('islem', {ilk: true, islem: "kontrol", data: {data: localStorage.getItem('ben')}})
    }, 500)
    oyunBasladi = true;
  }
  f.gid('oyun').style.display = "flex";
})

s.on('swal', (ob) => {
  Swal.fire(ob[0]).then(e => {
    if(ob[1]) {
      setTimeout(() => {ob[1]()}, 400);
    }
  });
})

function formDegis(formAdi = false) {
  f.qsa('.omer-form').forEach(el => el.style.display = 'none')
  f.qsa('.gk-input').forEach(el => el.value = '')
  if(formAdi !== false) {
    f.display(f.qs(`#${formAdi}`), 'flex')
  }
}

function islem(islem, ekstraVeri = {}) {
  switch(islem) {
    case 'girisYap':
      s.emit('islem', {islem: "girisYap", data: {sifrelimi: false , kullanici_adi: gia('kadi').value, sifre: gia('sifre').value}})
      break;
    case 'kayitOl':
      if(kia('kadi').value == '') {
        Swal.fire({
          title: "Boş alan bırakmayın",
          text: "Kullanıcı adı bölümü boş bırakılamaz",
          icon: "warning",
          confirmButtonText: "Tamam",
          allowOutsideClick: false
        }).then(e => setTimeout(() => {kia('kadi').focus()}, 300));
      } else if(kia('sifre').value == '') {
        Swal.fire({
          title: "Boş alan bırakmayın",
          text: "Şifre bölümü boş bırakılamaz",
          icon: "warning",
          confirmButtonText: "Tamam",
          allowOutsideClick: false
        }).then(e => setTimeout(() => {kia('sifre').focus()}, 300));
      } else if(kia('sifre').value != kia('sifre-tekrar').value) {
        Swal.fire({
          title: "Şifreler birbiriyle uyuşmuyor",
          icon: "warning",
          confirmButtonText: "Tamam",
          allowOutsideClick: false
        }).then(e => setTimeout(() => {kia('sifre-tekrar').focus()}, 300));
      } else {
        s.emit('islem', {
          islem:"kayitOl",
          data: {
            kullanici_adi: kia('kadi').value.replace("'", '%'),
            sifre: kia('sifre').value.replace("'", '%')
          }
        })
      }
      break;
  }
}

function animasyon() {
  canvas.width = oranti * 10 * 5;
  canvas.height = oranti * 10 * 5;
  requestAnimationFrame(animasyon);
}

onload = function() {
  formDegis();
  f.qsa('.form-degis').forEach(el => el.addEventListener('click', () => { formDegis(el.getAttribute('form')) }))
  f.qsa('.islem-button').forEach(el => el.addEventListener('click', () => { islem(el.getAttribute('islem')) }))
  oranti = f.gid('wal').offsetWidth / 100;
  if(localStorage.getItem('ben')) {
    s.emit('islem', {ilk: true, islem: "kontrol", data: {data: localStorage.getItem('ben')}})
  } else {
    localStorage.removeItem('ben');
    formDegis('giris-formu');
  }
}