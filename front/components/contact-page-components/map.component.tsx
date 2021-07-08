import { Container} from '@material-ui/core';
import styles from '../../styles/Map.module.css';

export function MapYand(){
    
    return(
        <Container disableGutters maxWidth={ false } className={ styles }>
            <iframe 
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A34de29e68b2c89ace6a340ed28617ba997e31ca635137b363c0112d736355be9&amp;source=constructor">
            </iframe>
        </Container>
    )
}