import { Functions } from './utils.js';
let f = new Functions();

/*
genislik : 347 px
uzunluk : 250 px

yatay blok sayısı : 11
dikey blok sayısı : 8

blok büyüklüğü x : 31.5454545455
blok büyüklüğü y : 31.25
*/

export function flr(z = 0) { // floor => fl
  return {
    t:'block',
     w: 31.5454545455,
     h: 31.3,
     x: 3,
     y: 3,
     i: 'blocks',
     f: 0,
     z: z
    };
}

export function grs(z = 0) { // grass => gr
  return {
    t:'block',
     w: 250,
     h: 250,
     x: 0,
     y: 0,
     i: 'grass',
     f: 0,
     z: z
    };
}

export function str(z = 0, angle) { // grass => gr
  return {
    t:'block',
     w: 63,
     h: 63,
     x: 0,
     y: 0,
     i: 'stair',
     f: 0,
     z: z,
     ef: {
      angle: angle
     }
    };
}

export function non(z = 0) { // grass => gr
  return {
    t:'block',
     w: 0,
     h: 0,
     x: 0,
     y: 0,
     i: '',
     f: 0,
     z: z
    };
}