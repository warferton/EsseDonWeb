import { IMenuItem, IMenuItemGroup } from "../types/menu/menuItem.type";

export function toCamelCase(value: string): string {
  value.trim().toLowerCase().charAt(0).toUpperCase();
  return value;
}

export function parseMenuItems(items: IMenuItem[]) {
    const result : IMenuItemGroup[] = [];
    const loaded : string[] = [];
    for(let item of items) {
      if(loaded.includes(item.group))
        continue;
      const group : IMenuItemGroup = { name : toCamelCase(item.group), items: [] };
      loaded.push(item.group);
      for(let item of items){
        if(item.group === group.name){
          item.group = toCamelCase(item.group);
          group.items.push(item);
        }
      }
      result.push(group);
    }
    return result;
  }