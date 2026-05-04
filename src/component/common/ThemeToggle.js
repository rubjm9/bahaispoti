import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, selectTheme } from '../../store/slices/themeSlice';
import IconButton from '../buttons/icon-button';
import * as Icons from '../icons';
import styles from './ThemeToggle.module.css';

function ThemeToggle() {
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);

    const handleToggle = () => {
        dispatch(toggleTheme());
    };

    return (
        <IconButton
            icon={theme === 'dark' ? <Icons.Sun /> : <Icons.Moon />}
            onClick={handleToggle}
            className={styles.themeToggle}
            aria-label={theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'}
            title={theme === 'dark' ? 'Tema claro' : 'Tema oscuro'}
        />
    );
}

export default ThemeToggle;
