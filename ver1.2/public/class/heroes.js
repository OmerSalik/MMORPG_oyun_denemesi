import { getItem, getItemByFeature } from "./items.js";
import { m } from './multiplier.js';
import { MAPS } from "./map.js";
/*
fps = 1000 / delta_time;
x_frame_in_fps = fps / speed
*/
let heroes = {
  'knight' : {
    health: 200 * m,
    mana: 200 * m,
    speed: 1.2 * m,
    i: 'player',
    w: 32,
    h: 32,
    hitbox_ratio: .8 * m,
    x: 1 * m,
    y: 1 * m,
    frames: [{x:7 * m,y:7 * m},{x:11 * m,y:7 * m}],
    frame: 0,
    states: {
      "FORWARD": {
        init: {
          frames: [{x:5 * m,y:7 * m},{x:9 * m,y:7 * m}],
          frame: 0
        }
      },
      "BACKWARD": {
        init: {
          frames: [{x:7 * m,y:7 * m},{x:11 * m,y:7 * m}],
          frame: 0
        }
      },
      "RIGHT": {
        init: {
          frames: [{x:6 * m,y:7 * m},{x:10 * m,y:7 * m}],
          frame: 0
        }
      },
      "LEFT": {
        init: {
          frames: [{x:8 * m,y:7 * m},{x:0 * m,y:8 * m}],
          frame: 0
        }
      }
    },
    state: "BACKWARD",
    change_state: `
    if(char.state != state) {
      console.log(char);
      char.state = state;
      char.frames = char.states[state].init.frames;
      char.frame = char.states[state].init.frame;
    }
    `,
  },
  'archer' : {},
  'magican' : {},
  'free' : {}
}

let start_items = {
  'knight' : {
    "main_weapon": getItem("basic_light_short_sword"),
    "secondary_weapon": getItem("basic_light_long_range_bow"),
    "armor": getItem("basic_light_chesplate"),
  },
  'archer' : {},
  'magican' : {},
  'free' : {}
}

export async function new_hero(hero_class) {
  return new Promise(resolve => {
    resolve({hero: heroes[hero_class],inventory: start_items[hero_class]});
  })
}