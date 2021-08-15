import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root:{
        padding: '1rem',
        backgroundColor: 'white',
        borderTop: '0.25rem solid black',
    },
    text: {
        fontSize: '18px',
        lineHeight: '35px',
        fontWeight: 300,
    }
});

export function About() {

    const classes = useStyles();

    return(
        <Box className={ classes.root }>
            <Typography paragraph className={ classes.text }>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, alias tempore accusantium facere officia voluptatum totam nihil fugiat quidem vitae omnis corrupti impedit quam nesciunt dolorem voluptates hic minima architecto. Cum mollitia fuga numquam tempora repellendus nisi eius animi, perspiciatis esse magni consequuntur eaque itaque corporis tempore illum voluptas sit quos veritatis, quo quidem omnis magnam. 
            </Typography>
        </Box>
    )
}