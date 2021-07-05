import { Container, Link, Box, Typography, makeStyles } from '@material-ui/core';
 
const useStyles = makeStyles({
    root:{
        padding: '1rem',
        backgroundColor: 'white',
        borderTop: '0.25rem solid black',
    },
    text: {
        fontSize: '18px',
        lineHeight: '35px',
        fontWeight: 300,
    }
});

export function AboutContact() {

    const classes = useStyles();

    return(
        <Box className={ classes.root }>
            <Typography  variant="subtitle1" gutterBottom>
                Адрес:
            </Typography>
        </Box>
    )
}
