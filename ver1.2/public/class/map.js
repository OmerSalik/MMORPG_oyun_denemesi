import { flr, grs, non,str } from './blocks.js';
let n = non(0),
f = flr(2),
sy = str(1,0),
sx = str(1,90),
g = grs(0),
maps = {
  "start_town": {
    "floor_0": [
      [g,g,g,g,g,g,g,g,g,g,g,g,g,g,g],
      [g,g,g,g,g,g,g,g,g,g,g,g,g,g,g],
      [g,g,g,g,g,g,g,g,g,g,g,g,g,g,g],
      [g,g,g,g,g,g,g,g,g,g,g,g,g,g,g],
      [g,g,g,g,f,f,sy,sy,sy,f,f,g,g,g,g],
      [g,g,g,g,f,f,f,f,f,f,f,g,g,g,g],
      [g,g,g,g,sx,f,f,f,f,f,sx,g,g,g,g],
      [g,g,g,g,sx,f,f,f,f,f,sx,g,g,g,g],
      [g,g,g,g,sx,f,f,f,f,f,sx,g,g,g,g],
      [g,g,g,g,f,f,f,f,f,f,f,g,g,g,g],
      [g,g,g,g,f,f,sy,sy,sy,f,f,g,g,g,g],
      [g,g,g,g,g,g,g,g,g,g,g,g,g,g,g],
      [g,g,g,g,g,g,g,g,g,g,g,g,g,g,g],
      [g,g,g,g,g,g,g,g,g,g,g,g,g,g,g],
      [g,g,g,g,g,g,g,g,g,g,g,g,g,g,g]
    ]
  }
};

export function MAPS() {
  return Object.keys(maps);
}
export function FLOORS(map_name) {
  return Object.keys(maps[map_name]);
}
export function FLOOR(map_name, floor = 0) {
  return maps[map_name][`floor_${floor}`];
}