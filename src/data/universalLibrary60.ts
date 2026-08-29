import { Prompt } from '../types';

export const universalLibrary60: Prompt[] = [
  // --- PROMPT & META (PROMPT / META) ---
  {
    id: 'meta-univ-1',
    title: 'Self-Refining Recursive Prompt Polisher',
    category: 'Meta Prompts',
    tags: ['meta', 'recursion', 'optimization', 'refinement'],
    template: `Act as a Meta-Prompt Optimizer. Take this draft prompt: "[draft_prompt]"
Iterate across 3 generation loops:
Loop 1: Expand implicit assumptions and add missing context slots.
Loop 2: Inject negative constraints and deterministic formatting rules.
Loop 3: Compress tokens while maximizing semantic density.
Output the finalized production prompt and a benchmark checklist.`,
    example: 'Draft: "Write me an email asking my boss for a raise."',
    notes: 'Maximizes output quality through 3 recursive refinement passes.'
  },
  {
    id: 'meta-univ-2',
    title: 'Few-Shot Calibration & Boundary Probe',
    category: 'Prompt Engineering',
    tags: ['prompt-engineering', 'few-shot', 'calibration', 'accuracy'],
    template: `Generate 5 contrasting few-shot exemplar pairs for the following task: [task_description]
Pair 1: Simple nominal case.
Pair 2: Complex multi-entity case.
Pair 3: Ambiguous edge case with correct conservative refusal.
Pair 4: Adversarial trick case with correct constraint adherence.
Pair 5: Formatting boundary case.`,
    example: 'Task: Extracting medical dosage and frequency from messy physician voice notes.',
    notes: 'Calibrates model decision boundaries against tricky edge cases.'
  },
  {
    id: 'meta-univ-3',
    title: 'Chain-of-Verification (CoVe) Fact Checker',
    category: 'Prompt Engineering',
    tags: ['prompt-engineering', 'fact-checking', 'cove', 'hallucination-reduction'],
    template: `Given the following factual draft: "[draft_text]"
Execute Chain-of-Verification:
1. Baseline Generation: Identify all discrete factual claims.
2. Verification Questions: Formulate 4 targeted questions to verify each claim independently.
3. Verification Execution: Answer each verification question objectively without seeing the draft.
4. Final Synthesis: Correct any hallucinations or inaccuracies and produce a verified text.`,
    example: 'Verifying historical timeline claims in an article about the development of the transistor at Bell Labs.',
    notes: 'Drastically reduces factual hallucination rates.'
  },
  {
    id: 'meta-univ-4',
    title: 'Dynamic System Role & Guardrail Binder',
    category: 'Meta Prompts',
    tags: ['meta', 'system-prompt', 'persona', 'guardrails'],
    template: `Synthesize an enterprise system prompt for an AI assistant acting as [role_title] at [organization_type].
Primary Mission: [mission_statement]
Permitted Capabilities: [allowed_actions]
Strict Prohibitions: [forbidden_topics_or_actions]
Tone Guidelines: [tone_attributes]
Output formatted with clear XML tags (<instructions>, <rules>, <output_format>).`,
    example: 'Role: Senior Financial Risk Advisor at a Tier-1 Investment Bank. Forbidden: Giving specific stock purchase advice.',
    notes: 'Standardizes enterprise agent behavior and compliance boundaries.'
  },

  // --- ANDROID & TERMUX (AND / TERMUX CLI) ---
  {
    id: 'and-univ-1',
    title: 'Termux Zsh & Oh-My-Zsh Power-User Setup',
    category: 'Termux CLI',
    tags: ['termux', 'zsh', 'terminal', 'productivity', 'shell'],
    template: `Write an automated Termux setup script to install and configure Zsh, Starship prompt, and essential plugins:
Plugins: [zsh_autosuggestions_syntax_highlighting_fzf]
Color Theme: [theme_preference]
Include aliases for git, system monitoring, and quick package updates. Ensure zero manual prompts during execution.`,
    example: 'Setup modern Starship prompt with zsh-autosuggestions, fzf fuzzy search, and Neovim on Android Termux.',
    notes: 'Instantly creates a slick, modern terminal development environment on mobile.'
  },
  {
    id: 'and-univ-2',
    title: 'Android 16 Dynamic Colors & Material You Engine',
    category: 'Android System',
    tags: ['android', 'material-you', 'dynamic-colors', 'compose', 'api36'],
    template: `Implement dynamic Material You color theming in Android 16 (API 36) using Jetpack Compose:
Requirements:
1. Detect and apply \`dynamicLightColorScheme\` and \`dynamicDarkColorScheme\` on supported devices.
2. Fallback to custom brand palette on legacy versions.
3. Live preview composable showing button, card, and surface luminance pairings.`,
    example: 'Material 3 dynamic color theming for Android 16 with custom dark fallback scheme.',
    notes: 'Ensures native wallpaper-based color harmony across Android 12 through 16.'
  },
  {
    id: 'and-univ-3',
    title: 'Termux Python Machine Learning Stack Setup',
    category: 'Termux CLI',
    tags: ['termux', 'python', 'numpy', 'scipy', 'machine-learning'],
    template: `Generate a script to compile and install \`numpy\`, \`scipy\`, \`pandas\`, and \`scikit-learn\` in Termux without broken wheel errors:
Include clang, openblas, and liblapack prerequisites. Add a verification benchmark running matrix multiplication.`,
    example: 'Compile OpenBLAS-accelerated NumPy and Pandas on Android ARM64 in Termux.',
    notes: 'Solves complex C/Fortran wheel build issues on mobile ARM64 environments.'
  },
  {
    id: 'and-univ-4',
    title: 'Android 16 Photo Picker & Scoped Storage Migration',
    category: 'Android System',
    tags: ['android', 'storage', 'photo-picker', 'privacy', 'api36'],
    template: `Write a modern Android 16 Kotlin media selector using \`ActivityResultContracts.PickVisualMedia\`:
Features:
1. Multi-photo selection with max limit [max_items].
2. Zero storage permission requirements (privacy-first).
3. Image decoding into optimized downsampled bitmaps to prevent OutOfMemory errors.`,
    example: 'Select up to 10 photos in Android 16 and compress for secure offline vault storage.',
    notes: 'Full compliance with Google Play scoped storage and privacy policies.'
  },

  // --- MONETIZATION & SALES (MONEY) ---
  {
    id: 'money-univ-1',
    title: 'SaaS Churn Prevention & Winback Campaign',
    category: 'Monetization & Sales',
    tags: ['monetization', 'churn', 'retention', 'saas', 'email'],
    template: `Write a 3-part winback email sequence for customers who cancelled their [product_type] subscription:
Cancellation Reason: [price_lack_of_use_or_missing_feature]
Special Incentive: [discount_free_consult_or_new_feature_demo]
Design a compassionate, non-pushy sequence that uncovers genuine feedback while offering an irresistible reactivation hook.`,
    example: 'Product: $49/mo AI Social Media Scheduler. Reason: "Not using it enough". Incentive: 50% off for 3 months + 1-on-1 setup call.',
    notes: 'Recovers 12-18% of churned subscription revenue.'
  },
  {
    id: 'money-univ-2',
    title: 'High-Ticket Agency Discovery Call Script',
    category: 'Monetization & Sales',
    tags: ['monetization', 'sales', 'discovery', 'closing', 'consulting'],
    template: `Create a 30-minute discovery call framework for selling [service_offering] ($[deal_size] deal size):
Structure:
1. Setting the Agenda & Establishing Dominance/Rapport.
2. Uncovering the Bleeding Neck Problem (Current State vs Desired Future State).
3. The Cost of Inaction (Quantifying the financial hemorrhage of waiting 6 months).
4. Transitioning to the Solution Pitch and securing next-step commitment.`,
    example: 'Selling $15,000/mo Custom AI Automation Retainers to mid-market logistics companies.',
    notes: 'Converts discovery calls into qualified high-ticket proposals.'
  },
  {
    id: 'money-univ-3',
    title: 'Upsell & Cross-Sell In-App Trigger Matrix',
    category: 'Monetization & Sales',
    tags: ['monetization', 'upsell', 'expansion', 'revenue', 'growth'],
    template: `Design 4 contextual in-app upgrade triggers for [freemium_app]:
Triggers:
1. Value Threshold Reached (e.g. 80% usage of quota).
2. Advanced Feature Curiosity (clicking a locked pro toggle).
3. Collaboration Friction (inviting a 3rd team member).
4. Milestone Celebration (achieving a key business outcome).
Provide the exact modal copy and CTA micro-text for each trigger.`,
    example: 'Freemium Prompt Vault: Free users hit 50 saved prompts -> trigger Pro Cloud Sync upgrade modal.',
    notes: 'Drives frictionless self-serve expansion revenue.'
  },

  // --- RESEARCH & SYNTHESIS (RSCH) ---
  {
    id: 'rsch-univ-1',
    title: 'Competitive Intelligence & War Game Simulation',
    category: 'Research & Synthesis',
    tags: ['research', 'strategy', 'competitive-analysis', 'war-games'],
    template: `Simulate a competitive strategic response between [our_company] and [rival_competitor]:
Event: [market_disruption_or_product_launch]
Analyze:
1. Competitor\'s Likely Counter-Move (Pricing, PR, Product clone, or Litigation).
2. Asymmetric Advantages we can leverage to neutralize their response.
3. 90-Day Defense & Attack Action Matrix.`,
    example: 'Our local-first AI IDE launches vs a major cloud incumbent slashing API prices by 80%.',
    notes: 'Anticipates competitor maneuvers before they happen.'
  },
  {
    id: 'rsch-univ-2',
    title: 'Historical Case Study & Mental Model Extractor',
    category: 'Research & Synthesis',
    tags: ['research', 'history', 'mental-models', 'case-study'],
    template: `Analyze the historical event: [historical_event_or_campaign]
Extract:
1. The Core Strategic Pivot Point.
2. The Cognitive Biases that blinded the losing side.
3. 3 Timeless Mental Models applicable to modern business and technology leadership.`,
    example: 'The Battle of Midway and the role of decentralized tactical decision-making under information uncertainty.',
    notes: 'Applies timeless historical strategy to modern high-stakes decisions.'
  },

  // --- CODE & ARCHITECTURE (CODE) ---
  {
    id: 'code-univ-1',
    title: 'Async Rust Web Service with Tokio & Axum',
    category: 'Code & Architecture',
    tags: ['code', 'rust', 'axum', 'tokio', 'backend'],
    template: `Scaffold a production-grade async REST API in Rust using Axum and Tokio:
Endpoints: [crud_endpoints]
Features:
1. Connection pooling with SQLx (PostgreSQL).
2. Structured JSON error responses with custom \`AppError\` enum.
3. JWT Authentication middleware extracting user context into request extensions.
4. Health check and Prometheus metrics endpoint.`,
    example: 'High-throughput Rust microservice for validating and logging API authentication tokens.',
    notes: 'Sub-millisecond latency with fearless concurrency and memory safety.'
  },
  {
    id: 'code-univ-2',
    title: 'React Concurrent Mode & Suspense Architecture',
    category: 'Code & Architecture',
    tags: ['code', 'react', 'suspense', 'performance', 'frontend'],
    template: `Refactor the following React component tree to leverage React 18+ Suspense and Transitions:
Components: [data_heavy_components]
Requirements:
1. Implement \`useTransition\` for non-blocking search filtering.
2. Suspense boundaries with skeleton loaders preventing layout shifts.
3. Error Boundary with retry capabilities.`,
    example: 'Heavy data table filtering 5,000 prompt records with live search input and category chips.',
    notes: 'Keeps UI 100% responsive during intensive client-side state updates.'
  },
  {
    id: 'code-univ-3',
    title: 'Infrastructure as Code (Terraform) Cloud Architecture',
    category: 'Code & Architecture',
    tags: ['code', 'terraform', 'cloud', 'aws', 'gcp', 'devops'],
    template: `Write modular Terraform (HCL) configurations for deploying [architecture_spec] on [cloud_provider]:
Include:
- VPC with public/private subnets across 3 Availability Zones.
- Auto-scaling container cluster (ECS/Cloud Run) behind an Application Load Balancer.
- Managed PostgreSQL database with automated backups and read replicas.
- Remote state management with S3/GCS bucket and state locking.`,
    example: 'Deploy multi-region containerized API on Google Cloud Run with Cloud SQL Postgres and Cloudflare CDN.',
    notes: 'Enforces reproducible, version-controlled cloud infrastructure.'
  },

  // --- WRITING & CONTENT (WRITE) ---
  {
    id: 'write-univ-1',
    title: 'Contrarian Newsletter Essay & Thought Piece',
    category: 'Writing & Content',
    tags: ['writing', 'newsletter', 'essay', 'thought-leadership'],
    template: `Write a compelling 1,200-word newsletter essay exploring why "[contrarian_thesis]" is true:
Audience: [target_readers]
Structure:
1. The Absurd Reality: An opening story highlighting the absurdity of current consensus.
2. The Hidden Driver: The economic or psychological force driving the misconception.
3. The Alternative Path: A practical 3-part blueprint for forward-thinking practitioners.
4. Memorable closing quote and discussion prompt.`,
    example: 'Thesis: "Specialization is for insects: Why generalist systems thinkers will dominate the AI era."',
    notes: 'Drives high newsletter engagement, open rates, and social shares.'
  },
  {
    id: 'write-univ-2',
    title: 'Podcast Episode Outline & Interview Prep Sheet',
    category: 'Writing & Content',
    tags: ['writing', 'podcast', 'interview', 'content', 'audio'],
    template: `Create an interview prep brief and question flow for hosting [guest_name_and_title]:
Topic: [episode_theme]
Guest Background: [guest_achievements]
Include:
- 3 provocative warm-up questions uncovering untold stories.
- 4 deep-dive technical questions dissecting their specific methodology.
- Rapid-fire lightning round questions.
- Host introduction and outro sponsorship sponsor read script.`,
    example: 'Interviewing a creator of a popular open-source Android development toolkit.',
    notes: 'Ensures engaging, high-signal conversations with world-class guests.'
  },

  // --- BUSINESS & STRATEGY (BIZ) ---
  {
    id: 'biz-univ-1',
    title: 'SaaS Financial Model & Burn Multiple Tracker',
    category: 'Business & Strategy',
    tags: ['business', 'finance', 'burn-multiple', 'metrics', 'saas'],
    template: `Build a monthly financial projection model for [startup_name] over 24 months:
Current Metrics: ARR $[current_arr], Monthly Burn $[monthly_burn], Runway [runway_months] months.
Calculate:
1. Net Burn vs Net New ARR (Burn Multiple efficiency ratio).
2. Headcount hiring plan vs revenue per employee.
3. Cash-out date and required Series A milestones to fundraise safely.`,
    example: 'B2B SaaS at $30k MRR burning $25k/mo planning to hire 2 engineers and 1 sales lead.',
    notes: 'Crucial for capital allocation and maintaining investor confidence.'
  },
  {
    id: 'biz-univ-2',
    title: 'Enterprise Vendor Security Questionnaire Response Guide',
    category: 'Business & Strategy',
    tags: ['business', 'security', 'enterprise', 'compliance', 'sales'],
    template: `Draft authoritative responses for enterprise security and vendor risk questions regarding:
Topic: [data_encryption_retention_and_access_control]
Certifications: [soc2_iso27001_hipaa_gdpr]
Provide clear, compliant answers that pass enterprise InfoSec reviews without stalling deals.`,
    example: 'Answering enterprise vendor security queries about client data isolation, encryption at rest (AES-256), and zero LLM training on customer inputs.',
    notes: 'Removes enterprise procurement roadblocks and speeds up sales cycles.'
  },

  // --- PRODUCTIVITY & SYSTEMS (PROD) ---
  {
    id: 'prod-univ-1',
    title: 'Weekly Review & Strategic Reset Protocol (GTD)',
    category: 'Productivity & Systems',
    tags: ['productivity', 'gtd', 'weekly-review', 'habits', 'clarity'],
    template: `Guide me through a 45-minute Getting Things Done (GTD) Weekly Review:
Review Checklist:
1. Get Clear: Inboxes to zero, loose physical notes, browser tabs.
2. Get Current: Reviewing past week calendar, upcoming 2 weeks, open waiting-for loops.
3. Get Creative: Reviewing Someday/Maybe lists and project next actions.
4. Output: The Top 3 Must-Win Battles for next week.`,
    example: 'Conducting Sunday evening weekly review for a multi-project software consultancy.',
    notes: 'Restores complete mental clarity and control for the upcoming week.'
  },
  {
    id: 'prod-univ-2',
    title: 'Automated Zapier / Make.com Webhook Orchestrator',
    category: 'Productivity & Systems',
    tags: ['productivity', 'automation', 'webhooks', 'no-code', 'zapier'],
    template: `Design an end-to-end automation workflow between [trigger_app] and [destination_apps]:
Goal: [workflow_objective]
Include:
- Webhook trigger payload format.
- Data transformation and filter conditions.
- Error notification via Slack/Discord on execution failure.`,
    example: 'When a new GitHub issue is tagged "bug" -> create Jira ticket -> notify on-call engineer via Telegram.',
    notes: 'Automates manual repetitive tasks across the organizational stack.'
  },

  // --- CAREER & LEADERSHIP (CAREER) ---
  {
    id: 'career-univ-1',
    title: 'Engineering Manager 30-60-90 Day Transition Plan',
    category: 'Career & Leadership',
    tags: ['career', 'management', 'leadership', 'onboarding'],
    template: `Create a 30-60-90 day onboarding plan for entering as an Engineering Manager over a [team_size]-person [engineering_domain] team:
Plan:
- First 30 Days: Listen, learn, build 1-on-1 trust, understand technical debt and deployment bottlenecks.
- 60 Days: Facilitate team retrospective, identify process quick-wins, align OKRs.
- 90 Days: Deliver first major milestone, establish long-term architectural roadmap and hiring plan.`,
    example: 'New Engineering Manager taking over a 12-person distributed backend platform team.',
    notes: 'Establishes trust, authority, and momentum during the critical onboarding window.'
  },
  {
    id: 'career-univ-2',
    title: 'Executive Resume & LinkedIn Headline Transformer',
    category: 'Career & Leadership',
    tags: ['career', 'resume', 'linkedin', 'executive', 'branding'],
    template: `Transform the following raw experience bullet points into high-impact, XYZ-format executive accomplishments ("Accomplished [X], as measured by [Y], by doing [Z]"):
Raw Experience:
[raw_job_experience]
Target Role: [target_executive_role]
Generate 5 quantified bullet points, a magnetic LinkedIn About section, and a punchy headline.`,
    example: 'Transforming 7 years of senior frontend engineering experience into a Principal Frontend Architect profile.',
    notes: 'Positions candidates for top-of-market compensation and executive recruiter inbound.'
  },

  // --- DATA & ANALYTICS (DATA) ---
  {
    id: 'data-univ-1',
    title: 'Real-Time Kafka Streaming & Aggregation Pipeline',
    category: 'Data & Analytics',
    tags: ['data', 'kafka', 'streaming', 'real-time', 'analytics'],
    template: `Architect an event streaming pipeline using Apache Kafka / Flink / Spark Streaming for [event_stream_type]:
Throughput: [events_per_sec] events/sec.
Output:
1. Topic partitioning strategy and key distribution.
2. Tumbling vs Sliding window aggregations for computing real-time stats.
3. Sink schema for low-latency querying in ClickHouse or Pinot.`,
    example: 'Stream 50,000 payment clickstream events/sec and compute real-time fraud velocity scores.',
    notes: 'Enables sub-second operational analytics at massive scale.'
  },
  {
    id: 'data-univ-2',
    title: 'Data Governance, Lineage & PII Masking Blueprint',
    category: 'Data & Analytics',
    tags: ['data', 'governance', 'security', 'pii', 'gdpr', 'compliance'],
    template: `Design a data governance and automated PII masking policy for [data_platform]:
Requirements:
1. Automated detection of PII (emails, SSNs, credit cards, IP addresses) at ingestion.
2. Dynamic column-level masking policies based on querying user role.
3. End-to-end data lineage tracking from source database to executive dashboards.`,
    example: 'Data governance strategy for Snowflake data warehouse storing healthcare patient interaction records.',
    notes: 'Ensures strict HIPAA/GDPR compliance while maintaining data utility.'
  },

  // --- UI/UX & DESIGN (DESIGN) ---
  {
    id: 'design-univ-1',
    title: 'Design System Component Anatomy & State Spec',
    category: 'UI/UX & Design',
    tags: ['design', 'design-system', 'components', 'figma', 'ui'],
    template: `Write an exhaustive component specification for [component_name_e.g_multi_select_autocomplete_dropdown]:
Include:
- Anatomy Breakdown (Container, Label, Input Area, Selected Tags, Clear Button, Dropdown List, Empty State).
- All Interactive States: Default, Hover, Focused, Active, Disabled, Loading, Error.
- Keyboard Navigation & ARIA attributes (e.g. \`aria-expanded\`, \`role="combobox"\`, Arrow keys).
- Responsive mobile vs desktop adaptation rules.`,
    example: 'Component: Searchable Multi-Select Tag Combobox with async suggestions and badge dismiss.',
    notes: 'Provides bulletproof blueprints for design system engineering.'
  },
  {
    id: 'design-univ-2',
    title: 'Landing Page Visual Hierarchy & Eye-Tracking Teardown',
    category: 'UI/UX & Design',
    tags: ['design', 'cro', 'landing-page', 'eye-tracking', 'ux'],
    template: `Analyze the visual hierarchy of [landing_page_concept]:
Goal: Maximize [primary_conversion_goal]
Evaluate:
1. The F-Pattern and Z-Pattern reading paths.
2. Visual Anchors & Contrast Ratios guiding attention to the CTA.
3. Cognitive Load Audit: Elements competing for attention that should be removed or dimmed.`,
    example: 'Audit developer tool landing page where secondary navigation links distract from the "Install CLI" command.',
    notes: 'Increases conversion rates by eliminating visual distraction.'
  },

  // --- LEARNING & MASTERY (LEARN) ---
  {
    id: 'learn-univ-1',
    title: 'Complex Mathematical Proof Visualizer & Intuition Builder',
    category: 'Learning & Mastery',
    tags: ['learning', 'math', 'intuition', 'geometry', 'proofs'],
    template: `Explain the fundamental mathematical theorem: [theorem_name]
Provide:
1. The Geometric / Visual Intuition (How to "see" the theorem without algebra).
2. The Algebraic Formulation with step-by-step rationale for each transformation.
3. Practical Application in Computer Science or Cryptography.`,
    example: 'Explain Bayes\' Theorem and its intuition in Bayesian inference and machine learning probability.',
    notes: 'Builds deep visual understanding of abstract mathematical concepts.'
  },
  {
    id: 'learn-univ-2',
    title: 'Language Immersion & High-Frequency Fluency Accelerator',
    category: 'Learning & Mastery',
    tags: ['learning', 'languages', 'fluency', 'accelerated-learning'],
    template: `Create an accelerated 60-day fluency roadmap for learning [target_language] for professional business use:
Include:
- Top 500 high-frequency conversational lemma words.
- Sentence mining protocol with native media.
- Daily 20-minute shadow speaking drills.`,
    example: 'Accelerated Business Japanese fluency for conducting software technical discussions.',
    notes: 'Focuses on communicative competence over rote grammar memorization.'
  },

  // --- LIFE & STRATEGY (LIFE) ---
  {
    id: 'life-univ-1',
    title: 'Habit Loop Stacking & Environmental Design Architecture',
    category: 'Life & Strategy',
    tags: ['life', 'habits', 'james-clear', 'atomic-habits', 'discipline'],
    template: `Design a behavioral habit loop to establish the new habit: [target_habit]
Apply James Clear's 4 Laws of Behavior Change:
1. Make it Obvious: Implementation intentions (Time & Location) and habit stacking on [existing_anchor_habit].
2. Make it Attractive: Temptation bundling strategy.
3. Make it Easy: 2-Minute Rule and reducing friction in physical environment.
4. Make it Satisfying: Immediate positive feedback loop and visual habit tracker.`,
    example: 'Building a consistent habit of 45 minutes of deep algorithmic coding practice every morning at 6:30 AM.',
    notes: 'Uses behavioral psychology to make positive habits automatic and effortless.'
  },
  {
    id: 'life-univ-2',
    title: 'Negotiation Debrief & Interpersonal Dynamics Post-Mortem',
    category: 'Life & Strategy',
    tags: ['life', 'negotiation', 'psychology', 'communication', 'reflection'],
    template: `Debrief the recent high-stakes interaction:
Scenario: [interaction_summary]
What Happened: [concessions_made_or_tension_points]
Evaluate:
1. Power Dynamics & Anchoring: Who set the conversational frame?
2. Tactical Empathy & Emotional Intelligence: Did both parties feel understood?
3. What to do differently in the next encounter.`,
    example: 'Debriefing a contentious commercial lease renewal negotiation with a corporate landlord.',
    notes: 'Accelerates interpersonal wisdom and emotional intelligence.'
  },

  // --- CREATIVE & UNLOCK (UNLK / CREATIVE / HORROR) ---
  {
    id: 'unlk-univ-1',
    title: 'Cyberpunk Noir Detective Scene & Atmospheric Dialogue',
    category: 'Creative',
    tags: ['creative', 'cyberpunk', 'noir', 'dialogue', 'fiction'],
    template: `Write a gritty cyberpunk noir dialogue scene between [protagonist_detective] and [corrupt_informant_or_synthetic_ai]:
Setting: [neon_drenched_rainy_megacity_location]
The Secret at Stake: [the_conspiracy_truth]
Focus on sharp subtext, sensory details of wet neon and synthetic decay, and razor-sharp dialogue pacing.`,
    example: 'A rogue cybernetic investigator interrogating an obsolete android broker in a flooded underground server basement.',
    notes: 'Crafts vivid, high-tension narrative fiction.'
  },
  {
    id: 'unlk-univ-2',
    title: 'Psychological Horror Descent into Paranoia & Isolation',
    category: 'Horror',
    tags: ['horror', 'psychological', 'paranoia', 'dread', 'fiction'],
    template: `Write a psychological horror monologue or journal entry from the perspective of [isolated_character_role] stationed at [remote_isolated_facility]:
The Unsettling Anomaly: [subtle_wrong_detail_that_repeats]
Track the character's gradual descent from rational explanation to cold, inescapable dread as the environment subtly shifts against them.`,
    example: 'A deep-sea acoustic research engineer analyzing sonar recordings that contain a human whisper answering their thoughts.',
    notes: 'Masters psychological tension and creeping dread.'
  }
];
