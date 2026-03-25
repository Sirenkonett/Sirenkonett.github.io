/**
 * SIRENKONETT PORTFOLIO - JAVASCRIPT
 */

const BIRTH_DATE = '2009-03-13';

function calculateAge(birthDateString) {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function updateAgeDisplay() {
    const ageElement = document.getElementById('ageValue');
    if (ageElement) {
        ageElement.textContent = calculateAge(BIRTH_DATE);
    }
}

function initStarToggle() {
    const toggleButton = document.getElementById('gridToggle');
    const starField = document.getElementById('starField');
    if (!toggleButton || !starField) return;
    
    const starsHidden = localStorage.getItem('starsHidden') === 'true';
    if (starsHidden) {
        starField.classList.add('hidden');
    } else {
        toggleButton.classList.add('active');
    }
    
    toggleButton.addEventListener('click', () => {
        const isHidden = starField.classList.toggle('hidden');
        toggleButton.classList.toggle('active');
        localStorage.setItem('starsHidden', isHidden);
    });
}

function initVideoBackground() {
    const video = document.getElementById('bgVideo');
    if (!video) return;
    video.addEventListener('error', () => {
        console.log('Video background not available');
    });
    const playPromise = video.play();
    if (playPromise !== undefined) {
        playPromise.catch(() => {
            console.log('Video autoplay blocked');
        });
    }
}

function updateFooterYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

function init() {
    updateAgeDisplay();
    initStarToggle();
    initVideoBackground();
    updateFooterYear();
    console.log('%c Sirenkonett Portfolio ', 'background: #fff; color: #000; padding: 4px 8px;');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

window.Sirenkonett = {
    calculateAge,
    getAge: () => calculateAge(BIRTH_DATE),
    toggleStars: () => document.getElementById('gridToggle')?.click(),
    birthDate: BIRTH_DATE
};
