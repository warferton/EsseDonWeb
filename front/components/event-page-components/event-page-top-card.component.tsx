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
import { IEvent } from '../../types/event/event.type';

interface IProps{
    event: IEvent;
}

const useStyles = makeStyles({
  root: {
    backgroundColor: 'white',
    borderRadius: '0px',
    margin: 'auto'
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
      lineClamp: 3,
      boxOrient: 'vertical'
  },
  chip: {
      backgroundColor: '#FF2020',
      color: 'white',
      fontWeight: 600,
      fontSize: '14px'
  },
  actions: {
    justifyContent: 'center',
    backgroundColor: '#222222',
  },
  button:{
      borderRadius: '15px',
      margin: '0em',
      background: 'conic-gradient(from 45grad at 5% -3%, #ff0000, 50grad, #7b64ff)',
  },
  illustrationContainer:{
      backgroundColor: '#222222'
  }
});


export function TopCard(props: IProps) {

    const { event } = props;
    const { title, price, shortDescription, free, image, deposit, date, time } = event;

    const styles = useStyles();

    return(
         <Card raised className={ styles.root }>
                <CardMedia
                component="img"
                alt="Some Musician"
                height="250"
                image="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.zastavki.com%2Fpictures%2Foriginals%2F2013%2FMusic_B.B._King_musician_047287_.jpg&f=1&nofb=1"
                title="Some Musician"
                />
                <CardContent className = { styles.contentContainer }>
                    <Typography variant='h5' component="h2" className={ styles.text + ' ' + styles.titleText }>
                        { title }
                    </Typography>
                    <Typography gutterBottom component="h2" className={ styles.text + ' ' + styles.dateText }>
                        { `${ date.getDate() } ${ time }` }
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
                >
                    Забронировать
                </Button>
            </CardActions>
            <CardMedia className={ styles.illustrationContainer }
                component="img"
                alt="illustration element with piano and guitar"
                width="100%"
                image="https://sun9-53.userapi.com/impg/Ovbdk366ymKkLB-TSvfW7tcNbSEjcApCHf2SiA/UoD1mQQkNFY.jpg?size=2560x532&quality=96&sign=6c26c539d355a0a43d8612e754a8c006&type=album"
                title="illustration"
            />
        </Card>
    )
}