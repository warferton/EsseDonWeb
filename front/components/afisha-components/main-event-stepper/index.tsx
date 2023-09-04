import dynamic from 'next/dynamic';
import { IEvent } from '../../../types/event/event.type';


const SwipeableStepper = dynamic(() => import('../../cards/carousel/carousel.component').then(mod => mod.SwipeableStepper)) as (any: any) => any;
const BigEventCard = dynamic(() => import('../../cards/bigCard.component').then(mod => mod.BigEventCard)) as (any: any) => any;

interface IProps {
    events?: IEvent[] 
}

export default ({ events } : IProps) => {
    return(
        <>
        <SwipeableStepper>
        { 
            events.map((event : IEvent) => 

                <BigEventCard key={ event._id } event={ event } />

        )}
        </SwipeableStepper>
        </>
    )
}