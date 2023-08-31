import { Container, Typography, Link, makeStyles, IconButton, SvgIcon } from '@material-ui/core';
import { Call, WhatsApp } from '@material-ui/icons/';


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
            fontWeight: 500,
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
                    <Call fontSize='small' viewBox='0 0 25 25'/>
                    { `+7 (863) 310-41-10` }
                </Link>
            </Typography>
            <Container style={{color: 'white', justifyContent: 'center', display: 'flex',}}>
                <IconButton aria-label="Example" color="inherit" href='https://wa.me/79613231879'>
                    <WhatsApp fontSize='large' viewBox="0 0 22 22"></WhatsApp>
                </IconButton>
                <IconButton aria-label="Example" color="inherit" href='https://vk.com/essejazzdon'>
                    <SvgIcon fontSize="large" viewBox="0 -2 54 54" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M3.37413 3.37413C0 6.74826 0 12.1788 0 23.04V24.96C0 35.8212 0 41.2517 3.37413 44.6259C6.74826 48 12.1788 48 23.04 48H24.96C35.8212 48 41.2517 48 44.6259 44.6259C48 41.2517 48 35.8212 48 24.96V23.04C48 12.1788 48 6.74826 44.6259 3.37413C41.2517 0 35.8212 0 24.96 0H23.04C12.1788 0 6.74826 0 3.37413 3.37413ZM8.10012 14.6001C8.36012 27.0801 14.6001 34.5801 25.5401 34.5801H26.1602V27.4401C30.1802 27.8401 33.22 30.7801 34.44 34.5801H40.1201C38.5601 28.9001 34.4599 25.7601 31.8999 24.5601C34.4599 23.0801 38.0599 19.4801 38.9199 14.6001H33.7598C32.6398 18.5601 29.3202 22.1601 26.1602 22.5001V14.6001H21V28.4401C17.8 27.6401 13.7601 23.7601 13.5801 14.6001H8.10012Z"/>
                    </SvgIcon>
                </IconButton>
            </Container>
            <Typography align='center' variant='h4' className = { styles.motoText }>
                { `Jazz lives here.` }
            </Typography>
        </Container>
    );
}
