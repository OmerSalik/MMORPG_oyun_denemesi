'user-strict'
class ITEMS {
  constructor() {
    /*
    numbers will divide as multiplier;
    i wrote numbers for multiplier = 100; => false
    */
    this.swords = [
      {
        item_name:  "basic_light_short_sword",
        heroes: ["free","knight","magican"],
        item_type: "sword",
        tags: ["start_item","basic","light","short","close_range"],
        enchants: [],
        distance: 50, // multiplied by 100, 100 => 1 tile
        duration: 1250, // 1000 => 1 second
        slow_down: 0,
        damages: {
          absolute: 5, // multiplied by 100, 100 => 1
          physical: 10 // multiplied by 100, 100 => 1
        }
      }
    ];

    this.bows = [{
        item_name: "basic_light_long_range_bow",
        heroes: ["free","magican"],
        item_type: "bow",
        tags: ["start_item","basic","light","long_range"],
        enchants: [],
        distance: 150, // multiplied by 100, 100 => 1 tile
        duration: 1250, // 1000 => 1 second
        slow_down: 0,
        damages: {
          absolute: 5, // multiplied by 100, 100 => 1
          physical: 10 // multiplied by 100, 100 => 1
        }
    }];

    this.armors = [
      {
        item_name: "basic_light_chesplate",
        heroes: ["*"],
        item_type: "bow",
        tags: ["start_item","basic","light","long_range"],
        enchants: [],
        slow_down: 0,
        protection: {
          physical: 5 // multiplied by 100, 100 => 1
        },
        damage_back: {
          absolute: 0, // multiplied by 100, 100 => 1
          physical: 0 // multiplied by 100, 100 => 1
        }
      }
    ];

    this.magic_stuff = [];

    this.item_types = ["swords", "armors", "bows", "magic_stuff"];
  }
  getByType(type) { return this[type] }
  getAll() { 
    let all_items = [];
    this.item_types.forEach(item_type => {this[item_type].forEach(item => {all_items.push(item);});});
    return all_items;
  }
}

let items = new ITEMS(),
all_items = items.getAll();

export function getItem(item_name) {
  return all_items[item_name];
}

export async function getItemByFeature(features = {}) {
  return await new Promise(resolve => {
    let items_to_resolve = [];
    all_items.forEach(item => {
      let problem = false;
      for (let i = 0; i < Object.keys(features).length; i++) {
        let key = Object.keys(features)[i];
        if(features[key].includes("*")) break;
        else {
          for (let j = 0; j < features[key].length; j++) {
            let feature = features[key][j];
            if(item[key].includes("*")) break;
            else if(!item[key].includes(feature)) {
              problem = true;
              break;
            }
          }
        }
      }
      if(!problem) items_to_resolve.push(item);
    })
    resolve(items_to_resolve);
  });
}
