import { Functions } from '../class/utils.js'

let lastTime = 0,
f = new Functions();
// canvas = f.gid('canvas'),
// canvasDivs = f.qsa('.canvas-div'),
// context = canvas.getContext('2d');


function setWidth() {
  // let w = f.gid('game-top').offsetWidth * .4,
  // w2 = (f.gid('game-top').offsetWidth - w) / 2;
  // console.log(w);
  // canvas.width = w;
  // canvas.height = w;
  // canvasDivs.forEach(el => el.style.width = `${w2}px`)
  console.log(canvas.offsetWidth);
};

export function load_game() {
  setWidth();
  // animation(0);
}

function animation(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  requestAnimationFrame(animation);
}