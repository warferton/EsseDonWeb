import { useRouter } from 'next/router';
import { 
    Card, 
    CardMedia, 
    CardContent, 
    CardActionArea, 
    Typography, 
} from '@material-ui/core';
import styles from '../../styles/SmallEventCard.module.css';
import { IEvent } from '../../types/event/event.type';
import { getLocalWeekDay } from '../../utils/date-utils';


interface IProps{
    event: IEvent;
}

export function SmallEventCard(props : IProps){

    const router = useRouter();

    const { event } = props;
    const { title, image, date, time } = event
    const weekDay = getLocalWeekDay(date);

    return(
        <Card raised className={ styles.root } onClick={ () => router.push(`event/${event._id}`) } >
            <CardActionArea className={ styles.action }>
                <CardMedia
                className={ styles.picture }
                component="img"
                alt="Some Musician"
                height="120"
                image={ image }
                title={ title } />                
                <CardContent className={ styles.cardContent }>
                    <Typography component="h2" className={ styles.dateText }>
                        { `${ date } ${ time } ${ weekDay }` }
                    </Typography>
                    <Typography component="h2" className={ styles.titleText }>
                        { title }
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

