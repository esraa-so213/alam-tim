const toast = document.getElementById('toast');
let toastTimer;
function say(text) {
  if (!('speechSynthesis' in window)) {
    showToast('ميزة نطق الحروف غير مدعومة في هذا المتصفح.');
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = /[A-Za-z]/.test(text) ? 'en-US' : 'ar';
  utterance.rate = 0.78;
  window.speechSynthesis.speak(utterance);
}
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}
document.querySelectorAll('[data-say]').forEach(button => {
  button.addEventListener('click', () => say(button.dataset.say));
});
document.querySelectorAll('[data-count]').forEach(button => {
  button.addEventListener('click', () => {
    const correct = button.dataset.count === '3';
    const feedback = document.getElementById('countFeedback');
    feedback.textContent = correct ? 'برافو! عدّيت ٣ نجوم صح! ⭐' : 'جرّب تاني، وعدّ النجوم واحدة واحدة.';
    feedback.style.color = correct ? '#43865a' : '#d87965';
    if (correct) say('برافو! ثلاثة نجوم');
  });
});
document.getElementById('colorBtn').addEventListener('click', () => {
  const feedback = document.getElementById('shapeFeedback');
  feedback.textContent = 'الدائرة وردية، والمثلث أصفر، والمربع أزرق. 🎨';
  say('دائرة، مثلث، مربع');
});
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));
document.querySelectorAll('audio').forEach(player => {
  player.addEventListener('error', () => showToast('أضيفي التسجيل الصوتي داخل مجلد audio لتشغيل الحكاية.'));
});
