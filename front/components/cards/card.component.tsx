import { useRouter } from 'next/router';
import { 
    Card, 
    CardMedia, 
    CardContent, 
    CardActions, 
    CardActionArea, 
    Chip,
    Typography, 
    Button,  
} from '@material-ui/core';
import { IEvent, Image } from '../../types/event/event.type';
import styles from '../../styles/StandartEventCard.module.css';
import { getLocalWeekDay } from '../../utils/date-utils';


interface IProps{
    event: IEvent;
}

export function EventCard(props : IProps) {

    const router = useRouter();

    const { event } = props;
    const { title, price, shortDescription, free, deposit, date, time } = event  
    const image = event.image as Image;
    const weekDay = getLocalWeekDay(date);
    
    return (   
        <Card raised className={ styles.root }>
            <CardActionArea>
                <CardMedia
                component="img"
                alt="JAZZ_IMG"
                height="200"
                src={`data:${image.mimetype};base64,${image.data}`}
                title={ title }
                />
                <CardContent className = { styles.contentContainer }>
                    <Typography variant='h5' component="h2" className={ styles.text + ' ' + styles.titleText }>
                        { title }
                    </Typography>
                    <Typography gutterBottom component="h2" className={ styles.text + ' ' + styles.dateText }>
                        { `${ date } ${ time } ${ weekDay }` }
                    </Typography>
                    <Chip 
                    label={ free === 'true' && !price ? 'Вход свободный' : `от ${ price }₽`}
                    className = { styles.chip}
                    />
                    { deposit && (
                    <Chip 
                    label={ `Депозит ${ deposit }₽` }
                    className = { styles.chip}
                    />)
                    }
                    <Typography variant="body2" color="textSecondary" className={ styles.text + ' ' + styles.aboutText } component="p">
                       { shortDescription }
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={ styles.actions }>
                <Button 
                variant='contained'
                size="large" 
                color="secondary"
                className={ styles.button }
                onClick={ () => router.push(`event/${event._id}`) }
                >
                    Забронировать
                </Button>
            </CardActions>
        </Card>
    )
}