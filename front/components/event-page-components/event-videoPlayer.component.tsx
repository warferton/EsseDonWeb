import { Box, Typography, makeStyles } from "@material-ui/core";
import ReactPlayer from "react-player";

const useStyles = makeStyles({
    headerBox:{
        padding: '0.7rem',
        backgroundColor: '#222222',
        color: 'white'
    },
    container: {
        padding: '0rem',
        paddingBottom: '2rem',
        backgroundColor: 'white',
        color: 'black'
    }
});

interface IProps{
    videoLink: string;
}

export function VideoPlayer({videoLink} : IProps) {

    const classes = useStyles();

    return(
        <>
            <Box className={ classes.headerBox }>
                <Typography variant = 'h6'>
                    Видео
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