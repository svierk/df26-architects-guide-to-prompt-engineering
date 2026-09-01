export interface ControlMove {
  /** Two-digit ordinal shown on the card. */
  number: string;
  /** The section keyword as it appears in the protocol skeleton. */
  key: 'CONTEXT' | 'CONSTRAINTS' | 'TOOLS' | 'OUTPUT';
  title: string;
  /** What the move does, in one line. */
  summary: string;
  /** The instruction that goes into the prompt itself. */
  protocol: string;
}

/**
 * The four moves that turn a single prompt into a system. Every demo protocol
 * and the prompt builder are built from exactly these four sections.
 */
export const controlMoves: ControlMove[] = [
  {
    number: '01',
    key: 'CONTEXT',
    title: 'Context',
    summary: "What the model needs to know about the org, the org's metadata and the task.",
    protocol:
      'Here is the org-specific evidence — metadata, code, business rules, prior decisions — attached or pasted, not assumed.'
  },
  {
    number: '02',
    key: 'CONSTRAINTS',
    title: 'Constraints',
    summary: 'What the model must not do — and what to do instead, so guardrails redirect rather than just block.',
    protocol:
      'Only use what is provided; flag anything inferred. Pair every guardrail with the fallback action, not just the prohibition.'
  },
  {
    number: '03',
    key: 'TOOLS',
    title: 'Tools',
    summary: 'What the model can call — describe calls, search, code execution, connected systems.',
    protocol:
      'Name exactly what the model may call to verify itself — describe calls, code search, sandbox execution — before it answers.'
  },
  {
    number: '04',
    key: 'OUTPUT',
    title: 'Output + Evaluation',
    summary: 'The exact shape of the response, plus the self-check it must pass before it ships.',
    protocol:
      'Define the exact artifact shape and the self-check it must pass first — table, diagram, schema — designed so it can be validated, diffed and reused.'
  }
];
