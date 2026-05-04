import React, { useState } from 'react';
import * as Icons from '../icons';
import styles from './search-box.module.css';

function SearchBox({ onSearch, value: controlledValue, onChange }) {
    const [internalValue, setInternalValue] = useState('');
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const handleChange = (e) => {
        const newValue = e.target.value;
        if (!isControlled) {
            setInternalValue(newValue);
        }
        if (onChange) {
            onChange(newValue);
        }
        if (onSearch) {
            onSearch(newValue);
        }
    };

    return (
        <div className={styles.SeachBox}>
            <Icons.Search />
            <input 
                placeholder="Artistas, canciones o podcasts" 
                maxLength="80"
                value={value}
                onChange={handleChange}
            />
        </div>
    );
}
  
export default SearchBox;