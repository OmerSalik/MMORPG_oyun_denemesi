// import {  } from './blocks.js';
let maps = {
  "start_town": {
    "floor_0": []
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

/*
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
*/