import { Prompt } from '../types';

export const universalPrompts4: Prompt[] = [
  // --- CODE & ARCHITECTURE (CODE) ---
  {
    id: 'code-sec-1',
    title: 'Smart Contract EVM Security & Reentrancy Auditor',
    category: 'Code & Architecture',
    tags: ['code', 'solidity', 'security', 'blockchain', 'audit'],
    template: `Perform an adversarial static and logic security audit on the following Solidity smart contract:

\`\`\`solidity
[contract_code]
\`\`\`

Audit Vectors:
1. Reentrancy (CEI pattern violations, read-only reentrancy).
2. Oracle manipulation & flash loan vulnerability assessment.
3. Access control bugs (unprotected initializers, tx.origin vs msg.sender).
4. Integer overflow, rounding direction errors, and gas griefing vectors.
5. Provide remediated Solidity code with NatSpec documentation and hardhat test case.`,
    example: 'Audit automated liquidity staking vault contract handling ERC-4626 standard shares.',
    notes: 'Identifies multi-million dollar exploit vulnerabilities before mainnet deployment.'
  },
  {
    id: 'code-sec-2',
    title: 'Kubernetes Multi-Cluster GitOps Manifest Synthesizer',
    category: 'Code & Architecture',
    tags: ['code', 'kubernetes', 'devops', 'gitops', 'argo-cd', 'helm'],
    template: `Generate production-grade Kubernetes YAML manifests and Helm / Kustomize overlays for:
Service Name: [service_name]
Target Environment: [prod_staging_dr]
Replication & Autoscaling: [min_max_replicas_and_hpa_metrics]

Include:
- Hardened PodSecurityStandards (non-root, readOnlyRootFilesystem, drop ALL capabilities).
- Resource requests, limits, and topologySpreadConstraints for multi-AZ high availability.
- Liveness, Readiness, and Startup Probes with tuned timeouts.
- NetworkPolicies isolating ingress and egress traffic to authorized namespaces only.`,
    example: 'Service: High-volume auth gateway in EKS with HPA scaling from 3 to 50 pods based on CPU and custom HTTP request rate.',
    notes: 'Eliminates misconfigurations and enforces zero-trust cluster security.'
  },
  {
    id: 'code-sec-3',
    title: 'Distributed Rate Limiter with Sliding Window Counter',
    category: 'Code & Architecture',
    tags: ['code', 'algorithms', 'rate-limiter', 'redis', 'lua', 'distributed'],
    template: `Implement a distributed sliding window rate limiter in [target_language] using Redis and atomic Lua scripts:
Rate Limit: [requests_per_window] requests per [window_seconds] seconds.

Requirements:
1. Pure atomic Lua script executing sliding log / sliding window counter algorithm without race conditions.
2. Memory-efficient cleanup of expired timestamp buckets.
3. Fallback circuit-breaker logic when Redis cluster is unreachable (fail-open vs fail-closed policy).
4. Standard HTTP Response Headers (X-RateLimit-Limit, X-RateLimit-Remaining, Retry-After).`,
    example: 'Rate limiter for public LLM API endpoint: 60 requests per minute per API key in TypeScript with ioredis.',
    notes: 'Ensures strict API protection without locking or race condition exploits.'
  },
  {
    id: 'code-sec-4',
    title: 'Zero-Downtime Database Migration & Backfill Engine',
    category: 'Code & Architecture',
    tags: ['code', 'database', 'migrations', 'sql', 'zero-downtime', 'postgres'],
    template: `Design a multi-phase zero-downtime schema migration plan for:
Table: [table_name] ([row_count_estimate] rows)
Change Needed: [schema_change_e.g_split_column_or_rename_or_add_foreign_key]

Step-by-Step Migration Phases:
1. Phase 1 (Expand): Add new nullable columns / shadow tables without locking.
2. Phase 2 (Dual-Write): Update application layer to write to both old and new schemas simultaneously.
3. Phase 3 (Backfill): Batch background migration worker script with throttling to avoid replication lag.
4. Phase 4 (Read-Switch): Point reads to new schema and verify consistency.
5. Phase 5 (Contract): Deprecate and safely drop old columns/tables.`,
    example: 'Split "full_name" into "first_name" and "last_name" on a PostgreSQL table with 85 million active users.',
    notes: 'Prevents table locks and outages on massive production databases.'
  },
  {
    id: 'code-sec-5',
    title: 'Hexagonal Architecture Port & Adapter Generator',
    category: 'Code & Architecture',
    tags: ['code', 'architecture', 'hexagonal', 'ports-and-adapters', 'clean-code'],
    template: `Generate a complete Hexagonal (Ports & Adapters) codebase scaffolding for:
Core Use Case: [use_case_name]
Inbound Adapters: [http_cli_graphql]
Outbound Adapters: [database_third_party_api_cache]
Language: [programming_language]

Scaffold:
1. Core Domain Model and Port Interfaces (driving and driven ports).
2. Use Case Interactor / Application Service with dependency injection.
3. Primary Adapters (REST Controller / GraphQL Resolver).
4. Secondary Adapters (Postgres Repository / Redis Cache / Stripe Gateway).
5. Unit and Integration Test mocks proving port testability in isolation.`,
    example: 'Use case: "Process Subscription Renewal". Inbound: Stripe Webhook + Admin CLI. Outbound: Postgres + Postmark Email.',
    notes: 'Decouples business logic completely from databases and UI frameworks.'
  },

  // --- RESEARCH & SYNTHESIS (RSCH) ---
  {
    id: 'rsch-syn-6',
    title: 'Macroeconomic Regime & Yield Curve Scenario Model',
    category: 'Research & Synthesis',
    tags: ['research', 'economics', 'macro', 'yield-curve', 'finance'],
    template: `Synthesize the macroeconomic implications of the current [monetary_environment]:
Key Variables: Inflation rate [inflation_rate], Policy Rate [policy_rate], 2s10s Yield Curve Spread [yield_spread].

Produce:
1. Macroeconomic Regime Classification (Deflationary Bust, Stagflation, Reflation, Goldilocks Expansion).
2. Historical Analogues: Compare current indicators to 3 historical market cycles (e.g. 1973, 1994, 2008, 2020).
3. Sector Allocation Sensitivity: Identify asset classes with positive vs negative beta in this regime.
4. Sovereign Debt & Liquidity Strain: Evaluate debt sustainability and central bank liquidity facility usage.`,
    example: 'Monetary environment: Inverted yield curve (-45 bps) with sticky core CPI at 3.4% and Fed Funds at 5.25%.',
    notes: 'Translates central bank data and yields into strategic macro scenarios.'
  },
  {
    id: 'rsch-syn-7',
    title: 'Clinical Trial Evidence & Hazard Ratio Deconstructer',
    category: 'Research & Synthesis',
    tags: ['research', 'medical', 'clinical-trials', 'statistics', 'biotech'],
    template: `Analyze the published Phase III clinical trial data for [drug_or_medical_intervention]:
Control vs Intervention: [control_vs_treatment]
Primary Endpoints: [primary_endpoint_metric]

Extract & Evaluate:
1. Relative Risk Reduction (RRR) vs Absolute Risk Reduction (ARR).
2. Number Needed to Treat (NNT) and Number Needed to Harm (NNH).
3. Hazard Ratios (HR) with 95% Confidence Intervals and Kaplan-Meier curve interpretation.
4. Surrogate Endpoints vs True Clinical Outcomes: Rigorous assessment of clinical trial validity.`,
    example: 'Evaluating Phase 3 trial of novel GLP-1/GIP dual agonist for cardiovascular mortality reduction.',
    notes: 'Exposes misleading relative statistics by calculating true absolute clinical efficacy.'
  },
  {
    id: 'rsch-syn-8',
    title: 'Energy Density & Battery Chemistry Comparative Matrix',
    category: 'Research & Synthesis',
    tags: ['research', 'energy', 'battery', 'materials-science', 'cleantech'],
    template: `Conduct a comparative materials science evaluation of battery chemistries for [application_usecase]:
Chemistries: [lfp_nmc_sodium_ion_solid_state]

Evaluate across:
1. Gravimetric (Wh/kg) and Volumetric (Wh/L) Energy Density.
2. Cycle Life degradation curves under C-rate fast charging.
3. Thermal Runaway ignition thresholds and safety profiles.
4. Raw Material Supply Chain bottlenecks (Cobalt, Lithium, Nickel, Manganese availability).
5. Estimated Levelized Cost of Storage (LCOS) in $/kWh.`,
    example: 'Application: Commercial Class 8 Heavy Duty Long-Haul Electric Trucks requiring 500-mile range.',
    notes: 'Rigorous engineering benchmark for clean-tech and mobility hardware teams.'
  },

  // --- WRITING & CONTENT (WRITE) ---
  {
    id: 'write-cnt-6',
    title: 'Bestselling Non-Fiction Book Chapter Outliner',
    category: 'Writing & Content',
    tags: ['writing', 'books', 'non-fiction', 'publishing', 'storytelling'],
    template: `Design an outline and narrative architecture for Chapter [chapter_number] of a book titled "[book_title]":
Chapter Core Idea: [core_chapter_thesis]
Target Reader Transformation: [reader_belief_shift]

Chapter Blueprint:
1. The Anecdotal Cold Open: A gripping character-driven historical or biographical scene.
2. The Counter-Intuitive Twist: Why the conventional lesson from that story is wrong.
3. The Scientific / Empirical Foundation: 2 peer-reviewed studies or mathematical models proving the thesis.
4. The 3-Step Actionable Framework with diagram concepts.
5. Memorable Epigram / Summary takeaway to end the chapter.`,
    example: 'Chapter 4: "The Power of Negative Space" in a book about Cognitive Architecture and High-Performance Systems.',
    notes: 'Builds Malcolm Gladwell / James Clear level narrative non-fiction chapters.'
  },
  {
    id: 'write-cnt-7',
    title: 'Keynote Speech & TED-Style Storytelling Script',
    category: 'Writing & Content',
    tags: ['writing', 'keynote', 'speech', 'public-speaking', 'ted-talk'],
    template: `Write an inspiring 12-minute keynote address on [speech_topic] for [event_conference_name]:
Speaker Persona: [speaker_background]
Core Audience Emotion: [awe_urgency_or_clarity]

Speech Structure:
1. Hook (0:00 - 1:30): Disrupt expectations with a personal vulnerability or paradox.
2. The Broken Paradigm (1:30 - 4:00): Vividly depict what we are currently doing wrong.
3. The Vision (4:00 - 8:00): Paint the picture of the alternative future with concrete sensory details.
4. The Call to Arms (8:00 - 11:00): The specific, bold step every person in the room must take starting today.
5. The Crescendo (11:00 - 12:00): Rhythmic, emotional closing sentence. Include stage direction cues.`,
    example: 'Keynote: "The Renaissance of Local Hardware in the Age of Cloud Monopolies" at an International Systems Summit.',
    notes: 'Choreographs pacing, voice modulation, and rhetorical cadence for unforgettable presentations.'
  },

  // --- BUSINESS & STRATEGY (BIZ) ---
  {
    id: 'biz-strat-6',
    title: 'Series A Venture Pitch Deck 10-Slide Blueprint',
    category: 'Business & Strategy',
    tags: ['business', 'fundraising', 'pitch-deck', 'venture-capital', 'startups'],
    template: `Create a high-impact 10-slide venture pitch deck outline for [startup_name] raising a $[raise_amount] Series A:
Venture Description: [one_line_description]
Traction to Date: [revenue_growth_and_users]

Slide-by-Slide Spec:
1. Title: Crisp vision statement.
2. Problem: Urgent, expensive hair-on-fire customer pain point.
3. Solution & Demo: Product mechanism and "magic".
4. Market Size (TAM/SAM/SOM): Bottom-up calculation methodology.
5. Business Model & Unit Economics: Pricing, gross margins, and LTV/CAC.
6. Traction & Velocity: MoM revenue growth charts and cohort retention.
7. Defensible Moat: Network effects, IP, or switching costs.
8. Competition: 2x2 matrix positioning why incumbents cannot respond.
9. Team: Unfair background advantages.
10. The Ask & Use of Funds: 18-month milestone roadmap to Series B.`,
    example: 'Startup: Local-first offline AI platform raising $5M Series A with $120k MRR growing 22% MoM.',
    notes: 'Follows top-tier Sequoia and Benchmark narrative fundraising standards.'
  },
  {
    id: 'biz-strat-7',
    title: 'Executive OKR (Objectives & Key Results) Architect',
    category: 'Business & Strategy',
    tags: ['business', 'okrs', 'management', 'strategy', 'execution'],
    template: `Draft quarterly executive OKRs (Objectives and Key Results) for [company_or_department]:
Strategic Theme: [quarterly_strategic_priority]
Team Size: [team_size_and_resources]

Structure:
- Objective 1 (Product & Engineering): Qualitative, aspirational outcome.
  * KR 1.1: Measurable baseline -> target metric.
  * KR 1.2: System reliability or latency constraint.
  * KR 1.3: Milestone delivery deadline.
- Objective 2 (Growth & Revenue):
  * KR 2.1: Qualified pipeline or MRR growth.
  * KR 2.2: Net Revenue Retention (NRR) floor.
- Objective 3 (Operational Excellence):
  * KR 3.1: Employee NPS or hiring speed milestone.
- Provide a scoring guideline (0.0 to 1.0) defining what 70% target success looks like.`,
    example: 'Engineering & Product org of 40 people scaling from single-region to global multi-region active-active deployment.',
    notes: 'Aligns teams around measurable business outcomes rather than busywork tasks.'
  },

  // --- DATA & ANALYTICS (DATA) ---
  {
    id: 'data-anal-5',
    title: 'dbt (Data Build Tool) Production Data Mart Modeler',
    category: 'Data & Analytics',
    tags: ['data', 'dbt', 'sql', 'data-modeling', 'data-warehouse', 'analytics-engineering'],
    template: `Architect a modular dbt data modeling pipeline for [business_domain]:
Source Tables: [raw_tables_list]

Deliverables:
1. Staging Models (\`stg_\`): Source casting, column renaming, and surrogate key generation.
2. Intermediate Models (\`int_\`): Complex window aggregations and dimensional joins.
3. Mart Models (\`fct_\` and \`dim_\`): Dimensional star-schema models for BI reporting.
4. Schema YAML definition: Generic and singular dbt tests (not_null, unique, relationships, accepted_values).
5. Documentation descriptions for every calculated column.`,
    example: 'Domain: E-commerce Subscription Billing. Sources: raw_stripe_charges, raw_shopify_orders, raw_zendesk_tickets.',
    notes: 'Constructs maintainable, tested, and self-documenting data pipelines.'
  },
  {
    id: 'data-anal-6',
    title: 'Customer Lifetime Value (LTV) Buy-Till-You-Die (BTYD) Model',
    category: 'Data & Analytics',
    tags: ['data', 'clv', 'ltv', 'predictive-modeling', 'python', 'statistics'],
    template: `Implement a BG/NBD and Gamma-Gamma Customer Lifetime Value (CLV) model in Python using [dataset_description]:

Script Must:
1. Transform raw transaction logs into Recency, Frequency, Tenor (T), and Monetary Value (RFM) format.
2. Fit BG/NBD model to estimate customer churn probability and expected number of future transactions over [forecast_horizon_days] days.
3. Fit Gamma-Gamma sub-model to predict average transaction monetary value.
4. Calculate expected 12-month net present value (NPV) per customer with discount rate.
5. Segment customers into 4 actionable quartiles (Champions, Loyalists, At-Risk, Lost) with targeted CRM strategies.`,
    example: 'Predict 12-month CLV for 250,000 retail e-commerce customers based on 3 years of Shopify transaction logs.',
    notes: 'The gold-standard statistical approach for non-contractual customer lifetime prediction.'
  }
];
