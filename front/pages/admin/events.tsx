import Head from 'next/head'
import { SetStateAction, useState, ChangeEvent } from 'react';
import { AdminHeader } from '../../components/headers/adminHeader.component';
import { MenuAccordion } from '../../components/menu/menu-accordion.component';
import { EventControlList } from '../../components/admin-components/list-components/event-control-list.component';
import { EventListItemButtons as ListItem } from '../../components/admin-components/list-components/list-item.component';
import { EventFormDialog } from '../../components/dialog-components/event-form-dialog.component';
import { Container, Box, Button, Typography, CircularProgress, makeStyles, Theme } from '@material-ui/core';
import { ArrowBackIos as ArrowBack } from'@material-ui/icons';
import { motion } from 'framer-motion';

import { fetchAllActiveEvents, fetchAllArchivedEvents } from '../../utils/api-utils';

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
        console.log(selectedEvent);
        setDialogOpen(true);
        
    }
    
    setTimeout(() => {
        setActiveList(true)
    }, 3000);
    return (
        <>
            <Head>
                <title>Мероприятия | Админ</title>
                <meta name="description" content="Generated by create next app" />
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
                        expanded={ expanded === 'published' } 
                        onChange={ handleChange('published') } 
                        className={ classes.accordion }
                        >
                            { !activeList ? 
                            <Box className={ classes.loaderBox }>
                                <CircularProgress/>
                            </Box>
                            :
                            <EventControlList active={ activeList } childWrapper={ ListItem } controlFunction={ handleOpen }>
                                {
                                    activeEvents.map((event : IEvent) =>{
                                       return event;
                                    })
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
                                <EventControlList active={ activeList } childWrapper={ ListItem } controlFunction={ handleOpen }>
                                    {
                                        archivedEvents.map((event : IEvent) =>{
                                           return event;
                                        })
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


export const getStaticProps = async () => {
    
    const activeEvents = await fetchAllActiveEvents();
    const archivedEvents = await fetchAllArchivedEvents();
    
    return { 
        props: { 
            activeEvents: activeEvents,
            archivedEvents: archivedEvents
            }
       };
}
