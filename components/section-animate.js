// This script adds a "swoop in from the side" animation to all main custom section components as they enter the viewport.

const swoopStyle = document.createElement('style');
swoopStyle.textContent = `
  .swoop-in {
    opacity: 0;
    filter: blur(8px);
    transform:
      translateX(-400px)
      translateY(40px)
      scale(0.92)
      skewX(-18deg);
    transition:
      opacity 1s cubic-bezier(.4,1.4,.6,1),
      filter 1s cubic-bezier(.4,1.4,.6,1),
      transform 1s cubic-bezier(.4,1.4,.6,1);
    will-change: opacity, transform, filter;
  }
  .swoop-in.visible {
    opacity: 1;
    filter: blur(0);
    transform:
      translateX(0)
      translateY(0)
      scale(1)
      skewX(0);
    transition:
      opacity 1s cubic-bezier(.4,1.4,.6,1),
      filter 1s cubic-bezier(.4,1.4,.6,1),
      transform 1s cubic-bezier(.4,1.4,.6,1);
  }
`;
document.head.appendChild(swoopStyle);

const sectionTags = [
  'my-hero',
  'my-about',
  'my-skills',
  'my-projects',
  'my-contact',
  'my-education'
];

function animateCustomSections() {
  const elements = sectionTags
    .map(tag => Array.from(document.querySelectorAll(tag)))
    .flat();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, idx * 120);
        } else {
          entry.target.classList.remove('visible');
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach(el => {
    el.classList.add('swoop-in');
    observer.observe(el);
  });
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', animateCustomSections);
} else {
  animateCustomSections();
}