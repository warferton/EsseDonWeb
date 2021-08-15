import { IMenuItem } from '../types/menu/menuItem.type';
import { IEvent, IEventGroups } from '../types/event/event.type';
import axios from 'axios';


const EVENT_API_URL='http://localhost:3030/api/v1/events/'
const MENU_API_URL='http://localhost:3030/api/v1/menu/';
const ADMIN_API_URL='http://localhost:3030/api/v1/spe1Ce/control/admin/'

const ARCHIVED_EVENTS_PATH = 'events/get/archived';

export async function getEventById( id : string) : Promise<IEvent> {
  return await axios.get(EVENT_API_URL.concat( id ))
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
      else
        generalGroupEvents.push(event);
      })
  ).catch(err => console.log(err));

  return { 
    mainGroupEvents: mainGroupEvents,
    secondGroupEvents: secondGroupEvents,
    generalGroupEvents: generalGroupEvents
  };
}

export async function fetchAllArchivedEvents() {
  const mainGroupEvents : IEvent[] = [];
  const secondGroupEvents : IEvent[] = [];
  const generalGroupEvents : IEvent[] = [];

  await axios
  .get(ADMIN_API_URL.concat(ARCHIVED_EVENTS_PATH))
  .then(res => 
    res.data.events.map((event : IEvent) => {
      if( event.block === "main")
        mainGroupEvents.push(event);
      else if( event.block === "second")
        secondGroupEvents.push(event);
      else
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

  const activeEvents = await fetchAllActiveEvents();
  const archivedEvents = await fetchAllArchivedEvents();
  
  Object.assign(mainGroupEvents, activeEvents.mainGroupEvents, archivedEvents.mainGroupEvents);
  Object.assign(secondGroupEvents, activeEvents.secondGroupEvents, archivedEvents.secondGroupEvents);
  Object.assign(generalGroupEvents, activeEvents.generalGroupEvents, archivedEvents.generalGroupEvents);

  return { 
    mainGroupEvents: mainGroupEvents,
    secondGroupEvents: secondGroupEvents,
    generalGroupEvents: generalGroupEvents
  };
}

export async function fetchBarItems() {
  const barItems : IMenuItem[] = [];
  await axios
  .get(MENU_API_URL.concat('bar'))
  .then( res => res.data.barItems.map((item : IMenuItem) => barItems.push(item)))
  .catch(err => console.log(err));

  return barItems;
}
    
export async function fetchKitchenItems() {
  const kitchenItems : IMenuItem[] = [];
  await axios
  .get(MENU_API_URL.concat('kitchen'))
  .then( res => res.data.kitchenItems.map((item : IMenuItem) => kitchenItems.push(item)))
  .catch(err => console.log(err));

  return kitchenItems;
}

export function concatFetchedEvents({...events} : IEventGroups){
  const { mainGroupEvents, secondGroupEvents, generalGroupEvents } = events;
  return mainGroupEvents.concat(secondGroupEvents).concat(generalGroupEvents);
}

export async function fetchActiveEventsPaths(){
  const events = await fetchAllActiveEvents();
  return concatFetchedEvents({...events}).map( (event : IEvent) => {
    return { 
      params: {
        id : event._id
      }
    };
  })
}
