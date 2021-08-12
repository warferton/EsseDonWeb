import { IMenuItem } from "../types/menu/menuItem.type";
import axios from 'axios';


const EVENT_API_URL='http://localhost:3030/api/v1/events/';
const KITCHEN_API_URL='http://localhost:3030/api/v1/menu/kitchen';
const BAR_API_URL='http://localhost:3030/api/v1/menu/bar';


export async function getEventById( id : string) {
  return axios.get(EVENT_API_URL.concat( id ))
    .then(res => res.data.event)
    .catch(err => console.error(`Failed fetching event data. ERROR: ${err}`));

}

export async function fetchBarItems() {
    const barItems : IMenuItem[] = [];
    axios
    .get(BAR_API_URL)
    .then( res => res.data.barItems.map((item : IMenuItem) => barItems.push(item)))
    .catch(err => console.log(err));
      
    return barItems;
  }
    
export async function fetchKitchenItems() {
    let kitchenItems : IMenuItem[] = [];
    axios
    .get(KITCHEN_API_URL)
    .then( res => res.data.kitchenItems.map((item : IMenuItem) => kitchenItems.push(item)))
    .catch(err => console.log(err));
  
    console.log(kitchenItems)

    return kitchenItems;
  }