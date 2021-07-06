import { useEffect, useRef, useState } from 'react';
import { Container, makeStyles} from '@material-ui/core';
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
    const [lng, setLng] = useState(39.711977);
    const [lat, setLat] = useState(47.227510);
    const [zoom, setZoom] = useState(13);


    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/ivanissimoo/ckqrc4cqu01oj17od1b380ofl',
        center: [lng, lat],
        zoom: zoom, 
        });
    });
/*


        var marker1 = new mapboxgl.Marker()
.setLngLat([12.554729, 55.70651])
.addTo(map);


    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => { 
        var marker = new mapboxgl.Marker()
        .setLngLat([39.711977, 47.227510])
        .addTo(map);
        });
    });*/

    return(

    <div ref={mapContainer} className={classes.mapContainer} />
    /*
        <Container disableGutters maxWidth={ false } className={ styles }>
            <iframe 
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A34de29e68b2c89ace6a340ed28617ba997e31ca635137b363c0112d736355be9&amp;source=constructor">
            </iframe>
        </Container> 
    */
    );
}