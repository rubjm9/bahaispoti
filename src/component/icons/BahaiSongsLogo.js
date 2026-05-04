import React from 'react';
import styles from './Logo.module.css';

function BahaiSongsLogo() {
    return (
        <div className={styles.logo}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 80" className={styles.bahaisongsLogo}>
                <title>BahaiSongs</title>
                
                {/* Gradientes */}
                <defs>
                    <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor:'#ffffff', stopOpacity:1}} />
                        <stop offset="30%" style={{stopColor:'#ffffff', stopOpacity:1}} />
                        <stop offset="70%" style={{stopColor:'#1db954', stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor:'#1ed760', stopOpacity:1}} />
                    </linearGradient>
                    
                    <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor:'#1db954', stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor:'#1ed760', stopOpacity:1}} />
                    </linearGradient>
                </defs>
                
                {/* Elemento decorativo minimalista */}
                <g transform="translate(40, 40)">
                    {/* Círculo muy sutil */}
                    <circle cx="0" cy="0" r="30" fill="none" stroke="url(#accentGradient)" strokeWidth="1" opacity="0.3"/>
                    
                    {/* Punto central */}
                    <circle cx="0" cy="0" r="2" fill="url(#accentGradient)" opacity="0.6"/>
                </g>
                
                {/* Título principal - MÁXIMO IMPACTO */}
                <text x="100" y="52" fontFamily="Arial, sans-serif" fontSize="42" fontWeight="900" fill="url(#textGradient)">
                    BahaiSongs
                </text>
                
                {/* Línea decorativa muy sutil */}
                <line x1="100" y1="60" x2="480" y2="60" stroke="url(#accentGradient)" strokeWidth="1" opacity="0.2"/>
            </svg>
        </div>
    );
}

export default BahaiSongsLogo;
