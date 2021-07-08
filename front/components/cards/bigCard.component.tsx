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


export function BigEventCard(){

    return(
        <Card raised className={styles.root} >
            <CardActionArea className={ styles.action }>
                <CardMedia
                component="img"
                alt="Some Musician"
                height="220"
                image="data:image/jpeg;base64,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"
                title="Some Musician" 
                />                
                <CardContent className={ styles.cardContent }>
                    <Grid container wrap='nowrap' justify='space-between'>
                        <Box className={ styles.box }>
                            <Typography component="h2" className={ styles.titleText }>
                                Квартет Олега Максимова
                            </Typography>
                        </Box>
                        <Box className={ styles.box }>
                            {
                                ['31 Мая', '20:00', 'Ср'].map( item =>

                                    <Typography 
                                    key={ item } 
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

