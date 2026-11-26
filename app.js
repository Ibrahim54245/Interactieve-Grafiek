// Instellingen voor het SVG-element en het middenpunt van de cirkel.
const ns = 'http://www.w3.org/2000/svg';
const cx = 410;
const cy = 410;
const outer = 322;

// Elf onderwerpen met hun naam en hoekbereik binnen de cirkel.
const topics = [
  { n: 1, title: '(On)gewenste\nomgangsvormen', a: -90, b: -57 },
  { n: 2, title: 'Zorg voor\ngezondheid', a: -57, b: -24 },
  { n: 3, title: 'Publieke\nomgeving', a: -24, b: 9 },
  { n: 4, title: 'Fysieke\nveiligheid', a: 9, b: 42 },
  { n: 5, title: 'Milieu', a: 42, b: 75 },
  { n: 6, title: 'Informatie-\nbeveiliging', a: 75, b: 108 },
  { n: 7, title: 'Privacy &\noggevens-\nbescherming', a: 108, b: 141 },
  { n: 8, title: 'Kennis-\nveiligheid', a: 141, b: 174 },
  { n: 9, title: 'Wetenschappelijke\nintegriteit', a: 174, b: 207 },
  { n: 10, title: 'Financiële\nintegriteit', a: 207, b: 240 },
  { n: 11, title: 'Integriteit &\nCompliance', a: 240, b: 270 }
];

// De grafiek start bewust zonder geplaatste ballen. Nieuwe ballen komen uit de legenda.
const markerData = [];

function point(r, angle) {
  const radians = angle * Math.PI / 180;
  return [cx + r * Math.cos(radians), cy + r * Math.sin(radians)];
}

function arc(a, b, r) {
  const [x1, y1] = point(r, a);
  const [x2, y2] = point(r, b);
  return `M${cx} ${cy} L${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2} Z`;
}

function spoke(angle) {
  const [x, y] = point(outer, angle);
  const line = document.createElementNS(ns, 'line');
  line.setAttribute('x1', cx);
  line.setAttribute('y1', cy);
  line.setAttribute('x2', x);
  line.setAttribute('y2', y);
  line.setAttribute('class', 'spoke');
  document.getElementById('sectors').appendChild(line);
}

function selectTopic(index) {
  document.querySelectorAll('.sector').forEach((sector, i) => {
    sector.classList.toggle('active', i === index);
    sector.style.opacity = i === index ? '1' : '.38';
  });
  document.querySelectorAll('.marker').forEach(marker => {
    marker.style.opacity = Number(marker.dataset.topic) === index ? '1' : '.28';
  });

  const topic = topics[index];
  const focus = document.getElementById('topic-focus');
  document.getElementById('topic-number').textContent = `THEMA ${String(topic.n).padStart(2, '0')}`;
  document.getElementById('topic-title').textContent = topic.title.replace('\n', ' ');
  document.getElementById('topic-description').textContent = `Ontdek de rol en gevolgen rond ${topic.title.replace('\n', ' ').toLowerCase()} binnen een veilige en integere leer- en werkomgeving.`;
  focus.classList.add('is-open');
  focus.setAttribute('aria-hidden', 'false');
}

topics.forEach((topic, index) => {
  const mid = (topic.a + topic.b) / 2;
  const sector = document.createElementNS(ns, 'path');
  sector.setAttribute('d', arc(topic.a, topic.b, outer));
  sector.setAttribute('class', 'sector');
  sector.dataset.topic = index;
  sector.setAttribute('tabindex', '0');
  sector.addEventListener('click', () => selectTopic(index));
  sector.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') selectTopic(index);
  });
  document.getElementById('sectors').appendChild(sector);
  spoke(topic.a);

  const [labelX, labelY] = point(238, mid);
  const label = document.createElementNS(ns, 'text');
  label.setAttribute('x', labelX);
  label.setAttribute('y', labelY - (topic.title.includes('\n') ? 7 : 0));
  label.setAttribute('text-anchor', 'middle');
  label.setAttribute('class', index === 8 ? 'label small' : 'label');
  topic.title.split('\n').forEach((line, lineIndex) => {
    const tspan = document.createElementNS(ns, 'tspan');
    tspan.setAttribute('x', labelX);
    tspan.setAttribute('dy', lineIndex === 0 ? '0' : '15');
    tspan.textContent = line;
    label.appendChild(tspan);
  });
  document.getElementById('sectors').appendChild(label);

  const [numberX, numberY] = point(286, mid);
  const number = document.createElementNS(ns, 'text');
  number.setAttribute('x', numberX);
  number.setAttribute('y', numberY + 7);
  number.setAttribute('text-anchor', 'middle');
  number.setAttribute('class', 'number');
  number.textContent = topic.n;
  document.getElementById('sectors').appendChild(number);
});

const svg = document.getElementById('graph');
const markerGroup = document.getElementById('markers');
const resetButton = document.getElementById('reset-markers');
const markerElements = [];
let draggedMarker = null;
const markerStorageKey = 'interactieve-grafiek-marker-posities';

// Haal eerder opgeslagen markerposities op zodra de pagina wordt geladen.
function getSavedMarkerPositions() {
  try {
    return JSON.parse(localStorage.getItem(markerStorageKey)) || {};
  } catch (error) {
    return {};
  }
}

// Bewaar alle huidige markerposities in de browser.
function saveMarkerPositions() {
  const positions = markerElements.map(marker => ({
    cx: marker.getAttribute('cx'),
    cy: marker.getAttribute('cy'),
    color: marker.dataset.color
  })).filter(marker => marker.cx && marker.cy);

  try {
    localStorage.setItem(markerStorageKey, JSON.stringify(positions));
  } catch (error) {
    // Opslag kan worden geblokkeerd; de interactieve pagina blijft dan gewoon werken.
  }
}

function svgPoint(event) {
  const point = svg.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  return point.matrixTransform(svg.getScreenCTM().inverse());
}

function defaultMarkerPosition(markerNumber, angle) {
  const topic = topics[markerNumber - 1];
  const mid = (topic.a + topic.b) / 2;
  const spread = angle - mid;
  const finalAngle = mid + spread * .25;
  return point(markerNumber === 7 || markerNumber === 11 ? 208 : 196, finalAngle);
}

// Maak voor elk onderwerp een marker aan en voeg de sleepinteractie toe.
markerData.forEach((data, index) => {
  const [markerNumber, angle, color] = data;
  const [startX, startY] = defaultMarkerPosition(markerNumber, angle);
  const marker = document.createElementNS(ns, 'circle');
  marker.setAttribute('cx', startX);
  marker.setAttribute('cy', startY);
  marker.setAttribute('r', 18);
  marker.setAttribute('class', 'marker');
  marker.setAttribute('fill', `var(--${color})`);
  marker.dataset.topic = markerNumber - 1;
  marker.dataset.defaultCx = startX;
  marker.dataset.defaultCy = startY;
  marker.dataset.index = index;
  marker.setAttribute('tabindex', '0');
  marker.style.opacity = '0';
  marker.style.transform = 'scale(0)';
  marker.style.transformBox = 'fill-box';
  marker.style.transformOrigin = 'center';

  requestAnimationFrame(() => {
    setTimeout(() => {
      marker.style.transition = 'transform .55s cubic-bezier(.2,.9,.2,1.35), opacity .35s ease, r .2s ease';
      marker.style.opacity = '1';
      marker.style.transform = 'scale(1)';
    }, 450 + index * 65);
  });

  marker.addEventListener('pointerdown', event => {
    event.preventDefault();
    draggedMarker = marker;
    marker.classList.add('dragging');
    marker.setPointerCapture(event.pointerId);
  });

  marker.addEventListener('pointermove', event => {
    if (draggedMarker !== marker) return;
    const position = svgPoint(event);
    marker.setAttribute('cx', position.x);
    marker.setAttribute('cy', position.y);
    resetButton.classList.add('visible');
  });

  function stopDragging(event) {
    if (draggedMarker !== marker) return;
    marker.classList.remove('dragging');
    draggedMarker = null;
    saveMarkerPositions();
  }

  marker.addEventListener('pointerup', stopDragging);
  marker.addEventListener('pointercancel', stopDragging);
  marker.addEventListener('click', event => {
    event.stopPropagation();
    selectTopic(markerNumber - 1);
  });

  markerGroup.appendChild(marker);
  markerElements.push(marker);

  const savedPositions = getSavedMarkerPositions();
  const savedPosition = savedPositions[index];
  marker.setAttribute('cx', savedPosition?.cx || startX);
  marker.setAttribute('cy', savedPosition?.cy || startY);
});

// Maak een nieuwe bal vanuit de legenda en zet hem op de grafiek.
function createPlacedMarker(color, position, shouldSave = true) {
  const marker = document.createElementNS(ns, 'circle');
  marker.setAttribute('cx', position.x);
  marker.setAttribute('cy', position.y);
  marker.setAttribute('r', 18);
  marker.setAttribute('class', 'marker placed-marker');
  marker.setAttribute('fill', `var(--${color})`);
  marker.dataset.color = color;
  marker.setAttribute('tabindex', '0');
  marker.style.transformBox = 'fill-box';
  marker.style.transformOrigin = 'center';
  marker.style.transform = 'scale(.55)';
  marker.style.transition = 'transform .28s cubic-bezier(.2,.9,.2,1.35), opacity .2s ease';

  let isDragging = false;

  marker.addEventListener('pointerdown', event => {
    event.preventDefault();
    event.stopPropagation();
    isDragging = true;
    draggedMarker = marker;
    marker.classList.add('dragging');
    marker.setPointerCapture(event.pointerId);
  });

  marker.addEventListener('pointermove', event => {
    if (!isDragging) return;
    const point = svgPoint(event);
    marker.setAttribute('cx', point.x);
    marker.setAttribute('cy', point.y);
    resetButton.classList.add('visible');
  });

  function finishDrag(event) {
    if (!isDragging) return;
    isDragging = false;
    marker.classList.remove('dragging');
    draggedMarker = null;
    if (event && marker.hasPointerCapture?.(event.pointerId)) marker.releasePointerCapture(event.pointerId);
    if (shouldSave) saveMarkerPositions();
  }

  marker.addEventListener('pointerup', finishDrag);
  marker.addEventListener('pointercancel', finishDrag);

  markerGroup.appendChild(marker);
  markerElements.push(marker);
  requestAnimationFrame(() => marker.style.transform = 'scale(1)');
  if (shouldSave) saveMarkerPositions();
  resetButton.classList.add('visible');
  return marker;
}

// Sleep een onbeperkte kopie van een legenda-dot naar elk veld op de grafiek.
document.querySelectorAll('.legend-source').forEach(source => {
  source.addEventListener('pointerdown', event => {
    event.preventEvent?.();
  });

  source.addEventListener('dragstart', event => event.preventDefault());

  source.addEventListener('pointermove', event => {
    if (!source._dragging) return;
    source._ghost.setAttribute('cx', svgPoint(event).x);
    source._ghost.setAttribute('cy', svgPoint(event).y);
  });

  source.addEventListener('pointerdown', event => {
    event.preventDefault();
    source._dragging = true;
    source.setPointerCapture(event.pointerId);
    const rect = source.getBoundingClientRect();
    const start = svgPoint({ clientX: rect.left + rect.width / 2, clientY: rect.top + rect.height / 2 });
    source._ghost = document.createElementNS(ns, 'circle');
    source._ghost.setAttribute('cx', start.x);
    source._ghost.setAttribute('cy', start.y);
    source._ghost.setAttribute('r', 18);
    source._ghost.setAttribute('class', 'marker ghost-marker');
    source._ghost.setAttribute('fill', `var(--${source.dataset.color})`);
    source._ghost.style.opacity = '.55';
    markerGroup.appendChild(source._ghost);
  });

  function dropBall(event) {
    if (!source._dragging) return;
    source._dragging = false;
    const position = svgPoint(event);
    source._ghost.remove();
    createPlacedMarker(source.dataset.color, position);
  }

  source.addEventListener('pointerup', dropBall);
  source.addEventListener('pointercancel', event => {
    if (source._ghost) source._ghost.remove();
    source._dragging = false;
  });
});

resetButton.addEventListener('click', () => {
  markerElements.forEach((marker, index) => {
    setTimeout(() => {
      marker.style.transform = 'scale(0)';
      marker.style.opacity = '0';
      setTimeout(() => marker.remove(), 280);
    }, index * 25);
  });
  markerElements.length = 0;
  resetButton.classList.remove('visible');
  try {
    localStorage.removeItem(markerStorageKey);
  } catch (error) {
    // Opslag kan worden geblokkeerd; de markers worden wel op het scherm gereset.
  }
});

// Beheer het laadscherm en open daarna de interactieve grafiek.
const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-button');

// Maak de knop direct beschikbaar, zodat de gebruiker nooit vastzit op het laadscherm.
startButton.disabled = false;
startButton.classList.add('ready');

setTimeout(() => {
  startButton.disabled = false;
  startButton.classList.add('ready');
}, 2900);

function leaveStartScreen() {
  if (!document.body.contains(startScreen)) return;
  startScreen.classList.add('is-hidden');
  document.querySelector('.shell').setAttribute('aria-live', 'polite');
  setTimeout(() => startScreen.remove(), 450);
}

startScreen.addEventListener('click', event => {
  if (event.target === startScreen) leaveStartScreen();
});

startButton.addEventListener('click', leaveStartScreen);
startButton.addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') leaveStartScreen();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && document.body.contains(startScreen)) leaveStartScreen();
});

startScreen.addEventListener('transitionend', event => {
  if (event.propertyName === 'opacity' && startScreen.classList.contains('is-hidden')) {
    startScreen.remove();
  }
});

document.querySelectorAll('.role-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.role-card').forEach(item => item.classList.remove('active'));
    card.classList.add('active');
  });
});

const topicFocus = document.getElementById('topic-focus');
document.getElementById('close-topic').addEventListener('click', () => {
  topicFocus.classList.remove('is-open');
  topicFocus.setAttribute('aria-hidden', 'true');
  document.querySelectorAll('.sector').forEach(sector => sector.style.opacity = '1');
  document.querySelectorAll('.marker').forEach(marker => marker.style.opacity = '1');
});

// Herstel eerder geplaatste ballen; zonder opgeslagen ballen begint de grafiek met nul.
const savedPositions = getSavedMarkerPositions();
if (Array.isArray(savedPositions)) {
  savedPositions.forEach(saved => {
    if (saved?.cx && saved?.cy && saved?.color) {
      createPlacedMarker(saved.color, { x: saved.cx, y: saved.cy }, false);
    }
  });
  resetButton.classList.toggle('visible', savedPositions.length > 0);
}

// Herstel eerder opgeslagen markerposities bij het laden van de pagina.
// Markerposities zijn hierboven al hersteld via de opgeslagen ballenlijst.

// Sla markerposities op bij het verlaten van de pagina.
window.addEventListener('beforeunload', saveMarkerPositions);

setTimeout(() => {
  if (document.body.contains(startScreen) && startScreen.classList.contains('ready') === false) leaveStartScreen();
}, 8000);
