import { Container } from '@material-ui/core';
import Image from 'next/image';
import Link from 'next/link';
import img from '../../public/images/pwa/newLogo.png';
import styles from '../../styles/Header.module.css';

export function LogoHeader(){
    
    return(
        <Link href="/" >
		<Container disableGutters maxWidth={ false } className={ styles.Logo }>
			<Image src={img} height='80vw' width='160' quality={100}/>
		</Container>
	</Link>
    )
}
