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
import { getLocalWeekDay, getLocalizedMonth } from '../../utils/date-utils';
import { IEvent, Image } from '../../types/event/event.type';


interface IProps{
    event: IEvent;
}

export function BigEventCard(props : IProps){

    const router = useRouter();

    const { event } = props;
    const { title, date, time } = event
    const image = event.image as Image;
    const localisedDate = `${ new Date(date).getDate()+1 } ${ getLocalizedMonth(date) }`;
    const weekDay = getLocalWeekDay(date);

    return(
        <Card raised className={styles.root} onClick={ () => router.push(`event/${event._id}`) }>
            <CardActionArea className={ styles.action }>
                <CardMedia
                component="img"
                alt="JAZZ_IMG"
                height="275"
                src={`data:${image.mimetype};base64,${image.data}`}
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
                                [localisedDate, time, weekDay].map( item =>

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

