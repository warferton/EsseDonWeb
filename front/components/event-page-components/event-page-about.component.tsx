import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    sectionHeader: {
        fontSize: '24px',
        fontWeight: 500,
        padding: '0.7rem',
        borderBottom: '1px solid black',
    },
    text: {
        // padding: '1rem',
        margin: 0,
        fontSize: '18px',
        lineHeight: '35px',
        fontWeight: 600,
        fontFamily: 'FuturaLight',
    },
    container:{
        backgroundColor: 'white',
        borderTop: '1px solid black',
    },
    descriptionBox: {
        padding: '1rem',
    }
});

interface IProps{
    description: string;
}

export function About({description} : IProps) {

    const classes = useStyles();

    const dArray = description.split('<br/>');
    
    return(
        <>
            <Box className={classes.container}>
                <Typography variant='h4' className={ classes.sectionHeader }>
                    О мероприятии
                </Typography>
                <Box className={ classes.descriptionBox }>
                    { 
                        dArray.map(para => <Typography paragraph className={ classes.text }>{para}</Typography>)
                    }
                </Box>
            </Box>
        </>
    )
}