import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Typography } from "@material-ui/core";
import React from "react";


interface IProps{
    title: string;
    price: number;
    description?: string;
}


const useStyles = makeStyles((theme) => ({
  root: {
    borderTop: '1.5px solid gray',
    borderBottom: '1.5px solid gray',
    flexDirection: 'row'
  }
}));

export function MenuItem(props : IProps){

    const { title, price, description } = props;

    const classes = useStyles();

    return(
        <Grid container wrap='nowrap' justify='space-between' classes={ classes }>
            <Box>
                <Typography variant='h6'>
                    { title }
                </Typography>
                <Typography color='textSecondary'>
                    { description }
                </Typography>
            </Box>
            <Box>
                <Typography variant='h6'>
                    { price }₽
                </Typography>
            </Box>
        </Grid>
    )
}