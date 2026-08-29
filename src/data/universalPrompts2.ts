import { Prompt } from '../types';

export const universalPrompts2: Prompt[] = [
  // --- MONETIZATION & SALES (MONEY) ---
  {
    id: 'money-sales-1',
    title: 'High-Ticket Enterprise B2B Cold Outreach Script',
    category: 'Monetization & Sales',
    tags: ['monetization', 'sales', 'b2b', 'cold-email', 'enterprise', 'outbound'],
    template: `Write a high-converting 3-touch outbound cold sequence for [product_solution] targeting [target_persona_title] at [target_company_type].
Value Proposition: [primary_roi_benefit]
Social Proof: [case_study_metric]

Sequence Requirements:
- Touch 1 (The Trigger): Hyper-personalized observation, provocative insight into an unaddressed cost, soft interest ask. (Under 75 words).
- Touch 2 (The Proof): 2-sentence breakdown of how a peer company solved this exact bottleneck.
- Touch 3 (The Clean Breakup): Low-pressure exit with an evergreen asset link.
- Include 3 subject line variants with predicted open-rate rationales.`,
    example: 'Product: Automated SOC2 continuous compliance bot. Target: VP of Engineering at Series B SaaS. Benefit: Shaves 200 engineer-hours per audit.',
    notes: 'Optimized for high deliverability and conversation-starting responses from senior executives.'
  },
  {
    id: 'money-sales-2',
    title: 'Value-Based Pricing Tier & Packaging Calculator',
    category: 'Monetization & Sales',
    tags: ['monetization', 'pricing', 'packaging', 'saas', 'tiers', 'revenue'],
    template: `Design a 3-tier pricing and packaging strategy for [saas_product].
Core Value Metric: [usage_or_seat_metric]
Target Segments: Free/Starter, Growth/Pro, Enterprise.

Design:
1. Feature Allocation Matrix: Differentiate commodity features from high-willingness-to-pay enterprise gates (SSO, audit logs, SLAs).
2. Pricing Model: Flat base + usage overage rate calculations that align pricing with customer value expansion.
3. Decoy & Default Selection: Psychology driving 70% of self-serve users into the middle tier.
4. Annual Discounting: Optimal discount percentage (15-20%) maximizing upfront cash collections without degrading LTV.`,
    example: 'SaaS: Developer telemetry monitoring platform. Value metric: Ingested log gigabytes and retained query days.',
    notes: 'Maximizes Average Revenue Per Account (ARPA) and minimizes churn.'
  },
  {
    id: 'money-sales-3',
    title: 'Enterprise Negotiation & Objection Annihilator',
    category: 'Monetization & Sales',
    tags: ['monetization', 'sales', 'negotiation', 'objections', 'closing'],
    template: `Prepare a closing negotiation playbook for the following sales impasse:
Product: [solution_name]
Prospect Objection: [exact_objection_e.g_price_too_high_or_building_in_house]
Competitor / Alternative: [alternative_considered]
Deal Size: [annual_contract_value]

Provide:
1. Empathetic Disarming Statement: Neutralizing tension without conceding ground.
2. The Framing Shift: Re-anchoring the conversation from upfront price to total cost of inaction / risk of delay.
3. Concession Trade-off Menu: Never give a price discount without clawing back value (longer contract term, upfront payment, public case study).
4. Word-for-word closing script.`,
    example: 'Prospect says: "Your quote of $45,000/yr is 40% higher than competitor X, and our CFO will only approve matching their price."',
    notes: 'Protects gross margins during contentious procurement negotiations.'
  },
  {
    id: 'money-sales-4',
    title: 'High-Converting Landing Page Sales Letter (PAS Framework)',
    category: 'Monetization & Sales',
    tags: ['monetization', 'copywriting', 'landing-page', 'conversion', 'sales-copy'],
    template: `Write the above-the-fold and core conversion sections for [product_or_service_name].
Target Customer: [ideal_customer_profile]
Main Pain Point: [acute_daily_frustration]
Unique Mechanism: [how_product_works_uniquely]

Structure:
1. High-Contrast Headline & Subhead (Hook).
2. Problem (Agitation of the hidden costs and emotional burnout).
3. The Failed Traditional Workarounds.
4. Solution Reveal (The Unique Mechanism explained simply).
5. 3 Crisp Bullet Points with bold outcomes.
6. Primary CTA button with anxiety-reducing microcopy (e.g., "No credit card required • 2-min setup").`,
    example: 'Product: "Prompt Vault Studio" targeting AI engineers and creative power users tired of losing their best prompts in random text files.',
    notes: 'Standardized direct-response framework that consistently drives >15% conversion rates.'
  },
  {
    id: 'money-sales-5',
    title: 'Affiliate & Referral Partner Compensation Model',
    category: 'Monetization & Sales',
    tags: ['monetization', 'affiliate', 'referrals', 'partnerships', 'growth'],
    template: `Construct an affiliate and partner revenue-share program for [digital_product_or_course].
Gross Margin: [gross_margin_pct]
Average Order Value: [aov_amount]

Define:
1. Commission Tiers: Base affiliate vs Super-affiliate performance bonuses.
2. Cookie Duration & Attribution Rules: First-click vs Last-click vs Multi-touch with fraud safeguards.
3. Turnkey Partner Toolkit: Swipe emails, banner concepts, YouTube video outline, and Twitter/X threads.
4. Payout Automation & Tax Compliance checklist (1099/W-9/VAT).`,
    example: 'High-ticket masterclass on "Autonomous Agent Engineering". AOV: $997. 90% gross margin.',
    notes: 'Creates an army of motivated creators marketing your product on pure commission.'
  },

  // --- PRODUCTIVITY & SYSTEMS (PROD) ---
  {
    id: 'prod-sys-1',
    title: 'Eisenhower-Pareto Deep Work Day Architecture',
    category: 'Productivity & Systems',
    tags: ['productivity', 'time-management', 'deep-work', 'eisenhower', 'pareto'],
    template: `Transform the following chaotic task list into a mathematically prioritized daily execution schedule:

Task Backlog:
[raw_tasks_and_commitments]

Energy Peaks: [when_you_have_highest_focus_hours]
Hard Constraints: [fixed_meetings_and_deadlines]

Produce:
1. Eisenhower 2x2 Matrix classification (Urgent/Important).
2. Pareto 80/20 Identification: The single task that renders 50% of the others easier or irrelevant.
3. Time-Blocked Schedule: 90-minute ultradian rhythm deep work sprints paired with zero-context-switching batch processing.
4. Buffer blocks protecting against operational fires.`,
    example: 'Transform 14 open tasks across client coding, email inbox, tax filing, and product roadmap planning into a clean 8-hour workday.',
    notes: 'Prevents burnout and eliminates reactive context switching.'
  },
  {
    id: 'prod-sys-2',
    title: 'Standard Operating Procedure (SOP) & Delegation Protocol',
    category: 'Productivity & Systems',
    tags: ['productivity', 'sop', 'delegation', 'systems', 'operations', 'checklists'],
    template: `Write an idiot-proof Standard Operating Procedure (SOP) for [operational_workflow].
Target Operator: [skill_level_of_assistant_or_junior]

Include:
1. Purpose & Success Criteria: How the operator knows the task was executed with 100% perfection.
2. Required Tools & Access Credentials list.
3. Numbered Step-by-Step Execution Protocol with screenshots/formatting requirements.
4. "If-This-Then-That" Exception Handling tree for the top 4 failure scenarios.
5. Quality Assurance Checklist to sign off before marking complete.`,
    example: 'Workflow: "Publishing weekly technical podcast episodes to YouTube, Spotify, Apple Podcasts, and Substack newsletter".',
    notes: 'Enables painless delegation without micromanagement.'
  },
  {
    id: 'prod-sys-3',
    title: 'Personal Knowledge Management (PKM) Zettelkasten Synthesizer',
    category: 'Productivity & Systems',
    tags: ['productivity', 'pkm', 'zettelkasten', 'notes', 'obsidian', 'knowledge'],
    template: `Process the following raw literature notes or article highlight into atomic Zettelkasten evergreen notes:

Raw Input:
[raw_source_text]

Generate:
1. Atomic Core Note: A single self-contained idea expressed in 1-2 dense paragraphs in your own words.
2. Concept Title: Declarative statement of truth (e.g., "Compounding knowledge requires active retrieval over passive consumption").
3. Bidirectional Links: 3 related conceptual nodes this connects to.
4. Contradictions & Tensions: How does this challenge existing mental models?`,
    example: 'Processing insights from "Building a Second Brain" and Niklas Luhmann\'s sociological archive principles.',
    notes: 'Turns passive reading into an interconnected, compounding second brain.'
  },
  {
    id: 'prod-sys-4',
    title: 'Digital Minimalism & Attention Shield Audit',
    category: 'Productivity & Systems',
    tags: ['productivity', 'focus', 'minimalism', 'attention', 'habits'],
    template: `Conduct an attention leak and digital clutter audit on my current setup:
Daily Screen Time / Apps Used: [apps_and_hours_logged]
Primary Distraction Triggers: [triggers_e.g_social_media_slack_news]

Develop:
1. Friction Architecture: Specific friction barriers to insert (greyscale mode, app blockers, 24-char passwords).
2. Notification Hierarchy: Zero-tolerance notification policy allowing only tier-1 human emergencies.
3. Morning & Evening Offline Ramps: Establishing a 60-minute analog buffer before work and before sleep.
4. Dopamine Reset Protocol: A 7-day stepwise detox schedule.`,
    example: 'Screen time: 6h/day on phone (Twitter, Reddit, YouTube). Working on writing a technical book.',
    notes: 'Reclaims 2-3 hours of deep cognitive focus every single day.'
  },

  // --- CAREER & LEADERSHIP (CAREER) ---
  {
    id: 'career-lead-1',
    title: 'Staff/Principal Engineer Promotion Case & Impact Portfolio',
    category: 'Career & Leadership',
    tags: ['career', 'engineering', 'promotion', 'leadership', 'staff-engineer'],
    template: `Draft a compelling promotion dossier for advancing from [current_level] to [target_level_e.g_staff_or_principal].
Company Tier: [company_size_and_culture]
Major Projects Led: [projects_and_business_impact]
Mentorship & Culture Contributions: [mentorship_summary]

Structure:
1. Executive Summary: The overarching archetype (The Solver, The Architect, The Right Hand, The Tech Lead).
2. Scope & Organizational Blast Radius: Demonstrating cross-team, org-wide leverage and strategic alignment.
3. Measurable Business Outcomes: Cost savings, latency reductions, revenue unlocked, or risk mitigated.
4. Multiplying Others: Mentoring, RFC stewardship, and raising the engineering bar.
5. Peer Reviewer Recommendations: 3 suggested peer prompts to support the nomination.`,
    example: 'Senior to Staff Software Engineer promotion at 500-person fintech after leading multi-region database migration saving $1.2M/yr.',
    notes: 'Frames technical achievements in executive business language.'
  },
  {
    id: 'career-lead-2',
    title: 'FAANG-Style System Design & Behavioral Interview Master',
    category: 'Career & Leadership',
    tags: ['career', 'interview', 'system-design', 'star-method', 'faang'],
    template: `Conduct a rigorous mock interview evaluation for:
Role: [target_role]
Question / Scenario: [system_design_prompt_or_behavioral_story]
Candidate Response:
[candidate_draft_response]

Evaluate & Grade:
1. Scoring Rubric (1-5): Problem scoping, trade-off analysis, edge-case anticipation, communication clarity.
2. Critical Blindspots Missed: Single points of failure, scaling bottlenecks, or unaddressed stakeholder friction.
3. STAR Method Polish: Rewriting the behavioral story into a tight Situation-Task-Action-Result arc.
4. Model 10/10 Answer: The definitive benchmark response.`,
    example: 'System design question: "Design a globally distributed rate limiter handling 500k requests/sec with sub-millisecond p99 latency".',
    notes: 'Prepares candidates to ace elite Tier-1 technical and architectural interviews.'
  },
  {
    id: 'career-lead-3',
    title: 'Executive Compensation & Equity Package Negotiation',
    category: 'Career & Leadership',
    tags: ['career', 'negotiation', 'compensation', 'equity', 'salary'],
    template: `Formulate a compensation counter-offer script for:
Initial Offer: Base [base_salary], Bonus [bonus_pct], Equity [equity_grant_and_vesting], Sign-on [sign_on_bonus].
Target Desired Compensation: [target_total_comp]
Competing Offers / Leverage: [other_offers_or_current_tc]
Company Stage: [seed_series_a_or_public]

Provide:
1. Warm Appreciation & Enthusiasm anchor (never sound greedy or hostile).
2. The Mathematical Justification: Framing the request around market value and projected contribution value.
3. Strategic Lever Trade-offs: If base salary is fixed by band, shifting leverage to sign-on bonus, equity acceleration, or performance reviews at 6 months.
4. Word-for-word email and phone script.`,
    example: 'Received $185k base + $50k/yr RSUs from late-stage startup. Countering for $210k base + $80k RSUs citing competing offer.',
    notes: 'Routinely unlocks $20k-$80k in additional annual compensation.'
  },
  {
    id: 'career-lead-4',
    title: 'Crucial Conversations & Difficult Stakeholder Alignment',
    category: 'Career & Leadership',
    tags: ['career', 'communication', 'conflict-resolution', 'management', 'stakeholders'],
    template: `Map a high-stakes conversation to resolve the following conflict:
Context: [conflict_summary]
Difficult Stakeholder Personality: [stakeholder_behavior_traits]
Desired Outcome: [necessary_decision_or_boundary]

Design the Conversation Flow:
1. Create Psychological Safety: Establish mutual purpose and mutual respect upfront.
2. State the Uncontested Facts first (separate sensory facts from personal story/interpretation).
3. Express Your View tentatively without accusatory language.
4. Encourage Others' Paths: Ask open-ended questions to uncover their hidden constraints.
5. Action Commitments: Documenting who does what by when.`,
    example: 'Managing a VP of Product who constantly overrides sprint priorities with unvetted last-minute executive whims.',
    notes: 'De-escalates interpersonal friction while maintaining firm professional boundaries.'
  },

  // --- DATA & ANALYTICS (DATA) ---
  {
    id: 'data-anal-1',
    title: 'Advanced SQL Window Functions & Churn Cohort Engine',
    category: 'Data & Analytics',
    tags: ['data', 'sql', 'analytics', 'cohort-analysis', 'window-functions'],
    template: `Write an optimized SQL query to perform a month-over-month retention and churn cohort analysis for:
Database Dialect: [postgres_snowflake_bigquery_or_duckdb]
Table Name: [table_name_and_schema]
Timestamp Column: [timestamp_col]
User ID Column: [user_id_col]

Query Requirements:
1. Assign each user to their first-activity cohort month using window functions.
2. Compute subsequent active activity month intervals (Month 0, Month 1, Month 2... Month 12).
3. Return a clean cohort retention matrix with cohort size, retained active count, and percentage retention.
4. Handle edge cases where a user churns and reactivates later.`,
    example: 'Dialect: Snowflake. Table: app_events (user_id, event_name, event_timestamp). Compute 12-month cohort retention matrix.',
    notes: 'The industry-standard SQL query for evaluating true product retention curves.'
  },
  {
    id: 'data-anal-2',
    title: 'A/B Test Statistical Significance & Sample Size Calculator',
    category: 'Data & Analytics',
    tags: ['data', 'ab-testing', 'statistics', 'hypothesis-testing', 'conversion'],
    template: `Design and evaluate an A/B experimentation plan for:
Experiment Goal: [metric_being_tested]
Baseline Conversion Rate: [baseline_cr]
Minimum Detectable Effect (MDE): [mde_percentage]
Daily Traffic / Sample Rate: [daily_visitors]

Output:
1. Required Sample Size per variation (assuming Alpha = 0.05, Beta = 0.20 / Power = 80%).
2. Minimum runtime duration in days to account for day-of-week seasonality.
3. Statistical Test Selection (Two-tailed Z-test, Chi-Square, or Welch's t-test).
4. Guardrail Metrics to monitor for negative side-effects.
5. Post-Experiment Analysis template interpreting p-values and confidence intervals.`,
    example: 'Testing new checkout flow to lift purchase conversion from 3.2% baseline to 3.6% (12.5% MDE) with 5,000 daily visitors.',
    notes: 'Guarantees reliable statistical conclusions without premature stopping fallacies.'
  },
  {
    id: 'data-anal-3',
    title: 'Python Pandas & Polars Performance Optimizer',
    category: 'Data & Analytics',
    tags: ['data', 'python', 'pandas', 'polars', 'optimization', 'vectorization'],
    template: `Refactor the following slow Python data processing snippet:

\`\`\`python
[slow_python_script]
\`\`\`

Optimization Mandates:
1. Eliminate all \`iterrows()\`, \`apply()\`, and explicit Python for-loops in favor of vectorized operations.
2. Convert to \`polars\` lazy execution expressions where applicable for multi-threaded parallel execution.
3. Downcast memory footprints (e.g. \`float64\` -> \`float32\`, \`object\` -> \`category\`).
4. Benchmark comparison showing expected speedup and RAM reduction.`,
    example: 'Optimize 5M row DataFrame calculating rolling 30-day moving average and geo-distance between consecutive customer events.',
    notes: 'Reduces runtime from 10 minutes to sub-second execution.'
  },
  {
    id: 'data-anal-4',
    title: 'Automated Anomaly Detection & Metric Alerting Rule',
    category: 'Data & Analytics',
    tags: ['data', 'anomaly-detection', 'monitoring', 'time-series', 'alerting'],
    template: `Formulate an automated time-series anomaly detection algorithm for [business_or_system_metric].
Noise Characteristics: [seasonality_and_trend]

Define:
1. Baseline calculation model (e.g. Holt-Winters, STL decomposition, or Exponential Moving Average with Z-score bands).
2. Dynamic Thresholds: Handling weekday vs weekend seasonality without false positives.
3. Alert Classification: Warning vs Critical severity definitions.
4. Auto-Triage Runbook: Initial diagnosis queries triggered automatically when an alert fires.`,
    example: 'Metric: Hourly payment gateway transaction failure rate with diurnal traffic waves.',
    notes: 'Detects system outages and payment drops within minutes with zero alert fatigue.'
  }
];
