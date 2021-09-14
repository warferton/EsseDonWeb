import Head from 'next/head'
import { SetStateAction, useState, ChangeEvent, useEffect } from 'react';
import { AdminHeader } from '../../components/headers/adminHeader.component';
import { MenuAccordion } from '../../components/menu/menu-accordion.component';
import { EventControlList } from '../../components/admin-components/list-components/event-control-list.component';
import { EventListItemButtons as ListItem } from '../../components/admin-components/list-components/list-item.component';
import { EventFormDialog } from '../../components/dialog-components/event-form-dialog.component';
import { Container, Box, Button, Typography, CircularProgress, makeStyles } from '@material-ui/core';
import { ArrowBackIos as ArrowBack } from'@material-ui/icons';
import { motion } from 'framer-motion';

import { fetchAllActiveEvents, fetchAllArchivedEvents, validateCurrentClient } from '../../utils/api-utils';
import { IEvent } from '../../types/event/event.type';
import { useRouter } from 'next/router';


const useStyles = makeStyles({
    root: {
        marginTop: '5rem',
        marginBottom: '2rem',
        width: '95%',
    },
    accordion: {
        marginTop: '2rem',
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
        }).catch((err)=> console.error(err));
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
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <AdminHeader />

                <motion.div
                initial={{ 
                    x: '200vw',
                    opacity: 0
                }}
                animate={{ 
                    x: 0,
                    opacity: 100
                }}
                >
                    <Container className={ classes.root }>
                        <Container>
                            <Typography variant='h4' align='center'>
                                Мероприятия
                            </Typography>
                        </Container>
                        
                    
                        <MenuAccordion 
                            title="Опубликованные"
                            expanded={ expanded === 'active' } 
                            onChange={ handleChange('active') } 
                            className={ classes.accordion }
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
                </motion.div>

            <motion.div
                initial={{ 
                    y: '200vw',
                    opacity: 0
                }}
                animate={{ 
                    y: 0,
                    opacity: 100
                }}
                transition={{delay: 0.5, stiffness: 90}}
            >
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
            </motion.div>
                
            <EventFormDialog open={ dialogOpen } setOpen={ setDialogOpen } event={ selectedEvent }/>
            </>
        );
    }
}


export const getServerSideProps = async () => {
    const { mainGroupEvents : activeMain,
            secondGroupEvents : activeSecond, 
            generalGroupEvents : activeGeneral
    } = await fetchAllActiveEvents();

    const { mainGroupEvents : archivedMain ,
            secondGroupEvents : archivedSecond, 
            generalGroupEvents : archivedGeneral
    } = await fetchAllArchivedEvents();
    
    const activeEventsArray = activeMain.concat(activeSecond).concat(activeGeneral);
    const archivedEventsArray = archivedMain.concat(archivedSecond).concat(archivedGeneral);

    return { 
        props: { 
            activeEvents: activeEventsArray, 
            archivedEvents: archivedEventsArray
        }
    };
}
