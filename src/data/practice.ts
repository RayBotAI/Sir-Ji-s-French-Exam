export interface Line {
  speaker?: 'A' | 'B';
  text: string;
}

export interface ListeningItem {
  id: string;
  title: string;
  level: 'A1' | 'A2' | 'B1';
  lines: Line[];
  question: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const listening: ListeningItem[] = [
  {
    id: 'l-gare',
    title: 'À la gare',
    level: 'A1',
    lines: [{ text: 'Attention, s’il vous plaît. Le train pour Québec part à dix heures quinze, voie numéro trois.' }],
    question: 'When does the train to Québec leave?',
    options: ['10:50', '10:15', '3:15'],
    answer: 1,
    explanation: '“dix heures quinze” = 10:15. “Voie numéro trois” is the platform.',
  },
  {
    id: 'l-cafe',
    title: 'Au café',
    level: 'A1',
    lines: [
      { speaker: 'A', text: 'Bonjour madame, qu’est-ce que vous désirez ?' },
      { speaker: 'B', text: 'Bonjour. Je voudrais un thé et un croissant, s’il vous plaît.' },
      { speaker: 'A', text: 'Très bien. Ça fait six dollars.' },
    ],
    question: 'What does the woman order?',
    options: ['A coffee and a croissant', 'A tea and a croissant', 'A tea and a sandwich'],
    answer: 1,
    explanation: '“un thé et un croissant” — and it costs six dollars.',
  },
  {
    id: 'l-rdv',
    title: 'Un rendez-vous',
    level: 'A1',
    lines: [{ text: 'Bonjour, c’est la clinique du Parc. Votre rendez-vous avec le docteur Tremblay est mardi à quatorze heures.' }],
    question: 'When is the appointment?',
    options: ['Monday at 2 p.m.', 'Tuesday at 2 p.m.', 'Tuesday at 4 p.m.'],
    answer: 1,
    explanation: '“mardi” = Tuesday, “quatorze heures” = 14:00 = 2 p.m.',
  },
  {
    id: 'l-meteo',
    title: 'La météo',
    level: 'A1',
    lines: [{ text: 'Demain à Montréal, il va neiger le matin. L’après-midi, il fera froid, moins dix degrés.' }],
    question: 'What will the weather be tomorrow morning?',
    options: ['Rain', 'Sun', 'Snow'],
    answer: 2,
    explanation: '“il va neiger” = it is going to snow.',
  },
  {
    id: 'l-direction',
    title: 'Où est la banque ?',
    level: 'A1',
    lines: [
      { speaker: 'A', text: 'Excusez-moi, où est la banque, s’il vous plaît ?' },
      { speaker: 'B', text: 'Allez tout droit, puis tournez à gauche. La banque est à côté de la pharmacie.' },
    ],
    question: 'Where is the bank?',
    options: ['Next to the pharmacy', 'Opposite the school', 'Behind the station'],
    answer: 0,
    explanation: '“à côté de la pharmacie” = next to the pharmacy.',
  },
  {
    id: 'l-appart',
    title: 'Petite annonce',
    level: 'A2',
    lines: [{ text: 'À louer : appartement de deux chambres, près du métro. Loyer : mille deux cents dollars par mois, chauffage inclus. Libre le premier juillet.' }],
    question: 'What is included in the rent?',
    options: ['Electricity', 'Heating', 'Parking'],
    answer: 1,
    explanation: '“chauffage inclus” = heating included. Rent: $1,200 per month.',
  },
  {
    id: 'l-travail',
    title: 'Nouvel emploi',
    level: 'A2',
    lines: [
      { speaker: 'A', text: 'Alors, ton nouveau travail, ça va ?' },
      { speaker: 'B', text: 'Oui, j’aime beaucoup ! Mes collègues sont sympathiques, mais je commence très tôt, à sept heures.' },
    ],
    question: 'What does the person NOT like about the new job?',
    options: ['The colleagues', 'The early start', 'The salary'],
    answer: 1,
    explanation: '“mais je commence très tôt” — “but I start very early”. The colleagues are nice.',
  },
  {
    id: 'l-magasin',
    title: 'Au magasin',
    level: 'A2',
    lines: [{ text: 'Chers clients, le magasin ferme dans quinze minutes. Merci de passer à la caisse.' }],
    question: 'What is the announcement about?',
    options: ['A sale', 'The store closing soon', 'A lost child'],
    answer: 1,
    explanation: '“le magasin ferme dans quinze minutes” = the store closes in 15 minutes.',
  },
  {
    id: 'l-cours',
    title: 'Inscription au cours',
    level: 'A2',
    lines: [
      { speaker: 'A', text: 'Bonjour, je voudrais m’inscrire au cours de français.' },
      { speaker: 'B', text: 'Bien sûr. Les cours ont lieu le lundi et le jeudi soir, de dix-huit heures à vingt heures.' },
    ],
    question: 'When are the French classes?',
    options: ['Monday and Thursday evenings', 'Tuesday and Friday mornings', 'Every weekend'],
    answer: 0,
    explanation: '“le lundi et le jeudi soir” = Monday and Thursday evenings, 6–8 p.m.',
  },
  {
    id: 'l-message',
    title: 'Message vocal',
    level: 'A2',
    lines: [{ text: 'Salut Marc, c’est Julie. Je suis désolée, je ne peux pas venir ce soir. Je suis malade. On se voit samedi ?' }],
    question: 'Why can’t Julie come tonight?',
    options: ['She is working', 'She is sick', 'She is travelling'],
    answer: 1,
    explanation: '“Je suis malade” = I am sick.',
  },
  {
    id: 'l-bus',
    title: 'Le transport',
    level: 'B1',
    lines: [{ text: 'En raison des travaux, la ligne d’autobus quarante-cinq ne passera pas par la rue Principale cette semaine. Veuillez utiliser l’arrêt de la rue Saint-Denis.' }],
    question: 'What should passengers do?',
    options: ['Take the subway instead', 'Use the Saint-Denis stop', 'Wait until next week'],
    answer: 1,
    explanation: '“Veuillez utiliser l’arrêt de la rue Saint-Denis” — please use the Saint-Denis stop (because of roadwork).',
  },
  {
    id: 'l-avis',
    title: 'Un avis',
    level: 'B1',
    lines: [
      { speaker: 'A', text: 'Tu penses qu’on devrait travailler de la maison ?' },
      { speaker: 'B', text: 'Pour moi, c’est pratique, on gagne du temps. Par contre, je trouve qu’on se sent parfois seul.' },
    ],
    question: 'What disadvantage of working from home is mentioned?',
    options: ['Losing time', 'Feeling lonely', 'Higher costs'],
    answer: 1,
    explanation: '“on se sent parfois seul” = you sometimes feel alone. “Par contre” introduces the downside.',
  },
];

export type Exam = 'general' | 'tef' | 'tcf';

export interface SpeakingPrompt {
  id: string;
  exam: Exam;
  task: string;
  prompt: string;
  promptEn: string;
  prepSec: number;
  speakSec: number;
  phrases: string[];
}

export const speaking: SpeakingPrompt[] = [
  {
    id: 's-presente',
    exam: 'general',
    task: 'Warm-up',
    prompt: 'Présentez-vous : nom, pays, ville, famille, travail.',
    promptEn: 'Introduce yourself: name, country, city, family, job.',
    prepSec: 30,
    speakSec: 60,
    phrases: ['Je m’appelle…', 'Je viens de…', 'J’habite à…', 'Je suis… (job)', 'J’ai… enfants'],
  },
  {
    id: 's-journee',
    exam: 'general',
    task: 'Warm-up',
    prompt: 'Décrivez une journée typique.',
    promptEn: 'Describe a typical day.',
    prepSec: 30,
    speakSec: 60,
    phrases: ['Le matin, je…', 'Ensuite…', 'L’après-midi…', 'Le soir…', 'Je me couche à…'],
  },
  {
    id: 's-weekend',
    exam: 'general',
    task: 'Warm-up',
    prompt: 'Qu’est-ce que vous aimez faire le week-end ?',
    promptEn: 'What do you like to do on weekends?',
    prepSec: 30,
    speakSec: 60,
    phrases: ['J’aime…', 'Je n’aime pas…', 'Souvent, je…', 'avec ma famille', 'parce que…'],
  },
  {
    id: 'tef-a1',
    exam: 'tef',
    task: 'Section A · Obtaining information',
    prompt: 'Vous lisez une annonce : « Cours de cuisine pour débutants ». Vous téléphonez pour obtenir des informations (prix, horaires, lieu, inscription…).',
    promptEn: 'You see an ad for a beginner cooking class. Phone to ask about price, schedule, location, sign-up…',
    prepSec: 0,
    speakSec: 300,
    phrases: ['Bonjour, j’appelle au sujet de l’annonce…', 'Combien coûte… ?', 'Quels sont les horaires ?', 'Où se trouve… ?', 'Est-ce qu’il faut… ?', 'Merci beaucoup, au revoir.'],
  },
  {
    id: 'tef-a2',
    exam: 'tef',
    task: 'Section A · Obtaining information',
    prompt: 'Vous lisez une annonce : « Appartement à louer, 2 chambres ». Vous appelez le propriétaire pour poser des questions.',
    promptEn: 'You see an ad for a two-bedroom apartment. Call the landlord with questions.',
    prepSec: 0,
    speakSec: 300,
    phrases: ['Le loyer est de combien ?', 'Est-ce que le chauffage est inclus ?', 'C’est près du métro ?', 'Quand est-ce que je peux visiter ?', 'Les animaux sont acceptés ?'],
  },
  {
    id: 'tef-b1',
    exam: 'tef',
    task: 'Section B · Persuading',
    prompt: 'Vous avez vu une annonce pour un club de sport dans votre quartier. Vous essayez de convaincre un ami de s’inscrire avec vous.',
    promptEn: 'You saw an ad for a local sports club. Convince a friend to join with you.',
    prepSec: 0,
    speakSec: 600,
    phrases: ['Tu sais, j’ai vu…', 'C’est une bonne idée parce que…', 'En plus…', 'Je comprends, mais…', 'Imagine…', 'Alors, tu viens ?'],
  },
  {
    id: 'tef-b2',
    exam: 'tef',
    task: 'Section B · Persuading',
    prompt: 'Vous avez vu une annonce pour un voyage organisé à Québec. Convainquez un collègue de partir avec vous.',
    promptEn: 'You saw an ad for an organized trip to Québec City. Convince a colleague to go with you.',
    prepSec: 0,
    speakSec: 600,
    phrases: ['Ça serait génial de…', 'Le prix est raisonnable…', 'On pourrait…', 'Si tu as peur de…, ne t’inquiète pas', 'Ça vaut la peine !'],
  },
  {
    id: 'tcf-t1',
    exam: 'tcf',
    task: 'Tâche 1 · Guided interview',
    prompt: 'Parlez de vous : votre famille, votre travail, vos loisirs, vos projets au Canada.',
    promptEn: 'Talk about yourself: family, work, hobbies, plans in Canada.',
    prepSec: 0,
    speakSec: 120,
    phrases: ['Je m’appelle…', 'Dans la vie, je suis…', 'Pendant mon temps libre…', 'Au Canada, je voudrais…'],
  },
  {
    id: 'tcf-t2',
    exam: 'tcf',
    task: 'Tâche 2 · Interaction',
    prompt: 'Vous voulez vous inscrire à la bibliothèque municipale. Vous posez des questions à l’employé (horaires, documents, prix, services).',
    promptEn: 'You want to join the public library. Ask the clerk about hours, documents, price, services.',
    prepSec: 120,
    speakSec: 210,
    phrases: ['Bonjour, je voudrais…', 'Quels documents faut-il ?', 'C’est gratuit ?', 'Est-ce que je peux emprunter… ?', 'Jusqu’à quelle heure… ?'],
  },
  {
    id: 'tcf-t3',
    exam: 'tcf',
    task: 'Tâche 3 · Expressing an opinion',
    prompt: 'Selon vous, est-il préférable de vivre en ville ou à la campagne ? Justifiez votre réponse.',
    promptEn: 'In your opinion, is it better to live in the city or the countryside? Justify your answer.',
    prepSec: 0,
    speakSec: 270,
    phrases: ['À mon avis…', 'D’abord…', 'Ensuite…', 'Par contre…', 'Par exemple…', 'En conclusion…'],
  },
];

export const rubric = [
  { key: 'task', label: 'Completed the task', hint: 'Did I answer everything asked?' },
  { key: 'fluency', label: 'Fluency', hint: 'Few long pauses, kept talking' },
  { key: 'vocab', label: 'Vocabulary', hint: 'Used varied, correct words' },
  { key: 'grammar', label: 'Grammar', hint: 'Verbs, gender, word order' },
  { key: 'pron', label: 'Pronunciation', hint: 'Clear and understandable' },
] as const;

export const examInfo = {
  tef: {
    name: 'TEF Canada',
    org: 'CCI Paris Île-de-France',
    listening: { questions: 40, minutes: 40 },
    oral: 'Expression orale: 2 sections / 15 minutes — Section A (obtaining information, 5 min) and Section B (persuading, 10 min).',
    url: 'https://www.lefrancaisdesaffaires.fr/candidat/test-evaluation-francais/tef-canada/presentation/',
  },
  tcf: {
    name: 'TCF Canada',
    org: 'France Éducation international',
    listening: { questions: 39, minutes: 35 },
    oral: 'Expression orale: 3 tasks / 12 minutes including 2 minutes of preparation (guided interview, interaction, opinion).',
    url: 'https://www.france-education-international.fr/test/tcf-canada',
  },
} as const;
