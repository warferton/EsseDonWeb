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
      backgroundColor: '#222222',
      borderTop: '2px solid #101010'
  },
  text: {
      color: 'white'
  },
  titleText: {
      fontWeight: 500,
      fontSize: '26px'
  },
  shortDecriptionText: {
      marginTop: '10px',
      fontWeight: 100,
      fontSize: '18px'
  },
  dateText: {
      fontWeight: 100,
      fontSize: '16px'
  },
  aboutText: {
      marginTop: '14px',
      display:' -webkit-box',
      overflow: 'hidden',
      lineClamp: 2,
      boxOrient: 'vertical'
  },
  chip: {
      backgroundColor: '#FF2020',
      color: 'white',
      fontWeight: 600,
      fontSize: '14px',
      marginRight: '10px',
      marginTop: '10px',
  },
  actions: {
    justifyContent: 'center',
    backgroundColor: '#222222',
    paddingTop: 0
  },
  button:{
      borderRadius: '15px',
      marginBottom: '0.45em',
      background: 'conic-gradient(from 45grad at 5% -3%, #ff0000, 50grad, #7b64ff)',
  }

});


export function TopCard({ event }: IProps) {

    const { title, price, shortDescription, free, deposit, date, time, tcLink } = event;
    const image = event.image as Image;
    const weekDay = getLocalWeekDay(date);
    const localisedDate = `${ new Date(date).getDate()+1 } ${ getLocalizedMonth(date) }`;
    const buttonLink = free === 'true' ? '#form-box' : tcLink;
    const styles = useStyles();

    return(
         <Card raised className={ styles.root }>
                <CardMedia
                component="img"
                alt="Some Musician"
                height="250"
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
                    <Chip 
                    label={ free === 'true' || !price ? 'Вход свободный' : `от ${ price }₽`}
                    className = { styles.chip }
                    />
                    { deposit && (
                        <Chip 
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
                    Забронировать
                </Button>
            </CardActions>
        </Card>
    )
}
