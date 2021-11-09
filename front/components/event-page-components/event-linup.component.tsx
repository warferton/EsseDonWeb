import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    sectionHeader: {
        fontSize: '24px',
        fontWeight: 500,
        padding: '0.7rem',
        borderTop: '1px solid black',
        borderBottom: '1px solid black',
    },
    lineupText: {
        paddingLeft: '1rem',
        paddingRight: '1rem',
        margin:'0.5rem',
        fontSize: '20px',
        lineHeight: '35px',
        fontWeight: 300,
    },
    container: {
        paddingBottom: '1rem',
        backgroundColor: 'white',
        color: 'black'
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