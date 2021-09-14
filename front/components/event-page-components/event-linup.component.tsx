import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    headerBox:{
        padding: '0.7rem',
        backgroundColor: '#222222',
        color: 'white'
    },
    sectionHeader: {
        fontSize: '24px',
        fontWeight: 700,
    },
    lineupText: {
        fontSize: '18px',
        lineHeight: '35px',
        fontWeight: 300,
    },
    container: {
        padding: '1.2rem',
        backgroundColor: 'white',
        color: '#222222'
    }
});

interface IProps{
    lineup: string[];
}

export function EventLineup({lineup} : IProps) {

    const classes = useStyles();

    return(
        <>
            <Box className={ classes.headerBox }>
                <Typography className={ classes.sectionHeader }>
                    Состав
                </Typography>
            </Box>
            <Box className={ classes.container}>
                    { 
                        lineup.map( person => 
                            <Typography key={ person } paragraph className={ classes.lineupText }>
                                { person }
                            </Typography>
                        )
                    }
            </Box>
        </>
    )
}