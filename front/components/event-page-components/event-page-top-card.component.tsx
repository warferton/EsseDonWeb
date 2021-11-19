import { 
    Card, 
    CardMedia, 
    CardContent, 
    CardActions, 
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
    backgroundColor: 'black',
    borderRadius: '0px',
    margin: 'auto',
  },
  contentContainer: {
      backgroundColor: 'white',
      borderTop: '2px solid grey'
  },
  text: {
      color: 'black'
  },
  titleText: {
      fontWeight: 500,
      fontSize: '26px',
      textTransform: 'uppercase'
  },
  shortDecriptionText: {
      marginTop: '10px',
      fontWeight: 100,
      fontSize: '18px'
  },
  dateText: {
      fontWeight: 100,
      fontSize: '16px',
      textTransform: 'uppercase'
  },
  aboutText: {
      marginTop: '14px',
      display:' -webkit-box',
      overflow: 'hidden',
      lineClamp: 2,
      boxOrient: 'vertical',
  },
  chip: {
      backgroundColor: 'white',
      fontWeight: 600,
      fontSize: '14px',
      marginRight: '10px',
      marginTop: '10px',
  },
  actions: {
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingTop: 0,
  },
  button:{
    width: '100%',
    marginBottom: '0.45em',
    background: 'black',
    border: '1px solid black',
    '&:hover': {
        background: '#E0E0E0',
        color: 'black',
    },
  },
  cardMedia: {
    '@media (max-width: 875px)': {
        height: '250px',
    },
    '@media (min-width: 875px)': {
        height: '300px',
    },
    '@media (min-width: 1275px)': {
        height: '350px',
    },
  },
});


export function TopCard({ event }: IProps) {

    const { title, price, shortDescription, free, deposit, date, time, tcLink } = event;
    const image = event.image as Image;
    const weekDay = getLocalWeekDay(date);
    const localisedDate = `${ new Date(date).getDate() } ${ getLocalizedMonth(date) }`;
    const buttonLink = free === 'true' ? '#form-box' : tcLink;
    const buttonTitle = free === 'true' ? 'Забронировать' : 'Купить Билет';
    const styles = useStyles();

    return(
         <Card raised className={ styles.root }>
                <CardMedia
                className={ styles.cardMedia }
                component="img"
                alt="Some Musician"
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
                    <Chip variant="outlined" size="small"
                    label={ free === 'true' || !price ? 'Вход свободный' : `от ${ price }₽`}
                    className = { styles.chip }
                    />
                    { deposit && (
                        <Chip variant="outlined" size="small"
                        label={ `Депозит ${ deposit }₽` }
                        className = { styles.chip }
                        />)
                    }
                    <Typography gutterBottom component="h2" className={ styles.text + ' ' + styles.shortDecriptionText }>
                        { shortDescription }
                    </Typography>
                </CardContent>
            <CardActions className={ styles.actions }>
                
                <Button
                variant='contained'
                size="large" 
                color="secondary"
                className={ styles.button }
                href={ buttonLink }
                >
                    { buttonTitle }
                </Button>
            </CardActions>
        </Card>
    )
}
