
import styles from './Spinner.module.css'
export const Spinner = () => {
    return (
        <div className={styles.SpinnerParent}>
            <div className={styles.Spinner}></div>
        </div>
    )
}