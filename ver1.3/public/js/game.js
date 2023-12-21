import { Functions } from '../class/utils.js'
import { MAPS, FLOORS, FLOOR } from '../class/map.js'

let lastTime = 0,
f = new Functions(),
canvas = f.gid('canvas'),
canvasDivs = f.qsa('.canvas-div'),
context = canvas ? canvas.getContext('2d') : null,
map = null,
raito = 0,
multiplier = 100,
maxBlock_w = 15;

export function load_game() {
  if(page == 'game') {
    let queryParams = new URLSearchParams(window.location.search),
    map_name = queryParams.get('map') ? queryParams.get('map') : "start_town",
    floor_number = queryParams.get('floor') ? queryParams.get('floor') : 0;
    map = FLOOR(map_name, floor_number);
    animation(0);
  }
}

function setWidth() {
  let w = f.gid('game').offsetWidth * .4,
  w2 = (f.gid('game').offsetWidth - w) / 2;
  canvas.width = w;
  canvas.height = w;
  canvasDivs.forEach(el => el.style.width = `${w2}px`);
  raito = canvas.width / maxBlock_w;
}

function drawMap() {
  map.forEach((row, rowIndex) => {
    row.forEach((c, colIndex) => {
      if(canvas.i != '') {
        context.save();
        if(c.i && c.i != '') {
          if(c.ef) {
            let a = c.ef.angle ? c.ef.angle : 0;
            context.translate(colIndex * raito + (a == 0 ? 0 : raito), rowIndex * raito);
            context.rotate(Math.PI / 180 * a);
            context.drawImage(
              f.gid(c.i), // i
              c.x * c.w, // dx
              c.y * c.h, // sx
              c.w, // sw
              c.h, // sh
              0, // dx
              0, // dy
              raito, // dw
              raito // dh
              )
          } else {
            context.drawImage(f.gid(c.i),c.x * c.w,c.y * c.h,c.w,c.h,colIndex * raito,rowIndex * raito,raito,raito)
          }
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
  requestAnimationFrame(animation);
}


// 26.65+26.65+26.65+26.65+26.65+26.65+26.65+26.65+26.65+26.65+26.65+26.65+26.65+26.65+26.65