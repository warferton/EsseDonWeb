import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    sectionHeader: {
        fontSize: '24px',
        fontWeight: 500,
        padding: '0.7rem',
        borderBottom: '1px solid black',
    },
    text: {
        padding: '1rem',
        fontSize: '18px',
        lineHeight: '35px',
        fontWeight: 300,
    },
    container:{
        backgroundColor: 'white',
        borderTop: '1px solid black',
    },
});

interface IProps{
    description: string;
}

export function About({description} : IProps) {

    const classes = useStyles();

    return(
        <>
            <Box className={classes.container}>
                <Typography className={ classes.sectionHeader }>
                    О мероприятии
                </Typography>
                <Typography paragraph className={ classes.text }>
                    { description }
                </Typography>
            </Box>
        </>
    )
}