import { getItem } from "./items.js";

let heroes = {
  'knight' : {
    start_items: {
      "main_weapon": [
        getItem("basic_heavy_long_sword"),
        getItem("basic_heavy_short_sword"),
        getItem("basic_knife")
      ],
      "secondary_weapon": [
        getItem("basic_heavy_long_sword"),
        getItem("basic_heavy_short_sword"),
        getItem("basic_knife")
      ],
    },
    items: []
  },
  'archer' : {},
  'magican' : {},
  'free' : {  }
}

export function new_hero(hero_class) {
  return heroes[hero_class];
}