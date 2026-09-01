export interface Rule {
  number: number;
  title: string;
  /** The one-line version, as it appears on the summary card. */
  short: string;
  /** Why the rule exists - the failure mode it prevents. */
  why: string;
  /** How the rule showed up in one of the three worked examples. */
  fromDemo: string;
  /** Id of the demo the example is taken from, used to cross-link the section. */
  demoId: string;
}

export const rules: Rule[] = [
  {
    number: 1,
    title: 'Name the artifact, not the category',
    short: 'Vague names force a guess. Real API names don’t.',
    why: 'Say “the order object” and the model has to guess which one you mean - and it will guess wrong. Actual API names leave nothing to guess.',
    fromDemo:
      'The prompt named the exact objects and class: Retail_Order__c, Warehouse_Transfer__c and ProductBundleHandler.cls.',
    demoId: 'org-merger'
  },
  {
    number: 2,
    title: 'Verify before assuming',
    short: 'Same name, same purpose - not always the same structure.',
    why: 'Two orgs can carry the same object name for two different designs. Verify current metadata and dependencies in each org before you map or merge.',
    fromDemo:
      'Before planning the merge it compared Order__c with Retail_Order__c, and checked each org’s automation instead of assuming they behaved alike.',
    demoId: 'org-merger'
  },
  {
    number: 3,
    title: 'Point at a verifiable tool',
    short: 'Named APIs give the model an explicit path to verification.',
    why: 'Ask the model to use “your Salesforce knowledge” and it answers from memory, not from your org. Naming the exact API or search forces it to go look.',
    fromDemo: 'The prompt named the checks to run: search both Apex classes and inspect the org’s dependency data.',
    demoId: 'order-sync'
  },
  {
    number: 4,
    title: 'Make findings actionable',
    short: 'Add an owner and a sequence. Turn every finding into a task.',
    why: 'A paragraph explaining a risk is something someone has to re-read and translate into work. A sequence number and an owner is already the task.',
    fromDemo:
      'Each finding became a cutover step with a clear order and risk - not a paragraph describing the problem.',
    demoId: 'order-sync'
  },
  {
    number: 5,
    title: 'Forbid the model’s default shortcut',
    short: 'Block the wrong path - not just state the right outcome.',
    why: 'A model defaults to the most common pattern in its training data. Describing the right answer isn’t enough; you must rule out the tempting wrong one.',
    fromDemo:
      'The prompt blocked the shortcut: do not add a custom field to the managed Financial Account object - propose a custom object with a lookup instead.',
    demoId: 'fsc-metadata'
  },
  {
    number: 6,
    title: 'Make the model show its discovery',
    short: 'Require a discovery summary. If it isn’t shown, it wasn’t verified.',
    why: 'If the output format has no slot for “what I found already exists”, you have no way to tell whether the model actually checked or simply guessed.',
    fromDemo:
      'Before proposing a design the model had to list what it discovered in the org - which surfaced existing Action Plan Templates the design had to account for.',
    demoId: 'fsc-metadata'
  }
];
