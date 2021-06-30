import styles from '../../styles/Footer.module.css';

export function Footer() {
    return(
        <div className = { styles.footerBackground }>
            <p className = { styles.infoText }>
                Ростов-на-Дону
                <br />Красноармейская 166
                ‎<br />+7 863-310-41-10
            </p>
            <h1 className = { styles.motoText}>
                Jazz lives here<span className = { styles.motoDot}>.</span>
            </h1>
        </div>
    );
}