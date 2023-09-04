import { IEvent } from '../types/event/event.type';
import { sortEventsByDate } from './parsing-utils';
import axios from 'axios';
import consts from './consts';

const ARCHIVED_EVENTS_PATH = 'events/get/archived';

interface IEventFetchResult {
  mainGroupEvents: IEvent[]; 
  secondGroupEvents: IEvent[]; 
  generalGroupEvents: IEvent[];
}

export async function getEventByIdWithImage( id : string ) : Promise<IEvent | void> {
  return getEventById(id)
  .then(async (res) => {
      if (res === undefined && res === null) return res;
      const event : IEvent = res as IEvent;
      event.image = await fetchEventImage( event.image as string );
      return event;
    })
    .catch(err => console.error(`Failed fetching event data. ERROR: ${err}`));
}

export async function getEventById( id : string ) : Promise<IEvent | void> {
  return await axios.get(consts.EVENT_API_URL.concat( id ), { withCredentials: true })
    .then(async (res) => {
      return res.data.event;
    })
    .catch(err => console.error(`Failed fetching event data. ERROR: ${err}`));
}

export async function fetchAllActiveEvents() : Promise<IEvent[]> {
  return axios
    .get(consts.EVENT_API_URL.concat("active"), { withCredentials: true })
    .then( async res => {
      const events = res.data.events;
      //sort events by date
      sortEventsByDate(events);
      //inject images
      const eventsWithImage = await Promise.all(
        events.map(async (event : IEvent) => {
            event.image = await fetchEventImage( event.image as string );
            return event;
        })
      );
      return eventsWithImage;
    }) as Promise<IEvent[]>
}

export async function fetchAllActiveMainEvents() : Promise<IEventFetchResult> {
  return axios
    .get(`${consts.EVENT_API_URL}active?group=main`, { withCredentials: true })
    .then(res => {
      const events = res.data.events;
      sortEventsByDate(events);
      return events;
    })
    .catch(err => {
      console.error(err);
      return null;
    }) as Promise<IEventFetchResult>
}

export async function fetchAllActiveMainEventsWithImage() : Promise<IEventFetchResult> {
  return axios
    .get(`${consts.EVENT_API_URL}active?group=main`, { withCredentials: true })
    .then(res => {
      const events = res.data.events;
      sortEventsByDate(events);
      const eventsWithImages = Promise.all(events.map(async (event : IEvent) => {
          event.image = await fetchEventImage( event.image as string );
          return event;
      }))
      return eventsWithImages;
    })
    .catch(err => {
      console.error(err);
      return null;
    }) as Promise<IEventFetchResult>
}

export async function fetchAllActiveImportantEventsWithImage() : Promise<IEventFetchResult> {
  return axios
    .get(`${consts.EVENT_API_URL}active?group=second`, { withCredentials: true })
    .then(res => {
      const events = res.data.events;
      sortEventsByDate(events);
      const eventsWithImages = Promise.all(events.map(async (event : IEvent) => {
          event.image = await fetchEventImage( event.image as string );
          return event;
      }))
      return eventsWithImages;
    })
    .catch(err => {
      console.error(err);
      return null;
    }) as Promise<IEventFetchResult>
}

export async function fetchAllActiveEventsNoImageData() : Promise<IEventFetchResult> {
  const mainGroupEvents : IEvent[] = [];
  const secondGroupEvents : IEvent[] = [];
  const generalGroupEvents : IEvent[] = [];
  await axios
  .get(consts.EVENT_API_URL.concat("active"), { withCredentials: true })
  .then( res => {
    res.data.events.map( async (event : IEvent) => {
        //split into groups
        if( event.group === "main") {
          mainGroupEvents.push(event);
          generalGroupEvents.push(event);
        }
        else if( event.group === "second") {
          secondGroupEvents.push(event);
          generalGroupEvents.push(event);
        }
        else {
          generalGroupEvents.push(event);
        }
      }); 
    })
    .then(res => {
      sortEventsByDate(generalGroupEvents);
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
  .get(consts.ADMIN_API_URL.concat(ARCHIVED_EVENTS_PATH), { withCredentials: true })
  .then(res => 
    res.data.events.map((event : IEvent) => {
      if( event.group === "main") {
        mainGroupEvents.push(event);
        generalGroupEvents.push(event);
      }
      else if( event.group === "second") {
        secondGroupEvents.push(event);
        generalGroupEvents.push(event);
      }
      else {
        generalGroupEvents.push(event);
      }
    })
  ).catch(err => console.error(err));

  return { 
    mainGroupEvents,
    secondGroupEvents,
    generalGroupEvents
  };
}

export async function validateCurrentClient(){
  try{
    return axios
    .get(consts.VALIDATE_API_URL, { withCredentials: true }).then(res => {
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
    .get(consts.ADMIN_API_URL.concat(`/media/${ imageId }`), { withCredentials: true }).then(res => {
      if( res.status === 200 && res.data.image !== null && res.data.image !== undefined ) {
        return res.data.image;
      } else {
        return { mimetype: 'image/jpg', data: "none" }
      }
    });
  } catch(err) {
    console.error(err);
    return { mimetype: 'image/jpg', data: "none" };
  }
}
