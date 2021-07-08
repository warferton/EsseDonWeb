import { Container, Typography,ButtonGroup, Button, makeStyles } from '@material-ui/core';


const useStyles = makeStyles({
    root:{
        margin: 'auto',
        marginTop: '2rem',
        backgroundColor: 'white',
        borderRadius: '5px',
        boxShadow:'0px 6px 5px grey',
    },
    text: {
<<<<<<< HEAD
        padding: '20px',
=======
        padding: '10px',
>>>>>>> develop
        margin: 'auto',
        marginTop:'1rem',
        textAlign: 'center',
    },
    buttonGroup: {
        marginTop: '2rem',
        marginBottom: '2rem',
    }
})


export function AdminMenu(){

    const classes = useStyles();

    return(
        <Container maxWidth='md' className={ classes.root }>
            <ButtonGroup orientation="vertical" fullWidth className={ classes.buttonGroup } variant="text">
<<<<<<< HEAD
                <Button href="admin/kitchen-bar">
=======
                <Button>
>>>>>>> develop
                    <Typography variant='h4' className={ classes.text }>
                        Меню
                    </Typography>
                </Button>
<<<<<<< HEAD
                <Button href="admin/afisha">
=======
                <Button>
>>>>>>> develop
                    <Typography variant='h4' className={ classes.text }>
                        Афиша
                    </Typography>
                </Button>
<<<<<<< HEAD
                <Button href="admin/events">
=======
                <Button>
>>>>>>> develop
                    <Typography variant='h4' className={ classes.text }>
                        Мероприятия
                    </Typography>
                </Button>
            </ButtonGroup>
        </Container>
    )
}