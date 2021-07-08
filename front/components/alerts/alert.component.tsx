import { InfoOutlined } from '@material-ui/icons';
import { Box, Typography, makeStyles } from '@material-ui/core';

interface IProps{
    children: string;
    severity?: 'error' | 'warning' | 'info' | 'success' | 'default' | 'secondary';
    size?: 'default' | 'small' | 'large' | 'inherit';
}


export function Alert(props : IProps){

    const { children, severity, size } = props;

    let colour;
    switch(severity){
        case('error') : colour = 'red'; break;
        case('warning') : colour = 'yellow'; break;
        case('info') : colour = 'blue'; break;
        case('success') : colour = 'green'; break;
        case('default') : colour = 'white'; break;
        case('secondary') : colour = '#DDDDDD'; break;
        default : colour = 'white';
    }

    let dimentions;
    switch (size) {
        case('small'): dimentions = ['12px','20px']; break;
        case('default'): dimentions = ['14px','25px']; break;
        case('large'): dimentions = ['18px','26px']; break;
        case('inherit'): dimentions = ['inherit', 'inherit']; break;
        default: dimentions = ['14px','25px'];
    }


    const useStyles = makeStyles({
        text: {
            padding: '0.5rem',
            fontSize: dimentions[0],
            lineHeight: dimentions[1],
            fontWeight: 300,
        },
        alertBox: {
            border: '2px solid black',
            padding: '0.1rem',
            margin: '0.5rem',
            borderRadius: '10px',
            backgroundColor: colour
        }
    });

    const classes = useStyles();

    return(
        <Box className={ classes.alertBox }>
            <InfoOutlined fontSize={ size }/>
            <Typography className={ classes.text}>
                { children }             
            </Typography>
        </Box>
    )
}