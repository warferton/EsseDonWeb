import { Dispatch, forwardRef } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { CreateEventForm } from './new-event-form.component';
import { IEvent } from '../../types/event/event.type';


interface IProps{
  event: IEvent;
  open: boolean;
  setOpen: Dispatch<boolean>;
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
      backgroundColor: '#222222'
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  }),
);

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) 
{
  return <Slide direction="up" ref={ ref } { ...props } />;
});

export function EventFormDialog(props : IProps) {
  
  const { open, setOpen, event } = props;

  const isUpdate =  event?._id !== undefined;

  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog fullScreen open={ open } onClose={ handleClose } TransitionComponent={ Transition }>
        <AppBar className={ classes.appBar }>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={ handleClose } aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={ classes.title }>

              { isUpdate ?
                            'Изменить Мероприятие'
                            :
                            'Новое Мероприятие'
                        }
            
            </Typography>
          </Toolbar>
        </AppBar>
            
            <CreateEventForm event={ event } isUpdate={ isUpdate }/>

      </Dialog>
    </>
  );
}