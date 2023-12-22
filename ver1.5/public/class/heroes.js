import { getItem } from "./items.js";

let heroes = {
  'knight' : {
    health: 200,
    mana: 200
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

export function new_hero(hero_class) {
  return new Promise(resolve => {
    resolve({
      hero: heroes[hero_class],
      inventory: start_items[hero_class]
    });
  })
}