import { Prompt } from '../types';

export const universalPrompts1: Prompt[] = [
  // --- CODE & ARCHITECTURE (CODE) ---
  {
    id: 'code-arch-1',
    title: 'Clean Architecture Domain Model Synthesizer',
    category: 'Code & Architecture',
    tags: ['code', 'clean-architecture', 'domain-driven', 'ddd', 'typescript'],
    template: `Design a strict Domain-Driven Design (DDD) model for [domain_name].
Entities to model: [entity_list]
Language / Runtime: [target_language]

Requirements:
1. Value Objects: Implement immutable value objects with validation in constructors.
2. Aggregate Roots: Define boundaries and invariants that the root must protect.
3. Domain Events: Specify events emitted upon critical state transitions.
4. Repository Interfaces: Provide pure domain repository contracts with zero ORM/database leakage.
5. Provide executable code snippets demonstrating an invariant violation test.`,
    example: 'Design a DDD model for "Peer-to-Peer Escrow Payments". Entities: EscrowTransaction, DisputeClaim, ArbitratorVote. Language: TypeScript.',
    notes: 'Ensures pure domain boundaries without framework or persistence dependencies.'
  },
  {
    id: 'code-arch-2',
    title: 'High-Concurrency Event-Driven Worker Engine',
    category: 'Code & Architecture',
    tags: ['code', 'concurrency', 'events', 'kafka', 'workers', 'resilience'],
    template: `Architect a fault-tolerant, high-throughput consumer worker for [queue_system] processing [payload_type].
Throughput Target: [target_rps] messages/sec.
Requirements:
1. Backpressure handling and consumer group partition rebalancing strategy.
2. Idempotent deduplication mechanism using [storage_engine].
3. Dead-Letter Queue (DLQ) exponential backoff retry loop with circuit breaker.
4. Graceful shutdown handler capturing SIGTERM/SIGINT with in-flight drain.
5. Provide complete connection and worker loop code.`,
    example: 'Architect a worker for "Redis Streams" processing "Webhook Notifications". Target: 10,000 msg/sec. Storage: Redis + SQLite.',
    notes: 'Optimized for zero message loss and graceful node restarts.'
  },
  {
    id: 'code-arch-3',
    title: 'Database Schema & Query Index Optimizer',
    category: 'Code & Architecture',
    tags: ['code', 'sql', 'indexing', 'database', 'query-optimization'],
    template: `Analyze and optimize the following database schema and slow query:

Schema Definition:
[schema_sql]

Slow Query:
[query_sql]

Provide:
1. EXPLAIN ANALYZE interpretation & bottleneck diagnosis (e.g. Seq Scan vs Index Scan).
2. Recommended composite indexes (ordering of equality vs range columns).
3. Query rewrite (e.g. CTE vs JOIN vs EXISTS).
4. Partitioning or sharding strategy if table exceeds [table_size_records] rows.`,
    example: 'Optimize Postgres transactions table with 50M rows where SELECT * FROM transactions WHERE user_id = 42 AND created_at > NOW() - INTERVAL "30 days" ORDER BY created_at DESC takes 4.2s.',
    notes: 'Eliminates table scans and memory-intensive sort operations.'
  },
  {
    id: 'code-arch-4',
    title: 'Zero-Allocation Systems Code Reviewer',
    category: 'Code & Architecture',
    tags: ['code', 'performance', 'memory', 'zero-copy', 'systems'],
    template: `Review the following [language] snippet for memory allocations, cache locality, and latency overheads:

\`\`\`[language]
[code_snippet]
\`\`\`

Analysis Checklist:
1. Heap vs Stack allocation audit: Flag hidden boxing, closures, or dynamic buffers.
2. Cache line alignment & false sharing vectors across threads.
3. Zero-copy alternatives for buffer parsing (e.g. slices, string_view, memoryview).
4. Provide the refactored, benchmark-ready replacement code with comments explaining optimizations.`,
    example: 'Review Rust packet parser processing 1M UDP packets/sec for heap allocations in deserialization loop.',
    notes: 'Crucial for real-time networking, audio engines, and embedded systems.'
  },
  {
    id: 'code-arch-5',
    title: 'Full-Stack API Contract Generator (OpenAPI & Types)',
    category: 'Code & Architecture',
    tags: ['code', 'api', 'openapi', 'rest', 'contracts', 'typescript'],
    template: `Generate a production-ready OpenAPI 3.1 specification and matching TypeScript client types for:
Resource: [resource_name]
Operations: [crud_operations]
Authentication: [auth_scheme]

Include:
- Strict JSON Schema with regex validations, min/max limits, and error payloads (RFC 7807 Problem Details).
- Strongly typed request parameters, headers, query strings, and multipart file uploads if needed.
- Generated TypeScript interfaces with Zod / Valibot runtime schema validators.`,
    example: 'Resource: "SubscriptionBilling". Operations: Create checkout, cancel, list invoices, webhook handler. Auth: Bearer JWT.',
    notes: 'Guarantees type-safety between backend microservices and frontend clients.'
  },
  {
    id: 'code-arch-6',
    title: 'Micro-Frontend Modular Federation Blueprint',
    category: 'Code & Architecture',
    tags: ['code', 'frontend', 'webpack', 'module-federation', 'architecture'],
    template: `Formulate a Module Federation architecture connecting [host_app] with remote micro-apps: [remote_apps_list].
Framework: [framework_name]
Shared Singletons: [shared_libs]

Deliverables:
1. Host and Remote federation configuration files.
2. Cross-application state sharing and event bus protocol without global window pollution.
3. Fallback error boundaries when remote modules fail to load.
4. Route synchronization and deep-linking contract.`,
    example: 'Host: "Dashboard Shell", Remotes: ["AnalyticsApp", "BillingApp", "UserProfile"]. Framework: React 18 / Vite / Module Federation.',
    notes: 'Prevents version collision across independent deployable teams.'
  },
  {
    id: 'code-arch-7',
    title: 'Automated CI/CD Hermetic Build Pipeline',
    category: 'Code & Architecture',
    tags: ['code', 'devops', 'cicd', 'docker', 'security', 'github-actions'],
    template: `Write a hardened, deterministic CI/CD pipeline for [project_type] deploying to [target_cloud].
CI Engine: [ci_platform]

Pipeline Stages:
1. Hermetic container build with multi-stage caching and non-root user.
2. Static application security testing (SAST) & dependency vulnerability scanning.
3. Unit, integration, and end-to-end smoke tests with ephemeral database services.
4. Cryptographic artifact signing (e.g. Cosign / Sigstore) and SLSA Level 3 provenance.
5. Blue/Green zero-downtime deployment rollout script with auto-rollback triggers.`,
    example: 'Hardened pipeline for Node/Fastify API deploying to Google Cloud Run via GitHub Actions.',
    notes: 'Guarantees reproducible builds and zero-downtime rollouts.'
  },
  {
    id: 'code-arch-8',
    title: 'State Machine & Saga Orchestration Pattern',
    category: 'Code & Architecture',
    tags: ['code', 'state-machine', 'saga', 'distributed-systems', 'transactions'],
    template: `Model a distributed Saga transaction orchestrator for [business_process].
Services Involved: [services_list]

Define:
1. Forward transaction states and trigger conditions.
2. Compensating actions for every failure mode (reversals, refunds, release holds).
3. Outbox pattern implementation for reliable messaging over [broker_name].
4. State persistence schema tracking saga execution ID and correlation tokens.`,
    example: 'Saga for "Flight + Hotel + Car Booking". Services: FlightAPI, HotelAPI, PaymentGateway, NotificationService.',
    notes: 'Handles distributed multi-service consistency without two-phase commit locks.'
  },
  {
    id: 'code-arch-9',
    title: 'GraphQL Schema & DataLoader Resolver Matrix',
    category: 'Code & Architecture',
    tags: ['code', 'graphql', 'resolvers', 'dataloader', 'n-plus-one'],
    template: `Draft an optimized GraphQL SDL schema and batch DataLoader resolvers for [domain_name].
Types & Relationships: [type_graph]

Requirements:
1. SDL with strict nullability, cursor-based pagination (Relay spec), and custom scalars.
2. Batch DataLoader implementation eliminating N+1 query traps.
3. Authorization directive checking role claims at field-level.
4. Complexity calculation rule to prevent nested denial-of-service query bombs.`,
    example: 'GraphQL schema for "Social Learning Platform": Course -> Modules -> Lessons -> UserProgress.',
    notes: 'Prevents N+1 database queries while securing complex nested relations.'
  },
  {
    id: 'code-arch-10',
    title: 'Real-Time WebSocket Binary Protocol Encoder',
    category: 'Code & Architecture',
    tags: ['code', 'websockets', 'binary', 'protocol', 'low-latency'],
    template: `Design a high-efficiency binary serialization protocol for [realtime_usecase] over WebSockets.
Message Frequency: [messages_per_sec]
Payload Fields: [field_definitions]

Deliverables:
1. Byte-packing schema using ArrayBuffer / DataView / Protobuf / MessagePack.
2. Header byte definitions (magic byte, message type opcode, sequence ID, CRC16).
3. Client-side decoder and server-side parser implementation in [language].
4. Reconnection heartbeat and packet reordering buffer.`,
    example: 'Real-time multiplayer cursor and canvas stroke sync: x, y, pressure, color, tool_id, timestamp. Language: TypeScript/Node.js.',
    notes: 'Cuts network bandwidth by 85% compared to JSON string WebSockets.'
  },
  {
    id: 'code-arch-11',
    title: 'WebAssembly (Wasm) Native Module Bridge',
    category: 'Code & Architecture',
    tags: ['code', 'wasm', 'rust', 'c++', 'interop', 'web-workers'],
    template: `Create a high-performance WebAssembly integration between [source_language] and modern TypeScript.
Computation Task: [heavy_algorithm]

Steps:
1. Write the core compute function in [source_language] with memory safety.
2. Expose bindings with memory buffer pointers avoiding unnecessary serialization overhead.
3. Web Worker wrapper in TypeScript offloading computation from the main UI thread.
4. Benchmark comparison template measuring JS vs Wasm execution time.`,
    example: 'Source: Rust. Task: Fast Fourier Transform (FFT) on 48kHz audio PCM streams for live spectrogram UI.',
    notes: 'Unlocks native hardware performance inside web and hybrid mobile views.'
  },
  {
    id: 'code-arch-12',
    title: 'Secure Authentication & RBAC Policy Matrix',
    category: 'Code & Architecture',
    tags: ['code', 'security', 'auth', 'rbac', 'jwt', 'session'],
    template: `Architect a modern authentication and role-based access control (RBAC) engine for [app_type].
User Roles: [roles_list]
Auth Methods: [auth_methods]

Include:
1. Token rotation strategy (short-lived access tokens + refresh token fingerprinting in httpOnly cookies).
2. Permission bitmask or policy engine evaluating \`can(user, 'action', 'resource')\`.
3. Multi-tenant workspace isolation middleware ensuring cross-tenant data leakage is mathematically impossible.
4. Security checklist covering CSRF, CORS, replay attacks, and brute-force rate limiters.`,
    example: 'B2B SaaS with Owner, Admin, Member, Guest. Auth: Passkeys (WebAuthn) + Magic Link + Google SSO.',
    notes: 'Establishes enterprise-grade zero-trust access enforcement.'
  },

  // --- RESEARCH & SYNTHESIS (RSCH) ---
  {
    id: 'rsch-syn-1',
    title: 'Literature Review & Taxonomy Synthesis Engine',
    category: 'Research & Synthesis',
    tags: ['research', 'academic', 'literature-review', 'taxonomy', 'synthesis'],
    template: `Conduct a rigorous literature synthesis on [research_topic] across [source_domains].
Key Themes: [focus_areas]

Structure the synthesis:
1. Executive Abstract: Current scientific consensus, dominant paradigms, and breakthrough methodologies.
2. Comparative Taxonomy Table: Contrasting approaches, datasets, sample sizes, and empirical claims.
3. Methodological Flaws & Biases: Highlighting limitations, p-hacking risks, or confounding variables.
4. Unresolved Anomalies: The 3 most pressing research gaps ready for immediate novel investigation.`,
    example: 'Research topic: "Mechanistic Interpretability of Sparse Autoencoders in Transformer Attention Heads". Sources: arXiv 2024-2026, NeurIPS, ICLR.',
    notes: 'Transforms scattered papers into a structured, peer-review quality taxonomy.'
  },
  {
    id: 'rsch-syn-2',
    title: 'Patent & Prior Art Landscape Extractor',
    category: 'Research & Synthesis',
    tags: ['research', 'patent', 'prior-art', 'ip', 'innovation'],
    template: `Analyze the prior art landscape and patent claims for:
Invention Description: [invention_summary]
Key Novel Elements: [novel_features]
Industry / USPTO Classes: [industry_vertical]

Output:
1. Broad vs Narrow Claim mapping: Identify potential infringement vectors against dominant incumbents.
2. Novelty & Non-Obviousness arguments defending the unique technical differentiation.
3. Freedom-to-Operate (FTO) risk assessment.
4. Recommended dependent claims to fortify IP defensibility.`,
    example: 'Invention: "Zero-latency local acoustic neural codec streaming on ARM microcontroller using quantized integer weights".',
    notes: 'Essential for technical founders drafting IP filings and navigating competitor patents.'
  },
  {
    id: 'rsch-syn-3',
    title: 'Empirical Meta-Analysis & Effect Size Evaluator',
    category: 'Research & Synthesis',
    tags: ['research', 'statistics', 'meta-analysis', 'effect-size', 'data'],
    template: `Synthesize the statistical findings of multiple studies evaluating [intervention_or_hypothesis].
Studies / Data Points:
[studies_summary]

Analyze:
1. Pooled Effect Sizes: Calculate Cohen's d / Odds Ratios and 95% confidence intervals.
2. Heterogeneity Assessment: Interpret I² and Cochran's Q statistics.
3. Publication Bias Scan: Funnel plot asymmetry and Egger regression test implications.
4. Practical Significance: Translating statistical findings into concrete operational guidelines.`,
    example: 'Evaluating "Spaced Repetition Micro-Drills vs Continuous Immersion" for technical vocabulary retention in engineers.',
    notes: 'Extracts definitive conclusions from noisy, conflicting studies.'
  },
  {
    id: 'rsch-syn-4',
    title: 'Multi-Perspective Red Team Controversy Matrix',
    category: 'Research & Synthesis',
    tags: ['research', 'red-team', 'critical-thinking', 'debate', 'decision-making'],
    template: `Deconstruct the high-stakes controversy surrounding [complex_issue].

Produce a 4-Column Decision Matrix:
1. Steelmanned Proponent Thesis: Strongest empirical and philosophical defense with top citations.
2. Steelmanned Skeptic Rebuttal: Core vulnerabilities, second-order consequences, and hidden costs.
3. Epistemic Uncertainty & Data Gaps: What data is currently missing that would decisively resolve the debate?
4. Pragmatic Synthesis: The optimal risk-weighted heuristic to adopt today under conditions of uncertainty.`,
    example: 'Issue: "Centralized Autonomous AI Agents in High-Frequency Algorithmic Energy Grid Balancing".',
    notes: 'Eliminates confirmation bias by steelmanning opposing expert stances.'
  },
  {
    id: 'rsch-syn-5',
    title: 'First-Principles Technical Feasibility Deconstruction',
    category: 'Research & Synthesis',
    tags: ['research', 'first-principles', 'physics', 'engineering', 'feasibility'],
    template: `Perform a first-principles thermodynamic and computational feasibility analysis for:
Proposed Technology: [technology_concept]
Target Performance: [performance_goal]
Resource Budget: [budget_or_energy_limits]

Analyze:
1. Theoretical Limits: Landauer limit, Carnot efficiency, Shannon capacity, or relevant fundamental laws.
2. Scaling Bottlenecks: Thermal dissipation, memory bandwidth, latency, or material degradation.
3. Order-of-Magnitude Fermi Estimation: Step-by-step calculation validating whether the goal is physically possible.
4. Critical Milestones to prove Minimum Viable Proof-of-Concept.`,
    example: 'Technology: "Photonic Tensor Cores for 100x LLM Inference Energy Reduction". Target: 10,000 tokens/watt.',
    notes: 'Tests moonshot technical claims against immutable physics and engineering realities.'
  },

  // --- WRITING & CONTENT (WRITE) ---
  {
    id: 'write-cnt-1',
    title: 'Long-Form Authority Whitepaper Architect',
    category: 'Writing & Content',
    tags: ['writing', 'whitepaper', 'thought-leadership', 'technical-writing'],
    template: `Draft an authoritative 2,000-word industry whitepaper on [subject_matter].
Target Audience: [executive_audience]
Core Thesis: [core_thesis]
Key Data Points: [evidence_points]

Formatting Rules:
- Style: Crisp, rigorous, McKinsey-meets-Stripe technical prose. Zero fluff or generic buzzwords.
- Structure:
  1. Executive Summary & Market Inflection Point.
  2. The Structural Failure of Legacy Paradigms.
  3. The New Architecture: Principles & Implementation Blueprint.
  4. Empirical ROI & Quantitative Case Studies.
  5. The 5-Year Outlook & Strategic Mandate.`,
    example: 'Subject: "The Migration to Edge-Native Local SLMs in Regulated Healthcare Applications". Audience: Chief Medical Information Officers & VPs of Engineering.',
    notes: 'Generates board-level technical whitepapers that establish undeniable market authority.'
  },
  {
    id: 'write-cnt-2',
    title: 'Viral Technical Narrative & Case Study Hook',
    category: 'Writing & Content',
    tags: ['writing', 'storytelling', 'case-study', 'growth', 'narrative'],
    template: `Write a compelling post-mortem case study detailing how [team_name] solved [impossible_crisis].
Key Stakes: [stakes_and_timeline]
The Turning Point: [pivot_moment]
Key Metric Achieved: [final_outcome]

Narrative Architecture:
1. The Hook: Open in media res at the moment of highest tension.
2. The False Starts: What obvious solutions failed and why.
3. The Radical Insight: The counter-intuitive technical discovery.
4. The Implementation: Specific architecture changes with code/diagram descriptions.
5. The Takeaway: 3 universal principles any engineer can apply tomorrow.`,
    example: 'How our 3-person team survived an 800Gbps DDoS attack during Black Friday launch by rewriting our routing layer in eBPF.',
    notes: 'Builds viral technical credibility with zero self-congratulatory fluff.'
  },
  {
    id: 'write-cnt-3',
    title: 'High-Converting Technical Product Documentation',
    category: 'Writing & Content',
    tags: ['writing', 'documentation', 'developer-experience', 'dx', 'tutorials'],
    template: `Create world-class developer documentation for [feature_or_sdk_module].
Audience Experience: [developer_level]

Structure:
1. Quickstart: 30-second copy-pasteable minimal working example (MWE).
2. Deep Dive: Architectural diagram flow explaining under-the-hood behavior.
3. Configuration Reference: Table of options with types, defaults, and security warnings.
4. Edge Case Recipes: Handling offline modes, retry loops, and rate limit errors.
5. Troubleshooting Matrix: Top 5 common errors and exact fixes.`,
    example: 'Feature: "Optimistic Offline Mutations SDK for Mobile React Native Apps". Level: Senior Frontend Engineers.',
    notes: 'Prioritizes immediate time-to-first-successful-API-call for developer adoption.'
  },
  {
    id: 'write-cnt-4',
    title: 'Persuasive Executive Decision Memo (Amazon PR/FAQ Style)',
    category: 'Writing & Content',
    tags: ['writing', 'amazon-style', 'pr-faq', 'executive', 'proposals'],
    template: `Draft an Amazon-style 6-page PR/FAQ memo proposing:
Initiative: [initiative_name]
Problem Statement: [customer_pain_point]
Proposed Solution: [product_solution]
Investment Required: [team_and_budget]

Sections:
1. Press Release (Future Date): Headline, subheadline, customer quote, and problem-solution description.
2. Internal FAQ: Hardest questions from CFO, VP Eng, and Legal with direct quantitative answers.
3. Customer FAQ: Pricing, migration simplicity, and privacy guarantees.
4. Tenets & Principles governing product trade-offs.`,
    example: 'Propose: "Open-Sourcing our Core Vector Index Engine to Drive Enterprise Cloud Revenue".',
    notes: 'Aligns stakeholders by rigorously pressure-testing proposals before building.'
  },
  {
    id: 'write-cnt-5',
    title: 'Micro-Essay & LinkedIn High-Signal Carousel Script',
    category: 'Writing & Content',
    tags: ['writing', 'social', 'linkedin', 'micro-essay', 'personal-brand'],
    template: `Write a high-signal 8-slide visual carousel script breaking down [contrarian_topic].
Target Audience: [professional_niche]

Slide-by-Slide Blueprint:
- Slide 1: High-contrast contrarian hook stopping the scroll.
- Slide 2: The conventional wisdom and why it is mathematically obsolete.
- Slide 3-5: The 3 foundational pillars of the new framework with visual layout notes.
- Slide 6: A concrete "Before vs After" metric comparison.
- Slide 7: The common mistake 90% of practitioners make when trying this.
- Slide 8: Actionable 1-step implementation mandate + save/repost CTA.`,
    example: 'Contrarian topic: "Why 99% of RAG architectures are over-engineered and a 200-line SQLite BM25 search out-performs them".',
    notes: 'Optimized for high bookmarking, sharing, and industry engagement.'
  },

  // --- BUSINESS & STRATEGY (BIZ) ---
  {
    id: 'biz-strat-1',
    title: 'Blue Ocean Strategy & Value Curve Matrix',
    category: 'Business & Strategy',
    tags: ['business', 'strategy', 'blue-ocean', 'differentiation', 'competitive-moat'],
    template: `Construct a Blue Ocean Strategy analysis for [venture_idea] entering the [industry_market] space.
Incumbents: [incumbent_competitors]

Execute:
1. Industry Value Curve: Identify the 6-8 standard factors of competition currently fought over.
2. The Four Actions Framework (ERRC):
   - ELIMINATE: Factors taken for granted that cost money with low customer value.
   - REDUCE: Factors over-designed in the race to beat competitors.
   - RAISE: Factors that should be lifted well above the industry standard.
   - CREATE: Entirely new factors never before offered by incumbents.
3. Compelling Tagline & Core Moat: Define the defensible advantage that prevents copycats.`,
    example: 'Venture: "Zero-latency local audio AI recorder with instant hardware transcription". Industry: B2B Meeting Notes Software.',
    notes: 'Breaks out of red ocean price wars by discovering uncontested market space.'
  },
  {
    id: 'biz-strat-2',
    title: 'Unit Economics & CAC/LTV Flywheel Engine',
    category: 'Business & Strategy',
    tags: ['business', 'finance', 'unit-economics', 'cac', 'ltv', 'saas'],
    template: `Build a rigorous unit economics and financial viability model for:
Business Model: [pricing_and_delivery_model]
Target Customer: [icp_definition]
Expected Price: [price_point]

Calculate & Model:
1. Customer Acquisition Cost (CAC) across organic, outbound, and paid channels.
2. Lifetime Value (LTV) incorporating churn decay curves, gross margins, and expansion revenue.
3. CAC Payback Period (in months) and LTV:CAC ratio benchmarks.
4. Sensitivity Analysis: How a 15% increase in churn or 20% drop in conversion affects cash runway.`,
    example: 'B2B SaaS charging $199/mo per seat for automated compliance audits targeting series A/B startups.',
    notes: 'Validates capital efficiency and investor pitch deck financial models.'
  },
  {
    id: 'biz-strat-3',
    title: 'Product-Led Growth (PLG) Onboarding Funnel Teardown',
    category: 'Business & Strategy',
    tags: ['business', 'plg', 'growth', 'onboarding', 'activation'],
    template: `Design a frictionless Product-Led Growth (PLG) activation funnel for [product_name].
Target "Aha!" Moment: [aha_moment_definition]

Map the User Journey:
1. Pre-Signup Value: How to provide value BEFORE asking for an email/credit card.
2. The 60-Second Setup: Step-by-step elimination of friction fields and confirmation roadblocks.
3. Contextual Guided Workflows: Empty state replacements, sample data, and micro-delights.
4. Viral Loops & Collaboration Triggers: Natural sharing incentives baked into the workflow.
5. Retention Triggers: Smart notifications driven by real user value, not spam.`,
    example: 'PLG Funnel for "Prompt Vault Studio": Instant browser demo with 267 pre-loaded prompts, 1-click clipboard copy, and zero signup friction.',
    notes: 'Maximizes self-serve conversion and viral word-of-mouth adoption.'
  },
  {
    id: 'biz-strat-4',
    title: 'Strategic M&A and Defensive Acquisition Due Diligence',
    category: 'Business & Strategy',
    tags: ['business', 'm&a', 'due-diligence', 'valuation', 'acquisition'],
    template: `Conduct a strategic acquisition due diligence evaluation on:
Target Company: [target_company_profile]
Acquiring Corporation: [acquirer_profile]
Strategic Rationale: [acquisition_goal]

Deliverables:
1. Technical Due Diligence: Code quality, technical debt, open-source license risks, and security audits.
2. Customer Concentration & Churn Analysis: Revenue durability under ownership transition.
3. Cultural & Talent Retention Plan: Golden handcuffs and key engineer retention packages.
4. Synergies Valuation: Cost synergies (redundancy removal) vs Revenue synergies (cross-selling).`,
    example: 'Enterprise Security firm acquiring a 12-person startup building eBPF-based container threat detection.',
    notes: 'Identifies hidden liabilities and validates valuation multiples before signing terms.'
  },
  {
    id: 'biz-strat-5',
    title: '7 Powers Market Defensibility Audit',
    category: 'Business & Strategy',
    tags: ['business', '7-powers', 'moats', 'helmer', 'defensibility'],
    template: `Evaluate [business_name] across Hamilton Helmer's "7 Powers" of business defensibility:

Audit Checklist:
1. Scale Economies: Does cost per unit decrease with volume in a way competitors cannot match?
2. Network Effects: Does the service become more valuable to each user as new users join?
3. Counter-Positioning: Does the business adopt a model that incumbents cannot copy without destroying their existing core profits?
4. Switching Costs: What is the financial and operational barrier for a customer to migrate away?
5. Branding: Is there durable, pricing-power-granting trust?
6. Cornered Resource: Does the business possess proprietary IP, talent, or raw material access?
7. Process Power: Are there complex, company-wide operational routines that cannot be replicated from the outside?

Score each power (1-10) and define the roadmap to unlock 2 additional powers over the next 24 months.`,
    example: 'Evaluate "Local-First AI Coding IDE with On-Device Models and Zero Telemetry".',
    notes: 'The definitive framework for predicting long-term enterprise market dominance.'
  }
];
