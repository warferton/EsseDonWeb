import { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import ContactIcon from '@material-ui/icons/ContactPhone';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';
import ExploreIcon from '@material-ui/icons/Explore';
import ExploreOffIcon from '@material-ui/icons/ExploreOff';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tooltipStyle: {
        fontSize: 11,
        bottom: 0
    },
    speedDial: {
      position: 'fixed',
      bottom: 30,
      right: 15,
      zIndex: 1000
    },
    backdrop: {
        zIndex: 999,
        backgroundColor: '#11111180'
    },
    speedDialIconed: {
        backgroundColor: '#444444',
    },
    action: {
        marginLeft: '1rem',
    }
  }),
);

const actions = [
  { icon: <MusicNoteIcon />, name: 'Афиша', url: '/' },
  { icon: <RestaurantMenuIcon />, name: 'Ресторан', url: '/menu' },
  { icon: <ContactIcon />, name: 'Контакты', url: '/contacts' },
  { icon: <ImportContactsIcon />, name: 'О Клубе', url: '/club'},
];

export function NavigationFab(props : any) {
  
  const { children } = props;

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Backdrop className={ classes.backdrop }open={ open } />
      <SpeedDial
        ariaLabel="Navigation menu tooltip"
        className={ classes.speedDial }
        icon={ <SpeedDialIcon icon={ <ExploreIcon/> } openIcon={ <ExploreOffIcon /> }/> }  
        FabProps={{
            className:classes.speedDialIconed
        }}
        direction='left'
        onClose={ handleClose }
        onOpen={ handleOpen }
        open={ open }
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={ action.name }
            icon={ action.icon }
            onClick={ handleClose }
            tooltipTitle={ action.name }
            tooltipPlacement='bottom'
            TooltipClasses={{
                tooltipPlacementBottom: classes.tooltipStyle
            }}
            FabProps={{
                size: 'large',
                href: action.url
            }}
            className={ classes.action }
          />
        ))}
      </SpeedDial>
      { children }
    </>
  );
}