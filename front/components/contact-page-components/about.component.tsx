import { Link, Box, Typography, makeStyles } from '@material-ui/core';
import CallIcon from '@material-ui/icons/Call';

const useStyles = makeStyles({
    root:{
        padding: '1rem',
        backgroundColor: 'white',
        borderTop: '0.25rem solid black',
    },

    heading:{
        fontSize: '24px',
        fontWeight: 'bold',
        paddingTop: '30px',
    },

    text: {
        fontSize: '18px',
        lineHeight: '10px',
        fontWeight: 300,
    }
});

export function AboutContact() {

    const classes = useStyles();

    return(
        <Box className={ classes.root }>
            <Typography paragraph className = {classes.heading }>
                Адрес:
            </Typography>

            <Typography paragraph className = { classes.text }>
                Ростов-на-Дону
            </Typography>

            <Typography paragraph className = { classes.text }>
                Красноармейская 166
            </Typography>


            <Typography paragraph className = {classes.heading }>
                Телефон:
            </Typography>

            <Typography className = { classes.text }>
                <Link 
                href="tel: +78633104110"
                style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                }}> 
                    <CallIcon fontSize='default' viewBox='0 0 25 25'/>
                    { '+7 863 310 41 10' }
                </Link>
            </Typography>


            <Typography paragraph className = {classes.heading }>
                E-mail:
            </Typography>

            <Typography paragraph className = { classes.text }>
                По вопросам сотрудничества
            </Typography>

            <Typography>
                <Link href="emailto: pr@jazzesse.ru"
                style={{
                    fontSize: '18px',
                    lineHeight: '1px',
                }}>
                    {'pr@jazzesse.ru'}
                </Link>
            </Typography>


            <Typography paragraph className = { classes.text }>
                По вопросам организации концертов
            </Typography>

            <Typography>
                <Link href="emailto: art@jazzesse.ru"
                style={{
                    fontSize: '18px',
                    lineHeight: '10px',
                }}>
                    {'art@jazzesse.ru'}
                </Link>
            </Typography>

            <Typography paragraph className = {classes.heading }>
                Режим Работы:
            </Typography>

            <Typography paragraph className = { classes.text }>
                Пн - Чт 12:00 - 23:00
            </Typography>
            <Typography paragraph className = { classes.text }>
                Пт 12:00 - 00:00
            </Typography>
            <Typography paragraph className = { classes.text }>
                Сб 13:00 - 00:00
            </Typography>
            <Typography paragraph className = { classes.text }>
                Вс 13:00 - 23:00
            </Typography>
        </Box>
    )
}
