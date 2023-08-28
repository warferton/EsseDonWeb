import { 
    Card, 
    CardMedia, 
    CardContent, 
    CardActionArea,
    Typography, 
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        minWidth: '200px',
        height: '260px',
        backgroundColor: '#212121',
        margin: '15px',
      },
      
      picture: {
        maxWidth: '250px',
        height: '180px',
      },
      
      text: {
        color: 'white',
        alignItems: 'left',
        marginTop: '10px',
      },

      
      titleText: {
        color: 'white',
        fontSize: '14px',
        fontWeight: 700,
        lineHeight: '18px',
        display: 'flex',
      },
      
      cardContent: {
        maxWidth: '280px',
        backgroundColor: 'transparent',
      },
      
      action: {
        borderRadius: 'inherit',
      },

      chip: {
        color: 'white',
        fontWeight: 700,
        marginRight: '10px',
        fontFamily: 'Jazz',
      }
        
});

interface menuCard {
    title: string | undefined;
    image: string | undefined;
    price: number | string;
  }

export function MenuCard({title, image, price}: menuCard){

    const styles = useStyles();

    return(
        <Card raised className={ styles.root } >
            <CardActionArea className={ styles.action }>
                <CardMedia
                className={ styles.picture }
                component="img"
                alt="menu"
                src={ image }
                title={ title } />                
                <CardContent className={ styles.cardContent }>
                    <Typography component="h2" className={ styles.titleText }>
                        { title }
                    </Typography>
                    { price && (
                    <Typography component="h2" className={ styles.titleText }>
                      { `${ price } р.` }
                    </Typography>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

