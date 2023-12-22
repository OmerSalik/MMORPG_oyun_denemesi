'user-strict'
class ITEMS {
  constructor() {
    /*
    numbers will divide as multiplier;
    i wrote numbers for multiplier = 100; => false
    */
    this.swords = {
      "basic_light_short_sword": {
        heroes_can_use: ["free","knight","magican"],
        item_type: "sword",
        item_tags: ["start_item","basic","light","short","close_range"],
        enchants: [],
        distance: 50, // 100 => 1 tile
        duration: 1250, // 1000 => 1 second
        slow_down: 0,
        damages: {
          absolute: 5, // 100 => 1
          physical: 10 // 100 => 1
        }
      }
    };
    this.bows = {
      "basic_light_long_range_bow": {
        heroes_can_use: ["free","magican"],
        item_type: "bow",
        item_tags: ["start_item","basic","light","long_range"],
        enchants: [],
        distance: 150, // 100 => 1 tile
        duration: 1250, // 1000 => 1 second
        slow_down: 0,
        damages: {
          absolute: 5, // 100 => 1
          physical: 10 // 100 => 1
        }
      }
    };
    this.armors = {
      "basic_light_chesplate": {
        heroes_can_use: ["*"],
        item_type: "bow",
        item_tags: ["start_item","basic","light","long_range"],
        enchants: [],
        slow_down: 0,
        protection: {
          physical: 5 // 100 => 1
        },
        damage_back: {
          absolute: 0, // 100 => 1
          physical: 0 // 100 => 1
        }
      }
    };
    this.magic_stuff = {};
    this.item_types = ["swords", "armors", "bows", "magic_stuff"];
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
