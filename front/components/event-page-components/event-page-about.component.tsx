import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root:{
        padding: '1rem',
        backgroundColor: 'white',
        borderTop: 'white',
    },
    text: {
        fontSize: '18px',
        lineHeight: '35px',
        fontWeight: 300,
    }
});

interface IProps{
    description: string;
}

export function About({description} : IProps) {

    const classes = useStyles();

    return(
        <Box className={ classes.root }>
            <Typography paragraph className={ classes.text }>
                { description }
            </Typography>
        </Box>
    )
}