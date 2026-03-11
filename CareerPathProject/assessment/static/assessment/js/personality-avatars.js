// Personality Type Avatar SVGs
const personalityAvatars = {
    INTJ: `<svg viewBox="0 0 100 100" class="personality-avatar">
        <circle cx="50" cy="50" r="45" fill="#9b59b6" opacity="0.1"/>
        <circle cx="50" cy="40" r="20" fill="#FFF6CC"/>
        <path d="M 35 35 Q 35 25 50 25 Q 65 25 65 35" fill="#111111"/>
        <circle cx="43" cy="38" r="3" fill="#111111"/>
        <circle cx="57" cy="38" r="3" fill="#111111"/>
        <path d="M 43 45 Q 50 48 57 45" stroke="#111111" stroke-width="2" fill="none"/>
        <rect x="30" y="60" width="40" height="35" rx="8" fill="#9b59b6"/>
        <path d="M 40 70 L 45 75 L 55 65" stroke="#ffffff" stroke-width="2" fill="none"/>
    </svg>`,
    
    INTP: `<svg viewBox="0 0 100 100" class="personality-avatar">
        <circle cx="50" cy="50" r="45" fill="#8e44ad" opacity="0.1"/>
        <circle cx="50" cy="40" r="20" fill="#FFF6CC"/>
        <rect x="35" y="28" width="30" height="4" rx="2" fill="#111111"/>
        <circle cx="43" cy="38" r="3" fill="#111111"/>
        <circle cx="57" cy="38" r="3" fill="#111111"/>
        <circle cx="50" cy="50" r="15" fill="#8e44ad" opacity="0.3"/>
        <rect x="30" y="60" width="40" height="35" rx="8" fill="#8e44ad"/>
        <circle cx="45" cy="75" r="3" fill="#ffffff"/>
        <circle cx="55" cy="75" r="3" fill="#ffffff"/>
    </svg>`,
    
    ENTJ: `<svg viewBox="0 0 100 100" class="personality-avatar">
        <circle cx="50" cy="50" r="45" fill="#9b59b6" opacity="0.1"/>
        <circle cx="50" cy="40" r="20" fill="#FFF6CC"/>
        <path d="M 35 33 Q 35 23 50 22 Q 65 23 65 33" fill="#111111"/>
        <circle cx="43" cy="38" r="3" fill="#111111"/>
        <circle cx="57" cy="38" r="3" fill="#111111"/>
        <path d="M 43 46 Q 50 49 57 46" stroke="#111111" stroke-width="2" fill="none"/>
        <rect x="30" y="60" width="40" height="35" rx="8" fill="#9b59b6"/>
        <rect x="35" y="68" width="8" height="3" rx="1" fill="#FFD84D"/>
        <rect x="35" y="73" width="8" height="3" rx="1" fill="#FFD84D"/>
        <path d="M 45 35 L 48 38 L 52 34" stroke="#FFD84D" stroke-width="2" fill="none"/>
    </svg>`,
    
    ENTP: `<svg viewBox="0 0 100 100" class="personality-avatar">
        <circle cx="50" cy="50" r="45" fill="#8e44ad" opacity="0.1"/>
        <circle cx="50" cy="40" r="20" fill="#FFF6CC"/>
        <path d="M 33 32 Q 33 22 50 20 Q 67 22 67 32 Q 64 26 57 24 Q 50 23 43 24 Q 36 26 33 32" fill="#e67e22"/>
        <circle cx="43" cy="38" r="3" fill="#111111"/>
        <circle cx="57" cy="38" r="3" fill="#111111"/>
        <path d="M 43 46 Q 50 50 57 46" stroke="#111111" stroke-width="2" fill="none"/>
        <rect x="30" y="60" width="40" height="35" rx="8" fill="#8e44ad"/>
        <circle cx="40" cy="72" r="4" fill="#FFD84D"/>
        <circle cx="60" cy="72" r="4" fill="#FFD84D"/>
    </svg>`,
    
    INFJ: `<svg viewBox="0 0 100 100" class="personality-avatar">
        <circle cx="50" cy="50" r="45" fill="#3498db" opacity="0.1"/>
        <circle cx="50" cy="40" r="20" fill="#FFF6CC"/>
        <path d="M 32 33 Q 32 20 50 18 Q 68 20 68 33 Q 65 24 57 21 Q 50 19 43 21 Q 35 24 32 33" fill="#8e44ad"/>
        <circle cx="43" cy="38" r="3" fill="#111111"/>
        <circle cx="57" cy="38" r="3" fill="#111111"/>
        <path d="M 43 46 Q 50 49 57 46" stroke="#111111" stroke-width="2" fill="none"/>
        <rect x="30" y="60" width="40" height="35" rx="8" fill="#3498db"/>
        <path d="M 45 70 L 48 73 L 55 66" stroke="#ffffff" stroke-width="2" fill="none"/>
    </svg>`,
    
    INFP: `<svg viewBox="0 0 100 100" class="personality-avatar">
        <circle cx="50" cy="50" r="45" fill="#2980b9" opacity="0.1"/>
        <circle cx="50" cy="40" r="20" fill="#FFF6CC"/>
        <path d="M 33 32 Q 33 22 50 20 Q 67 22 67 32 Q 64 26 57 24 Q 50 23 43 24 Q 36 26 33 32" fill="#e67e22"/>
        <circle cx="43" cy="38" r="3" fill="#111111"/>
        <circle cx="57" cy="38" r="3" fill="#111111"/>
        <circle cx="44" cy="36" r="1.5" fill="#ffffff"/>
        <circle cx="58" cy="36" r="1.5" fill="#ffffff"/>
        <path d="M 43 46 Q 50 50 57 46" stroke="#111111" stroke-width="2" fill="none"/>
        <rect x="30" y="60" width="40" height="35" rx="8" fill="#2980b9"/>
        <circle cx="50" cy="75" r="8" fill="#FFD84D" opacity="0.5"/>
    </svg>`,
    
    ENFJ: `<svg viewBox="0 0 100 100" class="personality-avatar">
        <circle cx="50" cy="50" r="45" fill="#3498db" opacity="0.1"/>
        <circle cx="50" cy="40" r="20" fill="#FFF6CC"/>
        <path d="M 33 30 Q 33 20 50 18 Q 67 20 67 30" fill="#111111"/>
        <circle cx="43" cy="38" r="3" fill="#111111"/>
        <circle cx="57" cy="38" r="3" fill="#111111"/>
        <path d="M 40 46 Q 50 52 60 46" stroke="#111111" stroke-width="2" fill="none"/>
        <rect x="30" y="60" width="40" height="35" rx="8" fill="#3498db"/>
        <path d="M 45 28 L 48 32 L 52 28" stroke="#FFD84D" stroke-width="2" fill="none"/>
        <circle cx="35" cy="50" r="5" fill="#FFD84D" opacity="0.5"/>
        <circle cx="65" cy="50" r="5" fill="#FFD84D" opacity="0.5"/>
    </svg>`,
    
    ENFP: `<svg viewBox="0 0 100 100" class="personality-avatar">
        <circle cx="50" cy="50" r="45" fill="#2980b9" opacity="0.1"/>
        <circle cx="50" cy="40" r="20" fill="#FFF6CC"/>
        <path d="M 30 30 Q 30 18 50 16 Q 70 18 70 30 Q 67 22 58 19 Q 50 17 42 19 Q 33 22 30 30" fill="#f39c12"/>
        <circle cx="43" cy="38" r="3" fill="#111111"/>
        <circle cx="57" cy="38" r="3" fill="#111111"/>
        <circle cx="44" cy="36" r="1.5" fill="#ffffff"/>
        <circle cx="58" cy="36" r="1.5" fill="#ffffff"/>
        <path d="M 40 46 Q 50 52 60 46" stroke="#111111" stroke-width="2" fill="none"/>
        <rect x="30" y="60" width="40" height="35" rx="8" fill="#2980b9"/>
        <path d="M 42 28 L 45 32 L 48 28 M 52 28 L 55 32 L 58 28" stroke="#FFD84D" stroke-width="2" fill="none"/>
    </svg>`
};

// Add more types as needed
