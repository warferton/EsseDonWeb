import { Container, Typography, Link } from '@material-ui/core';
import CallIcon from '@material-ui/icons/Call';
import styles from '../../styles/Footer.module.css';

export function Footer() {
    return(
        <Container disableGutters maxWidth={ false } className = { styles.footerContainer }>
            <Typography align='center' className = { styles.infoText }>
                Ростов-на-Дону
            </Typography>
            <Typography align='center' className = { styles.infoText }>
                Красноармейская 166
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
                    { '+7 863 310 41 10' }
                </Link>
            </Typography>
            <Typography align='center' variant='h1' className = { styles.motoText }>
                Jazz lives here
                <span className = { styles.motoDot }>.</span>
            </Typography>
        </Container>
    );
}