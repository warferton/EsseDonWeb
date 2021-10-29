import { useState, useEffect } from 'react';
import { Container, ButtonGroup, Button, makeStyles } from '@material-ui/core';
import  Link  from 'next/link';

const useStyles = makeStyles({
    root: {
        padding: 0,
        minWidth: '275px',
        position: 'sticky',
        '-webkit-position': '-webkit-sticky',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '10vh',
        border: '2.3px solid black',
        borderTopLeftRadius: '7px',
        borderTopRightRadius: '7px',
        boxShadow: '0px 0px 3px #404040',
        zIndex: 100000,
        backgroundColor: '#FFFFFF',
    },
    buttonGroup: {
        fontWeight: 600,
        width: '100%',
        height: '100%',
        display: 'flex',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    button: {
        padding: 0,
        color: '#FFFFFF',
        backgroundColor: '#000000',
        transition: '0.3s linear',
        '&:hover': {
            color: '#000000',
        },
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    buttonActive: {
        color: '#000000',
        backgroundColor: '#FFFFFF',
        transition: '0.15s linear',
        size: 1.1,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
});

export function NavigationSelector(props : any) {

    const { children } = props;

    const classes = useStyles();
    
    const [buttonActive, setButtonActive] = useState('');

    const setCurrentPage = (pageName: string) => {
        setButtonActive(pageName);
        localStorage.setItem("EsseCurentPageName", pageName);
    }

     useEffect(() => {
        const currentPageName = localStorage.getItem("EsseCurentPageName");
        setButtonActive(currentPageName);
    }, []);


    return(
        <>
            { children }
        <Container className={ classes.root }>
            <ButtonGroup fullWidth variant='contained' className={ classes.buttonGroup }>
                    <Button 
                    fullWidth
                    onClick={ () => setCurrentPage('afisha') }
                    className={ buttonActive === 'afisha' ? classes.buttonActive : classes.button }
                    >
                        <Link href="/">
                            Афиша
                        </Link>
                    </Button>
                    <Button 
                    fullWidth
                    onClick={ () => setCurrentPage('menu') }
                    className={ buttonActive === 'menu' ? classes.buttonActive : classes.button }
                    >
                        <Link href="/menu">
                                Ресторан
                        </Link>
                    </Button>
                    <Button
                    fullWidth
                    onClick={ () => setCurrentPage('contacts') }
                    className={ buttonActive === 'contacts' ? classes.buttonActive : classes.button }
                    >
                        <Link href="/contacts">
                                Контакты
                        </Link>
                    </Button>
                    <Button 
                    fullWidth
                    onClick={ () => setCurrentPage('club') }
                    className={ buttonActive === 'club' ? classes.buttonActive : classes.button }
                    >
                    <Link href="/club">
                            О&nbsp;Клубе
                    </Link>
                    </Button>
            </ButtonGroup>
        </Container>
        </>
    );
}