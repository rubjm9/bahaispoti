import React from 'react';
import styles from './Logo.module.css';

function BahaiSymbol() {
    return (
        <div className={styles.logo}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" className={styles.bahaiSymbol}>
                <title>Símbolo Bahá'í</title>
                
                {/* Fondo con gradiente */}
                <defs>
                    <linearGradient id="symbolBgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor:'#1db954', stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor:'#1ed760', stopOpacity:1}} />
                    </linearGradient>
                    
                    <linearGradient id="symbolStarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor:'#ffffff', stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor:'#f0f0f0', stopOpacity:1}} />
                    </linearGradient>
                </defs>
                
                {/* Círculo de fondo */}
                <circle cx="40" cy="40" r="38" fill="url(#symbolBgGradient)" stroke="#ffffff" strokeWidth="2"/>
                
                {/* Estrella de nueve puntas */}
                <g transform="translate(40, 40)">
                    <path d="M0,-30 L7,-9 L30,-9 L10,2 L17,25 L0,12 L-17,25 L-10,2 L-30,-9 L-7,-9 Z" 
                          fill="url(#symbolStarGradient)" 
                          stroke="#1db954" 
                          strokeWidth="1"/>
                    
                    {/* Círculo central */}
                    <circle cx="0" cy="0" r="7" fill="#1db954"/>
                    
                    {/* Notas musicales */}
                    <g transform="translate(-12, -4)">
                        <ellipse cx="0" cy="0" rx="2.5" ry="2" fill="#ffffff"/>
                        <rect x="-0.8" y="0" width="1.6" height="7" fill="#ffffff"/>
                        <rect x="-2.5" y="5" width="5" height="1" fill="#ffffff"/>
                    </g>
                    
                    <g transform="translate(12, 4)">
                        <ellipse cx="0" cy="0" rx="2.5" ry="2" fill="#ffffff"/>
                        <rect x="-0.8" y="0" width="1.6" height="7" fill="#ffffff"/>
                        <rect x="-2.5" y="5" width="5" height="1" fill="#ffffff"/>
                    </g>
                </g>
            </svg>
        </div>
    );
}

export default BahaiSymbol;
