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
    let textColor = "white";
    switch(severity){
        case('error') : colour = '#cc2525e0'; break;
        case('warning') : colour = 'yellow'; break;
        case('info') : colour = '#2a7fb1'; break;
        case('success') : colour = '#42a11de0'; break;
        case('secondary') : colour = '#DDDDDD'; textColor = 'black'; break;
        default : colour = 'white'; textColor = 'black';
    }

    let dimentions;
    switch (size) {
        case('small'): dimentions = ['12px','20px']; break;
        case('large'): dimentions = ['18px','26px']; break;
        case('inherit'): dimentions = ['inherit', 'inherit']; break;
        default: dimentions = ['14px','25px'];
    }


    const useStyles = makeStyles({
        text: {
            padding: '0.3rem',
            fontSize: dimentions[0],
            lineHeight: dimentions[1],
            fontWeight: 300,
            color: textColor
        },
        alertBox: {
            border: `2px solid ${ textColor }`,
            padding: '0.1rem',
            margin: '0.5rem',
            borderRadius: '10px',
            backgroundColor: colour
        }
    });

    const classes = useStyles();

    return(
        <Box className={ classes.alertBox }>
            <InfoOutlined fontSize={ size } style={{color: textColor }}/>
            <Typography className={ classes.text}>
                { children }             
            </Typography>
        </Box>
    )
}