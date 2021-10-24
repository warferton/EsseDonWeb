import { Box, Typography, makeStyles } from "@material-ui/core";
import { TheatersOutlined }from '@material-ui/icons';
import ReactPlayer from "react-player";

const useStyles = makeStyles({
    headerBox:{
        backgroundColor: 'white',
        color: 'black',
        borderTop: '1px solid black',
    },
    container: {
        paddingBottom: '2rem',
        backgroundColor: 'white',
        color: 'black'
    },
    sectionHeader: {
        paddingTop: '0.2rem',
        paddingLeft: '1.4rem',
        paddingBottom: '0.7rem',
        fontSize: '24px',
        fontWeight: 'bold',
    },
});

interface IProps{
    videoLink: string;
}

export function VideoPlayer({videoLink} : IProps) {

    const classes = useStyles();

    return(
        <>
            <Box className={ classes.headerBox }>
                <Typography className={ classes.sectionHeader}>
                    Видео
                    <TheatersOutlined fontSize='large' style={{position: 'relative', top: '10px'}}/>
                </Typography>
                
            </Box> 
            <Box className={ classes.container}>
                <ReactPlayer
                    height="200px"
                    width="100%"
                    url={videoLink}
                />
            </Box>
        </>
    )
}