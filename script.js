
const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

function say(text, language) {
  if (!('speechSynthesis' in window)) {
    showToast('النطق الصوتي غير مدعوم في هذا المتصفح.');
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language ||
    (/[A-Za-z]/.test(text) ? 'en-US' : 'ar-EG');
  utterance.rate = 0.8;
  window.speechSynthesis.speak(utterance);
}

// نطق الكلمات عند الضغط على أزرارها
document.querySelectorAll('[data-say]').forEach(button => {
  button.addEventListener('click', () => {
    say(button.dataset.say);
  });
});

// قائمة الموقع
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
    });
  });
}

// لعبة عدّ النجوم
document.querySelectorAll('[data-number]').forEach(button => {
  button.addEventListener('click', () => {
    const feedback = document.getElementById('numberFeedback');
    const correct = button.dataset.number === '3';

    if (feedback) {
      feedback.textContent = correct
        ? 'برافو! عدّيتي ٣ نجوم صح! ⭐'
        : 'حاولي تاني، وعدّي النجوم واحدة واحدة.';
    }

    if (correct) say('برافو! ثلاثة نجوم', 'ar-EG');
  });
});

// أزرار الألعاب
const playArea = document.getElementById('playArea');

function openGame(message) {
  if (playArea) {
    playArea.textContent = message;
    playArea.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  } else {
    showToast(message);
  }
}

const letterGame = document.getElementById('startLetterGame');
const numberGame = document.getElementById('startNumberGame');
const shapeGame = document.getElementById('startShapeGame');

if (letterGame) {
  letterGame.addEventListener('click', () => {
    openGame('هيا نتعلم الحروف ونسمع أصواتها! 🔤');
    say('هيا نتعلم الحروف', 'ar-EG');
  });
}

if (numberGame) {
  numberGame.addEventListener('click', () => {
    openGame('هيا نعدّ معًا من واحد إلى عشرة! 🔢');
    say('واحد، اثنان، ثلاثة', 'ar-EG');
  });
}

if (shapeGame) {
  shapeGame.addEventListener('click', () => {
    openGame('هيا نتعلم الأشكال والألوان! 🎨');
    say('دائرة، مثلث، مربع', 'ar-EG');
  });
}

// نطق الحرف أو الكلمة المختارة
const speakLetter = document.getElementById('speakLetter');

if (speakLetter) {
  speakLetter.addEventListener('click', () => {
    const detail = document.getElementById('letterDetail');
    if (detail && detail.textContent.trim()) {
      say(detail.textContent.trim());
    } else {
      showToast('اختاري حرفًا أولًا.');
    }
  });
}

// تنبيه عند غياب تسجيلات القصص
document.querySelectorAll('audio').forEach(player => {
  player.addEventListener('error', () => {
    showToast('التسجيل الصوتي لهذه الحكاية غير متوفر حاليًا.');
  });
});
