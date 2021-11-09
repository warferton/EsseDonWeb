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
import { getLocalizedMonth } from '../../utils/date-utils';
import { IEvent, Image } from '../../types/event/event.type';


interface IProps{
    event: IEvent;
}

export function BigEventCard(props : IProps){

    const router = useRouter();

    const { event } = props;
    const { title, date } = event
    const image = event.image as Image;
    const localisedDate = `${ new Date(date).getDate() } ${ getLocalizedMonth(date) }`;

    return(
        <Card raised className={styles.root} onClick={ () => router.push(`event/${event._id}`) }>
            <CardActionArea className={ styles.action }>
                <CardMedia
                component="img"
                alt="JAZZ_IMG"
                height="275"
                src={`data:${image.mimetype};base64,${image.data}`}
                title={ title } 
                className={ styles.img }
                />                
                <CardContent className={ styles.cardContent }>
                    <Grid container wrap='nowrap' justifyContent='space-between'>
                        <Box className={ styles.box }>
                            <Typography component="h2" className={ styles.titleText }>
                                { title }
                            </Typography>
                            {
                                    <Typography 
                                    key={ `${localisedDate}`} 
                                    component="h2" 
                                    className={ styles.dateText } 
                                    align='right'
                                    >
                                        { localisedDate }
                                    </Typography>
                            }
                        </Box>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

