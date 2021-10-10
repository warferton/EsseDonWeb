import { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '0rem',
  },
  stepper: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
}));

export function SwipeableStepper(props: any) {

  const { children } = props;

  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = children?.length;

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >

        { children }

      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={ maxSteps }
        position="static"
        variant="dots"
        activeStep={ activeStep }
        nextButton={ null }
        backButton={ null } 
        className={ classes.stepper }
      />
    </div>
  );
}