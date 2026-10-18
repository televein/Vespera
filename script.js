// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  })
);

// Enquiry form: checks the fields, then opens the visitor's email app
// with the message addressed to Vespera (no server needed).
const TO = 'vespera.televein@gmail.com';
const form = document.getElementById('enquiry');
const msg = form.querySelector('.form-msg');

form.addEventListener('submit', e => {
  e.preventDefault();
  msg.className = 'form-msg';
  let firstBad = null;

  form.querySelectorAll('[required]').forEach(f => {
    const bad = !f.value.trim() || (f.type === 'email' && !/^\S+@\S+\.\S+$/.test(f.value));
    f.setAttribute('aria-invalid', bad);
    if (bad && !firstBad) firstBad = f;
  });

  if (firstBad) {
    msg.textContent = 'Please fill in the highlighted fields with valid details.';
    firstBad.focus();
    return;
  }

  const d = Object.fromEntries(new FormData(form));
  const subject = `Export enquiry from ${d.name}${d.company ? ' (' + d.company + ')' : ''}`;
  const body = [
    `Name: ${d.name}`,
    `Company: ${d.company || '-'}`,
    `Country: ${d.country}`,
    `Email: ${d.email}`,
    '',
    d.message
  ].join('\n');

  window.location.href =
    `mailto:${TO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  msg.classList.add('ok');
  msg.textContent = 'Your email app should open with the enquiry ready to send.';
});
