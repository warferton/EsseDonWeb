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
    makeStyles
} from '@material-ui/core';
import { IEvent, Image } from '../../types/event/event.type';
import { getLocalizedMonth, getLocalWeekDay } from '../../utils/date-utils';


interface IProps{
    event: IEvent;
}

const useStyles = makeStyles({
    root: {
        width: '320px',
        height: 'fit-content',
        maxHeight: '600px',
        backgroundColor: 'white',
        margin: '2rem auto 2rem auto',
        justifySelf:'center'
    },
    contentContainer: {
        backgroundColor: 'white',
        borderTop: '2px solid gray',
    },
    text: {
        color: 'black',
    },
    titleText: {
        fontWeight: 1000,
        fontSize: '20px',
        lineClamp: 2,
        textTransform: 'uppercase',
    },
    dateText: {
        fontWeight: 100,
        fontSize: '15px',
        textTransform: 'uppercase',
    },
    aboutText: {
        marginTop: '14px',
        display: '-webkit-box',
        overflow: 'hidden',
        boxOrient: 'vertical',
        lineClamp: 3,
    },
    chip: {
        color: 'black',
        fontWeight: 600,
        marginRight: '10px',
    },
    actions: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        backgroundColor: 'white',
        paddingTop: 0,
    },
    button: {
        background: 'black',
        width: '100%'
    },
});

export function EventCard(props : IProps) {

    const router = useRouter();
    const styles = useStyles();
    const { event } = props;
    const { title, price, shortDescription, free, deposit, date, time, tcLink } = event  
    const image = event.image as Image;
    const weekDay = getLocalWeekDay(date);
    const localisedDate = `${ new Date(date).getDate() } ${ getLocalizedMonth(date) }`;
    const buttonLink = free === 'true' ? `event/${event._id}/#form-box` : tcLink;
    const buttonTitle = free === 'true' ? 'Забронировать' : 'Купить Билет';
    
    return (   
        <Card raised className={ styles.root } onClick={ () => router.push(`event/${event._id}`) }>
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
                        { `${ localisedDate } ${ time } ${ weekDay }` }
                    </Typography>
                    <Chip variant = 'outlined' size = 'small'
                    label={ free === 'true' && !price ? 'Вход свободный' : `от ${ price }₽`}
                    className = { styles.chip}
                    />
                    { deposit && (
                    <Chip variant = 'outlined'  size = 'small'
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
                onClick={ () => router.push(buttonLink) }
                >
                    { buttonTitle }
                </Button>
            </CardActions>
        </Card>
    )
}