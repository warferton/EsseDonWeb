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
        minHeight: '200px',
        height: 'fit-content',
        backgroundColor: 'rgb(243, 243, 243)',
        margin: '15px',
      },
      
      picture: {
        maxWidth: '250px',
        height: '100%',
      },
      
      text: {
        color: 'black',
        alignItems: 'left',
        marginTop: '10px',
      },

      
      titleText: {
        fontSize: '14px',
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
        
});

interface Props {
    title: string | undefined;
    image: string | undefined;
  }

export function MenuCard(props: Props){

    const styles = useStyles();

    return(
        <Card raised className={ styles.root } >
            <CardActionArea className={ styles.action }>
                <CardMedia
                className={ styles.picture }
                component="img"
                alt="menu"
                src={props.image}
                title={ props.title } />                
                <CardContent className={ styles.cardContent }>
                    <Typography component="h2" className={ styles.titleText }>
                        { props.title }
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

