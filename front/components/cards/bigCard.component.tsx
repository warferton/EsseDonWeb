import { 
    Card, 
    CardMedia, 
    CardContent, 
    CardActionArea, 
    Grid,
    Box,
    Typography, 
} from '@material-ui/core';
import styles from '../../styles/BigEventCard.module.css';
import { IEvent } from '../../types/event/event.type';


interface IProps{
    event: IEvent;
}

export function BigEventCard(props : IProps){

    const { event } = props;
    const { title, image, date, time } = event

    return(
        <Card raised className={styles.root} >
            <CardActionArea className={ styles.action }>
                <CardMedia
                component="img"
                alt="JAZZ_IMG"
                height="220"
                image={ image }
                title="Some Musician" 
                />                
                <CardContent className={ styles.cardContent }>
                    <Grid container wrap='nowrap' justifyContent='space-between'>
                        <Box className={ styles.box }>
                            <Typography component="h2" className={ styles.titleText }>
                                { title }
                            </Typography>
                        </Box>
                        <Box className={ styles.box }>
                            {
                                [date, time, 'Ср'].map( item =>

                                    <Typography 
                                    key={ `${item}`} 
                                    component="h2" 
                                    className={ styles.dateText } 
                                    align='right'
                                    >
                                        { item }
                                    </Typography>
                            )}
                        </Box>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

