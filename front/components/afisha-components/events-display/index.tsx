import dynamic from 'next/dynamic';
import InfiniteScroll from 'react-infinite-scroller';
import { Typography, CircularProgress, makeStyles } from '@material-ui/core';
import { IEvent } from '../../../types/event/event.type';
import { useState } from 'react';
import { fetchActiveEventsWithOffset } from '../../../utils/api-utils';

const EventCard = dynamic(() => import('../../cards/card.component').then(mod => mod.EventCard)) as (any: any) => any;

export default () => {
    const [hasMoreData, setHasMoreData] = useState(true);
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const gridColumns = events.length < 2 ? 1 : events.length < 3 ? 2 : 3;
    const styles = getStyles(gridColumns);

    const handleLoadEvents : (offset: number) => void = (offset) => {
        if (isLoading) {
            return;
        }

        setIsLoading(true);

        fetchActiveEventsWithOffset(events.length, 10)
        .then(({events: resEvents, totalEvents}) => { 
            if (events.length + resEvents.length > totalEvents) {
                setHasMoreData(false);
            }
            return resEvents;
        })
        .then(setEvents)
        .then(() => setIsLoading(false))
        .catch(_ => {
            setHasMoreData(false);
            setTimeout(() => setIsLoading(false), 1000);
        })
    }


    return (
        <>
        <Typography variant='h5' className = { styles.heading }>
            В этом месяце
        </Typography>

        <InfiniteScroll
            initialLoad={ true }
            pageStart={ 0 }
            threshold={ -100 }
            loadMore={ () => handleLoadEvents(events.length) }
            hasMore={ hasMoreData }
            loader={ <CircularProgress thickness={ 1.7 } className={ styles.loadingSpinner } /> }
            className={ styles.generalEvents }
        >
            { events.map((event : IEvent) => 

                <EventCard key={ event._id } event={ event }/>

            )}
        </InfiniteScroll>
        </>
    )
}

const getStyles = (gridColumns: number) => {
    return makeStyles({
        heading: {
            marginTop: '1rem',
            padding: '1.3rem',
            paddingLeft: '2rem',
            fontSize: '24px',
            fontWeight: 500,
            lineHeight: '10px',
            borderTop: '1px solid black',
            borderBottom: '1px solid black',
            textAlign: 'center',
            background: 'white',
        },
        generalEvents: {
            display: 'grid',
            justifyContent: 'space-between',
            justifyItems: 'center',
            gridTemplateColumns: `repeat(${ gridColumns }, 1fr)`,
            gridAutoRows: 'auto',
            gridGap: '0.5rem',
            '@media (max-width: 1240px)': {
            display: 'grid',
            justifyContent: 'space-between',
            justifyItems: 'center',
            gridTemplateColumns: `repeat( 2, 1fr)`,
            },
            '@media (max-width: 875px)': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            }
        },
        loadingSpinner: {
            display: 'flex',
            margin: 'auto'
        }
    })();
}
