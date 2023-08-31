import dynamic from 'next/dynamic';
import { Typography, Container, makeStyles } from '@material-ui/core';
import { IEvent } from '../../../types/event/event.type';

const EventCard = dynamic(() => import('../../cards/card.component').then(mod => mod.EventCard));

interface IProps {
    events? : IEvent[]
}

export default ({ events } : IProps) => {
    const gridColumns = events.length < 2 ? 1 : events.length < 3 ? 2 : 3;

    const useStyles = makeStyles({
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
    }
    });
    
    const styles = useStyles();
    return (
        <>
        { events.length > 0 &&
            <Typography variant='h5' className = { styles.heading }>
                В этом месяце
            </Typography>
        }

        <Container className={ styles.generalEvents }>
            { events.map((event : IEvent) => 

                <EventCard key={ event._id } event={ event }/>

            )}
        </Container>
        </>
    )
}