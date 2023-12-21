import { Functions } from '../class/utils.js';
import { openForm } from './language.js';
import { WORDS } from '../class/languages.js';
import { showMessage } from './swal.js';

let f = new Functions(),
gia = fieldName => f.gid(`login-${fieldName}-input`),
kia = fieldName => f.gid(`signup-${fieldName}-input`);

export function load_login() {
  openForm('login');
  f.qsa('[process]').forEach(el => el.addEventListener('click', () => {
    let belong_to = f.ga(el,'belong-to'),
    problem = false;
    f.qsa(`[belong="${belong_to}"]`).forEach(inp => {
      if(inp.value == '') problem = true;
    })
    problem ? showMessage(WORDS(f.get('lan')).fill_all_fields, 'warning') : process(f.ga(el,'process'));
  }))
}

function process(process) {
  switch (process) {
    case 'login':
      s.emit('process', {process:'login', uname:gia('uname').value.replace("'", '%'), pass:gia('pass').value.replace("'", '%')}, (response, token) => {
        if(response) {
          showMessage(WORDS(f.get('lan')).login + ' ' + WORDS(f.get('lan'))['success'], 'success');
          f.set('auth', token);
          setTimeout(() => {location = 'game'}, 750);
        } else showMessage(WORDS(f.get('lan')).user_not_found, 'error')
      });
      break;
    case 'signup':
      if(kia('pass').value == kia('pass-again').value) {
        s.emit('process', {
          process: 'signup',
          uname: kia('uname').value.replace("'", '%'),
          pass: kia('pass').value.replace("'", '%')
        }, res => {
          if(res === false) showMessage(WORDS(f.get('lan')).uname_taken, 'warning');
          else {
            showMessage(WORDS(f.get('lan')).success, 'success');
            f.set('auth', res);
            setTimeout(() => {location = 'game'}, 750)
          }
        });
      } else showMessage(WORDS(f.get('lan')).pass_dont_match, 'warning')
      break;
  }
}