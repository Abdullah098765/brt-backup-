import { useState, useEffect } from 'react';
import styles from './ToggleButton.module.css';

const ToggleButton = ({ id, label, initialChecked = true, onToggle }) => {
    const [isChecked, setIsChecked] = useState(initialChecked);

    useEffect(() => {
      
        setIsChecked(initialChecked);
    }, [initialChecked]);

    const handleToggle = () => {
        const newState = !isChecked;
        setIsChecked(newState);
        onToggle && onToggle(newState);
    };

    return (
        <div className={`${styles.toggleButton} ${styles.r}`} id={`button-${id}`}>
            <input
                type="checkbox"
                className={styles.checkbox}
                checked={isChecked}
                onChange={handleToggle}
            />
            <div className={styles.knobs}></div>
            <div className={styles.layer}></div>
        </div>
    );
};

export default ToggleButton;
