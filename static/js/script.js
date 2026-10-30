// ---------- Page navigation ----------
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => { p.classList.remove('active'); p.style.animation = 'none'; });
  const target = document.getElementById(id);
  // force reflow so the page-in animation replays every time
  void target.offsetWidth;
  target.style.animation = '';
  target.classList.add('active');

  document.querySelectorAll('.navlink').forEach(b => b.classList.remove('active'));
  const map = { home: 0, about: 1, teachers: 2, events: 3, contact: 4 };
  if (id in map) { document.querySelectorAll('.navlink')[map[id]].classList.add('active'); }

  // jump straight to the top of the page we just switched to
  window.scrollTo(0, 0);

  document.getElementById('mainNav').classList.remove('open');
  document.getElementById('navActions').classList.remove('open');
  if (id === 'events') { renderEvents(); }
  refreshReveal();
}

// ---------- Scroll-reveal animation ----------
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

function refreshReveal() {
  document.querySelectorAll('.page.active .reveal:not(.in-view)').forEach(el => revealObserver.observe(el));
}
refreshReveal();
function toggleMenu() {
  document.getElementById('mainNav').classList.toggle('open');
  document.getElementById('navActions').classList.toggle('open');
}

// ---------- Auth tabs ----------
function switchAuth(which) {
  document.getElementById('tabSignin').classList.toggle('active', which === 'signin');
  document.getElementById('tabSignup').classList.toggle('active', which === 'signup');
  document.getElementById('signinForm').style.display = which === 'signin' ? 'block' : 'none';
  document.getElementById('signupForm').style.display = which === 'signup' ? 'block' : 'none';
  document.getElementById('authSuccess').classList.remove('show');
  document.getElementById('signinForm').style.display = which === 'signin' ? 'block' : 'none';
  document.getElementById('signupForm').style.display = which === 'signup' ? 'block' : 'none';
}

// ---------- Form submit (front-end preview only) ----------
function handleFormSubmit(e, type) {
  e.preventDefault();
  if (type === 'enquiry') {
    document.getElementById('enquiryForm').style.display = 'none';
    document.getElementById('enquirySuccess').classList.add('show');
  } else {
    document.getElementById('signinForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'none';
    document.querySelector('.toggle-row').style.display = 'none';
    document.getElementById('authSuccess').classList.add('show');
  }
}

// ---------- Events data ----------
const gradients = [
  'linear-gradient(135deg,#2C6E9E,#1B4D73)',
  'linear-gradient(135deg,#7FB8DC,#2C6E9E)',
  'linear-gradient(135deg,#C7A768,#1B4D73)',
  'linear-gradient(135deg,#1B4D73,#0F2F4C)',
  'linear-gradient(135deg,#2C6E9E,#7FB8DC)',
  'linear-gradient(135deg,#0F2F4C,#2C6E9E)'
];
const events = {
  hatha: {
    title: 'Hatha Yoga Foundations', meta: 'Centre · All Levels',
    short: 'A grounded, alignment-focused practice covering core asanas — ideal for building strength, flexibility and body awareness from the ground up.',
    desc: 'Our foundational Hatha Yoga class builds a strong, correct base of practice: breath-led movement, classical asanas and proper alignment, taught patiently for beginners while still challenging regular practitioners. Suitable for all ages and body types.',
    level: 'Beginner – Intermediate', duration: '60 minutes', mode: 'In-Centre', batch: 'Morning & Evening', badge: null, icon: 'lotus'
  },
  pranayama: {
    title: 'Pranayama & Meditation', meta: 'Centre & Online · All Levels',
    short: 'Breathwork and stillness practices to calm the nervous system, sharpen focus and build long-term resilience.',
    desc: 'This session is dedicated to pranayama (breath control) and guided meditation. Students learn breathing techniques for stress relief, focus and energy regulation, followed by seated stillness practice. A calming complement to any physical yoga routine.',
    level: 'All Levels', duration: '45 minutes', mode: 'In-Centre / Online', batch: 'Evening', badge: null, icon: 'breath'
  },
  pregnancy: {
    title: 'Pregnancy Yoga', meta: 'Centre & Online · New Practice',
    short: 'A specially designed, trimester-aware class supporting expecting mothers with safe movement, breath and rest.',
    desc: 'Our newly introduced Pregnancy Yoga programme offers gentle, medically mindful sequences tailored to each trimester — improving comfort, circulation and breath awareness while easing common pregnancy discomforts. Classes run in small groups with close, individual guidance. Please consult your doctor before joining.',
    level: 'Beginner-Friendly', duration: '50 minutes', mode: 'In-Centre / Online', batch: 'Morning', badge: 'New', icon: 'bloom'
  },
  seniors: {
    title: 'Yoga for Seniors', meta: 'Centre · Gentle Practice',
    short: 'Low-impact sequences to support joint mobility, balance and steady breathing for older students.',
    desc: 'A gentle, supportive class designed for senior students — focusing on joint mobility, balance, seated and chair-assisted variations, and calm breathing. The pace is unhurried, with individual modifications offered throughout.',
    level: 'Gentle / Beginner', duration: '45 minutes', mode: 'In-Centre', batch: 'Morning', badge: null, icon: 'circle'
  },
  vinyasa: {
    title: 'Power Vinyasa Flow', meta: 'Centre · Intermediate–Advanced',
    short: 'A dynamic, breath-synchronised flow for students seeking a stronger, more energising practice.',
    desc: 'For students with an established practice, this flow-based class links breath to movement through more dynamic sequences — building strength, stamina and focus. Expect an energising, sweat-inducing session with attentive alignment cues.',
    level: 'Intermediate – Advanced', duration: '60 minutes', mode: 'In-Centre', batch: 'Evening', badge: null, icon: 'flame'
  },
  online: {
    title: 'Online Yoga Sessions', meta: 'Live Online · All Levels',
    short: 'Live-guided sessions streamed for students practising from home, with the same structure and attention.',
    desc: 'Can\'t make it to the centre? Our live online sessions bring the same structured, founder-led teaching to your home mat, with real-time correction and Q&A. A great option for out-of-town or time-constrained students.',
    level: 'All Levels', duration: '50 minutes', mode: 'Online', batch: 'Morning & Evening', badge: null, icon: 'wave'
  }
};

const icons = {
  lotus: '<path d="M50 62c-14 0-22-10-22-22 0-8 6-14 8-19.5.8 5.5 4 8 6.8 5.5-2.7-5.5 0-12.3 7.2-16.5 7.2 4.2 9.9 11 7.2 16.5C60 23 63.2 20.5 64 15c2 5.5 8 11.5 8 19.5 0 12-8 22-22 22z" stroke="white" stroke-width="1.6" fill="none"/><path d="M50 62v10" stroke="white" stroke-width="1.6"/>',
  breath: '<circle cx="50" cy="50" r="9" stroke="white" stroke-width="1.6"/><circle cx="50" cy="50" r="18" stroke="white" stroke-width="1.2" opacity=".6"/><circle cx="50" cy="50" r="27" stroke="white" stroke-width="1" opacity=".35"/>',
  bloom: '<circle cx="50" cy="34" r="9" stroke="white" stroke-width="1.6"/><path d="M35 68c0-13 6-20 15-20s15 7 15 20" stroke="white" stroke-width="1.6" stroke-linecap="round"/>',
  circle: '<circle cx="50" cy="50" r="24" stroke="white" stroke-width="1.6"/><path d="M40 50a10 10 0 1020 0 10 10 0 00-20 0z" stroke="white" stroke-width="1.2"/>',
  flame: '<path d="M50 22c8 12 14 18 14 28a14 14 0 11-28 0c0-5 2-8 4-11 0 5 3 7 5 5-3-6 1-13 5-22z" stroke="white" stroke-width="1.6" fill="none"/>',
  wave: '<path d="M20 45c6-8 12-8 18 0s12 8 18 0 12-8 18 0s12 8 18 0" stroke="white" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M20 60c6-8 12-8 18 0s12 8 18 0 12-8 18 0 12 8 18 0" stroke="white" stroke-width="1.2" opacity=".6" fill="none" stroke-linecap="round"/>'
};

function renderEvents() {
  const grid = document.getElementById('eventGrid');
  if (grid.dataset.rendered) return;
  let i = 0;
  let html = '';
  for (const key in events) {
    const ev = events[key];
    html += `<div class="event-card reveal reveal-${(i % 3) + 1}" onclick="openEvent('${key}')">
        <div class="event-visual" style="background:${gradients[i % gradients.length]}">
          ${ev.badge ? `<span class="ev-badge">${ev.badge}</span>` : ''}
          <svg viewBox="0 0 100 100">${icons[ev.icon]}</svg>
        </div>
        <div class="event-body">
          <div class="meta">${ev.meta}</div>
          <h3>${ev.title}</h3>
          <p>${ev.short}</p>
          <div class="more">View Details →</div>
        </div>
      </div>`;
    i++;
  }
  grid.innerHTML = html;
  grid.dataset.rendered = 'true';
  refreshReveal();
}

function openEvent(key) {
  const ev = events[key];
  const idx = Object.keys(events).indexOf(key);
  document.getElementById('modalVisual').style.background = gradients[idx % gradients.length];
  document.getElementById('modalVisual').innerHTML = `<svg viewBox="0 0 100 100">${icons[ev.icon]}</svg>`;
  document.getElementById('modalMeta').textContent = ev.meta;
  document.getElementById('modalTitle').textContent = ev.title;
  document.getElementById('modalDesc').textContent = ev.desc;
  document.getElementById('modalLevel').textContent = ev.level;
  document.getElementById('modalDuration').textContent = ev.duration;
  document.getElementById('modalMode').textContent = ev.mode;
  document.getElementById('modalBatch').textContent = ev.batch;
  document.getElementById('modalOverlay').classList.add('open');
}
function closeEvent() { document.getElementById('modalOverlay').classList.remove('open'); }
function closeModalOnOverlay(e) { if (e.target.id === 'modalOverlay') closeEvent(); }

// pre-render events grid on load so the Pregnancy Yoga banner button works immediately
renderEvents();
