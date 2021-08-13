import Head from 'next/head'
import { SetStateAction, useState, ChangeEvent } from 'react';
import { AdminHeader } from '../../components/headers/adminHeader.component';
import { MenuAccordion } from '../../components/menu/menu-accordion.component';
import { EventControlList } from '../../components/admin-components/list-components/event-control-list.component';
import { EventListItemChecbox as ListItem} from '../../components/admin-components/list-components/list-item.component';
import { Container, Typography, Button, makeStyles, createStyles, Theme } from '@material-ui/core';
import { ArrowBackIos as ArrowBack } from'@material-ui/icons';
import { motion } from 'framer-motion';

import { fetchAllActiveEvents } from '../../utils/api-utils';
import { IEvent } from '../../types/event';

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
    backButton: {
        color: 'white',
        backgroundColor: '#222222'
    }
}, { index: 1 });


interface IProps{
    mainGroupEvents: IEvent[];
    secondGroupEvents: IEvent[];
    generalGroupEvents: IEvent[];
}

export default function Afisha({ mainGroupEvents, secondGroupEvents, generalGroupEvents } : IProps) {

    const classes = useStyles();

    const [expanded, setExpanded] = useState(null);

    const [activeList, setActiveList] = useState(false);


    const handleChange = (panel : SetStateAction<string>) => (event: ChangeEvent<{}>, isExpanded : boolean) => {
        setExpanded(isExpanded ? panel : null);
    };

    setTimeout(() => {
        setActiveList(true)
    }, 1500);

    return (
        <>
            <Head>
                <title>Афиша | Админ</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <AdminHeader/>

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
                        <Typography variant='h3' align='center'>
                            Афиша
                        </Typography>
                    </Container>
                
                <MenuAccordion 
                    title="Главный блок мероприятий"
                    expanded={ expanded === 'mainBlock' } 
                    onChange={ handleChange('mainBlock') } 
                    className={ classes.accordion }
                    >
                        <EventControlList active={ activeList } childWrapper={ ListItem } controlFunction={ null }>
                           {
                                mainGroupEvents.map( event => event )
                           }
                        </EventControlList>
                    </MenuAccordion>

                    <MenuAccordion 
                    title="Лучшее на этой неделе"
                    expanded={ expanded === 'weekBest' } 
                    onChange={ handleChange('weekBest') } 
                    >
                        <EventControlList active={ activeList } childWrapper={ ListItem } controlFunction={ null }>
                           {
                                secondGroupEvents.map( event => event )
                           }
                        </EventControlList>
                    </MenuAccordion>

                    <MenuAccordion 
                    title="Все мероприятия"
                    expanded={ expanded === 'all' } 
                    onChange={ handleChange('all') } 
                    >
                       <EventControlList active={ activeList } childWrapper={ ListItem } controlFunction={ null }>
                           {
                               const allActiveEvents = generalGroupEvents.concat(mainGroupEvents).concat(secondGroupEvents)
                               allActiveEvents.map( event => event )
                           }
                       </EventControlList>
                    </MenuAccordion>
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
                href='./'
                fullWidth
                className={ classes.backButton }
                startIcon={ <ArrowBack/> }
                >
                    <Typography>
                        Назад
                    </Typography>
                </Button>
            </Container>
        </motion.div>
        </>
    );
}


export const getStaticProps = async () => {

    const {mainGroupEvents, secondGroupEvents, generalGroupEvents} = await fetchAllActiveEvents();
    
    return {
        props: {
            mainGroupEvents: mainGroupEvents,
            secondGroupEvents: secondGroupEvents,
            generalGroupEvents: generalGroupEvents
        }
    };
    
}
