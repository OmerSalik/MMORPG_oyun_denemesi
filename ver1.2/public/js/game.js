import { Functions } from '../class/utils.js';
import { FLOOR } from '../class/map.js';
import { WORDS } from '../class/languages.js';
import { new_hero } from '../class/heroes.js';

let f = new Functions(),
canvas = f.gid('canvas'),
canvasDivs = f.qsa('.canvas-div'),
context = canvas ? canvas.getContext('2d') : null,
map = null,
char = null,
ratio = 0,
lastTime = 0,
multiplier = 100,
maxBlock_w = 15,
character = null;

export function load_game() {
  if(page == 'game') {
    let queryParams = new URLSearchParams(window.location.search),
    map_name = queryParams.get('map') ? queryParams.get('map') : "start_town",
    floor_number = queryParams.get('floor') ? queryParams.get('floor') : 0;
    map = FLOOR(map_name, floor_number);
    f.qsa("[char]:not(.not-active)").forEach(el => {
      el.addEventListener('click', event => {
        let words = WORDS(f.get('lan'));
        Swal.fire({
          title: words.are_u_sure + '?',
          text: words.no_c_change + '.',
          showCancelButton: true,
          confirmButtonText: words.confirm,
          cancelButtonText: words.cancel,
          icon:'warning'
        }).then(e => {
          if(e.isConfirmed) {
            let char_class = f.ga(el, 'char');
            new_hero(char_class).then(new_hero => {
              s.emit('set_char_class', new_hero, (res) => {
                if(res) {
                  f.gid('game-block').style.display = 'none';
                  f.gid('choose-char').style.display = 'none';
                }
              });
            });
          }
        });
      });
    });
    animation(0);
  }
}

function setWidth() {
  if(window.innerWidth > window.innerHeight) {
    let h = f.gid('game').offsetHeight * .6,
    h2 = (f.gid('game').offsetWidth - h) / 2;
    canvas.width = h;
    canvas.height = h;
    canvasDivs.forEach(el => el.style.width = `${h2}px`);
    ratio = canvas.width / maxBlock_w;
  } else {
    let w = f.gid('game').offsetWidth * .9,
    w2 = (f.gid('game').offsetWidth - w) / 2;
    canvas.width = w;
    canvas.height = w;
    canvasDivs.forEach(el => el.style.width = `${w2}px`);
    ratio = canvas.width / maxBlock_w;
  }
}

function drawChar() {
  let change_state = new Function("{char, state}", character.change_state);
  let cs = character.state;
  if(cs == null) {
    character.state = "BACKWARD"
    let ncs = character.states[character.state];
  }
  let img = f.gid(character.i);
  console.log()
  context.drawImage(
    img,
    character.frames[character.frame].x * character.w,
    character.frames[character.frame].y * character.h,
    character.w,
    character.h,
    character.x / multiplier * ratio,
    character.y / multiplier * ratio,
    ratio,
    ratio
  );
}

function drawMap() {
  map.forEach((row, rowIndex) => {
    row.forEach((c, colIndex) => {
      if(canvas.i != '') {
        context.save();
        if(c.i && c.i != '') {
          if(c.ef) {
            let a = c.ef.angle ? c.ef.angle : 0;
            context.translate(colIndex * ratio + (a == 0 ? 0 : ratio), rowIndex * ratio);
            context.rotate(Math.PI / 180 * a);
            context.drawImage(f.gid(c.i),c.x * c.w,c.y * c.h,c.w,c.h,0,0,ratio,ratio)
          } else context.drawImage(f.gid(c.i),c.x * c.w,c.y * c.h,c.w,c.h,colIndex * ratio,rowIndex * ratio,ratio,ratio);
        }
        context.restore();
      }
    });
  })
}

function animation(timeStamp) {
  setWidth();
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  if(map != null) drawMap();
  if(character != null) drawChar();
  requestAnimationFrame(animation);
}

s.on('yourChar', (res) => {
  if(JSON.stringify(res) != '{}') {
    f.gid('game-block').style.display = 'none';
    f.gid('choose-char').style.display = 'none';
    character = res;
  } else {
    f.gid('choose-char').style.display = 'flex';
    f.qsa('[char]').forEach(el => {el.width = f.mf(f.gid('screen').offsetWidth * 0.45);});
  }
})