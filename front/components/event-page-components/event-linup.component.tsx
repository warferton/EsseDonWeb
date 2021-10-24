import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    sectionHeader: {
        fontSize: '24px',
        fontWeight: 500,
        paddingBottom: '0.7rem',
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

interface IProps{
    lineup: string[];
}

export function EventLineup({lineup} : IProps) {

    const classes = useStyles();

    return(
        <>
            <Box className={ classes.container}>
                    <Typography className={ classes.sectionHeader }>
                        Состав:
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