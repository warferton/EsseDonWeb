import { Typography, Box, makeStyles } from '@material-ui/core';
import dynamic from 'next/dynamic';
import Image from 'next/dist/client/image';
import STORE_ITEMS from '../../../public/store/front-store-products.json';

const CardSlider = dynamic(() => import('../../cards/slider/card-slider.component').then(mod => mod.CardSlider));
const MenuCard = dynamic(() => import('../../cards/menuCard.component').then(mod => mod.MenuCard));

const useStyles = makeStyles({
    musicBox: {
      marginTop: '1rem',
      marginBottom: '2rem',
      padding: '1rem',
      background: '#222222',
      borderRadius: '15px',
      height: '255px',
      textAlign: 'center',
      '@media (max-width: 1080px)': {
        minWidth: '160px',
        maxHeight: '250px'
      },
    },
    musicImg: {
      maxHeight: '50px',
      margin: '0.3rem',
    },
    title:
    {
      fontSize: '18px',
      fontWeight: 'bold',
      color: 'white',
      marginBottom: '20px'
    }
  });
  
  
export default () => {
    const styles = useStyles();
    return (
    <>
    <Typography variant='h5' style={{ paddingTop: '20px', textAlign: 'left', paddingLeft: '20px'}}>
        Витрина
    </Typography>
    <CardSlider>
        <Box className={ styles.musicBox }>
          <Typography variant="h5" className={ styles.title }>
              Слушать ЭССЕ
          </Typography>
          <div style={{ display: 'flex' }}>
              <div>
              <a href="https://open.spotify.com/playlist/5n1GLlZVUEhcmbiiZ4NDiL?si=a8c356faf642450a">
                  <Image className={ styles.musicImg } src="https://i.imgur.com/wsZUsCH.png" width='50px' height='50px'/>
              </a>
              <a href="https://vk.com/music/playlist/142938351_70496119_c7891009bc970260b3">
                  <Image className={ styles.musicImg } src="https://pngimg.com/uploads/vkontakte/vkontakte_PNG25.png" width='50px' height={'50px'}/>
              </a>
              </div>

              <div>
              <a href="https://soundcloud.com/titi-miti-166363817/sets/mainstream-jazz?si=9ef60d1aaf8e48cda7e4141898fe6b4b&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing">
              <Image className={ styles.musicImg } src="https://pngmind.com/wp-content/uploads/2019/08/Soundcloud-Logo-Png-Transparent-Background.png" width='50px' height='50px'/>
              </a>
              <a href="https://music.yandex.ru/users/ikhozhaynov2/playlists/1012?lang=ru">
              <Image className={ styles.musicImg } src="https://rskrf.ru/upload/iblock/087/08775527999b3625409188704ce7f546.png" width='50px' height='50px'/>
              </a>
              </div>
          </div>
        </Box>
        {STORE_ITEMS.map((item) => (

          <MenuCard image={ item.image } title={ item.title } price={ item.price } key={ item.title }></MenuCard>

        ))}
    </CardSlider>
    </>
    );
}