import { Prompt } from '../types';

export const universalPrompts3: Prompt[] = [
  // --- UI/UX & DESIGN (DESIGN) ---
  {
    id: 'design-uiux-1',
    title: 'Neumorphic & Frosted Glass Design System Tokenizer',
    category: 'UI/UX & Design',
    tags: ['design', 'neumorphism', 'glassmorphism', 'tokens', 'tailwind', 'css'],
    template: `Generate a cohesive Tailwind CSS design system token configuration for a modern [app_theme] dashboard:
Surface Concept: [light_dark_or_frosted_glass]
Primary Accent: [accent_color_hex]

Generate:
1. CSS Variable definitions for surface backgrounds, light shadows, dark shadows, and borders.
2. Tailwind config extensions for custom utility classes (\`neu-flat\`, \`neu-pressed\`, \`neu-convex\`, \`neu-glass\`).
3. Dual-offset box-shadow calculations with light-source angle consistency (e.g. 135-degree top-left light).
4. Accessibility contrast check (ensuring WCAG AA 4.5:1 text readability against neumorphic surfaces).`,
    example: 'Surface: Pearl alabaster with warm 24k gold (#D97706) accent and soft ambient dual shadows.',
    notes: 'Produces mathematically balanced, tactile neumorphic surfaces with zero visual glare.'
  },
  {
    id: 'design-uiux-2',
    title: 'Mobile Micro-Interaction & Haptic Choreography Spec',
    category: 'UI/UX & Design',
    tags: ['design', 'animation', 'micro-interactions', 'haptics', 'framer-motion'],
    template: `Design a fluid micro-interaction choreography for [user_action_e.g_pull_to_refresh_or_swipe_to_delete].
Framework: [react_motion_or_compose]

Specification:
1. Spring Physics Parameters (stiffness, damping, mass) for natural inertia.
2. Step-by-Step Keyframe States: Idle -> Anticipation -> Peak Displacement -> Settle with overshoot.
3. Haptic Feedback Sequence: Precise vibration patterns (light tap on threshold, medium on release, double-buzz on error).
4. Full runnable code component with accessible reduced-motion fallback.`,
    example: 'Interaction: Tactile card swipe-to-favorite with spring rebound and 15ms haptic pulse.',
    notes: 'Bridges visual motion with sensory haptics for an ultra-premium feel.'
  },
  {
    id: 'design-uiux-3',
    title: 'Accessible Color Palette Generator & Contrast Matrix',
    category: 'UI/UX & Design',
    tags: ['design', 'accessibility', 'colors', 'wcag', 'palette'],
    template: `Create an accessible, 10-shade color system based on the seed color [brand_primary_hex].
Semantic Roles: Primary, Neutral, Success, Warning, Error, Surface.

Deliverables:
1. 50-900 tonal palette generated in OKLCH color space for uniform perceptual lightness.
2. APCA / WCAG 2.2 contrast validation matrix for text on background pairings.
3. Dark mode inversion mapping that preserves brand hue without washed-out pastels.
4. CSS custom property output ready for immediate production import.`,
    example: 'Seed color: #3B82F6 (Electric Sapphire) for an enterprise analytics suite.',
    notes: 'Guarantees perceptual uniformity across all display hardware.'
  },
  {
    id: 'design-uiux-4',
    title: 'Complex Data Density & Information Architecture Wireframe',
    category: 'UI/UX & Design',
    tags: ['design', 'wireframe', 'information-architecture', 'bento-grid', 'dashboard'],
    template: `Architect an information architecture and responsive Bento-grid layout for [complex_domain_app].
Key Data Widgets: [list_of_5_to_8_critical_widgets]

Design:
1. Visual Hierarchy Blueprint: Sizing ratios (1x1, 2x1, 2x2 cards) prioritizing the primary action.
2. Progressive Disclosure Strategy: What information stays visible vs tucked into hover tooltips / drawers.
3. Responsive Breakpoints: Desktop (1440px) 4-column -> Tablet (768px) 2-column -> Mobile (375px) single-column stack.
4. ASCII or JSX structural layout mock with component hierarchy.`,
    example: 'App: Termux Android CLI monitor tracking CPU cores, active ports, memory usage, git repos, and battery temp.',
    notes: 'Balances ultra-high data density with clean visual breathing room.'
  },

  // --- LEARNING & MASTERY (LEARN) ---
  {
    id: 'learn-mst-1',
    title: 'Feynman Technique Conceptual Deconstructor',
    category: 'Learning & Mastery',
    tags: ['learning', 'feynman-technique', 'mental-models', 'education', 'explanation'],
    template: `Explain the complex concept of [complex_subject] using the 4-step Feynman Technique:

1. The 12-Year-Old Explanation: Explain the core mechanics using a vivid real-world physical analogy without jargon.
2. The Technical Bridge: Reintroduce precise technical terminology, showing how each term maps to the simple analogy.
3. Identifying Knowledge Illusions: Pinpoint the exact point where intuition typically fails (the counter-intuitive trap).
4. Interactive Thought Experiment: A scenario testing the learner's true first-principles grasp.`,
    example: 'Subject: "Zero-Knowledge SNARKs and cryptographic polynomial commitments".',
    notes: 'Cuts through academic obfuscation to build deep, intuitive mental models.'
  },
  {
    id: 'learn-mst-2',
    title: '80/20 Accelerated Skill Acquisition Curriculum',
    category: 'Learning & Mastery',
    tags: ['learning', 'skill-acquisition', 'curriculum', 'accelerated-learning', 'pareto'],
    template: `Create an ultra-efficient 30-day mastery curriculum for acquiring [target_skill_or_technology].
Starting Level: [beginner_or_intermediate]
Time Commitment: [hours_per_day]

Design:
1. Deconstruction: The top 20% of sub-skills that deliver 80% of practical capability.
2. High-Feedback Deliberate Practice Drills for each day (1 project per week).
3. Curated High-Signal Resource List (books, docs, videos, repos — zero fluff).
4. Capstone Benchmark Project: A real-world artifact proving professional proficiency.`,
    example: 'Skill: "Writing production Rust microservices for async networking". 2 hours/day for 30 days.',
    notes: 'Bypasses tutorial purgatory through immediate hands-on project creation.'
  },
  {
    id: 'learn-mst-3',
    title: 'Spaced Retrieval Anki Flashcard Synthesis Engine',
    category: 'Learning & Mastery',
    tags: ['learning', 'anki', 'flashcards', 'spaced-repetition', 'active-recall'],
    template: `Generate 15 atomic, high-retention Anki flashcards for the following technical text or topic:

Source Material:
[source_text_or_topic]

Flashcard Principles:
- Single Concept per card (Atomic Rule).
- Question-Answer and Cloze Deletion formats.
- Avoid simple true/false questions; test causal mechanisms ("Why does X happen when Y occurs?").
- Include mnemonics or visual imagery cues where applicable.
- Output formatted in Anki-ready Tab-Separated Values (TSV).`,
    example: 'Generate flashcards for Linux kernel memory management: virtual memory, page tables, TLB, and OOM killer.',
    notes: 'Optimized for long-term retention with zero card ambiguity.'
  },

  // --- LIFE & STRATEGY (LIFE) ---
  {
    id: 'life-strat-1',
    title: 'Stoic Inversion & Pre-Mortem Scenario Planner',
    category: 'Life & Strategy',
    tags: ['life', 'stoicism', 'pre-mortem', 'mental-models', 'risk-management'],
    template: `Conduct a Stoic *Pre-Meditatio Malorum* (Pre-Mortem) for the following major initiative or decision:
Decision / Venture: [major_decision_or_project]
Timeline: [timeframe_e.g_next_12_months]

Execute:
1. Total Catastrophic Failure Simulation: Assume it is 12 months in the future and the project has failed spectacularly. Describe why.
2. Vulnerability Mapping: Categorize the failure causes into Internal (psychological, procrastination, misalignment) vs External (market, competitors, black swans).
3. Preventive Defenses: Concrete actions to eliminate the top 3 internal vulnerabilities today.
4. Circuit Breakers: Clear predefined criteria that dictate when to pivot vs when to persevere.`,
    example: 'Leaving a secure $200k/yr job to bootstrap an AI developer tool startup with 18 months of savings.',
    notes: 'Turns anxiety into actionable, antifragile risk mitigation.'
  },
  {
    id: 'life-strat-2',
    title: 'Second-Order Thinking & Systemic Ripple Analyzer',
    category: 'Life & Strategy',
    tags: ['life', 'second-order-thinking', 'systems-thinking', 'decisions', 'consequences'],
    template: `Evaluate the cascading second- and third-order consequences of [proposed_change_or_policy].

Analyze:
1. 1st-Order Immediate Effects (What is obvious, immediate, and intended).
2. 2nd-Order Feedback Loops (How people and systems adapt, game incentives, or push back).
3. 3rd-Order Long-Term Equilibrium (Where the system stabilizes 3-5 years later).
4. Hidden Asymmetries: Identify whether the upside is capped while downside is catastrophic (or vice versa).`,
    example: 'Decision: "Mandating 100% full-time return-to-office (RTO) for a 500-person software engineering team".',
    notes: 'Uncovers dangerous blind spots that myopic first-order thinking misses.'
  },

  // --- CREATIVE & UNLOCK (UNLK / CREATIVE / HORROR) ---
  {
    id: 'unlk-creat-1',
    title: 'Worldbuilding Codex & Hard Magic System Blueprint',
    category: 'Creative',
    tags: ['creative', 'worldbuilding', 'magic-systems', 'fiction', 'fantasy', 'sci-fi'],
    template: `Design a comprehensive worldbuilding codex for a speculative [genre] universe:
Core Hook / Premise: [world_premise]
Technological / Magic Foundation: [magic_or_tech_rules]

Codex Sections:
1. Sanderson's First Law of Magic: Explicit costs, limitations, and catastrophic failure modes.
2. Geopolitical Powers: 3 factions with conflicting resource imperatives and historical grievances.
3. Societal Ripple: How this magic/tech reshapes architecture, marriage customs, criminal law, and slang.
4. Central Mystery / Epochal Threat: The brewing cosmological anomaly threatening the status quo.`,
    example: 'Genre: Cyber-gothic fantasy where computational AI algorithms are powered by binding ancestral spirits into silicon.',
    notes: 'Builds rich, internally consistent fictional universes with zero plot holes.'
  },
  {
    id: 'unlk-creat-2',
    title: 'Lovecraftian Cosmic Horror Atmosphere & Soundscape',
    category: 'Horror',
    tags: ['horror', 'cosmic-horror', 'atmosphere', 'lovecraft', 'suspense', 'creative'],
    template: `Write a terrifying sensory scene set in [eerie_location].
The Threat: [unseen_cosmic_or_body_horror_entity]
Protagonist Perspective: [protagonist_profession_and_state_of_mind]

Sensory Directives:
- Auditory: Low-frequency subsonic drones, wet rhythmic skittering, unnatural silence.
- Visual: Distortions of non-Euclidean perspective, wrong shadows, creeping bioluminescence.
- Psychological: Slow degradation of cognitive sanity, cognitive dissonance between senses and memory.
- Conclude on a chilling realization of human insignificance.`,
    example: 'Location: Abandoned Soviet deep-borehole research station in Siberia. Threat: A sound that digests geometry.',
    notes: 'Focuses on dread and cosmic awe rather than cheap jump scares.'
  },

  // --- ANDROID SYSTEM & TERMUX (AND / TERMUX CLI) ---
  {
    id: 'and-termux-1',
    title: 'Termux Native C++ / NDK Cross-Compiler Toolchain',
    category: 'Termux CLI',
    tags: ['termux', 'android', 'ndk', 'clang', 'cpp', 'compilation'],
    template: `Provide a zero-dependency Termux Bash script to configure a complete C++20 / Clang build environment:
Project Name: [project_name]
Dependencies: [libraries_needed_e.g_boost_sqlite3_openssl]

Script Must:
1. Verify and install \`clang\`, \`make\`, \`cmake\`, \`lld\`, and \`binutils\` via \`pkg\`.
2. Generate a tuned \`Makefile\` / \`CMakeLists.txt\` optimized for ARM64 with \`-O3\`, \`-flto\`, and \`-march=armv8-a\`.
3. Set up memory sanitizer and GDB debugging configuration.
4. Execute a smoke test building a multi-threaded binary with live output verification.`,
    example: 'Configure environment for building a high-speed SQLite3 vector database engine in C++20 on Android Termux.',
    notes: 'Turns Android into a full-fledged workstation-grade C++ development platform.'
  },
  {
    id: 'and-termux-2',
    title: 'Android 16 Foreground Service & WakeLock Guard',
    category: 'Android System',
    tags: ['android', 'kotlin', 'services', 'wakelock', 'battery-optimization', 'api36'],
    template: `Write a modern Android 16 (API 36) Kotlin Foreground Service for [background_task_description]:
Service Type: [specialUse_dataSync_or_shortService]

Code Requirements:
1. AndroidManifest.xml declarations with runtime \`POST_NOTIFICATIONS\` and \`FOREGROUND_SERVICE\` permissions.
2. Dynamic notification channel with ongoing high-priority status updates and stop action.
3. Partial WakeLock acquisition with strict automatic timeout release guard to prevent battery draining.
4. Service lifecycle handling (\`onStartCommand\`, \`onDestroy\`, \`onTaskRemoved\`).`,
    example: 'Service: Continuous local LLM background token streaming and socket keep-alive on Android 16.',
    notes: 'Prevents aggressive OS process killing while respecting battery optimization policies.'
  }
];
