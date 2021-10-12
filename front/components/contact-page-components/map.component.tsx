import { useEffect, useRef } from 'react';
import {makeStyles} from '@material-ui/core';
import mapboxgl from 'mapbox-gl';


mapboxgl.accessToken = 'pk.eyJ1IjoiaXZhbmlzc2ltb28iLCJhIjoiY2tidmJmNjkyMDBrMDJzcWUybmdndGs1dCJ9.LXSDnZPAPYD7ktCnzMB1nQ'; 

const useStyles = makeStyles({
    mapContainer:{
        width: '100%',
        height: '400px',
    }
});

export function MapBox(){

    const classes = useStyles();

    const mapContainer = useRef(null);
    const map = useRef(null);

    const lng = 39.711977;
    const lat = 47.227510;
    const zoom = 13;


    useEffect(() => {
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/ivanissimoo/ckqrc4cqu01oj17od1b380ofl',
        center: [lng, lat],
        zoom: zoom, 
        });
    }, []);

    return(

        <div ref={mapContainer} className={classes.mapContainer} />

    ); 
} 