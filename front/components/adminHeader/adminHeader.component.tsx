import styles from '../../styles/Header.module.css';

export function AdminHeader () {
    return(
        <div className={ styles.Logo }>
            <h2 className={ styles.BigText }>
                ЭССЄ
            </h2>
            <p className={ styles.SmallText}>
                ADMIN
            </p>
    </div>
    );
}