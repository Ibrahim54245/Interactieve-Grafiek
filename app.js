const ns = 'http://www.w3.org/2000/svg';
const cx = 410;
const cy = 410;
const outer = 322;

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

const markerData = [
  [2,-40,'green'], [2,-16,'red'], [3,-8,'green'], [4,25,'green'],
  [5,57,'red'], [6,62,'orange'], [7,82,'green'], [7,116,'red'],
  [8,153,'green'], [9,181,'green'], [10,210,'orange'],
  [10,226,'green'], [11,248,'red'], [11,258,'orange'], [11,268,'green']
];

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
  });
  document.querySelectorAll('.marker').forEach(marker => {
    marker.style.opacity = Number(marker.dataset.topic) === index ? '1' : '.82';
  });
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
    if (event && marker.hasPointerCapture?.(event.pointerId)) marker.releasePointerCapture(event.pointerId);
  }

  marker.addEventListener('pointerup', stopDragging);
  marker.addEventListener('pointercancel', stopDragging);
  marker.addEventListener('click', event => {
    event.stopPropagation();
    selectTopic(markerNumber - 1);
  });

  markerGroup.appendChild(marker);
  markerElements.push(marker);
});

resetButton.addEventListener('click', () => {
  markerElements.forEach(marker => {
    marker.setAttribute('cx', marker.dataset.defaultCx);
    marker.setAttribute('cy', marker.dataset.defaultCy);
  });
  resetButton.classList.remove('visible');
});

document.querySelectorAll('.role-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.role-card').forEach(item => item.classList.remove('active'));
    card.classList.add('active');
  });
});
