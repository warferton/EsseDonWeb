import { useState, useEffect, useRef } from 'react';
import { Container, ButtonGroup, Button, makeStyles, Box } from '@material-ui/core';

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
        left: '50%',
        width: '28%',
    },
    dropdownButton: {
        padding: 0,
        height: '7vh',
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
});

export function NavigationSelector(props : any) {

    const ref = useRef()

    const { children } = props;

    const classes = useStyles();
    
    const [buttonActive, setButtonActive] = useState('');

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const [open, setOpen] = useState(false);

    const setCurrentPage = (pageName: string) => {
        setButtonActive(pageName);
        localStorage.setItem("EsseCurentPageName", pageName);
    }

     useEffect(() => {
        const currentPageName = localStorage.getItem("EsseCurentPageName");
        setButtonActive(currentPageName);


        const checkIfClickedOutside = e => {

            if (isDropdownOpen && ref.current && !ref.current.contains(e.target)) {
                setDropdownOpen(false)
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }

    }, [isDropdownOpen]);


    return(
        <>
            { children }
        <Container className={ classes.root } ref={ref}>
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
                    href='/menu'
                    onClick={() => setOpen(!open)}
                    className={ buttonActive === 'menu' ? classes.buttonActive : classes.button }
                    >
                        Ресторан
                    </Button>

                    <Button 
                    fullWidth
                    onClick={ () => setDropdownOpen(oldState => !oldState)}
                    className={ classes.button }
                    id = "club-button"
                    >
                        Клуб
                    </Button>

                    {isDropdownOpen && <Box className={ classes.dropdownBox }>
                        <Button 
                        fullWidth
                        href='/club'
                        onClick={() => setOpen(!open)}
                        className={ buttonActive === 'club' ? classes.buttonActive : classes.dropdownButton }
                        >
                            О клубе
                        </Button>
                        <Button 
                        fullWidth
                        href='/open-space'
                        onClick={() => setOpen(!open)}
                        className={ buttonActive === 'open-space' ? classes.buttonActive : classes.dropdownButton }
                        >
                            Open Space
                        </Button>
                    </Box>}

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