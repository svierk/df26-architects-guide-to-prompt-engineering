/** What teams say when a model underperforms - the symptom, not the cause. */
export const symptoms: string[] = [
  'The model hallucinated',
  'The output was too generic',
  'The agent ignored my instructions',
  'The responses are inconsistent'
];

/** The questions an architect asks instead of blaming the tool. */
export const architectQuestions: string[] = [
  'What did we actually give the model to work with?',
  'Was the necessary context provided?',
  'Were the constraints explicitly stated?',
  'Did it have access to the right tools for verification?',
  'Did we define what a successful output looks like?'
];
