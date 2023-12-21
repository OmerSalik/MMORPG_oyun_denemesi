import { WORDS, LANGUAGES } from '../class/languages.js';
import { Functions } from '../class/utils.js';
import { load_login } from './login.js';
import { load_game } from './game.js';

let f = new Functions();

function temizle(items) {
  items.includes("*") ? localStorage.clear() : items.forEach(itemName => f.del(itemName));
  window.location.reload();
}

// s.on('temizle', (items = ["*"]) => { temizle(items); })

export function openForm(formAdi = false) {
  f.qsa('.form').forEach(el => el.style.display = 'none')
  f.qsa('.form-input').forEach(el => el.value = '');
  f.gid('forms') ? f.gid('forms').style.display = formAdi !== false ? 'flex' : 'none' : false;
  if(formAdi !== false) f.display(f.qs(`#${formAdi}`), 'flex');
}

function start() {
  if(localStorage.getItem('auth')) {
    s.emit('process', { process: 'auth', token: localStorage.getItem('auth') }, res => {
      if(res && page != 'game') location = 'game'
      else if(!res) {
        location = 'login';
        localStorage.removeItem('auth');
      }
    });
  } else if (page != 'login') location = 'login';if(f.get('lan') == null) f.set('lan', 'tr');
  
  f.qsa('.lan-input').forEach(el => {
    el.innerHTML = '';
    LANGUAGES().forEach(l => el.innerHTML += `<option value="${l}"${l == f.get('lan') ? ' selected' : ''}>${l}</option>`)
    el.addEventListener('change', function() {
      f.set('lan', el.value);
      write_words();
      f.qsa('.lan-input').forEach(inEl => {
        inEl.innerHTML = '';
        LANGUAGES().forEach(l => inEl.innerHTML += `<option value="${l}"${l == f.get('lan') ? ' selected' : ''}>${l}</option>`);
      });
    })
  });
  f.qsa('[form]').forEach(el => {
    el.addEventListener('click', function() {
      openForm(f.ga(el, 'form'));
    })
  });
  f.qsa("[info]").forEach(el => {
    el.addEventListener('mouseenter', e => {
      let words = WORDS(f.get('lan'));
      let info_el = document.createElement('span');
      info_el.id = 'info';
      info_el.setAttribute('info-w', f.ga(el, 'info'));
      let e_text = f.ga(el, 'info-e-text') ? " (" + words[f.ga(el, 'info-e-text')] + ")" : '';
      info_el.innerHTML = words[f.ga(el, 'info')] + e_text;
      document.body.appendChild(info_el);
    })
    el.addEventListener('mousemove', e => {
      let x = e.clientX,
      y = e.clientY;
      let info_el = f.gid('info');
      if(info_el) {
        info_el.style.top = `${y - 34}px`;
        info_el.style.left = `${x + 8}px`;
      }
    })
    el.addEventListener('mouseleave', e => {document.getElementById('info') ? document.getElementById('info').remove() : false;})
  });
  openForm(false);
  write_words();
  page == 'login' ? load_login() : page == 'game' ? load_game() : false;
}

let capitalize_first_letter = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

function write_words() {
  let words = WORDS(f.get('lan'));
  f.qsa('[word]').forEach(el => {
    let t1,t2,t3,fe;
    t3 = f.ga(el, 'e-text') ? f.ga(el, 'e-text') : ''
    fe = f.ga(el, 'feature') ? f.ga(el, 'feature') : 'innerHTML';
    t2 = f.ga(el, 'e-text-if') ?  words[f.ga(el, 'e-text-if')] : '';
    if(f.ga(el, 'e-feature')) {
      switch (f.ga(el, 'e-feature')) {
        case 'cfl':
          t1 = capitalize_first_letter(words[f.ga(el, 'word')]);
          break;
      }
    } else t1 = words[f.ga(el, 'word')];
    el[fe] = t1 + t2 + t3;
  });
  let el = f.gid('info');
  if(el) {
    let l = f.get('lan'),
    w = WORDS(l),
    wn = f.ga(el, 'info-w');
    el.innerHTML = w[wn];
  }
}

onload = start;