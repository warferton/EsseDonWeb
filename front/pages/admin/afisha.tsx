import Head from 'next/head'
import { useRouter } from 'next/router';
import { SetStateAction, useState, ChangeEvent, useEffect } from 'react';
import { MenuAccordion } from '../../components/menu/menu-accordion.component';
import { EventControlList } from '../../components/admin-components/list-components/event-control-list.component';
import { EventListItemSelector as ListItem} from '../../components/admin-components/list-components/list-item.component';
import { Container, Typography, Button, makeStyles } from '@material-ui/core';
import { ArrowBackIos as ArrowBack } from'@material-ui/icons';
import { motion } from 'framer-motion';

import { fetchAllActiveEventsNoImageData, validateCurrentClient } from '../../utils/api-utils';
import { IEvent } from '../../types/event/event.type';

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

    const handleChange = (panel : SetStateAction<string>) => (event: ChangeEvent<{}>, isExpanded : boolean) => {
        setExpanded(isExpanded ? panel : null);
    };

    if( !isAuthenticated ){
        return <></>;
    }
    else {
        return (
            <>
                <Head>
                    <title>Афиша | Админ</title>
                    <meta name="description" content="EsseJazz-Don Admin Controls" />
                    <link rel="canonical" href="https://esse-jazz-don.ru/admin/afisha"/>
                    <meta name="theme-color" content="#1a1a1a"/>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

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
                            <EventControlList childWrapper={ ListItem } controlFunction={ null }>
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
                            <EventControlList childWrapper={ ListItem } controlFunction={ null }>
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
                        <EventControlList childWrapper={ ListItem } controlFunction={ null }>
                            {
                                generalGroupEvents.map( event => event )
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
}


export const getServerSideProps = async () => {
    const activeEvents = await fetchAllActiveEventsNoImageData();
    
    return {
        props: { ...activeEvents },
    };
}
