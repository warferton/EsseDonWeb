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
import { getLocalWeekDay } from '../../utils/date-utils';


interface IProps{
    event: IEvent;
}

const useStyles = makeStyles({
    root: {
        width: '350px',
        height: 'fit-content',
        maxHeight: '500px',
        backgroundColor: 'black',
        borderRadius: '15px',
        margin: '2rem auto 2rem auto',
    },
    contentContainer: {
        backgroundColor: '#222222',
        borderTop: '2px solid #101010',
        height: '15em',
    },
    text: {
        color: 'white',
    },
    titleText: {
        fontWeight: 500,
        fontSize: '20px',
        lineClamp: 2,
    },
    dateText: {
        fontWeight: 100,
        fontSize: '14px',
    },
    aboutText: {
        marginTop: '14px',
        display: '-webkit-box',
        overflow: 'hidden',
        boxOrient: 'vertical',
        lineClamp: 3,
    },
    chip: {
        backgroundColor: '#ff2020',
        color: 'white',
        fontWeight: 600,
        marginRight: '10px',
        marginTop: '10px',
    },
    actions: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        backgroundColor: '#222222',
        paddingTop: 0,
    },
    button: {
        borderRadius: '15px',
        background: 'conic-gradient(from 45grad at 5% -3%, #ff0000, 50grad, #7b64ff)',
    },
});

export function EventCard(props : IProps) {

    const router = useRouter();
    const styles = useStyles();
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