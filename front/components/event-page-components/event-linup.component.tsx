import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    headerBox:{
        padding: '0.7rem',
        backgroundColor: 'black',
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
        color: 'black'
    }
});


export function EventLineup() {

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
                        ['Gaol Males', 'Test Pest', 'Ewrq Apege'].map( person => 
                            <Typography key={ person } paragraph className={ classes.lineupText }>
                                { person }
                            </Typography>
                            )
                    }
                
            </Box>
        </>
    )
}