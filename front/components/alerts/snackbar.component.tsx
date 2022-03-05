import { Snackbar as MaterialSnackbar, SnackbarCloseReason } from '@material-ui/core';
import { SyntheticEvent } from 'react';
import { Alert } from './alert.component';


interface IProps {
    children: string;
    open: boolean;
    onClose:(event: SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => void;
    severity?: "default" | "error" | "warning" | "info" | "success" | "secondary";
    vertical?: "top" | "bottom";
    horizontal?: "left" | "center" | "right";
    duration?: number;
}


export function SnackbarAlert(props : IProps) {

    const { children, duration, open, vertical, horizontal, severity, onClose } = props;

    return(
        <MaterialSnackbar 
        open={ open } 
        onClose={ onClose } 
        autoHideDuration={ duration || 3000 } 
        anchorOrigin={{ vertical: vertical || 'top', horizontal: horizontal || 'center' }}>
            <Alert size='large' severity={ severity }>
                { children }
            </Alert>
        </MaterialSnackbar>
    )
}
