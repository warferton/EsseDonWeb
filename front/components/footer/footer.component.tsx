import { Container, Typography, Link, makeStyles } from '@material-ui/core';
import CallIcon from '@material-ui/icons/Call';


interface IProps {
    position: 'static' | 'relative' | 'sticky' | 'fixed' | 'absolute';
}

export function Footer(props: IProps) {
    const useStyles =  makeStyles({
        footerContainer: {
            position: props.position,
            bottom: props.position !== undefined ? 0 : null,
            padding: '10px',
            backgroundColor: '#121212'
        },
        infoText: {
            fontSize: '20px',
            fontFamily: "FuturaLight",
            fontWeight: 600,
            lineHeight: '30px',
            color: 'white',
            alignItems: 'center'
        },
        motoText: {
            fontSize: '44px',
            fontWeight: '500',
            color: 'white',
            margin: '10px',
        },
    });

    const styles = useStyles();

    return(
        <Container disableGutters maxWidth={ false } className = { styles.footerContainer }>
            <Typography align='center' className = { styles.infoText }>
                { `Ростов-на-Дону` }
            </Typography>
            <Typography align='center' className = { styles.infoText }>
                { `Красноармейская 166` }
            </Typography> 
            <Typography align='center' className = { styles.infoText }>
                <Link 
                align='center' 
                color="inherit" 
                href="tel: +78633104110"
                style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    justifyContent: 'center'
                }}> 
                    <CallIcon fontSize='small' viewBox='0 0 25 25'/>
                    { `+7 863 310 41 10` }
                </Link>
            </Typography>
            <Typography align='center' variant='h4' className = { styles.motoText }>
                { `Jazz lives here.` }
            </Typography>
        </Container>
    );
}