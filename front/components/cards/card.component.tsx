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
import { IEvent } from '../../types/event/event.type';
import styles from '../../styles/StandartEventCard.module.css';


interface IProps{
    event: IEvent;
}

export function EventCard(props : IProps) {

    const router = useRouter();

    const { event } = props;
    const { title, price, shortDescription, free, image, deposit, date, time } = event  
    
    return (   
        <Card raised className={ styles.root }>
            <CardActionArea>
                <CardMedia
                component="img"
                alt="JAZZ_IMG"
                height="200"
                image={ image }
                title={ title }
                />
                <CardContent className = { styles.contentContainer }>
                    <Typography variant='h5' component="h2" className={ styles.text + ' ' + styles.titleText }>
                        { title }
                    </Typography>
                    <Typography gutterBottom component="h2" className={ styles.text + ' ' + styles.dateText }>
                        { `${ date } ${ time }` }
                    </Typography>
                    <Chip 
                    label={ free && !price ? 'Вход свободный' : `от ${ price }₽`}
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