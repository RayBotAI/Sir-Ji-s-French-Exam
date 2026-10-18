export interface Phrase {
  fr: string;
  en: string;
}

export interface QuizItem {
  q: string;
  options: string[];
  answer: number;
}

export interface Lesson {
  id: string;
  title: string;
  titleEn: string;
  goal: string;
  phrases: Phrase[];
  tip: string;
  quiz: QuizItem[];
}

export const lessons: Lesson[] = [
  {
    id: 'salutations',
    title: 'Bonjour !',
    titleEn: 'Greetings & introductions',
    goal: 'Say hello, give your name, and say where you live.',
    phrases: [
      { fr: 'Bonjour, je m’appelle Priya.', en: 'Hello, my name is Priya.' },
      { fr: 'Enchanté. Et vous ?', en: 'Nice to meet you. And you?' },
      { fr: 'Comment allez-vous ?', en: 'How are you? (formal)' },
      { fr: 'Je vais bien, merci.', en: 'I am well, thank you.' },
      { fr: 'J’habite à Toronto.', en: 'I live in Toronto.' },
      { fr: 'Je viens de l’Inde.', en: 'I come from India.' },
      { fr: 'Au revoir, bonne journée !', en: 'Goodbye, have a good day!' },
    ],
    tip: 'Use “vous” with strangers and examiners. In the exam, always start with “Bonjour”.',
    quiz: [
      { q: 'How do you say “My name is…”?', options: ['Je suis appelle…', 'Je m’appelle…', 'Mon nom appelle…'], answer: 1 },
      { q: '“J’habite à Montréal” means…', options: ['I work in Montréal', 'I like Montréal', 'I live in Montréal'], answer: 2 },
      { q: 'Which is polite for an examiner?', options: ['Salut, ça va ?', 'Bonjour, comment allez-vous ?', 'Coucou !'], answer: 1 },
    ],
  },
  {
    id: 'nombres',
    title: 'Les nombres',
    titleEn: 'Numbers 0–20 and prices',
    goal: 'Understand numbers, prices and phone numbers when you hear them.',
    phrases: [
      { fr: 'un, deux, trois, quatre, cinq', en: 'one, two, three, four, five' },
      { fr: 'six, sept, huit, neuf, dix', en: 'six, seven, eight, nine, ten' },
      { fr: 'onze, douze, treize, quatorze, quinze', en: 'eleven … fifteen' },
      { fr: 'seize, dix-sept, dix-huit, dix-neuf, vingt', en: 'sixteen … twenty' },
      { fr: 'Ça coûte combien ?', en: 'How much does it cost?' },
      { fr: 'Ça coûte douze dollars.', en: 'It costs twelve dollars.' },
      { fr: 'Mon numéro, c’est le quatre-un-six…', en: 'My number is four-one-six…' },
    ],
    tip: 'Listening tests love numbers: times, prices, platform numbers. Write digits as you hear them.',
    quiz: [
      { q: '“Quinze” is…', options: ['5', '15', '50'], answer: 1 },
      { q: '“Ça coûte combien ?” asks about…', options: ['the time', 'the price', 'the place'], answer: 1 },
      { q: '“Dix-huit” is…', options: ['18', '8', '19'], answer: 0 },
    ],
  },
  {
    id: 'famille',
    title: 'La famille',
    titleEn: 'Family',
    goal: 'Talk about your family members simply.',
    phrases: [
      { fr: 'Je suis marié. J’ai deux enfants.', en: 'I am married. I have two children.' },
      { fr: 'Ma femme s’appelle Anita.', en: 'My wife is called Anita.' },
      { fr: 'Mon mari travaille à Ottawa.', en: 'My husband works in Ottawa.' },
      { fr: 'Mon fils a dix ans.', en: 'My son is ten years old.' },
      { fr: 'Ma fille va à l’école.', en: 'My daughter goes to school.' },
      { fr: 'Mes parents habitent en Inde.', en: 'My parents live in India.' },
    ],
    tip: 'Age uses “avoir”: “J’ai trente ans” (I have thirty years) — never “Je suis trente”.',
    quiz: [
      { q: '“I am 30 years old” is…', options: ['Je suis trente ans', 'J’ai trente ans', 'Je trente ans'], answer: 1 },
      { q: '“Mes parents” means…', options: ['my relatives', 'my parents', 'my friends'], answer: 1 },
      { q: '“Ma fille” is…', options: ['my daughter', 'my son', 'my sister'], answer: 0 },
    ],
  },
  {
    id: 'quotidien',
    title: 'Ma journée',
    titleEn: 'Daily routine & time',
    goal: 'Describe your day and tell the time.',
    phrases: [
      { fr: 'Je me lève à sept heures.', en: 'I get up at seven o’clock.' },
      { fr: 'Je prends le petit-déjeuner.', en: 'I have breakfast.' },
      { fr: 'Je commence le travail à neuf heures.', en: 'I start work at nine.' },
      { fr: 'Le soir, je fais la cuisine.', en: 'In the evening, I cook.' },
      { fr: 'Quelle heure est-il ?', en: 'What time is it?' },
      { fr: 'Il est huit heures et demie.', en: 'It is half past eight.' },
    ],
    tip: 'Time words to catch: “le matin” (morning), “l’après-midi” (afternoon), “le soir” (evening).',
    quiz: [
      { q: '“Il est huit heures et demie” is…', options: ['8:00', '8:30', '8:15'], answer: 1 },
      { q: '“Le soir” means…', options: ['the morning', 'the evening', 'the weekend'], answer: 1 },
      { q: '“Je me lève” means…', options: ['I get up', 'I go to bed', 'I leave'], answer: 0 },
    ],
  },
  {
    id: 'cafe',
    title: 'Au café',
    titleEn: 'Ordering food & drinks',
    goal: 'Order politely and ask for the bill.',
    phrases: [
      { fr: 'Je voudrais un café, s’il vous plaît.', en: 'I would like a coffee, please.' },
      { fr: 'Avez-vous une table pour deux ?', en: 'Do you have a table for two?' },
      { fr: 'Qu’est-ce que vous recommandez ?', en: 'What do you recommend?' },
      { fr: 'Je suis végétarien.', en: 'I am vegetarian.' },
      { fr: 'L’addition, s’il vous plaît.', en: 'The bill, please.' },
      { fr: 'Est-ce que je peux payer par carte ?', en: 'Can I pay by card?' },
    ],
    tip: '“Je voudrais” is the magic polite phrase — it works for any request in the oral exam.',
    quiz: [
      { q: 'Polite way to order:', options: ['Je veux café.', 'Je voudrais un café, s’il vous plaît.', 'Donne café.'], answer: 1 },
      { q: '“L’addition” is…', options: ['the menu', 'the bill', 'the table'], answer: 1 },
      { q: '“Par carte” means…', options: ['by card', 'in cash', 'later'], answer: 0 },
    ],
  },
  {
    id: 'deplacer',
    title: 'En ville',
    titleEn: 'Directions & transport',
    goal: 'Ask for directions and understand simple answers.',
    phrases: [
      { fr: 'Excusez-moi, où est la gare ?', en: 'Excuse me, where is the station?' },
      { fr: 'Tournez à gauche.', en: 'Turn left.' },
      { fr: 'Tournez à droite.', en: 'Turn right.' },
      { fr: 'Allez tout droit.', en: 'Go straight ahead.' },
      { fr: 'C’est à côté de la banque.', en: 'It is next to the bank.' },
      { fr: 'Je prends le métro / l’autobus.', en: 'I take the subway / the bus.' },
    ],
    tip: '“Tout droit” (straight) and “à droite” (right) sound close — listen for “tout”.',
    quiz: [
      { q: '“Tournez à gauche” means…', options: ['Turn right', 'Turn left', 'Go straight'], answer: 1 },
      { q: '“Tout droit” means…', options: ['right', 'straight ahead', 'behind'], answer: 1 },
      { q: '“À côté de” means…', options: ['next to', 'far from', 'in front of'], answer: 0 },
    ],
  },
  {
    id: 'logement',
    title: 'Le logement',
    titleEn: 'Housing',
    goal: 'Describe where you live and ask about an apartment.',
    phrases: [
      { fr: 'J’habite dans un appartement.', en: 'I live in an apartment.' },
      { fr: 'Il y a deux chambres.', en: 'There are two bedrooms.' },
      { fr: 'Le loyer est de combien par mois ?', en: 'How much is the rent per month?' },
      { fr: 'Est-ce que le chauffage est inclus ?', en: 'Is heating included?' },
      { fr: 'C’est près du métro ?', en: 'Is it near the subway?' },
      { fr: 'Je voudrais visiter l’appartement.', en: 'I would like to visit the apartment.' },
    ],
    tip: 'TEF Section A often asks you to gather info about an ad — housing questions are perfect practice.',
    quiz: [
      { q: '“Le loyer” is…', options: ['the rent', 'the landlord', 'the key'], answer: 0 },
      { q: '“Il y a” means…', options: ['there is / there are', 'he has', 'it was'], answer: 0 },
      { q: '“Le chauffage est inclus ?” asks if…', options: ['parking is free', 'heating is included', 'pets are allowed'], answer: 1 },
    ],
  },
  {
    id: 'travail',
    title: 'Le travail',
    titleEn: 'Work & studies',
    goal: 'Say what you do and what you like about it.',
    phrases: [
      { fr: 'Je suis ingénieur.', en: 'I am an engineer.' },
      { fr: 'Je travaille dans une banque.', en: 'I work in a bank.' },
      { fr: 'J’aime mon travail parce que…', en: 'I like my job because…' },
      { fr: 'Je cherche un emploi.', en: 'I am looking for a job.' },
      { fr: 'Je parle anglais et hindi.', en: 'I speak English and Hindi.' },
      { fr: 'J’apprends le français pour immigrer au Canada.', en: 'I am learning French to immigrate to Canada.' },
    ],
    tip: 'No article before jobs: “Je suis ingénieur”, not “Je suis un ingénieur”.',
    quiz: [
      { q: '“I am a nurse” is…', options: ['Je suis infirmière.', 'Je suis une la infirmière.', 'J’ai infirmière.'], answer: 0 },
      { q: '“Je cherche un emploi” means…', options: ['I found a job', 'I am looking for a job', 'I quit my job'], answer: 1 },
      { q: '“Parce que” means…', options: ['because', 'for example', 'however'], answer: 0 },
    ],
  },
];

export interface Card {
  id: string;
  fr: string;
  en: string;
  lesson: string;
}

export const cards: Card[] = lessons.flatMap((l) =>
  l.phrases.map((p, i) => ({ id: `${l.id}-${i}`, fr: p.fr, en: p.en, lesson: l.id })),
);
