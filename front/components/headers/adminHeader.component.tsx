import { Container, Typography } from '@material-ui/core';

import styles from '../../styles/Header.module.css';

export function AdminHeader () {
    return(
    <Container disableGutters maxWidth={ false } className={ styles.Logo }>
        <Typography variant='h2' className={ styles.BigText }>
            ЭССЕ
        </Typography>
        <Typography className={ styles.SmallText }>
            ADMIN
        </Typography>
    </Container>
    );
}