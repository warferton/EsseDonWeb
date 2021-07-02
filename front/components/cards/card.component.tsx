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

/*
  TODO
  Transfer styles to a separete css file.

  Configure Using props
*/


const useStyles = makeStyles({
  root: {
    maxWidth: 350,
    maxHeight: 450,
    backgroundColor: 'black',
    borderRadius: '15px',
    margin:'2rem',
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
      fontSize: '24px'
  },
  dateText: {
      fontWeight: 100,
      fontSize: '14px'
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
      fontWeight: 600
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


export function EventCard() {

    const classes = useStyles();

    return (
        <Card raised className={ classes.root }>
            <CardActionArea>
                <CardMedia
                component="img"
                alt="Some Musician"
                height="200"
                image="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.zastavki.com%2Fpictures%2Foriginals%2F2013%2FMusic_B.B._King_musician_047287_.jpg&f=1&nofb=1"
                title="Some Musician"
                />
                <CardContent className = { classes.contentContainer }>
                    <Typography variant='h5' component="h2" className={ classes.text + ' ' + classes.titleText }>
                        The B-Man
                    </Typography>
                    <Typography gutterBottom component="h2" className={ classes.text + ' ' + classes.dateText }>
                        May 4 13:35 Wd
                    </Typography>
                    <Chip 
                    label='от 1400р'
                    className = { classes.chip}
                    />
                    <Typography variant="body2" color="textSecondary" className={ classes.text + ' ' + classes.aboutText } component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={ classes.actions }>
                <Button 
                variant='contained'
                size="large" 
                color="secondary"
                className={ classes.button }
                >
                    Забронировать
                </Button>
            </CardActions>
        </Card>
    )
}