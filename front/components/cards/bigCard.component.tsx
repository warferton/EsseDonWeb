import { useRouter } from 'next/router';
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
import { getLocalWeekDay } from '../../utils/date-utils';
import { IEvent } from '../../types/event/event.type';


interface IProps{
    event: IEvent;
}

export function BigEventCard(props : IProps){

    const router = useRouter();

    const { event } = props;
    const { title, image, date, time } = event
    const weekDay = getLocalWeekDay(date);

    return(
        <Card raised className={styles.root} onClick={ () => router.push(`event/${event._id}`) }>
            <CardActionArea className={ styles.action }>
                <CardMedia
                component="img"
                alt="JAZZ_IMG"
                height="220"
                image={ image }
                title={ title } 
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
                                [date, time, weekDay].map( item =>

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

