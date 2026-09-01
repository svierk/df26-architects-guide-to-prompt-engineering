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

export interface Cause {
  title: string;
  lead: string;
  detail: string;
  consequence: string;
}

/** Why a Salesforce org in particular breaks an unstructured prompt. */
export const causes: Cause[] = [
  {
    title: 'Hidden dependencies',
    lead: 'Object Describe shows schema — not runtime behaviour.',
    detail:
      'Flows, Apex triggers, validation rules, roll-ups, invocable Apex and async paths all interact through the order of execution.',
    consequence: 'Without an automation inventory and a dependency trace, the answer is incomplete.'
  },
  {
    title: 'Unverified conclusions',
    lead: 'A metadata export is a snapshot — not proof of what is active now.',
    detail: 'Fields, relationships, active Flow versions and package metadata change continuously.',
    consequence:
      'Without a fresh Describe and metadata retrieval tied to a specific org and API version, the same prompt analyses a different system tomorrow.'
  },
  {
    title: 'Execution context',
    lead: 'A design valid for System Administrator may fail for real users.',
    detail:
      'Sharing, CRUD/FLS, permission sets, user versus system mode — and package boundaries control what can be read, changed or executed.',
    consequence: 'Without persona and runtime context, two answers are not comparable.'
  }
];
