export interface Speaker {
  name: string;
  title: string;
  company: string;
  linkedin: string;
}

export const session = {
  title: "An Architect's Guide to Prompt Engineering",
  event: "Dreamforce '26",
  location: 'San Francisco, USA',
  date: '2026-09-15',
  repo: 'https://github.com/svierk/df26-architects-guide-to-prompt-engineering',
  /** Shown in the hero and used as the meta description of the page. */
  premise: 'Most teams think prompting is about wording. It isn’t - it’s about the controls.',
  summary:
    'The four control moves, the protocol that packages them, six rules and three worked Salesforce examples - the complete session in a single page.',
  /** The learning objectives the session was accepted with. */
  objectives: [
    'Design prompts using context, constraints, tools and structured outputs.',
    'Use better prompts to drive real system behaviour, not just generate content.',
    'Apply patterns that produce consistent, repeatable results from AI in Salesforce.'
  ]
};

export const speakers: Speaker[] = [
  {
    name: 'Chetan Chugh',
    title: 'Chief Architect & Salesforce CTA',
    company: 'Capgemini',
    linkedin: 'https://www.linkedin.com/in/chetan-chugh-18264b34/'
  },
  {
    name: 'Sebastiano Schwarz',
    title: 'Salesforce CTO Germany',
    company: 'Capgemini',
    linkedin: 'https://www.linkedin.com/in/sebastiano-schwarz/'
  }
];
