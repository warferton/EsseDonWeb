import { useState, useEffect } from 'react';
import { Container, ButtonGroup, Button, makeStyles, Box, ClickAwayListener } from '@material-ui/core';
import router from 'next/router';

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
        boxShadow: '0px 0px 3px #404040',
        zIndex: 100000,
        backgroundColor: '#FFFFFF',
    },
    buttonGroup: {
        fontWeight: 600,
        width: '100%',
        height: '100%',
        display: 'flex',
        borderRadius: 0,
    },
    button: {
        padding: 0,
        color: '#FFFFFF',
        backgroundColor: '#000000',
        transition: '0.3s linear',
        fontFamily: 'Jazz',
        '&:hover': {
            color: '#000000',
        },
        borderRadius: 0,
        '@media (max-width: 350px)': {
            fontSize: 11,
        },
        '@media (min-width: 375px)': {
            fontSize: 14,
        },
        '@media (min-width: 1000px)': {
            fontSize: 18,
        },
        '@media (min-width: 1800px)': {
            fontSize: 22,
        },
    },
    dropdownBox: {
        background: 'white',
        position: 'absolute',
        bottom: '10vh',
        left: 0,
        width: '100%',
        border: '1.5px solid black',
    },
    popUpButton: {
        minHeight: '7vh',
        maxWidth: '100%',
    },
    buttonActive: {
        color: '#000000',
        backgroundColor: '#FFFFFF',
        transition: '0.15s linear',
        size: 1.1,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        '@media (max-width: 350px)': {
            fontSize: 11,
        },
        '@media (min-width: 375px)': {
            fontSize: 14,
        },
        '@media (min-width: 1000px)': {
            fontSize: 18,
        },
        '@media (min-width: 1800px)': {
            fontSize: 22,
        },
    },
    buttonWrapper: {
        width: '100%',
        height: '100%',
        padding: '2.5vh'
    }
});

export function NavigationSelector(props : any) {

    const { children } = props;

    const classes = useStyles();
    
    const [buttonActive, setButtonActive] = useState('');

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const setCurrentPage = (pageName: string) => {
        setButtonActive(pageName);
        localStorage.setItem("EsseCurentPageName", pageName);
    }

    const handleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
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
                href="/"
                onClick={ () => setCurrentPage('afisha') }
                className={ buttonActive === 'afisha' ? classes.buttonActive : classes.button }
                >
                    Афиша
                </Button>

                <Button 
                fullWidth              
                onClick={ () => {setCurrentPage('menu'); router.push('/menu') }}
                className={ buttonActive === 'menu' ? classes.buttonActive : classes.button }
                >
                    Ресторан
                </Button>

                    <Button 
                    fullWidth
                    onClick={ () => { handleDropdown() }}
                    className={ classes.button }
                    id="club-button"
                    >
                    <ClickAwayListener 
                        mouseEvent="onMouseDown"
                        touchEvent="onTouchStart"
                        onClickAway={ () => setDropdownOpen( false ) }> 
                        <div className={ classes.buttonWrapper }>
                            Клуб

                            { isDropdownOpen ?
                            <Box className={ classes.dropdownBox }>
                                <Button 
                                fullWidth
                                href='/club'
                                onClick={ () => setCurrentPage('club')}
                                className={ (buttonActive === 'club' ? classes.buttonActive : classes.button).concat(' ').concat( classes.popUpButton )  }
                                >
                                    О клубе
                                </Button>
                                <Button 
                                fullWidth
                                href='/open-space'
                                onClick={ () => setCurrentPage('open-space')}
                                className={ (buttonActive === 'open-space' ? classes.buttonActive : classes.button).concat(' ').concat( classes.popUpButton )  }
                                >
                                    Open Space
                                </Button>
                            </Box>
                        : 
                            <></> 
                        }
                        </div>
                    </ClickAwayListener>
                </Button>

                <Button
                fullWidth
                href='/contacts'
                onClick={ () => setCurrentPage('contacts') }
                className={ buttonActive === 'contacts' ? classes.buttonActive : classes.button }
                >
                    Контакты
                </Button>
                    
            </ButtonGroup>
        </Container>
        </>
    );
}