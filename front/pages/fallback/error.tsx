 import { Container, Typography, Button, makeStyles} from'@material-ui/core';
 import { Footer } from '../../components/footer/footer.component';

const useStyles = makeStyles({
    wraper: {
        width: '100%',
        paddingTop: '2rem',
    },
    container: {
        border: '1.5px solid black',
        borderRadius: '13px',
        padding: '1.2rem',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        maxWidth: '95%',
        overflow: 'hidden'
    },
    title: {
        marginBottom: '2rem',
        fontWeight: 200
    },
    button: {
        marginTop: '1.2rem',
        backgroundColor: 'black',
        color: 'white',
        '&:hover': {
            backgroundColor: '#333333',
        }
    }
})

 export default function ErrorPage() {
    
    const classes = useStyles();

     return(
         <div className={ classes.wraper }>
         <Container>
            <Container className={ classes.container }>
                <Typography variant='h3' className={ classes.title }>
                    Произошла ошибка
                </Typography>
                <Typography>
                    Произошла ошибка при попытке загрузки данных с сервера.
                </Typography>
                <Typography>
                    Похоже, что сервер в данный момент не доступен.
                </Typography>
                <Typography>
                    Приносим свои извинения...
                </Typography>
                <Button variant='contained' href='../contacts/' className={ classes.button }>
                    Перейти на страницу контактов
                </Button>
            </Container>
         </Container>
         <Footer position='fixed' />
         </div>
     );
 }

 export const getServerSideProps = async ({ req, res } : any) => {
    res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  return {
    props: {},
  }
 }
