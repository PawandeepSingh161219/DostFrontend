import { ToastContainer } from 'react-toastify';
import styles from "../loader/loader.module.scss"
export default function Loader({ isLoader }) {
    if (!isLoader) return null;
    return (
        <>
            {/* <ToastContainer position="top-right" /> */}

            <div className={styles.stage}>
                <div className={styles.loaderPulse}>
                    {[...Array(7)].map((_, i) => (
                        <div key={i} className={styles[`pulseBar${i + 1}`]} />
                    ))}
                </div>
            </div>


        </>
    )
}