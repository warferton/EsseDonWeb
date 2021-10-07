import { MouseEventHandler } from "react";
import { Modal, CircularProgress, Box, makeStyles } from '@material-ui/core';

interface IProps{
    open: boolean;
    onClick?: MouseEventHandler<HTMLDivElement>
}

const useStyles = makeStyles({
    progressBody: {
        color: 'white',
        scale: 2.35,
    },
    wraper: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        '-moz-transform': 'translate(-50%, -50%)',
        '-webkit-transform': 'translate(-50%, -50%)',
        '-o-transform': 'translate(-50%, -50%)',
        '-ms-transform': 'translate(-50%, -50%)',
    }
})

export function Backdrop(props : IProps) {

    const { open, onClick } = props;
    const classes = useStyles();

    return(
        <Modal
            open={ open }
            onClose={ onClick }
            aria-labelledby="modal-loading-modal"
            aria-describedby="modal-loading-in-progress"
        >
            <Box className={ classes.wraper }>
                <CircularProgress className={ classes.progressBody } thickness={ 1.7 }/>
            </Box>

        </Modal>
    )

}