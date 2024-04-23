import styles from './BackButton.module.css'

import { Link } from 'react-router-dom';

// For Icon
import { FaBackwardFast } from "react-icons/fa6";


const BackButton = () => {
    return (
        <Link to={"/"}>
            <div className={styles.BackButton}>
                <FaBackwardFast />
            </div>
        </Link>
    )
}

export default BackButton