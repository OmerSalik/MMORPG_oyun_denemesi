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
  if(f.get('lan') == null) f.set('lan', 'tr');
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
})
}

onload = start;