import { IEvent } from "../types/event/event.type";
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

export function getJwtFromCookies(cookies: string){
  const searchToken = '_JazzEsseDonToken';
  const decodedCookies = decodeURIComponent(cookies);
  const cookieArray = decodedCookies.split(';');
  for(let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    console.log(cookie);
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(searchToken) == 0) {
      return cookie.substring(searchToken.length, cookie.length);
    }
  }
  return "";
}

export function sortEventsByDate(events : IEvent[]) {
events.sort(( event1, event2 ) => new Date(`${event1.date} ${event1.time}`).getTime() - new Date(`${event2.date} ${event2.time}`).getTime());
}
