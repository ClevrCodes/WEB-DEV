const topicData = {
  academic: {
    value: 74,
    label: 'Academic pressure',
    message: 'Exams, assignments, and the fear of not meeting expectations keep piling up without a clear pause.'
  },
  social: {
    value: 62,
    label: 'Social expectations',
    message: 'Every comparison feels louder when you are trying to belong while still figuring yourself out.'
  },
  self: {
    value: 81,
    label: 'Self-doubt',
    message: 'Perfectionism and uncertainty can make every task feel heavier than it needs to be.'
  },
  time: {
    value: 88,
    label: 'Time pressure',
    message: 'Late nights and endless deadlines can leave you exhausted long before the work is done.'
  }
};

const pressureRing = document.querySelector('.pressure-ring');
const pressureValue = document.getElementById('pressureValue');
const pressureTag = document.getElementById('pressureTag');
const pressureSummary = document.getElementById('pressureSummary');
const pressureButtons = document.querySelectorAll('.pressure-item');

function setPressureTopic(topic) {
  const data = topicData[topic];
  if (!data) return;

  pressureButtons.forEach((button) => {
    const isActive = button.dataset.topic === topic;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  pressureRing.style.background = `conic-gradient(var(--red) 0 ${data.value}%, rgba(255,255,255,0.08) ${data.value}% 100%)`;
  pressureValue.textContent = `${data.value}%`;
  pressureTag.textContent = data.label;
  pressureSummary.textContent = data.message;
}

pressureButtons.forEach((button) => {
  button.addEventListener('click', () => setPressureTopic(button.dataset.topic));
});

setPressureTopic('academic');

const expectationPanels = document.querySelectorAll('.expectation-panel');
expectationPanels.forEach((panel) => {
  const button = panel.querySelector('button');
  button.addEventListener('click', () => {
    const isOpen = panel.classList.contains('is-open');

    expectationPanels.forEach((item) => {
      item.classList.remove('is-open');
      item.querySelector('button').setAttribute('aria-expanded', 'false');
      item.querySelector('button').textContent = '+';
    });

    if (!isOpen) {
      panel.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
      button.textContent = '−';
    }
  });
});

const intro = document.getElementById('intro');
const introButton = document.querySelector('.intro-btn');
const skipIntroButton = document.querySelector('.skip-intro');
const mainContent = document.getElementById('main-content');

function closeIntro() {
  intro.classList.add('is-hidden');
  mainContent.setAttribute('tabindex', '-1');
  mainContent.focus({ preventScroll: true });
}

let introTimer = window.setTimeout(closeIntro, 4200);

introButton.addEventListener('click', () => {
  window.clearTimeout(introTimer);
  closeIntro();
});

skipIntroButton.addEventListener('click', () => {
  window.clearTimeout(introTimer);
  closeIntro();
});

const splitVisual = document.querySelector('.mask-visual');
const splitSlider = document.querySelector('.split-slider');

function updateSplit(value) {
  splitVisual.style.setProperty('--split', `${value}%`);
}

if (splitSlider) {
  updateSplit(splitSlider.value);
  splitSlider.addEventListener('input', (event) => {
    updateSplit(event.target.value);
  });
}

if (splitVisual) {
  splitVisual.addEventListener('pointermove', (event) => {
    const rect = splitVisual.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const clamped = Math.min(80, Math.max(20, x));
    splitSlider.value = String(Math.round(clamped));
    updateSplit(clamped);
  });

  splitVisual.addEventListener('pointerleave', () => {
    splitSlider.value = '50';
    updateSplit(50);
  });
}

const progressFill = document.getElementById('progressFill');
function updateProgress() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  progressFill.style.width = `${Math.min(100, Math.max(0, ratio))}%`;
}

window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();

const nightSection = document.querySelector('.night-stage');
const nightClock = document.getElementById('nightClock');
const nightThought = document.getElementById('nightThought');
const nightStates = [
  { time: '11:48 PM', thought: '“Just one more assignment.”' },
  { time: '12:36 AM', thought: '“I should have started earlier.”' },
  { time: '01:24 AM', thought: '“What if I am not good enough?”' },
  { time: '02:17 AM', thought: '“I wish someone understood.”' }
];

function updateNightExperience() {
  if (!nightSection) return;

  const rect = nightSection.getBoundingClientRect();
  const total = window.innerHeight + rect.height;
  const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / total));
  const index = Math.min(nightStates.length - 1, Math.floor(progress * nightStates.length));
  const state = nightStates[index];

  nightClock.textContent = state.time;
  nightThought.textContent = state.thought;
}

window.addEventListener('scroll', updateNightExperience, { passive: true });
window.addEventListener('resize', updateNightExperience);
updateNightExperience();

const maskVisual = document.querySelector('.mask-visual');
if (maskVisual) {
  maskVisual.addEventListener('pointermove', (event) => {
    const rect = maskVisual.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    maskVisual.style.background = `radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(255,255,255,0.12), rgba(255,255,255,0.02) 18%, rgba(17,18,24,0.95) 70%)`;
  });

  maskVisual.addEventListener('pointerleave', () => {
    maskVisual.style.background = 'linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.005))';
  });
}

const sections = document.querySelectorAll('.section');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.18 }
);

sections.forEach((section) => {
  section.classList.add('reveal-target');
  revealObserver.observe(section);
});

const solutionItems = document.querySelectorAll('.solution-item');
const observeSolutions = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.22 }
);

solutionItems.forEach((item) => observeSolutions.observe(item));

const introAutoClose = document.querySelector('.intro-screen');
if (introAutoClose) {
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motionQuery.matches) {
    window.clearTimeout(introTimer);
    closeIntro();
  }
}
