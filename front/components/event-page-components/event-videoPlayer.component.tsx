import { Box, Typography, makeStyles } from "@material-ui/core";
import ReactPlayer from "react-player";

const useStyles = makeStyles({

    sectionHeader: {
        fontSize: '24px',
        fontWeight: 500,
        padding: '0.7rem',
        borderTop: '1px solid black',
        borderBottom: '1px solid black',
        textAlign: 'center',
    },
    container: {
        backgroundColor: 'white',
        color: 'black',
        paddingBottom: '1rem',
    }
});

interface IProps{
    videoLink: string;
}

export function VideoPlayer({videoLink} : IProps) {

    const classes = useStyles();

    return(
        <>
            <Box className={ classes.container }>
                <Typography variant='h4'className={ classes.sectionHeader }>
                    Видео
                </Typography>
             
                <ReactPlayer
                    height="300px"
                    width="100%"
                    url={videoLink}
                />
            </Box>
        </>
    )
}