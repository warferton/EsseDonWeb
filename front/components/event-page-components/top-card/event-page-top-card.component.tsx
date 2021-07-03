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


const useStyles = makeStyles({
  root: {
    // maxWidth: '90%',
    backgroundColor: 'black',
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
      fontSize: '14px'
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


export function TopCard() {

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
                        The B-Man
                    </Typography>
                    <Typography gutterBottom component="h2" className={ styles.text + ' ' + styles.dateText }>
                        May 4 13:35 Wd
                    </Typography>
                    <Chip 
                    label='Вход свободный'
                    className = { styles.chip}
                    />
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
        </Card>
    )
}