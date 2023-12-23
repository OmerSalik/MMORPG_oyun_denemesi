import { getItem, getItemByFeature } from "./items.js";

let heroes = {
  'knight' : {
    health: 20000, // multiplied by 100 => 200
    mana: 20000, // multiplied by 100 => 200
    speed: 150, // multiplied by 100, tile for 1 sec => 1.5
    i: 'player',
    w: 32,
    h: 32,
    x: 250,
    y: 250,
    frames: [{x:7,y:7},{x:11,y:7}],
    frame: 0,
    states: {
      "FORWARD": {
        init: {
          frames: [{x:5,y:7},{x:9,y:7}],
          frame: 0
        }
      },
      "BACKWARD": {
        init: {
          frames: [{x:7,y:7},{x:11,y:7}],
          frame: 0
        }
      },
      "RIGHT": {
        init: {
          frames: [{x:6,y:7},{x:10,y:7}],
          frame: 0
        }
      },
      "LEFT": {
        init: {
          frames: [{x:8,y:7},{x:0,y:8}],
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
/*
w: 384,
h: 384,
x: 12,
y: 12,
*/

export async function new_hero(hero_class) {
  return new Promise(resolve => {
    resolve({hero: heroes[hero_class],inventory: start_items[hero_class]});
  })
}