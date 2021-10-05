import { IMenuItem } from '../types/menu/menuItem.type';
import { IEvent, IEventGroups } from '../types/event/event.type';
import axios from 'axios';

const EVENT_API_URL='https://esse-api-test.herokuapp.com/api/v1/events/'
const MENU_API_URL='https://esse-api-test.herokuapp.com/api/v1/menu/';
const ADMIN_API_URL='https://esse-api-test.herokuapp.com/api/v1/spe1Ce/control/admin/'

const ARCHIVED_EVENTS_PATH = 'events/get/archived';

interface IEventFetchResult {
  mainGroupEvents: IEvent[]; 
  secondGroupEvents: IEvent[]; 
  generalGroupEvents: IEvent[];
}

export async function getEventById( id : string ) : Promise<IEvent> {
  return await axios.get(EVENT_API_URL.concat( id ), { withCredentials: true })
    .then(async (res) => {
      const event = res.data.event;
      event.image = await fetchEventImage( event.image as string );
      return event;
    })
    .catch(err => console.error(`Failed fetching event data. ERROR: ${err}`));
}

export async function fetchAllActiveEvents() : Promise<IEventFetchResult> {
  const mainGroupEvents : IEvent[] = [];
  const secondGroupEvents : IEvent[] = [];
  const generalGroupEvents : IEvent[] = [];
  await axios
  .get(EVENT_API_URL.concat("active"), { withCredentials: true })
  .then( res => {
    res.data.events.map( async (event : IEvent) => {
        //split into groups
        if( event.group === "main") {
          mainGroupEvents.push(event);
        }
        else if( event.group === "second") {
          secondGroupEvents.push(event);
        }
        else {
          generalGroupEvents.push(event);
        }
      }); 
    })
    .catch(err => {
      console.error(err)
      return { 
        mainGroupEvents,
        secondGroupEvents,
        generalGroupEvents
      }
    }) as IEventFetchResult;

    const mainGroupEventsInjected = await Promise.all(
        mainGroupEvents.map(async (event) => {
            event.image = await fetchEventImage( event.image as string );
            return event;
        })
    );
    const secondGroupEventsInjected = await Promise.all(
        secondGroupEvents.map(async (event) => {
            event.image = await fetchEventImage( event.image as string );
            return event;
        })
    );
    const generalGroupEventsInjected = await Promise.all(
        generalGroupEvents.map(async (event) => {
            event.image = await fetchEventImage( event.image as string );
            return event;
        })
    );

    return { 
      mainGroupEvents: mainGroupEventsInjected,
      secondGroupEvents: secondGroupEventsInjected,
      generalGroupEvents: generalGroupEventsInjected
    };
}

export async function fetchAllActiveEventsNoImageData() : Promise<IEventFetchResult> {
  const mainGroupEvents : IEvent[] = [];
  const secondGroupEvents : IEvent[] = [];
  const generalGroupEvents : IEvent[] = [];
  await axios
  .get(EVENT_API_URL.concat("active"), { withCredentials: true })
  .then( res => {
    res.data.events.map( async (event : IEvent) => {
        //split into groups
        if( event.group === "main") {
          mainGroupEvents.push(event);
        }
        else if( event.group === "second") {
          secondGroupEvents.push(event);
        }
        else {
          generalGroupEvents.push(event);
        }
      }); 
    })
    .catch(err => {
      console.error(err)
      return null;
    }) as IEventFetchResult;
    return { 
      mainGroupEvents,
      secondGroupEvents,
      generalGroupEvents
    };
}

export async function fetchAllArchivedEvents() : Promise<IEventFetchResult> {
  const mainGroupEvents : IEvent[] = [];
  const secondGroupEvents : IEvent[] = [];
  const generalGroupEvents : IEvent[] = [];
  await axios
  .get(ADMIN_API_URL.concat(ARCHIVED_EVENTS_PATH), { withCredentials: true })
  .then(res => 
    res.data.events.map((event : IEvent) => {
      if( event.group === "main")
        mainGroupEvents.push(event);
      else if( event.group === "second")
        secondGroupEvents.push(event);
      else
        generalGroupEvents.push(event);
      })
  ).catch(err => console.error(err));

  return { 
    mainGroupEvents,
    secondGroupEvents,
    generalGroupEvents
  };
}

export async function fetchAllEvents() : Promise<IEventFetchResult> {
  const mainGroupEvents : IEvent[] = [];
  const secondGroupEvents : IEvent[] = [];
  const generalGroupEvents : IEvent[] = [];

  const activeEvents = await fetchAllActiveEvents();
  const archivedEvents = await fetchAllArchivedEvents();
  
  Object.assign(mainGroupEvents, activeEvents.mainGroupEvents, archivedEvents.mainGroupEvents);
  Object.assign(secondGroupEvents, activeEvents.secondGroupEvents, archivedEvents.secondGroupEvents);
  Object.assign(generalGroupEvents, activeEvents.generalGroupEvents, archivedEvents.generalGroupEvents);

  return { 
    mainGroupEvents,
    secondGroupEvents,
    generalGroupEvents
  };
}

export async function fetchBarItems() {
  const barItems : IMenuItem[] = [];
  await axios
  .get(MENU_API_URL.concat('bar'), { withCredentials: true })
  .then( res => res.data.barItems.map((item : IMenuItem) => barItems.push(item)))
  .catch(err => console.error(err));

  return barItems;
}
    
export async function fetchKitchenItems() {
  const kitchenItems : IMenuItem[] = [];
  await axios
  .get(MENU_API_URL.concat('kitchen'), { withCredentials: true })
  .then( res => res.data.kitchenItems.map((item : IMenuItem) => kitchenItems.push(item)))
  .catch(err => console.error(err));

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

export async function validateCurrentClient(){
  try{
    return axios
    .get('https://esse-api-test.herokuapp.com/api/v1/auth/validate', { withCredentials: true }).then(res => {
      return res.status === 200 ? true : false
    }).catch(err => console.error(err));
  }
  catch(err){
    console.error(err);
    return false
  }
}

export async function fetchEventImage(imageId : string) {
  try{
    return axios
    .get(ADMIN_API_URL.concat(`/media/${ imageId }`), { withCredentials: true }).then(res => {
      if( res.status === 200 && res.data.image !== null && res.data.image !== undefined ) {
        return res.data.image;
      } else {
        return { mimetype: 'image/jpg', data: "none" }
      }
    });
  } catch(err) {
    console.error(err);
    return { mimetype: 'image/jpg', data: "none" }
  }
}
