import { Prompt } from '../types';

export const universalLibraryMore: Prompt[] = [
  // --- ADDITIONAL 26 PROMPTS COVERING ALL 16 UNIVERSAL DOMAINS ---
  {
    id: 'univ-more-1',
    title: 'Zero-Knowledge Cryptographic Protocol Designer',
    category: 'Code & Architecture',
    tags: ['code', 'cryptography', 'zk-snarks', 'security'],
    template: `Design a Zero-Knowledge Proof protocol for proving [private_attribute_claim] without revealing [sensitive_data].
Specify:
1. Public Inputs vs Private Witness.
2. Arithmetic Circuit constraints and R1CS / Plonkish representation.
3. Proof generation and verification benchmarks.`,
    example: 'Prove an individual is over 21 years old and a verified citizen without revealing birthdate or identity.',
    notes: 'Mathematical ZK proof system architecture.'
  },
  {
    id: 'univ-more-2',
    title: 'Compiler AST Optimization & Bytecode Generation',
    category: 'Code & Architecture',
    tags: ['code', 'compilers', 'ast', 'llvm', 'bytecode'],
    template: `Write an Abstract Syntax Tree (AST) optimizer pass for [source_domain_dsl] targeting [llvm_or_wasm_bytecode]:
Transformations:
1. Constant folding and dead code elimination.
2. Loop unrolling and vectorization hints.
3. Memory SSA generation and register allocation.`,
    example: 'Optimizing custom financial math DSL into fast WebAssembly bytecode.',
    notes: 'Compiler engineering and low-level code generation.'
  },
  {
    id: 'univ-more-3',
    title: 'Supply Chain Bullwhip Effect Simulator',
    category: 'Business & Strategy',
    tags: ['business', 'supply-chain', 'operations', 'logistics'],
    template: `Model the bullwhip amplification effect across a 4-tier supply chain for [product_category]:
Tiers: Retailer -> Wholesaler -> Distributor -> Manufacturer.
Calculate variance amplification under [demand_shock_scenario] and recommend safety stock levels.`,
    example: 'Supply chain shock simulation during seasonal consumer electronics spike.',
    notes: 'Mitigates inventory shortages and overstock holding costs.'
  },
  {
    id: 'univ-more-4',
    title: 'Customer Advisory Board (CAB) Charter & Agenda',
    category: 'Business & Strategy',
    tags: ['business', 'customer-success', 'executive', 'cab'],
    template: `Create a Customer Advisory Board (CAB) charter for [b2b_saas_company]:
Define:
1. Member Criteria & Executive Persona selection.
2. Value Proposition for CAB members.
3. Annual meeting cadence and product roadmap co-creation workshops.`,
    example: 'CAB for Series B developer security platform with 10 Fortune 500 CISOs.',
    notes: 'Deepens executive retention and roadmap alignment.'
  },
  {
    id: 'univ-more-5',
    title: 'Value Proposition Canvas & Jobs-To-Be-Done (JTBD)',
    category: 'Business & Strategy',
    tags: ['business', 'jtbd', 'product-strategy', 'value-prop'],
    template: `Construct a Jobs-To-Be-Done (JTBD) matrix for [target_customer] seeking to accomplish [functional_job]:
Map:
1. Functional, Social, and Emotional Jobs.
2. Pains (Risks, obstacles, bad feelings).
3. Gains (Desired outcomes and dream metrics).
4. Gain Creators & Pain Relievers offered by [our_solution].`,
    example: 'JTBD for Solo Founders managing accounting and quarterly corporate taxes.',
    notes: 'Aligns product feature roadmaps directly with core customer motivation.'
  },
  {
    id: 'univ-more-6',
    title: 'B2B Sales Battlecard & Competitive Positioning Matrix',
    category: 'Monetization & Sales',
    tags: ['monetization', 'sales', 'battlecard', 'competitors'],
    template: `Create a one-page Sales Battlecard against Competitor [competitor_name] for selling [our_product]:
Sections:
1. Quick Positioning & "Why We Win".
2. Landmines to Lay (questions to prompt the prospect to ask the competitor).
3. How to Defend against their top 2 claims.
4. "Gotcha" Feature Breakdown table.`,
    example: 'Sales battlecard against an expensive enterprise cloud provider for an agile self-hosted alternative.',
    notes: 'Arms sales reps with instant competitive counter-tactics.'
  },
  {
    id: 'univ-more-7',
    title: 'High-Converting Video Sales Letter (VSL) Script',
    category: 'Monetization & Sales',
    tags: ['monetization', 'vsl', 'copywriting', 'video', 'sales'],
    template: `Write a 5-minute High-Converting Video Sales Letter (VSL) script for [product_or_service]:
Arc:
1. Pattern-Interrupt Opening (0:00 - 0:45).
2. The Origin Story & Discovery (0:45 - 2:00).
3. The Secret Mechanism (2:00 - 3:15).
4. The Irresistible Offer & Risk-Free Guarantee (3:15 - 4:15).
5. Urgency & Call to Action (4:15 - 5:00).`,
    example: 'VSL for an executive prompt engineering masterclass.',
    notes: 'Direct-response video copywriting framework.'
  },
  {
    id: 'univ-more-8',
    title: 'Behavioral Psychology Pricing Decoy Architect',
    category: 'Monetization & Sales',
    tags: ['monetization', 'pricing', 'psychology', 'anchoring'],
    template: `Design an asymmetric 3-tier pricing decoy table for [product_name]:
Objective: Maximize adoption of Tier 2 (Target Tier).
Formulate price points, feature inclusions, and anchoring psychology where Tier 3 makes Tier 2 feel like an undeniable bargain.`,
    example: 'Pricing table for developer cloud workspace subscription.',
    notes: 'Applies Dan Ariely behavioral economics to pricing matrices.'
  },
  {
    id: 'univ-more-9',
    title: 'Systematic Literature Search Strategy (PRISMA)',
    category: 'Research & Synthesis',
    tags: ['research', 'prisma', 'systematic-review', 'academic'],
    template: `Design a PRISMA-compliant systematic review search string for:
Research Question: [research_question]
Databases: [pubmed_ieee_scopus_arxiv]
Generate:
- Boolean search queries with MeSH terms and truncation.
- Inclusion and exclusion criteria matrix.
- Quality appraisal checklist.`,
    example: 'Systematic review on the efficacy of spaced retrieval software in medical pharmacology education.',
    notes: 'Peer-review standard systematic review methodology.'
  },
  {
    id: 'univ-more-10',
    title: 'Statistical Causal Inference & DAG Modeler',
    category: 'Research & Synthesis',
    tags: ['research', 'statistics', 'causality', 'dag', 'econometrics'],
    template: `Construct a Directed Acyclic Graph (DAG) to evaluate the causal effect of [treatment_variable] on [outcome_variable]:
Potential Confounders: [confounding_factors]
Identify:
1. Confounders to adjust for (backdoor paths).
2. Colliders to avoid conditioning on (M-bias prevention).
3. Instrumental variables if unobserved confounding exists.`,
    example: 'Estimating the causal impact of early coding education on career lifetime earnings.',
    notes: 'Rigorous causal inference beyond mere statistical correlation.'
  },
  {
    id: 'univ-more-11',
    title: 'Viral Twitter / X Thread Hook & Architecture',
    category: 'Writing & Content',
    tags: ['writing', 'social-media', 'twitter', 'viral', 'threads'],
    template: `Write a high-converting 7-tweet thread breaking down [breakthrough_insight_or_system]:
Tweet 1: Irresistible curiosity-gap hook with social proof.
Tweets 2-5: Dense, actionable visual steps.
Tweet 6: Summary infographic prompt.
Tweet 7: Clear call to action (Retweet + Follow + Free resource).`,
    example: 'How to build an offline AI assistant on your Android phone using Termux and zero cloud APIs.',
    notes: 'Optimized for high reach, engagement, and profile conversion.'
  },
  {
    id: 'univ-more-12',
    title: 'Ghostwritten Op-Ed for Tier-1 Media Publication',
    category: 'Writing & Content',
    tags: ['writing', 'op-ed', 'journalism', 'thought-leadership'],
    template: `Draft an 800-word op-ed for [publication_name_e.g_wsj_or_wired] on the topic: "[op_ed_topic]"
Perspective: [author_executive_title]
Deliver a sharp, culturally timely thesis with vivid journalistic storytelling and undeniable policy recommendations.`,
    example: 'Why edge-native AI is the only way to preserve human privacy in the next computational era.',
    notes: 'New York Times / Wired standard opinion journalism.'
  },
  {
    id: 'univ-more-13',
    title: 'High-Impact Technical Case Study with Metrics',
    category: 'Writing & Content',
    tags: ['writing', 'case-study', 'b2b', 'marketing', 'proof'],
    template: `Write a customer success case study highlighting how [client_company] achieved [impressive_metric] using [our_platform]:
Sections:
1. Customer Challenge & Previous Cost.
2. The Solution Architecture.
3. The Results: 3 bold quantitative metric callouts.
4. Executive Quote and Future Expansion.`,
    example: 'How a healthcare startup cut patient data ingestion time by 92% using our offline SQLite vector database.',
    notes: 'Creates undeniable B2B sales collateral.'
  },
  {
    id: 'univ-more-14',
    title: 'Async Team Communication & RFC Protocol',
    category: 'Productivity & Systems',
    tags: ['productivity', 'rfc', 'async', 'remote-work', 'engineering'],
    template: `Draft a Request for Comments (RFC) template for proposing [architectural_change]:
Include:
- Summary & Motivation.
- Detailed Design & Trade-offs considered.
- Security, Privacy & Performance implications.
- Unresolved Questions & Decision Timeline.`,
    example: 'RFC for migrating engineering codebase from REST to gRPC microservices.',
    notes: 'Empowers high-velocity async decision-making in remote teams.'
  },
  {
    id: 'univ-more-15',
    title: 'Personal Energy & Circadian Rhythm Optimizer',
    category: 'Productivity & Systems',
    tags: ['productivity', 'circadian', 'health', 'energy', 'sleep'],
    template: `Design a daily circadian protocol tailored to a [chronotype_morning_lark_or_night_owl]:
Schedule:
1. Morning light exposure and cortisol spike timing.
2. Deep work cognitive focus windows.
3. Caffeine cut-off and physical exercise timing.
4. Evening wind-down and melatonin release optimization.`,
    example: 'Daily performance protocol for an engineer coding from 7:00 AM to 11:00 PM.',
    notes: 'Aligns cognitive output with biological peak energy windows.'
  },
  {
    id: 'univ-more-16',
    title: 'Executive Board Meeting Presentation Deck',
    category: 'Career & Leadership',
    tags: ['career', 'board-meeting', 'executive', 'governance'],
    template: `Structure an executive quarterly Board of Directors update presentation for [company_name]:
Deck Outline:
1. CEO Strategic Overview (Wins, Misses, Headwinds).
2. Financial Performance (ARR, Burn, Runway, Unit Economics).
3. Product & Technology Milestones.
4. Go-to-Market & Sales Pipeline.
5. Strategic Discussion Topic & Formal Approvals.`,
    example: 'Quarterly board presentation for a Series A AI infrastructure startup.',
    notes: 'Delivers clear, confident board updates that foster investor trust.'
  },
  {
    id: 'univ-more-17',
    title: 'Technical Mentorship & Career Pathing Framework',
    category: 'Career & Leadership',
    tags: ['career', 'mentorship', 'engineering-ladder', 'growth'],
    template: `Create an individual development plan (IDP) and mentorship roadmap for a [current_level] engineer aiming for [target_level]:
Develop:
- Competency matrix gap analysis (Technical Execution, Architectural Scope, Influence).
- 3 Quarterly Stretch Projects.
- Monthly milestone check-in questions.`,
    example: 'Mentorship plan for Mid-Level Engineer progressing to Senior Staff Systems Architect.',
    notes: 'Accelerates talent retention and team capability development.'
  },
  {
    id: 'univ-more-18',
    title: 'ClickHouse High-Throughput Analytics Schema',
    category: 'Data & Analytics',
    tags: ['data', 'clickhouse', 'olap', 'analytics', 'sql'],
    template: `Design a ClickHouse OLAP schema for ingesting [event_stream_type] at [events_per_second] rows/sec:
Specify:
1. Engine choice (\`ReplacingMergeTree\` / \`SummingMergeTree\`).
2. Partitioning and Primary Key / Sorting Key ordering for low-latency range queries.
3. Materialized Views for pre-aggregating hourly rollups.`,
    example: 'ClickHouse telemetry table ingesting 100,000 API request logs per second.',
    notes: 'Sub-second queries across billions of analytical records.'
  },
  {
    id: 'univ-more-19',
    title: 'Data Mesh Decentralized Domain Ownership Model',
    category: 'Data & Analytics',
    tags: ['data', 'data-mesh', 'governance', 'enterprise', 'architecture'],
    template: `Architect a Data Mesh transformation plan for [enterprise_organization]:
Domains: [domain_teams_list]
Define:
- Data Product Contracts (SLA, Schema, Output Ports).
- Self-Serve Data Infrastructure Platform capabilities.
- Federated Computational Governance policies.`,
    example: 'Data Mesh architecture for global retail company uniting Inventory, Marketing, and Checkout domains.',
    notes: 'Eliminates centralized data team bottlenecks.'
  },
  {
    id: 'univ-more-20',
    title: 'Accessible Mobile Touch Target & Interaction Spec',
    category: 'UI/UX & Design',
    tags: ['design', 'accessibility', 'mobile', 'touch', 'ux'],
    template: `Audit and redesign the mobile touch interaction model for [screen_type]:
Requirements:
1. Minimum 48x48dp interactive bounding boxes with 8dp clearance.
2. One-handed thumb-zone reachability optimization.
3. Accessible focus rings and dynamic screen-reader labels (\`accessibilityLabel\`).`,
    example: 'Mobile prompt vault detail screen with variable injection inputs and quick action buttons.',
    notes: 'Guarantees comfortable, accessible one-handed mobile use.'
  },
  {
    id: 'univ-more-21',
    title: 'Memory Palace (Method of Loci) Architectural Map',
    category: 'Learning & Mastery',
    tags: ['learning', 'memory-palace', 'mnemonics', 'retention'],
    template: `Construct a 20-station Memory Palace using [familiar_location] to memorize the following 20 complex items:
Items to Memorize:
[list_of_20_concepts]
For each station, create a vivid, absurd, multi-sensory mental visual anchor linking the location to the concept.`,
    example: 'Memorize the 20 fundamental design patterns (GoF) using your childhood home.',
    notes: 'Enables near-instant perfect recall of dense structural lists.'
  },
  {
    id: 'univ-more-22',
    title: 'Deep Meditation & Alpha Brainwave State Guide',
    category: 'Life & Strategy',
    tags: ['life', 'meditation', 'mindfulness', 'focus', 'flow'],
    template: `Guide a 15-minute somatic deep focus meditation designed to transition from high-stress Beta waves into relaxed, creative Alpha flow:
Include diaphragmatic breathing cues (4-7-8 rhythm), progressive body scan, and cognitive defusion exercises.`,
    example: 'Pre-coding focus calibration session for deep software architecture work.',
    notes: 'Calms sympathetic nervous system arousal and enhances creative clarity.'
  },
  {
    id: 'univ-more-23',
    title: 'Sci-Fi Hard Technology Spec & Propulsion Engine',
    category: 'Creative',
    tags: ['creative', 'sci-fi', 'hard-scifi', 'technology', 'worldbuilding'],
    template: `Design a hard sci-fi technological blueprint for [fictional_technology_concept]:
Anchor the mechanics in theoretical physics (e.g. Alcubierre metric, antimatter catalysis, quantum entanglement limits) with explicit engineering constraints and fuel requirements.`,
    example: 'Interstellar antimatter-ramjet propulsion drive operating at 0.15c with magnetic plasma shielding.',
    notes: 'Hard science fiction worldbuilding with strict physical realism.'
  },
  {
    id: 'univ-more-24',
    title: 'Folk Horror Ritual & Unsettling Rural Mystery',
    category: 'Horror',
    tags: ['horror', 'folk-horror', 'mystery', 'suspense', 'folklore'],
    template: `Write the lore and atmospheric opening scene for a folk horror narrative set in [isolated_rural_village]:
The Ancient Custom: [bizarre_seasonal_tradition]
The Outsider\'s Discovery: [unsettling_revelation]
Evoke themes of isolation, eerie pastoral beauty, and ancient pagan dread.`,
    example: 'A mountain village celebrating the "Harvest of the Silent Bell" where no one is allowed to speak after sundown.',
    notes: 'Atmospheric folk horror steeped in ritualistic dread.'
  },
  {
    id: 'univ-more-25',
    title: 'Termux Python REST API Daemon with Systemd/Termux-Services',
    category: 'Termux CLI',
    tags: ['termux', 'python', 'fastapi', 'services', 'daemon'],
    template: `Create an automated script to run a FastAPI / Uvicorn server as a persistent background daemon in Termux using \`termux-services\` / \`sv\`:
Configure auto-start on device boot with \`termux-boot\`, logging to \`~/.local/log\`, and health-check monitoring.`,
    example: 'Run a persistent Python microservice on port 8000 on Android with automatic background boot revival.',
    notes: 'Turns your Android phone into a 24/7 background server.'
  },
  {
    id: 'univ-more-26',
    title: 'Android 16 Secure Biometric Authentication Dialog',
    category: 'Android System',
    tags: ['android', 'biometrics', 'security', 'crypto', 'api36'],
    template: `Write a Kotlin Android 16 (API 36) biometric authentication manager using \`BiometricPrompt\` and \`KeyStore\`:
Features:
1. Support for Class 3 (Strong) Biometrics with hardware-backed AES cipher wrapping.
2. Device credential (PIN/Pattern) fallback handling.
3. Cryptographic authentication callback decrypting confidential vault payloads.`,
    example: 'Authenticate user with fingerprint before unlocking encrypted private keys in Android vault.',
    notes: 'Enterprise-grade on-device biometric security.'
  }
];
