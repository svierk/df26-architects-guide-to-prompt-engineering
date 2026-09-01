export interface DemoProtocol {
  context: string;
  constraints: string;
  tools: string;
  output: string;
}

export interface DemoResult {
  /** File name of the artifact the structured prompt returns. */
  file: string;
  columns: string[];
  rows: string[][];
  /** Why the artifact beats a narrative answer. */
  note: string;
}

export interface Demo {
  id: string;
  label: string;
  title: string;
  scenario: string;
  /** The prompt most teams would write - kept verbatim from the session. */
  unstructured: string;
  /** The same request, packaged with all four control moves. */
  protocol: DemoProtocol;
  result: DemoResult;
  /** Rule numbers this example is used to teach. */
  rules: number[];
}

export const demos: Demo[] = [
  {
    id: 'org-merger',
    label: 'Org merger',
    title: 'Assessing an org merger',
    scenario: 'Org 1 (acquirer, ~12 years old) → Org 2 (acquired), ahead of the Q3 code freeze.',
    unstructured: `I pulled the metadata export for Org 1 — objects are Store_Location__c, Product_Bundle__c, and a legacy Order__c that doesn't match our Retail_Order__c.

Can you look through this and tell me what's going on before we merge it into Org 2 ahead of the Q3 code freeze?

Flag anything risky.`,
    protocol: {
      context:
        "Object/field metadata for Store_Location__c, Product_Bundle__c and Order__c (Org 1) and Retail_Order__c, Warehouse_Transfer__c (Org 2), plus both orgs' automations.",
      constraints:
        'Flag objects where 2+ automation types share an event context or write the same field. Flag triggers with UsageIsBulk = false or DML in loops. Exclude managed-package components from remediation, but keep them in the totals.',
      tools:
        'Tooling API for active automation (Flows, triggers, Process Builder, ValidationRule) + MetadataComponentDependency (Beta, 2,000-row cap) + schema diff on Order__c vs Retail_Order__c.',
      output:
        'merge-readiness-scorecard.md — ERD + risk-scored table (Object, Risk Type, Severity, Merge Blocker, Remediation). Self-check: every Blocker = Yes row must cite the field or class it flags.'
    },
    result: {
      file: 'merge-readiness-scorecard.md',
      columns: ['Object', 'Risk Type', 'Severity', 'Blocker', 'Remediation'],
      rows: [
        [
          'Order__c → Retail_Order__c',
          'Field incompatibility',
          'High',
          'Yes',
          'Remap Order__c.Status__c (5 values) to Retail_Order__c.Status__c (3 values) before merge'
        ],
        [
          'Store_Location__c',
          'Automation conflict',
          'Medium',
          'No',
          '2 Flows + StoreLocationTrigger.cls both update Inventory_Count__c — consolidate before go-live'
        ],
        [
          'Product_Bundle__c',
          'Non-bulkified DML',
          'High',
          'Yes',
          'ProductBundleHandler.cls performs DML inside a for-loop — refactor before merge'
        ]
      ],
      note: 'This is the whole artifact — not a narrative summary. It drops straight into the merge steering-committee deck, and the same table format works for the next acquisition’s metadata too.'
    },
    rules: [1, 2]
  },
  {
    id: 'order-sync',
    label: 'Order sync',
    title: 'Scoping the order sync',
    scenario: 'Retiring a point-to-point Apex integration to SAP S/4HANA in favour of MuleSoft Anypoint.',
    unstructured: `We're retiring OrderSyncService.cls — the point-to-point Apex integration to SAP S/4HANA — for MuleSoft Anypoint.

Before we scope the build, can you look at logic inside classes like OrderSyncService.cls & SAPCalloutHandler.cls and explain how the sync to SAP actually works end to end?`,
    protocol: {
      context:
        'OrderSyncService.cls, SAPCalloutHandler.cls, named credential Aurora_SAP_Prod (JWT bearer) and the MuleSoft Order API OpenAPI spec.',
      constraints:
        'Classify each call sync vs async. Flag callouts inside loops and any callout that runs after DML in the same transaction (OrderSyncService.pushTransfer). Flag missing idempotency keys. Treat every finding as a migration-checklist item.',
      tools:
        'Static code search across both classes + Tooling API MetadataComponentDependency (Beta) + OpenAPI diff against the MuleSoft Order API spec.',
      output:
        'integration-cutover-checklist.md — sequence diagram + table (Endpoint, Current Pattern, Target Pattern, Risk, Cutover Order). Self-check: every Risk = High row must name the limit it violates.'
    },
    result: {
      file: 'integration-cutover-checklist.md',
      columns: ['Endpoint', 'Current Pattern', 'Target Pattern', 'Risk', 'Order'],
      rows: [
        [
          'POST /sap/orders (SAPCalloutHandler.sendOrder)',
          'Sync, called from Retail_Order__c after-insert trigger',
          'Async via MuleSoft Order API',
          'High — callout in trigger risks blocking the save',
          '1'
        ],
        [
          'SAP inventory pull (OrderSyncService.pullInventory)',
          'Async @future, no retry logic',
          'MuleSoft scheduled batch w/ retry',
          'Medium — missing idempotency key',
          '2'
        ],
        [
          'Warehouse_Transfer__c sync (OrderSyncService.pushTransfer)',
          'Async Queueable, callout after DML in same txn',
          'MuleSoft event-driven flow',
          'High — throws “uncommitted work pending”',
          '3'
        ]
      ],
      note: 'Every row is scoped and sequenced — an estimate-ready cutover plan, not a description. The same table shape works for the next point-to-point integration you retire.'
    },
    rules: [3, 4]
  },
  {
    id: 'fsc-metadata',
    label: 'FSC metadata',
    title: 'Designing agent metadata in an Industries Cloud org',
    scenario: 'Business admins keep requesting new fields on FSC objects — and half of them break the next release.',
    unstructured: `We keep getting requests from business admins to add new fields to Financial Account and other FSC objects, and half the time it breaks something on the next release.

Can you help design an Agentforce agent that handles these requests instead of admins going straight to Setup?`,
    protocol: {
      context:
        'FinServ__FinancialAccount__c, FinServ__FinancialAccountRole__c, the standard ActionPlan / ActionPlanTemplate objects, and the Household record type with FinServ__ReciprocalRole__c relationships already in the org.',
      constraints:
        'Governance policy, not a platform limit — only propose a custom object with a lookup, never a custom field on a FinServ__ object. Discover existing automation before drafting. Before deployment always seek an explicit sign-off.',
      tools:
        'Metadata Describe API scoped to the FinServ__ namespace, Tooling API MetadataComponentDependency (Beta) to find existing Action Plan Templates and automation, package version check.',
      output:
        'metadata-change-request.md — requested change, discovery summary, proposed custom-object design and an explicit approval flag. Self-check: Approval defaults to Needs Approval unless sign-off appears in Context.'
    },
    result: {
      file: 'metadata-change-request.md',
      columns: ['Section', 'Details'],
      rows: [
        [
          'Requested Change',
          "Track loan applications and link them to the household's financial accounts and action plan"
        ],
        [
          'Discovery Summary',
          '2 existing Action Plan Templates already reference FinServ__FinancialAccount__c; no object currently tracks loan status'
        ],
        [
          'Proposed Design',
          'New custom object Loan_Application__c — lookup to FinServ__FinancialAccount__c and Account (Household); triggers the existing “Loan Underwriting” Action Plan Template via Flow'
        ],
        ['Approval Status', '⚠️ Needs Architect Approval — agent has no deploy permission']
      ],
      note: 'The agent never touches Setup. It hands a human architect exactly what they need to approve or reject in under a minute — controlled execution, not unattended automation.'
    },
    rules: [5, 6]
  }
];
