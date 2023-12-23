'user-strict'
class ITEMS {
  constructor() {
    /*
    numbers will divide as multiplier;
    i wrote numbers for multiplier = 100; => false
    */
    this.swords = {
      "basic_heavy_long_sword": {
        accepted_heroes: ["free","knight"],
        item_type: ["sword"],
        item_tags: ["basic", "close_range","heavy","long_sword"],
        distance: 170,
        damages: {
          absolute: 10,
          physical: 100,
          water: 30,
          rock: 40,
          air: 10,
          fire: 50
        },
        enchants: [],
        speed: 100 // type : second
      },
      "basic_heavy_short_sword": {
        accepted_heroes: ["free","knight"],
        item_type: ["sword"],
        item_tags: ["basic", "close_range","heavy","short_sword"],
        distance: 140,
        damages: {
          absolute: 10,
          physical: 100,
          water: 20,
          rock: 50,
          fire: 5,
          air: 10
        },
        enchants: [],
        speed: 75 // type : second
      },
      "basic_knife": {
        accepted_heroes: ["*"],
        item_type: ["knife"],
        item_tags: ["basic", "close_range","light","quick"],
        distance: 120,
        damages: {
          absolute: 10,
          physical: 100,
          water: 15,
          rock: 20,
          fire: 10,
          air: 10
        },
        enchants: [],
        speed: 60 // type : second
      }
    };
    this.bows = {
      "basic_heavy_long_bow": {
        accepted_heroes: ["free","archer"],
        item_type: ["bow"],
        item_tags: ["basic", "long_range","heavy","long_bow","slow"],
        distance: 400,
        damages: {
          absolute: 10,
          physical: 60,
          water: 5,
          rock: 7,
          fire: 10,
          air: 5
        },
        hit_rate: 100,
        enchants: [],
        speed: 80 // type : second
      },
      "basic_light_short_bow": {
        accepted_heroes: ["*"],
        item_type: ["bow"],
        item_tags: ["basic", "short_range","heavy","long_bow","quick","start_item"],
        distance: 250,
        damages: {
          absolute: 10,
          physical: 70,
          water: 10,
          rock: 10,
          fire: 15,
          air: 10
        },
        hit_rate: 100,
        enchants: [],
        speed: 70 // type : second
      }
    }
    this.armors = {
      "basic_light_armor": {
        accepted_heroes: ["*"],
        item_type: ["armor"],
        item_tags: ["basic", "light"],
        protection: {
          absolute: 0,
          physical: 10,
          water: 15,
          rock: 5,
          fire: 5,
          air: 5
        },
        enchants: [],
        slow_down: 0
      },
      "basic_heavy_armor": {
        accepted_heroes: ["free", "knight", "magical"],
        item_type: ["armor"],
        item_tags: ["basic", "heavy"],
        protection: {
          absolute: 0,
          physical: 30,
          water: 20,
          rock: 10,
          fire: 5,
          air: 5
        },
        enchants: [],
        slow_down: 0.05
      }
    };
    this.item_types = ["swords", "armors", "bows"];
  }
  getByType(type) { return this[type] }
  getAll() { 
    let all_items = {};
    this.item_types.forEach(item_type => {
      Object.keys(this[item_type]).forEach(item_name => {
        all_items[item_name] = this[item_type][item_name];
      });
    });
    return all_items;
  }
}

let items = new ITEMS(),
all_items = items.getAll();

export function getItem(item_name) {
  return all_items[item_name];
}

export function getItemByFeature(features = {}) {return 'not yet'}
