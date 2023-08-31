import { Typography, makeStyles } from '@material-ui/core';
import { IEvent } from '../../../types/event/event.type';
import dynamic from 'next/dynamic';

const SmallEventCard = dynamic(() => import('../../cards/smallCard.component').then(mod => mod.SmallEventCard));
const CardSlider = dynamic(() => import('../../cards/slider/card-slider.component').then(mod => mod.CardSlider));

interface IProps {
    events?: IEvent[]
}

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
    }
  });
  
  
export default ({ events } : IProps) => {
    const styles = useStyles();
    return (
        <>
        { events.length > 0 &&
            <Typography variant='h5' className = { styles.heading }>
                не пропустите
            </Typography>
        }
        
        <CardSlider>
            { events.map((event : IEvent) => 
        
                <SmallEventCard key={ event._id } event={ event }/>

            )}
        </CardSlider>
        </>
    )
}