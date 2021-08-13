import { IMenuItem } from "../types/menu/menuItem.type";
import axios from 'axios';


const EVENT_API_URL='http://localhost:3030/api/v1/events/'
const KITCHEN_API_URL='http://localhost:3030/api/v1/menu/kitchen';
const BAR_API_URL='http://localhost:3030/api/v1/menu/bar';

export async function getEventById( id : string) {
  return axios.get(EVENT_API_URL.concat( id ))
    .then(res => res.data.event)
    .catch(err => console.error(`Failed fetching event data. ERROR: ${err}`));

}

export async function fetchAllActiveEvents() {
    const mainGroupEvents : IEvent[] = [];
    const secondGroupEvents : IEvent[] = [];
    const generalGroupEvents : IEvent[] = [];
  
    await axios
    .get(EVENT_API_URL.concat("active"))
    .then(res => 
      res.data.events.map((event : IEvent) => {
        if( event.block === "main")
          mainGroupEvents.push(event);
        else if( event.block === "second")
          secondGroupEvents.push(event);
        else if( event.block === "general")
          generalGroupEvents.push(event);
        })
    ).catch(err => console.log(err));
  
    return { 
      mainGroupEvents: mainGroupEvents,
      secondGroupEvents: secondGroupEvents,
      generalGroupEvents: generalGroupEvents
    };
  }

export async function fetchAllEvents() {
    const mainGroupEvents : IEvent[] = [];
    const secondGroupEvents : IEvent[] = [];
    const generalGroupEvents : IEvent[] = [];
  
    await axios
    .get(EVENT_API_URL.concat("active"))
    .then(res => 
      res.data.events.map((event : IEvent) => {
        if( event.block === "main")
          mainGroupEvents.push(event);
        else if( event.block === "second")
          secondGroupEvents.push(event);
        else if( event.block === "general")
          generalGroupEvents.push(event);
        })
    ).catch(err => console.log(err));
  
   await axios
    .get(EVENT_API_URL.concat("archived"))
    .then(res => 
      res.data.events.map((event : IEvent) => {
        if( event.block === "main")
          mainGroupEvents.push(event);
        else if( event.block === "second")
          secondGroupEvents.push(event);
        else if( event.block === "general")
          generalGroupEvents.push(event);
        })
    ).catch(err => console.log(err));
  
    return { 
      mainGroupEvents: mainGroupEvents,
      secondGroupEvents: secondGroupEvents,
      generalGroupEvents: generalGroupEvents
    };
  }

export async function fetchBarItems() {
    const barItems : IMenuItem[] = [];
    await axios
    .get(BAR_API_URL)
    .then( res => res.data.barItems.map((item : IMenuItem) => barItems.push(item)))
    .catch(err => console.log(err));

    return barItems;
  }
    
export async function fetchKitchenItems() {
    const kitchenItems : IMenuItem[] = [];
    await axios
    .get(KITCHEN_API_URL)
    .then( res => res.data.kitchenItems.map((item : IMenuItem) => kitchenItems.push(item)))
    .catch(err => console.log(err));

    return kitchenItems;
  }
