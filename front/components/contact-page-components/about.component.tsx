import { Link, Box, Typography, makeStyles, IconButton, SvgIcon } from '@material-ui/core';
import { Room, PhoneEnabled, MailRounded, Instagram, Facebook, WhatsApp }from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles({
    root:{
        padding: '1rem',
        backgroundColor: 'white',
        borderTop: '0.25rem solid black',
    },

    heading:{
        fontSize: '24px',
        fontWeight: 'bold',
        paddingTop: '30px',
    },

    text: {
        fontSize: '18px',
        lineHeight: '15px',
        fontWeight: 300,
        }
});

export function AboutContact() {

    const classes = useStyles();

    return(
        <Box className={ classes.root }>
            <Typography variant='h5' paragraph className = {classes.heading }style={
                { 
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                }}
            >
                Адрес
                <Room fontSize='large' viewBox='0 0 28 28'/>
            </Typography>

            <Typography paragraph className = { classes.text }>
                Ростов-на-Дону
            </Typography>

            <Typography paragraph className = { classes.text }>
                Красноармейская 166
            </Typography>


            <Typography variant='h5' paragraph className = {classes.heading } style={
                { 
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                }}
            >
                Телефон
                <PhoneEnabled fontSize='large' viewBox='-5 0 28 28'/>
            </Typography>

            <Typography className = { classes.text }>
                <Link href='tel: +78633104110'> 
                    { '+7 863 310 41 10' }
                </Link>
            </Typography>

            <Typography variant='h5' paragraph className = {classes.heading } style={
                { 
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    paddingBottom: '0rem',
                    marginBottom: '0rem',
                }}
            >
                Соцсети
            </Typography>
            <IconButton style={{paddingLeft: '0rem'}} aria-label="Example" color="inherit" href='https://api.whatsapp.com/send?phone=+79613231879'>
                <WhatsApp fontSize='large' viewBox="0 0 22 22"></WhatsApp>
            </IconButton>
            <IconButton aria-label="Example" color="inherit" href='https://www.instagram.com/essejazzdon/'>
                <Instagram fontSize='large' viewBox="0 0 22 22"></Instagram>
            </IconButton>
            <IconButton aria-label="Example" color="inherit" href='https://www.facebook.com/pg/Essejazzdon/posts/'>
                <Facebook fontSize='large' viewBox="0 0 22 22"></Facebook>
            </IconButton>
            <IconButton aria-label="Example" color="inherit" href='https://vk.com/essejazzdon'>
                <SvgIcon fontSize="large" viewBox="-5 -5 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.37413 3.37413C0 6.74826 0 12.1788 0 23.04V24.96C0 35.8212 0 41.2517 3.37413 44.6259C6.74826 48 12.1788 48 23.04 48H24.96C35.8212 48 41.2517 48 44.6259 44.6259C48 41.2517 48 35.8212 48 24.96V23.04C48 12.1788 48 6.74826 44.6259 3.37413C41.2517 0 35.8212 0 24.96 0H23.04C12.1788 0 6.74826 0 3.37413 3.37413ZM8.10012 14.6001C8.36012 27.0801 14.6001 34.5801 25.5401 34.5801H26.1602V27.4401C30.1802 27.8401 33.22 30.7801 34.44 34.5801H40.1201C38.5601 28.9001 34.4599 25.7601 31.8999 24.5601C34.4599 23.0801 38.0599 19.4801 38.9199 14.6001H33.7598C32.6398 18.5601 29.3202 22.1601 26.1602 22.5001V14.6001H21V28.4401C17.8 27.6401 13.7601 23.7601 13.5801 14.6001H8.10012Z"/>
                </SvgIcon>
            </IconButton>

            <Typography variant='h5' paragraph className = {classes.heading } style={ 
                 { 
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                }}
                >
                    E_mail
                    <MailRounded fontSize='large' viewBox='-5 0 28 28' />
            </Typography>

            <Typography className = { classes.text }>
                По вопросам сотрудничества
            </Typography>

            <Typography paragraph>
                <Link
                style={{
                    fontSize: '18px',
                    lineHeight: '40px',
                }}>
                    {'pr@jazzesse.ru'}
                </Link>
            </Typography>


            <Typography className = { classes.text }>
                По вопросам организации концертов
            </Typography>

            <Typography paragraph>
                <Link
                style={{
                    fontSize: '18px',
                    lineHeight: '40px',
                }}>
                    {'art@jazzesse.ru'}
                </Link>
            </Typography>

            <Typography variant='h5' paragraph className = {classes.heading }>
                Режим Работы:
            </Typography>

            <Typography paragraph className = { classes.text }>
                Пн  Вс  11:00 - 23:00
            </Typography>
        </Box>
    )
}
