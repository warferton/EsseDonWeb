import Head from 'next/head'
import { SetStateAction, useState, ChangeEvent, useEffect } from 'react';
import { MenuAccordion } from '../../components/menu/menu-accordion.component';
import { EventControlList } from '../../components/admin-components/list-components/event-control-list.component';
import { EventListItemButtons as ListItem } from '../../components/admin-components/list-components/list-item.component';
import { EventFormDialog } from '../../components/admin-components/dialog-components/event-form-dialog.component';
import { Container, Box, Button, Typography, CircularProgress, makeStyles } from '@material-ui/core';
import { ArrowBackIos as ArrowBack } from'@material-ui/icons';

import { fetchAllActiveEventsNoImageData, fetchAllArchivedEvents, validateCurrentClient } from '../../utils/api-utils';
import { IEvent } from '../../types/event/event.type';
import { useRouter } from 'next/router';


const useStyles = makeStyles({
    root: {
        marginTop: '5rem',
        marginBottom: '2rem',
        width: '95%',
    },
    headerContainer: {
        marginBottom: '2rem',
    },
    buttonContainer:{
        marginTop: '4rem',
        padding: '1rem',
    },
    box:{
        backgroundColor: 'white'
    },
    createButton: {
        borderStartEndRadius: 0,    
        borderStartStartRadius: 0,
    },
    button: {
        color: 'white',
        backgroundColor: '#222222',
        "&:hover":{
            backgroundColor: '#000000',
        }
    },
    loaderBox: {
        padding: '7px',
        display:'flex',
        justifyContent: 'center'
    }
  }, { index: 1 });


interface IProps{
    activeEvents: IEvent[];
    archivedEvents: IEvent[];
}

export default function EventControlPage ({ activeEvents, archivedEvents } : IProps) {
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const router = useRouter();
    useEffect(()=> {
        validateCurrentClient().then((res)=> {
            if(!res) {
                router.push('/login');
            }
            else {
                setIsAuthenticated(true);
            }
        }).catch((err)=> {
            console.error(err);
            router.push('/login');
        });
    }, []);

    const classes = useStyles();

    const [expanded, setExpanded] = useState(null);

    const [activeList, setActiveList] = useState(false);

    const [dialogOpen, setDialogOpen] = useState(false);

    const [selectedEvent, setSelectedEvent] = useState(null);
    

    const handleChange = (panel : SetStateAction<string>) => (event: ChangeEvent<{}>, isExpanded : boolean) => {
        setExpanded(isExpanded ? panel : null);
    };
    
    const handleOpen = (event : any) => {
        setSelectedEvent(event);
        setDialogOpen(true);
    }
    
    setTimeout(() => {
        setActiveList(true)
    }, 3000);
    
    if( !isAuthenticated ){
        return <></>;
    }
    else {
        return (
            <>
                <Head>
                    <title>Мероприятия | Админ</title>
                    <meta name="description" content="EsseJazz-Don Admin Controls" />
                    <link rel="canonical" href="https://essedon.ru/admin/events"/>
                    <meta name="theme-color" content="#1a1a1a"/>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <Container className={ classes.root }>
                    <Container className={ classes.headerContainer}>
                        <Typography variant='h4' align='center'>
                            Мероприятия
                        </Typography>
                    </Container>
                        <MenuAccordion 
                            title="Опубликованные"
                            expanded={ expanded === 'active' } 
                            onChange={ handleChange('active') }
                            >
                                { !activeList ? 
                                <Box className={ classes.loaderBox }>
                                    <CircularProgress/>
                                </Box>
                                :
                                <EventControlList childWrapper={ ListItem } controlFunction={ handleOpen }>
                                    {
                                        activeEvents.map((event : IEvent) => event)
                                    }
                                </EventControlList>
                                }
                            </MenuAccordion>

                            <MenuAccordion 
                                title="Архив"
                                expanded={ expanded === 'archive' } 
                                onChange={ handleChange('archive') } 
                            > 
                                { !activeList ? 
                                    <Box className={ classes.loaderBox }>
                                        <CircularProgress/>
                                    </Box>
                                    :
                                    <EventControlList childWrapper={ ListItem } controlFunction={ handleOpen }>
                                        {
                                            archivedEvents.map((event : IEvent) => event)
                                        }
                                    </EventControlList>
                                }
                            </MenuAccordion>
                            <Button 
                            component='button'
                            fullWidth 
                            variant='contained' 
                            className={ `${classes.button} ${classes.createButton}`}
                            onClick={ handleOpen }
                            >
                                <Typography align='center'>
                                    Создать новое мероприятие
                                </Typography>
                            </Button>
                    </Container>
                <Container className={ classes.buttonContainer }>
                    <Button 
                    variant='contained' 
                    href="./" 
                    fullWidth 
                    startIcon={ <ArrowBack/> }
                    className={ classes.button }
                    >
                        <Typography variant='h6'>
                            Назад
                        </Typography>
                    </Button>
                </Container>
                
            <EventFormDialog open={ dialogOpen } setOpen={ setDialogOpen } event={ selectedEvent }/>
            </>
        );
    }
}


export const getServerSideProps = async () => {
    const { generalGroupEvents : activeEvents } = await fetchAllActiveEventsNoImageData();

    const { generalGroupEvents: archivedEvents } = await fetchAllArchivedEvents();
    
    return { 
        props: { 
            activeEvents, 
            archivedEvents
        }
    };
}
