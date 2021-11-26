import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    sectionHeader: {
        fontSize: '24px',
        fontWeight: 500,
        padding: '0.7rem',
        borderTop: '1px solid black',
        borderBottom: '1px solid black',
        textAlign: 'center'
    },
    lineupText: {
        paddingLeft: '1rem',
        paddingRight: '1rem',
        margin:'0.5rem',
        fontSize: '18px',
        lineHeight: '35px',
        fontWeight: 600,
        fontFamily: 'FuturaLight',
    },
    container: {
        backgroundColor: 'white',
        color: 'black',
        paddingBottom: '5px',
    }
});

interface IProps{
    lineup: string[];
}

export function EventLineup({lineup} : IProps) {

    const classes = useStyles();

    return(
        <>
            <Box className={ classes.container}>
                    <Typography variant='h4' className={ classes.sectionHeader }>
                        Состав
                    </Typography>
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