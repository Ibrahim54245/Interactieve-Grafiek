// Instellingen voor het SVG-element en het middenpunt van de cirkel.
const ns = 'http://www.w3.org/2000/svg';
const cx = 410;
const cy = 410;
const outer = 322;

// Elf onderwerpen met hun naam en hoekbereik binnen de cirkel.
const topics = [
  {
    n: 1, title: '(On)gewenste\nomgangsvormen', a: -90, b: -57,
    description: 'Iedereen moet kunnen leren en werken zonder intimidatie, pesten, discriminatie of ander gedrag dat grenzen overschrijdt. Ook gedrag via chat, e-mail of sociale media telt mee.',
    examples: ['Herhaald kleineren, buitensluiten of bedreigen van een collega of student.', 'Ongewenste opmerkingen, aanrakingen, discriminerende grappen of druk om iets te doen.'],
    consequences: ['Onveiligheid, stress, schaamte of verlies van vertrouwen.', 'Minder samenwerking, verzuim, studie- of werkproblemen en schade aan de sfeer.'],
    actions: ['Spreek gedrag aan als dat veilig voelt; benoem concreet wat je ziet en welk effect het heeft.', 'Zoek steun bij een vertrouwenspersoon, leidinggevende of aangewezen meldpunt en noteer relevante feiten.']
  },
  {
    n: 2, title: 'Zorg voor\ngezondheid', a: -57, b: -24,
    description: 'Gezondheid gaat over lichamelijk en mentaal welzijn, en over omstandigheden die mensen helpen gezond te blijven. Denk aan werkdruk, herstel, ergonomie en een veilige sociale omgeving.',
    examples: ['Langdurige hoge werkdruk, te weinig pauze of onduidelijke verwachtingen.', 'Een werkplek die lichamelijke klachten veroorzaakt of onvoldoende ruimte biedt voor herstel.'],
    consequences: ['Vermoeidheid, stress, klachten of uitval.', 'Minder concentratie en kwaliteit, met mogelijk extra druk op het team.'],
    actions: ['Bespreek werkbelasting en knelpunten vroeg; maak samen prioriteiten en haalbare afspraken.', 'Vraag advies over ergonomie, ondersteuning of passende hulp wanneer klachten aanhouden.']
  },
  {
    n: 3, title: 'Publieke\nomgeving', a: -24, b: 9,
    description: 'Besluiten en activiteiten kunnen invloed hebben op mensen buiten de organisatie. Weeg daarom publieke belangen, toegankelijkheid, leefbaarheid en vertrouwen mee.',
    examples: ['Een activiteit die geluid, verkeersdrukte of hinder voor omwonenden veroorzaakt.', 'Een dienst, locatie of communicatie die voor bepaalde groepen moeilijk toegankelijk is.'],
    consequences: ['Overlast, uitsluiting of ongelijke toegang tot voorzieningen.', 'Minder vertrouwen in de organisatie en conflicten met betrokkenen.'],
    actions: ['Breng betrokken groepen en mogelijke effecten vooraf in kaart; vraag waar nodig om hun perspectief.', 'Leg keuzes begrijpelijk uit, beperk hinder en zorg dat informatie en voorzieningen toegankelijk zijn.']
  },
  {
    n: 4, title: 'Fysieke\nveiligheid', a: 9, b: 42,
    description: 'Fysieke veiligheid gaat over het voorkomen van letsel en schade in gebouwen, werkplaatsen, laboratoria, bij evenementen en onderweg.',
    examples: ['Onveilige apparatuur, struikelgevaar, verkeerd opgeslagen stoffen of ontbrekende instructies.', 'Een nooduitgang blokkeren of een incident, defect of bijna-ongeval niet melden.'],
    consequences: ['Verwondingen, blootstelling aan gevaar of schade aan materiaal en gebouwen.', 'Werkonderbreking en risico op herhaling wanneer de oorzaak onbekend blijft.'],
    actions: ['Volg veiligheidsinstructies en gebruik geschikte beschermingsmiddelen; improviseer niet met apparatuur.', 'Meld gevaarlijke situaties en bijna-ongevallen direct zodat maatregelen kunnen worden genomen.']
  },
  {
    n: 5, title: 'Milieu', a: 42, b: 75,
    description: 'Milieu betreft de effecten van dagelijkse keuzes en activiteiten op energie, grondstoffen, afval, water, lucht en natuur.',
    examples: ['Onnodig energie- of materiaalverbruik en afval dat niet goed wordt gescheiden.', 'Gemorste of verkeerd opgeslagen stoffen die bodem of water kunnen vervuilen.'],
    consequences: ['Verspilling van schaarse grondstoffen en extra uitstoot of vervuiling.', 'Schade aan natuur, herstelkosten en verlies van vertrouwen bij onverantwoord handelen.'],
    actions: ['Voorkom afval waar mogelijk, gebruik middelen bewust en volg de regels voor scheiding en opslag.', 'Meld lekkages of milieuschade onmiddellijk en volg de geldende nood- en opruimprocedures.']
  },
  {
    n: 6, title: 'Informatie-\nbeveiliging', a: 75, b: 108,
    description: 'Informatiebeveiliging beschermt informatie en systemen tegen verlies, misbruik, ongewenste inzage of verstoring.',
    examples: ['Een wachtwoord delen, een verdachte link openen of een apparaat onbeheerd achterlaten.', 'Bestanden opslaan op een onbevoegde plek of toegang geven aan iemand die die niet nodig heeft.'],
    consequences: ['Diefstal of wijziging van gegevens en verstoring van belangrijke systemen.', 'Financiële schade, onderbreking van werk en verlies van vertrouwen.'],
    actions: ['Gebruik sterke, unieke wachtwoorden en multifactorauthenticatie; deel accounts nooit.', 'Controleer afzenders en links, houd apparaten actueel en meld verdachte berichten of incidenten snel.']
  },
  {
    n: 7, title: 'Privacy &\ngegevens-\nbescherming', a: 108, b: 141,
    description: 'Privacy vraagt om zorgvuldig omgaan met persoonsgegevens: verzamel en gebruik alleen wat nodig is, voor een duidelijk doel en met passende beveiliging.',
    examples: ['Persoonsgegevens versturen naar de verkeerde ontvanger of delen zonder geldige reden.', 'Gegevens langer bewaren dan nodig of dossiers toegankelijk maken voor onbevoegden.'],
    consequences: ['Inbreuk op iemands privacy, ongemak, identiteitsmisbruik of andere persoonlijke schade.', 'Meldingen, onderzoek, herstelwerk en afnemend vertrouwen.'],
    actions: ['Controleer ontvangers en toegangsrechten en deel alleen de minimale gegevens die nodig zijn.', 'Volg bewaartermijnen en interne privacyafspraken; meld een mogelijk datalek direct via het juiste kanaal.']
  },
  {
    n: 8, title: 'Kennis-\nveiligheid', a: 141, b: 174,
    description: 'Kennisveiligheid gaat over het beschermen van gevoelige kennis en het zorgvuldig afwegen van samenwerking, publicatie en toegang.',
    examples: ['Gevoelige onderzoeksinformatie of expertise delen zonder eerst afspraken en risico’s te controleren.', 'Een samenwerkingspartner brede toegang geven tot data, apparatuur of vertrouwelijke resultaten.'],
    consequences: ['Verlies van controle over kennis of ongewenste toepassing van onderzoeksresultaten.', 'Schade aan samenwerkingen, veiligheid, reputatie of de mogelijkheid om onderzoek voort te zetten.'],
    actions: ['Bespreek vooraf welke kennis gevoelig is en wie toegang nodig heeft; deel niet meer dan noodzakelijk.', 'Volg afspraken over partners, gegevens en publicaties en vraag deskundig advies bij twijfel.']
  },
  {
    n: 9, title: 'Wetenschappelijke\nintegriteit', a: 174, b: 207,
    description: 'Betrouwbaar onderzoek vraagt om eerlijkheid, zorgvuldigheid, transparantie, onafhankelijkheid en verantwoordelijkheid in elke onderzoeksfase.',
    examples: ['Resultaten verzinnen, gegevens selectief aanpassen of relevante uitkomsten verzwijgen.', 'Plagiaat, onduidelijk auteurschap of belangen die niet worden gemeld.'],
    consequences: ['Onbetrouwbare conclusies die vervolgonderzoek of beslissingen op het verkeerde spoor zetten.', 'Schade aan deelnemers, collega’s, de onderzoeker en het vertrouwen in wetenschap.'],
    actions: ['Leg methoden, gegevens en keuzes zorgvuldig vast en rapporteer resultaten eerlijk, ook als ze tegenvallen.', 'Bespreek auteurschap en belangen vooraf; corrigeer fouten en zoek advies bij integriteitsvragen.']
  },
  {
    n: 10, title: 'Financiële\nintegriteit', a: 207, b: 240,
    description: 'Financiële integriteit betekent dat geld, middelen en bevoegdheden eerlijk, controleerbaar en volgens de afgesproken regels worden beheerd.',
    examples: ['Onjuiste declaraties, onduidelijke betalingen of middelen voor privédoeleinden gebruiken.', 'Een leverancier bevoordelen door een persoonlijk belang niet te melden.'],
    consequences: ['Financieel verlies, oneerlijke besluitvorming en extra controle- of herstelwerk.', 'Mogelijke disciplinaire of juridische gevolgen en reputatieschade.'],
    actions: ['Bewaar bewijsstukken, volg goedkeuringsstappen en laat waar nodig een tweede persoon controleren.', 'Meld belangenverstrengeling vooraf en vraag advies als een betaling of afspraak niet helder is.']
  },
  {
    n: 11, title: 'Integriteit &\nCompliance', a: 240, b: 270,
    description: 'Integriteit en compliance gaan over zorgvuldig en eerlijk handelen, afspraken naleven en open omgaan met dilemma’s en belangen.',
    examples: ['Geschenken aannemen die een besluit kunnen beïnvloeden of een persoonlijk belang verzwijgen.', 'Regels omzeilen, vertrouwelijke informatie verkeerd gebruiken of een misstand niet durven melden.'],
    consequences: ['Oneerlijke besluiten, belangenconflicten of benadeling van collega’s en partners.', 'Onderzoek, sancties, reputatieschade en minder vertrouwen in de organisatie.'],
    actions: ['Maak afwegingen transparant, leg besluiten vast en meld persoonlijke of financiële belangen tijdig.', 'Vraag advies bij twijfel en gebruik de afgesproken meldroute wanneer je een mogelijke misstand ziet.']
  }
];

const accountStorageKey = 'interactieve-grafiek-demo-accounts';
const rememberedAccountKey = 'interactieve-grafiek-demo-session';
const passwordIterations = 150000;
let demoUsers = {};
let activeUser = null;
let authStorageError = '';
let trackingSince = null;

function createDefaultStats() {
  return {
    playTimeMs: 0,
    sessions: 0,
    topicOpens: 0,
    topicViews: Array(topics.length).fill(0),
    topicRoles: Array(topics.length).fill(null),
    topicConsequences: Array.from({ length: topics.length }, () => ({ red: 0, orange: 0, green: 0 })),
    markersPlaced: 0,
    resets: 0,
    consequences: { red: 0, orange: 0, green: 0 }
  };
}

function normalizeStats(savedStats = {}) {
  const defaults = createDefaultStats();
  const numberOrZero = value => Number.isFinite(Number(value)) && Number(value) > 0 ? Number(value) : 0;
  return {
    ...defaults,
    ...savedStats,
    playTimeMs: numberOrZero(savedStats.playTimeMs),
    sessions: numberOrZero(savedStats.sessions),
    topicOpens: numberOrZero(savedStats.topicOpens),
    markersPlaced: numberOrZero(savedStats.markersPlaced),
    resets: numberOrZero(savedStats.resets),
    topicViews: defaults.topicViews.map((_, index) => numberOrZero(savedStats.topicViews?.[index])),
    topicRoles: defaults.topicRoles.map((_, index) =>
      ['belangrijk', 'beperkt', 'geen'].includes(savedStats.topicRoles?.[index])
        ? savedStats.topicRoles[index]
        : null),
    topicConsequences: defaults.topicConsequences.map((_, index) => ({
      red: numberOrZero(savedStats.topicConsequences?.[index]?.red),
      orange: numberOrZero(savedStats.topicConsequences?.[index]?.orange),
      green: numberOrZero(savedStats.topicConsequences?.[index]?.green)
    })),
    consequences: {
      red: numberOrZero(savedStats.consequences?.red),
      orange: numberOrZero(savedStats.consequences?.orange),
      green: numberOrZero(savedStats.consequences?.green)
    }
  };
}

try {
  const savedUsers = JSON.parse(localStorage.getItem(accountStorageKey) || '{}');
  if (!savedUsers || typeof savedUsers !== 'object' || Array.isArray(savedUsers)) {
    throw new Error('Ongeldige accountgegevens');
  }
  demoUsers = savedUsers;
  const rememberedEmail = localStorage.getItem(rememberedAccountKey);
  if (rememberedEmail && demoUsers[rememberedEmail]?.passwordHash && demoUsers[rememberedEmail]?.salt) {
    activeUser = demoUsers[rememberedEmail];
    activeUser.stats = normalizeStats(activeUser.stats);
    activeUser.stats.sessions++;
  }
} catch (error) {
  activeUser = null;
  authStorageError = 'Lokale accountgegevens konden niet worden gelezen. Wis de sitegegevens van deze pagina om opnieuw te beginnen.';
}

function showAccountMessage(message) {
  ['auth-message', 'stats-message'].forEach(id => {
    const element = document.getElementById(id);
    if (element) element.textContent = message;
  });
}

function saveDemoUsers() {
  if (authStorageError) {
    showAccountMessage(authStorageError);
    return false;
  }

  try {
    localStorage.setItem(accountStorageKey, JSON.stringify(demoUsers));
    return true;
  } catch (error) {
    showAccountMessage('Opslaan is mislukt. Controleer of browseropslag beschikbaar is.');
    return false;
  }
}

function passwordToHex(bytes) {
  return Array.from(new Uint8Array(bytes), byte => byte.toString(16).padStart(2, '0')).join('');
}

async function hashPassword(password, saltHex) {
  const salt = Uint8Array.from(saltHex.match(/.{2}/g), byte => parseInt(byte, 16));
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const hash = await crypto.subtle.deriveBits({
    name: 'PBKDF2',
    salt,
    iterations: passwordIterations,
    hash: 'SHA-256'
  }, key, 256);
  return passwordToHex(hash);
}

function hashesMatch(first, second) {
  if (first.length !== second.length) return false;
  let difference = 0;
  for (let index = 0; index < first.length; index++) {
    difference |= first.charCodeAt(index) ^ second.charCodeAt(index);
  }
  return difference === 0;
}

const authScreen = document.getElementById('auth-screen');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const loginTab = document.getElementById('login-tab');
const signupTab = document.getElementById('signup-tab');
const authTitle = document.getElementById('auth-title');
const authMessage = document.getElementById('auth-message');

function setAuthMode(mode) {
  const isSignup = mode === 'signup';
  loginForm.hidden = isSignup;
  signupForm.hidden = !isSignup;
  loginTab.classList.toggle('active', !isSignup);
  signupTab.classList.toggle('active', isSignup);
  loginTab.setAttribute('aria-selected', String(!isSignup));
  signupTab.setAttribute('aria-selected', String(isSignup));
  authTitle.textContent = isSignup ? 'Account maken' : 'Welkom';
  authMessage.textContent = authStorageError;
}

loginTab.addEventListener('click', () => setAuthMode('login'));
signupTab.addEventListener('click', () => setAuthMode('signup'));

loginForm.addEventListener('submit', async event => {
  event.preventDefault();
  const email = loginForm.elements.email.value.trim().toLowerCase();
  const password = loginForm.elements.password.value;
  const user = demoUsers[email];
  if (!user || !user.salt || !user.passwordHash) {
    authMessage.textContent = 'E-mailadres of wachtwoord is onjuist.';
    return;
  }

  try {
    const hash = await hashPassword(password, user.salt);
    if (!hashesMatch(hash, user.passwordHash)) {
      authMessage.textContent = 'E-mailadres of wachtwoord is onjuist.';
      return;
    }
    localStorage.setItem(rememberedAccountKey, email);
    window.location.reload();
  } catch (error) {
    authMessage.textContent = 'Inloggen is niet gelukt. Controleer of browseropslag en Web Crypto beschikbaar zijn.';
  }
});

signupForm.addEventListener('submit', async event => {
  event.preventDefault();
  const email = signupForm.elements.email.value.trim().toLowerCase();
  const password = signupForm.elements.password.value;
  if (password.length < 8) {
    authMessage.textContent = 'Kies een wachtwoord van minimaal 8 tekens.';
    return;
  }
  if (demoUsers[email]) {
    authMessage.textContent = 'Voor dit e-mailadres bestaat al een account. Log in.';
    return;
  }

  try {
    const saltBytes = crypto.getRandomValues(new Uint8Array(16));
    const salt = passwordToHex(saltBytes);
    const passwordHash = await hashPassword(password, salt);
    demoUsers[email] = {
      email,
      salt,
      passwordHash,
      createdAt: new Date().toISOString(),
      stats: createDefaultStats()
    };
    if (!saveDemoUsers()) return;
    localStorage.setItem(rememberedAccountKey, email);
    window.location.reload();
  } catch (error) {
    authMessage.textContent = 'Account maken is niet gelukt. Controleer of browseropslag en Web Crypto beschikbaar zijn.';
  }
});

if (activeUser) {
  document.body.classList.add('is-authenticated');
  authScreen.hidden = true;
  trackingSince = document.visibilityState === 'visible' ? Date.now() : null;
  saveDemoUsers();
} else {
  authScreen.hidden = false;
  document.body.classList.remove('is-authenticated');
  if (authStorageError) authMessage.textContent = authStorageError;
}

const roleDefinitions = {
  belangrijk: { label: 'Speelt belangrijke rol', color: 'red' },
  beperkt: { label: 'Speelt beperkte rol', color: 'orange' },
  geen: { label: 'Speelt geen rol', color: 'green' }
};
const consequenceRoles = { red: 'belangrijk', orange: 'beperkt', green: 'geen' };
const legacyDefaultMarkerData = [
  [2, -40, 'green'], [2, -16, 'red'], [3, -8, 'green'], [4, 25, 'green'],
  [5, 57, 'red'], [6, 62, 'orange'], [7, 82, 'green'], [7, 116, 'red'],
  [8, 153, 'green'], [9, 181, 'green'], [10, 210, 'orange'],
  [10, 226, 'green'], [11, 248, 'red'], [11, 258, 'orange'], [11, 268, 'green']
];
const topicRoles = activeUser?.stats.topicRoles || Array(topics.length).fill(null);
const topicConsequences = activeUser?.stats.topicConsequences ||
  Array.from({ length: topics.length }, () => ({ red: 0, orange: 0, green: 0 }));
const markerElements = [];
let markersCleared = false;

function annularSector(a, b, innerRadius, outerRadius) {
  const [outerX1, outerY1] = point(outerRadius, a);
  const [outerX2, outerY2] = point(outerRadius, b);
  const [innerX1, innerY1] = point(innerRadius, a);
  const [innerX2, innerY2] = point(innerRadius, b);
  return `M${outerX1} ${outerY1} A${outerRadius} ${outerRadius} 0 0 1 ${outerX2} ${outerY2} L${innerX2} ${innerY2} A${innerRadius} ${innerRadius} 0 0 0 ${innerX1} ${innerY1} Z`;
}

function updateTopicRoleBands(topicIndex) {
  document.querySelectorAll(`.role-band[data-topic="${topicIndex}"]`).forEach(band => {
    const role = roleDefinitions[band.dataset.role];
    band.classList.toggle('selected', topicRoles[topicIndex] === band.dataset.role);
    band.setAttribute('aria-pressed', String(topicRoles[topicIndex] === band.dataset.role));
    band.setAttribute('aria-label', `${getTopicTitle(topics[topicIndex])}: ${role.label}`);
  });
}

function setTopicRole(topicIndex, role) {
  topicRoles[topicIndex] = role;
  if (activeUser) {
    activeUser.stats.topicRoles = topicRoles;
    saveDemoUsers();
  }
  updateTopicRoleBands(topicIndex);
  resetButton.classList.toggle('visible', hasChoices());
}

function getTopicRoleDetail(topicIndex) {
  const role = topicRoles[topicIndex];
  return role
    ? `Rol voor dit veld: ${roleDefinitions[role].label.toLowerCase()}.`
    : 'Rol voor dit veld: nog niet ingesteld.';
}

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

function getTopicTitle(topic) {
  return topic.title.replace(/\n/g, ' ').replace(/-\s/g, '').replace(/\s+/g, ' ');
}

function selectTopic(index) {
  hideTooltip();
  recordTopicView(index);
  document.querySelectorAll('.sector').forEach((sector, i) => {
    sector.classList.toggle('active', i === index);
    sector.style.opacity = i === index ? '1' : '.38';
  });
  const topic = topics[index];
  const focus = document.getElementById('topic-focus');
  document.getElementById('topic-number').textContent = `THEMA ${String(topic.n).padStart(2, '0')}`;
  document.getElementById('topic-title').textContent = getTopicTitle(topic);
  document.getElementById('topic-description').textContent = topic.description;
  [
    ['topic-examples', topic.examples],
    ['topic-consequences', topic.consequences],
    ['topic-actions', topic.actions]
  ].forEach(([id, items]) => {
    const list = document.getElementById(id);
    list.replaceChildren(...items.map(item => {
      const entry = document.createElement('li');
      entry.textContent = item;
      return entry;
    }));
  });
  focus.classList.add('is-open');
  focus.setAttribute('aria-hidden', 'false');
}

function getTopicConsequenceDetail(topicIndex) {
  const counts = getConsequencesForTopic(topicIndex);
  const consequenceNamesByColor = [
    { color: 'red', name: 'rode', consequence: 'groot gevolg' },
    { color: 'orange', name: 'gele', consequence: 'gemiddeld gevolg' },
    { color: 'green', name: 'groene', consequence: 'nauwelijks of geen gevolg' }
  ];
  const details = consequenceNamesByColor
    .filter(item => counts[item.color] > 0)
    .map(item => `${counts[item.color]} ${item.name} ${counts[item.color] === 1 ? 'stip' : 'stippen'} (${item.consequence})`)
    .join(', ')
    .replace(/, ([^,]*)$/, ' en $1');
  const consequenceDetail = details.length
    ? `Gevolgstippen in dit veld: ${details}.`
    : 'Nog geen gevolgstippen in dit veld. Sleep een gekleurde stip naar het veld.';
  return `${consequenceDetail} ${getTopicRoleDetail(topicIndex)}`;
}

topics.forEach((topic, index) => {
  const mid = (topic.a + topic.b) / 2;
  const sector = document.createElementNS(ns, 'path');
  sector.setAttribute('d', arc(topic.a, topic.b, outer));
  sector.setAttribute('class', 'sector');
  sector.dataset.topic = index;
  sector.setAttribute('tabindex', '0');
  sector.setAttribute('aria-describedby', 'consequence-tooltip');
  sector.addEventListener('click', () => selectTopic(index));
  sector.addEventListener('pointerenter', event => {
    showTooltip(event, getTopicTitle(topic), getTopicConsequenceDetail(index));
  });
  sector.addEventListener('pointermove', event => {
    if (consequenceTooltip.classList.contains('is-visible')) {
      showTooltip(event, getTopicTitle(topic), getTopicConsequenceDetail(index));
    }
  });
  sector.addEventListener('pointerleave', hideTooltip);
  sector.addEventListener('focus', () => {
    const rect = sector.getBoundingClientRect();
    showTooltip({
      clientX: rect.left + rect.width / 2,
      clientY: rect.top + rect.height / 2
    }, getTopicTitle(topic), getTopicConsequenceDetail(index));
  });
  sector.addEventListener('blur', hideTooltip);
  sector.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') selectTopic(index);
  });
  document.getElementById('sectors').appendChild(sector);

  const roleBands = [
    { role: 'geen', innerRadius: 112, outerRadius: 182 },
    { role: 'beperkt', innerRadius: 182, outerRadius: 252 },
    { role: 'belangrijk', innerRadius: 252, outerRadius: 322 }
  ];
  roleBands.forEach(({ role, innerRadius, outerRadius }) => {
    const definition = roleDefinitions[role];
    const band = document.createElementNS(ns, 'path');
    band.setAttribute('d', annularSector(topic.a, topic.b, innerRadius, outerRadius));
    band.setAttribute('class', `role-band role-${role}`);
    band.dataset.topic = index;
    band.dataset.role = role;
    band.setAttribute('role', 'button');
    band.setAttribute('tabindex', '0');
    band.setAttribute('aria-pressed', 'false');
    band.setAttribute('aria-describedby', 'consequence-tooltip');

    const showRoleTooltip = event => {
      const state = topicRoles[index] === role ? 'Deze rol is ingesteld.' : 'Klik om deze rol voor dit veld in te stellen.';
      showTooltip(event, getTopicTitle(topic), `${definition.label}. ${state}`);
    };

    band.addEventListener('pointerenter', showRoleTooltip);
    band.addEventListener('pointermove', event => {
      if (consequenceTooltip.classList.contains('is-visible')) showRoleTooltip(event);
    });
    band.addEventListener('pointerleave', hideTooltip);
    band.addEventListener('focus', () => {
      const rect = band.getBoundingClientRect();
      showRoleTooltip({
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2
      });
    });
    band.addEventListener('blur', hideTooltip);

    function chooseRole(event) {
      event.preventDefault();
      setTopicRole(index, role);
      showTooltip(event, getTopicTitle(topic), `${definition.label} ingesteld voor dit veld.`);
    }

    band.addEventListener('click', chooseRole);
    band.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') chooseRole(event);
    });
    document.getElementById('sectors').appendChild(band);
  });
  updateTopicRoleBands(index);
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
  document.getElementById('topic-labels').appendChild(label);

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
const markerStorageKey = 'interactieve-grafiek-marker-posities';
let statsPanelOpen = false;

function formatPlayTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours) return `${hours} uur ${minutes} min`;
  if (minutes) return `${minutes} min`;
  return `${seconds} sec`;
}

function renderStats() {
  if (!activeUser) return;
  const stats = activeUser.stats;
  document.getElementById('account-name').textContent = activeUser.email;
  document.getElementById('stats-user').textContent = activeUser.email;
  document.getElementById('stat-playtime').textContent = formatPlayTime(stats.playTimeMs);
  document.getElementById('stat-sessions').textContent = stats.sessions;
  document.getElementById('stat-topic-opens').textContent = stats.topicOpens;
  document.getElementById('stat-unique-topics').textContent =
    `${stats.topicViews.filter(views => views > 0).length} / ${topics.length}`;
  document.getElementById('stat-markers').textContent = stats.markersPlaced;
  document.getElementById('stat-resets').textContent = stats.resets;
  document.getElementById('stat-red').textContent = stats.consequences.red;
  document.getElementById('stat-orange').textContent = stats.consequences.orange;
  document.getElementById('stat-green').textContent = stats.consequences.green;

  const maxViews = Math.max(1, ...stats.topicViews);
  const topicList = document.getElementById('topic-stats');
  topicList.replaceChildren(...topics.map((topic, index) => {
    const item = document.createElement('li');
    const row = document.createElement('div');
    row.className = 'topic-stat-row';
    const title = document.createElement('span');
    title.textContent = getTopicTitle(topic);
    const count = document.createElement('strong');
    count.textContent = stats.topicViews[index];
    row.append(title, count);

    const track = document.createElement('div');
    track.className = 'topic-stat-track';
    const fill = document.createElement('div');
    fill.className = 'topic-stat-fill';
    fill.style.width = `${stats.topicViews[index] / maxViews * 100}%`;
    track.appendChild(fill);
    item.append(row, track);
    return item;
  }));
}

function recordTopicView(topicIndex) {
  if (!activeUser) return;
  activeUser.stats.topicOpens++;
  activeUser.stats.topicViews[topicIndex]++;
  saveDemoUsers();
  renderStats();
}

function recordMarkerPlacement(color, topicIndex = null) {
  if (!Object.hasOwn(consequenceRoles, color)) return;
  if (topicIndex !== null && topicConsequences[topicIndex]) {
    topicConsequences[topicIndex][color]++;
  }
  if (!activeUser) return;
  activeUser.stats.topicConsequences = topicConsequences;
  activeUser.stats.markersPlaced++;
  activeUser.stats.consequences[color]++;
  saveDemoUsers();
  renderStats();
}

function getConsequencesForTopic(topicIndex) {
  const counts = { red: 0, orange: 0, green: 0 };
  markerElements.forEach(marker => {
    const position = { x: Number(marker.getAttribute('cx')), y: Number(marker.getAttribute('cy')) };
    const target = getDropTarget(position);
    if (target.topicIndex === topicIndex && Object.hasOwn(counts, marker.dataset.color)) {
      counts[marker.dataset.color]++;
    }
  });
  return counts;
}

function hasChoices() {
  return markerElements.length > 0 || topicRoles.some(Boolean) ||
    topicConsequences.some(counts => Object.values(counts).some(count => count > 0));
}

function commitPlayTime() {
  if (!activeUser || trackingSince === null || document.visibilityState !== 'visible') return;
  const now = Date.now();
  const elapsed = Math.max(0, now - trackingSince);
  trackingSince = now;
  if (!elapsed) return;
  activeUser.stats.playTimeMs += elapsed;
  saveDemoUsers();
  renderStats();
}

function setStatsPanel(open) {
  statsPanelOpen = open;
  const panel = document.getElementById('stats-panel');
  panel.hidden = !open;
  document.getElementById('stats-toggle').setAttribute('aria-expanded', String(open));
  if (open) renderStats();
}

renderStats();

if (activeUser) {
  setInterval(commitPlayTime, 15000);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      commitPlayTime();
      trackingSince = null;
    } else {
      trackingSince = Date.now();
    }
  });
  window.addEventListener('beforeunload', commitPlayTime);
  document.getElementById('stats-toggle').addEventListener('click', () => setStatsPanel(!statsPanelOpen));
  document.getElementById('stats-close').addEventListener('click', () => setStatsPanel(false));
  document.getElementById('logout-button').addEventListener('click', () => {
    commitPlayTime();
    try {
      localStorage.removeItem(rememberedAccountKey);
      window.location.reload();
    } catch (error) {
      showAccountMessage('Uitloggen is niet gelukt. Browseropslag is niet beschikbaar.');
    }
  });
} else {
  document.getElementById('account-bar').hidden = true;
}

const consequenceNames = {
  red: 'Groot gevolg',
  orange: 'Gemiddeld gevolg',
  green: 'Nauwelijks of geen gevolg'
};
const consequenceColorNames = { red: 'rode', orange: 'gele', green: 'groene' };

const consequenceTooltip = document.getElementById('consequence-tooltip');

function showTooltip(event, title, detail) {
  consequenceTooltip.innerHTML = `<strong>${title}</strong><span>${detail}</span>`;
  consequenceTooltip.setAttribute('aria-hidden', 'false');
  consequenceTooltip.classList.add('is-visible');

  const offset = 14;
  let left = event.clientX + offset;
  let top = event.clientY + offset;
  const rect = consequenceTooltip.getBoundingClientRect();
  if (left + rect.width > window.innerWidth - 10) left = event.clientX - rect.width - offset;
  if (top + rect.height > window.innerHeight - 10) top = event.clientY - rect.height - offset;
  consequenceTooltip.style.left = `${Math.max(10, left)}px`;
  consequenceTooltip.style.top = `${Math.max(10, top)}px`;
}

function hideTooltip() {
  consequenceTooltip.classList.remove('is-visible');
  consequenceTooltip.setAttribute('aria-hidden', 'true');
}

function normalizeFieldAngle(angle) {
  return (angle % 360 + 360) % 360;
}

function getBoundaryAngleAtPosition(position) {
  const dx = position.x - cx;
  const dy = position.y - cy;
  for (const topic of topics) {
    const radians = topic.a * Math.PI / 180;
    const distance = Math.abs(dx * Math.sin(radians) - dy * Math.cos(radians));
    const alongLine = dx * Math.cos(radians) + dy * Math.sin(radians);
    if (distance <= 18 && alongLine >= 112 && alongLine <= outer) {
      return normalizeFieldAngle(topic.a);
    }
  }
  return null;
}

function getDropTarget(position) {
  const x = Number(position.x);
  const y = Number(position.y);
  if (!Number.isFinite(x) || !Number.isFinite(y)) return { topicIndex: null, boundaryAngle: null };
  const dx = x - cx;
  const dy = y - cy;
  const radius = Math.hypot(dx, dy);
  if (radius < 112 || radius > outer) return { topicIndex: null, boundaryAngle: null };

  const boundaryAngle = getBoundaryAngleAtPosition({ x, y });
  if (boundaryAngle !== null) return { topicIndex: null, boundaryAngle };

  let angle = Math.atan2(dy, dx) * 180 / Math.PI;
  if (angle < -90) angle += 360;
  const topicIndex = topics.findIndex(topic => angle >= topic.a && angle < topic.b);
  return topicIndex < 0 ? { topicIndex: null, boundaryAngle: null } : { topicIndex, boundaryAngle: null };
}

function svgPoint(event) {
  const point = svg.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  return point.matrixTransform(svg.getScreenCTM().inverse());
}

function getMarkerStorageKey() {
  return activeUser
    ? `${markerStorageKey}:${encodeURIComponent(activeUser.email)}`
    : markerStorageKey;
}

function saveMarkerPositions() {
  const positions = markerElements.map(marker => ({
    cx: marker.getAttribute('cx'),
    cy: marker.getAttribute('cy'),
    color: marker.dataset.color
  }));
  try {
    const savedPositions = markersCleared && positions.length === 0
      ? { cleared: true, markers: [] }
      : positions;
    localStorage.setItem(getMarkerStorageKey(), JSON.stringify(savedPositions));
  } catch (error) {
    showAccountMessage('Opslaan van de stippen is mislukt. Controleer of browseropslag beschikbaar is.');
  }
}

function getMarkerDetail(color, position) {
  const target = getDropTarget(position);
  const field = target.topicIndex === null ? 'onbekend' : getTopicTitle(topics[target.topicIndex]);
  const colorName = consequenceColorNames[color];
  return {
    title: `${colorName[0].toUpperCase()}${colorName.slice(1)} stip`,
    detail: `Deze ${colorName} stip ligt op het veld ${field}. ${consequenceNames[color]}.`
  };
}

function showMarkerTooltip(event, marker) {
  const detail = getMarkerDetail(marker.dataset.color, {
    x: Number(marker.getAttribute('cx')),
    y: Number(marker.getAttribute('cy'))
  });
  marker.setAttribute('aria-label', detail.detail);
  showTooltip(event, detail.title, detail.detail);
}

function createPlacedMarker(color, position, shouldSave = true) {
  const marker = document.createElementNS(ns, 'circle');
  marker.setAttribute('cx', position.x);
  marker.setAttribute('cy', position.y);
  marker.setAttribute('r', 18);
  marker.setAttribute('class', `marker ${color}`);
  marker.setAttribute('tabindex', '0');
  marker.dataset.color = color;

  let isDragging = false;
  marker.addEventListener('pointerdown', event => {
    event.preventDefault();
    event.stopPropagation();
    isDragging = true;
    marker.classList.add('dragging');
    marker.setPointerCapture(event.pointerId);
  });
  marker.addEventListener('pointermove', event => {
    if (isDragging) {
      const current = svgPoint(event);
      marker.setAttribute('cx', current.x);
      marker.setAttribute('cy', current.y);
      resetButton.classList.add('visible');
      return;
    }
    showMarkerTooltip(event, marker);
  });

  const finishDrag = event => {
    if (!isDragging) return;
    isDragging = false;
    marker.classList.remove('dragging');
    if (event && marker.hasPointerCapture(event.pointerId)) marker.releasePointerCapture(event.pointerId);
    if (shouldSave) saveMarkerPositions();
  };
  marker.addEventListener('pointerup', finishDrag);
  marker.addEventListener('pointercancel', finishDrag);
  marker.addEventListener('pointerenter', event => showMarkerTooltip(event, marker));
  marker.addEventListener('pointerleave', hideTooltip);
  marker.addEventListener('focus', () => {
    const rect = marker.getBoundingClientRect();
    showMarkerTooltip({
      clientX: rect.left + rect.width / 2,
      clientY: rect.top + rect.height / 2
    }, marker);
  });
  marker.addEventListener('blur', hideTooltip);
  marker.addEventListener('click', event => {
    event.stopPropagation();
    const target = getDropTarget({
      x: Number(marker.getAttribute('cx')),
      y: Number(marker.getAttribute('cy'))
    });
    if (target.topicIndex !== null) selectTopic(target.topicIndex);
    else showMarkerTooltip(event, marker);
  });

  markerGroup.appendChild(marker);
  markerElements.push(marker);
  if (shouldSave) {
    markersCleared = false;
    saveMarkerPositions();
    resetButton.classList.add('visible');
  }
  return marker;
}

function loadSavedMarkerPositions() {
  let savedPositions;
  try {
    const storedPositions = localStorage.getItem(getMarkerStorageKey());
    savedPositions = storedPositions === null ? null : JSON.parse(storedPositions);
  } catch (error) {
    showAccountMessage('Opgeslagen stippen konden niet worden gelezen.');
    return;
  }
  if (savedPositions?.cleared === true && Array.isArray(savedPositions.markers)) {
    markersCleared = true;
    return;
  }
  if (savedPositions === null) savedPositions = [];
  if (!Array.isArray(savedPositions)) {
    showAccountMessage('Opgeslagen stippen hebben een ongeldig formaat.');
    return;
  }
  const hasLegacyDefaultSet = savedPositions.length >= legacyDefaultMarkerData.length &&
    legacyDefaultMarkerData.every(([, , color], index) => savedPositions[index]?.color === color);
  const positionsToRestore = hasLegacyDefaultSet
    ? savedPositions.slice(legacyDefaultMarkerData.length)
    : savedPositions;
  positionsToRestore.forEach(position => {
    const color = position?.color;
    const x = Number(position?.cx);
    const y = Number(position?.cy);
    if (!Object.hasOwn(consequenceNames, color) || !Number.isFinite(x) || !Number.isFinite(y)) return;
    createPlacedMarker(color, { x, y }, false);
  });
  if (positionsToRestore.length !== savedPositions.length) saveMarkerPositions();
}

// Sleep een gevolgkleur naar het wiel om op die plek een stip toe te voegen.
document.querySelectorAll('.legend-source').forEach(source => {
  source.addEventListener('dragstart', event => event.preventDefault());
  source.addEventListener('pointerdown', event => {
    event.preventDefault();
    source._dragging = true;
    source.setPointerCapture(event.pointerId);
    const start = svgPoint(event);
    source._ghost = document.createElementNS(ns, 'circle');
    source._ghost.setAttribute('cx', start.x);
    source._ghost.setAttribute('cy', start.y);
    source._ghost.setAttribute('r', 18);
    source._ghost.setAttribute('class', `marker ${source.dataset.color} ghost-marker`);
    markerGroup.appendChild(source._ghost);
  });
  source.addEventListener('pointermove', event => {
    if (!source._dragging) return;
    const position = svgPoint(event);
    source._ghost.setAttribute('cx', position.x);
    source._ghost.setAttribute('cy', position.y);
  });
  const finishDrop = event => {
    if (!source._dragging) return;
    source._dragging = false;
    source._ghost.remove();
    const position = svgPoint(event);
    const target = getDropTarget(position);
    if (target.topicIndex !== null || target.boundaryAngle !== null) {
      const marker = createPlacedMarker(source.dataset.color, position);
      recordMarkerPlacement(source.dataset.color, target.topicIndex);
      showMarkerTooltip(event, marker);
      return;
    }
    showTooltip(event, 'Kies een plek in de cirkel', 'Sleep de stip naar een onderwerpveld of naar een scheidslijn.');
  };
  source.addEventListener('pointerup', finishDrop);
  source.addEventListener('pointercancel', () => {
    if (source._ghost) source._ghost.remove();
    source._dragging = false;
  });
});

loadSavedMarkerPositions();
resetButton.classList.toggle('visible', hasChoices());
resetButton.addEventListener('click', () => {
  if (activeUser && hasChoices()) activeUser.stats.resets++;
  topicRoles.fill(null);
  topicConsequences.forEach(counts => {
    counts.red = 0;
    counts.orange = 0;
    counts.green = 0;
  });
  markerElements.splice(0).forEach(marker => marker.remove());
  markersCleared = true;
  saveMarkerPositions();
  if (activeUser) {
    activeUser.stats.topicRoles = topicRoles;
    activeUser.stats.topicConsequences = topicConsequences;
    saveDemoUsers();
    renderStats();
  }
  topics.forEach((_, index) => updateTopicRoleBands(index));
  resetButton.classList.remove('visible');
});
window.addEventListener('beforeunload', saveMarkerPositions);

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

const topicFocus = document.getElementById('topic-focus');
document.getElementById('close-topic').addEventListener('click', () => {
  topicFocus.classList.remove('is-open');
  topicFocus.setAttribute('aria-hidden', 'true');
  document.querySelectorAll('.sector').forEach(sector => sector.style.opacity = '1');
});
