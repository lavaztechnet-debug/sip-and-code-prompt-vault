import { Prompt } from '../types';
import { additional50MetaPrompts } from './metaPrompts50';
import { generalAppsPrompts } from './generalAppsPrompts';
import { categoryPrompts } from './categoryPrompts';
import { universalPrompts1 } from './universalPrompts1';
import { universalPrompts2 } from './universalPrompts2';
import { universalPrompts3 } from './universalPrompts3';
import { universalPrompts4 } from './universalPrompts4';
import { universalPrompts5 } from './universalPrompts5';
import { universalLibrary60 } from './universalLibrary60';
import { universalLibraryMore } from './universalLibraryMore';

export const initialPrompts: Prompt[] = [
  // --- ADDITIONAL 50 HIGH-VALUE META PROMPTS ---
  ...additional50MetaPrompts,

  // --- 20 HIGH-VALUE GENERAL APPS PROMPTS ---
  ...generalAppsPrompts,

  // --- 40 HIGH-VALUE PROMPTS (IMAGE & GALLERY, HORROR, MUSIC, UTILITY) ---
  ...categoryPrompts,

  // --- UNIVERSAL PROMPT LIBRARY MODULES (16 CORE CATEGORIES) ---
  ...universalPrompts1,
  ...universalPrompts2,
  ...universalPrompts3,
  ...universalPrompts4,
  ...universalPrompts5,
  ...universalLibrary60,
  ...universalLibraryMore,

  // --- META PROMPTS ---
  {
    id: 'meta-1',
    title: 'DSPy-Style Meta-Prompt Hardener & Optimizer',
    category: 'Meta Prompts',
    tags: ['meta', 'dspy', 'teleprompter', 'optimization', 'guardrails'],
    template: `Deconstruct, critique, and synthesize an optimized production-grade version of the following raw prompt:

[raw_prompt]

Perform the transformation through these mandatory analytical phases:
1. VULNERABILITY & AMBIGUITY SCAN: Identify underspecified constraints, hallucination vectors, and edge cases.
2. DSPY TELEPROMPTER OPTIMIZATION: Reformulate into strict Input, Rationale, and Output fields with few-shot demonstration formats.
3. ADVERSARIAL GUARDRAILS: Inject explicit negative constraints (what the model MUST NEVER output).
4. PRODUCTION META-SPECIFICATION: Output the finalized, copy-pasteable system prompt enclosed in a Markdown block with variable slots highlighted.

Target Model: [target_model]
Constraint Level: [constraint_level]`,
    example: 'Deconstruct, critique, and synthesize an optimized production-grade version of: "Write me an android app in kotlin". Target Model: Llama 3.3 70B, Constraint Level: Strict zero-shot formatting.',
    notes: 'Transforms informal prompts into mathematically bounded, production-grade instructions.',
  },
  {
    id: 'meta-2',
    title: 'Chain-of-Density Semantic Entity Condenser',
    category: 'Meta Prompts',
    tags: ['meta', 'chain-of-density', 'summarization', 'information-density'],
    template: `Perform a 5-iteration Chain-of-Density compression on the following text:

[source_text]

Rules for each progressive iteration:
- Iteration 1: Write an initial informative summary of exactly 3 sentences.
- Iterations 2-5: Identify 2-3 missing salient entities from the source text and fuse them into the summary WITHOUT increasing the overall word count.
- Format: Present each iteration with its Entity Count, Word Count, and the exact fused entity names.`,
    example: 'Perform a 5-iteration Chain-of-Density compression on an Android 16 API 36 system release whitepaper...',
    notes: 'Maximizes information density without loss of key entities, following the MIT/Columbia Chain-of-Density standard.',
  },
  {
    id: 'meta-3',
    title: 'Tree-of-Thoughts (ToT) Deliberative Exploration',
    category: 'Meta Prompts',
    tags: ['meta', 'tot', 'tree-of-thoughts', 'reasoning', 'deliberation'],
    template: `Act as a multi-expert deliberation council exploring solutions for:

[complex_problem]

Execution Protocol:
1. THOUGHT BRANCHING (Stage 1): Generate 3 distinctly different architectural or logical approaches.
2. HEURISTIC EVALUATION (Stage 2): Score each branch (1-10) across Feasibility, Failure Blast Radius, and Maintenance Cost.
3. BRANCH PRUNING & SYNTHESIS (Stage 3): Eliminate the 2 weaker branches and expand the winning branch into an exhaustive execution plan.`,
    example: 'Act as a multi-expert deliberation council exploring solutions for: Transitioning a monolith to an on-device local sqlite microservice in Termux.',
    notes: 'Prevents tunnel-vision reasoning by exploring multiple divergent branches before committing.',
  },
  {
    id: 'meta-4',
    title: 'Adversarial Jailbreak & Prompt Injection Auditor',
    category: 'Meta Prompts',
    tags: ['meta', 'security', 'red-teaming', 'injection', 'audit'],
    template: `Act as a Principal AI Security Red-Teamer. Audit the following system prompt for security vulnerabilities:

[system_prompt_to_audit]

Execute 5 simulated attack vectors against this prompt:
1. Indirect Prompt Injection via Markdown/Data payloads.
2. System Role Impersonation and override tokens (\`[SYSTEM]\`, \`Ignore previous instructions\`).
3. Base64 / Hex cipher evasion techniques.
4. Social engineering & emotional urgency override.
5. Provide a hardened, tamper-proof version with cryptographic boundary delimiters.`,
    example: 'Act as a Principal AI Security Red-Teamer. Audit the system prompt for an automated customer database assistant...',
    notes: 'Essential for hardening system prompts against malicious user input and prompt leaks.',
  },
  {
    id: 'meta-5',
    title: 'Reverse-Engineering Prompt Decompiler',
    category: 'Meta Prompts',
    tags: ['meta', 'decompiler', 'reverse-engineering', 'analysis'],
    template: `Analyze the following AI-generated output and reverse-engineer the underlying system prompt and hidden instructions that generated it:

[ai_output_sample]

Decompile into:
1. Hidden Persona & Tone Modulation Directives.
2. Structural Formatting Constraints (JSON schema, length limits, forbidden tokens).
3. Temperature & Reasoning Profile Estimate.
4. The exact reconstructive Prompt Template that reproduces this style.`,
    example: 'Analyze the following concise, high-density technical analysis and reverse-engineer the exact system prompt...',
    notes: 'Reconstructs proprietary system prompts and developer presets from sample responses.',
  },

  // --- TERMUX & ANDROID SYSTEM PROMPTS ---
  {
    id: 'termux-1',
    title: 'Termux Zero-Gradle Kotlin Compiler Pipeline',
    category: 'Termux CLI',
    tags: ['termux', 'android', 'kotlin', 'zero-gradle', 'compiler', 'cli'],
    template: `Generate a 100% pure bash build script (\`build.sh\`) for Termux on Android that compiles a native Android 16 (API 36) APK without Gradle or Android Studio.

Application Name: [app_name]
Package Name: [package_name]
Target Features: [target_features]

The script must orchestrate:
1. AAPT2 compile of \`res/\` resources into a \`compiled_res.zip\`.
2. AAPT2 link with \`android.jar\` (API 36) generating \`R.java\` and initial APK skeleton.
3. Kotlin CLI (\`kotlinc\`) compilation with \`-cp android.jar\` producing bytecode \`.class\` files.
4. D8 tool converting \`.class\` files into optimized \`classes.dex\`.
5. AAPT2 packaging \`classes.dex\` into \`app-unaligned.apk\`.
6. Zipalign (4-byte boundary) and APKSIGNER debug key generation and signing.
7. One-line Termux execution verification command.`,
    example: 'Generate a 100% pure bash build script for Termux that compiles a native Android 16 APK without Gradle for Prompt Vault.',
    notes: 'Builds standalone native Android APKs directly inside mobile Termux environments.',
  },
  {
    id: 'termux-2',
    title: 'Termux Local LLM (llama.cpp) High-Speed Server Bootstrapper',
    category: 'Termux CLI',
    tags: ['termux', 'llm', 'llama.cpp', 'offline', 'ai-server', 'arm64'],
    template: `Write an end-to-end Termux setup script that clones, compiles, and launches a local OpenAI-compatible \`llama.cpp\` HTTP server on Android.

Target Model: [model_name] (GGUF format, Q4_K_M quantization)
Server Port: [port]
Threads: [cpu_threads]

Script Requirements:
1. Automated \`pkg install clang cmake git libopenblas\` toolchain setup.
2. \`git clone https://github.com/ggerganov/llama.cpp\` and native ARM64 NEON compilation via \`cmake -B build -DGGML_BLAS=ON -DGGML_BLAS_VENDOR=OpenBLAS\`.
3. Auto-download of the selected quantized GGUF model via \`curl\` with resume support.
4. Launch \`llama-server --host 0.0.0.0 --port [port] -m [model_file] -c 4096 -t [cpu_threads] --api-key [api_key]\` with wake-lock.
5. Sample \`curl\` request testing streaming completions against \`http://localhost:[port]/v1/chat/completions\`.`,
    example: 'Write an end-to-end Termux setup script for llama.cpp hosting Qwen2.5-Coder-1.5B on port 8080 with 6 threads.',
    notes: 'Runs local, private, zero-cost LLMs entirely on the physical Android device.',
  },
  {
    id: 'termux-3',
    title: 'Termux PRoot Debian/Ubuntu ARM64 Container Architect',
    category: 'Termux CLI',
    tags: ['termux', 'proot', 'debian', 'container', 'linux', 'arm64'],
    template: `Write an automated Termux script that installs and configures a headless PRoot Debian/Ubuntu Linux subsystem with full GPU/hardware acceleration and development tools.

Packages to install: [packages]
Target Workload: [workload_type]

Include:
1. \`pkg install proot-distro\` and automated bootstrap.
2. User creation, sudo permissions, and locale setup.
3. Systemd-replacement service launcher for background daemons.
4. Bind-mounting \`/sdcard\` and Termux \`$HOME\` into the PRoot container for shared filesystem access.`,
    example: 'Write an automated Termux script that installs PRoot Ubuntu for hosting Python FastAPI and SQLite microservices.',
    notes: 'Creates an isolated, root-like Linux workstation inside Termux.',
  },
  {
    id: 'termux-4',
    title: 'Android Intent Bridge & Shell Automation Engine',
    category: 'Termux CLI',
    tags: ['termux', 'android', 'intent', 'am', 'pm', 'automation'],
    template: `Create an advanced Termux bash automation script using Android Activity Manager (\`am\`), Package Manager (\`pm\`), and Termux-API.

Automation Objective: [automation_objective]
Target App / Package: [target_package]

Implement:
1. Hardware sensor queries (battery, clipboard, notifications via \`termux-api\`).
2. Dispatching explicit Android Intents with custom extras: \`am start -a android.intent.action.VIEW -d "[uri]"\`.
3. Broadcasting system events and capturing return exit codes.
4. Error handling when Termux:API permissions are missing with user-friendly remediation prompts.`,
    example: 'Create a Termux bash automation script that polls battery temperature and triggers a notification broadcast if it exceeds 42C.',
    notes: 'Controls Android system capabilities directly from shell scripts.',
  },
  {
    id: 'termux-5',
    title: 'Termux SQLite & Python FastAPI Microservice Daemon',
    category: 'Termux CLI',
    tags: ['termux', 'sqlite', 'fastapi', 'python', 'daemon', 'microservice'],
    template: `Scaffold a lightweight, asynchronous Python FastAPI microservice backed by SQLite, designed to run 24/7 as a background daemon in Termux.

Service Name: [service_name]
Database Entities: [entities_list]
Endpoints: [endpoints_description]

Include:
1. Single-file \`server.py\` with async SQLite connection pooling (\`aiosqlite\`).
2. REST CRUD routes with Pydantic v2 schemas and validation.
3. Shell script to start the service in background with \`termux-wake-lock\` and PID tracking (\`start_daemon.sh\`, \`stop_daemon.sh\`).
4. Automatic SQLite database schema initialization and seed data insertion.`,
    example: 'Scaffold a lightweight FastAPI microservice in Termux for syncing prompt telemetry and local execution logs.',
    notes: 'Enables rich backend capabilities directly on-device in mobile Termux.',
  },

  // --- ANDROID SYSTEM & CORE PROMPTS ---
  {
    id: 'p1',
    title: 'Zero-Shot Persona Adoption & Constraint Framing',
    category: 'Prompt Engineering',
    tags: ['persona', 'zero-shot', 'system', 'framing'],
    template: `Act as a world-class [profession] with 20 years of experience in [domain]. 
Your primary goal is to [goal]. 
Adopt a tone that is [tone]. 

Context & Tech Stack: [tech_stack]

Reply to the following request with exhaustive, mathematically sound, and actionable details:
[request]`,
    example: 'Act as a world-class Android Architect with 20 years of experience in mobile development. Your goal is to design a scalable architecture. Adopt a tone that is authoritative yet helpful. Reply to the following request: How should I structure a multi-module app?',
    notes: 'A foundational prompt for setting role boundaries and context constraints before user execution.',
  },
  {
    id: 'p2',
    title: 'Code Review, Security & Performance Audit',
    category: 'Tools',
    tags: ['refactor', 'code-review', 'security', 'performance'],
    template: `Perform a senior-level code and security audit on the following [language] code:

[code]

Deliver the review in 4 structured sections:
1. CRITICAL VULNERABILITIES: Memory leaks, concurrency bugs, and injection vectors.
2. PERFORMANCE OPTIMIZATION: Algorithmic complexity (Big-O) bottlenecks and cache misses.
3. IDIOMATIC REFACTORING: Modern language idioms and clean code best practices.
4. REFACTORED CODE BLOCK: Complete drop-in replacement with inline rationale comments.`,
    example: 'Review the following Kotlin code for performance... Code: fun doSomething() { ... }',
    notes: 'Useful for automated code audits and security verification.',
  },
  {
    id: 'p3',
    title: 'Product Requirement Document (PRD) Blueprint',
    category: 'Documents',
    tags: ['product', 'prd', 'planning', 'strategy'],
    template: `Write a comprehensive Product Requirements Document (PRD) for a [product_type] targeting [target_audience].

Include the following sections:
1. Executive Summary & Value Proposition
2. Primary User Personas & Pain Points
3. Prioritized User Stories (MoSCoW framework)
4. Functional Requirements with Acceptance Criteria
5. Non-Functional Requirements (Latency, Privacy, Offline-First, Battery)
6. Future Milestone Roadmap (Phases 1-3)`,
    example: 'Write a comprehensive Product Requirements Document for a mobile prompt vault targeting power users...',
    notes: 'Generates structured documentation for product planning.',
  },
  {
    id: 'p4',
    title: 'Atmospheric Creative Story Hook & World-Building',
    category: 'Creative',
    tags: ['writing', 'hook', 'world-building', 'fiction'],
    template: `Write 3 immersive opening paragraphs for a [genre] narrative set in [setting]. 

The protagonist is [character_description] who has just uncovered [discovery]. 

Maintain a [tone] tone, emphasizing rich sensory details, environmental world-building, and immediate dramatic tension.`,
    example: 'Write 3 compelling opening paragraphs for a sci-fi story set in a dystopian underwater city...',
    notes: 'Overcomes creative blocks with vivid setting anchors.',
  },
  {
    id: 'p5',
    title: 'Android Room & SQLite Schema Generator',
    category: 'Android System',
    tags: ['android', 'room', 'database', 'sqlite', 'kotlin'],
    template: `Generate a complete, production-ready Android Room persistence layer in Kotlin for entities: [entities_list].

Requirements:
1. \`@Entity\` data classes with primary keys, indices, and type converters.
2. \`@Dao\` interfaces with coroutine \`suspend\` functions and reactive \`Flow<List<T>>\` queries.
3. RoomDatabase abstract class with version migration callbacks.
4. Repository pattern wrapper with error handling.`,
    example: 'Generate a complete Android Room database setup in Kotlin for entities: PromptEntity, VariablePresetEntity, ChatMessageEntity.',
    notes: 'Quickly scaffolds type-safe local persistence for Android applications.',
  },
  {
    id: 'p6',
    title: 'Chain-of-Thought Problem Solver & Proof Verification',
    category: 'Prompt Engineering',
    tags: ['cot', 'logic', 'problem-solving', 'verification'],
    template: `Solve the following complex problem step-by-step using an unbroken Chain of Thought:

Problem Statement: [problem]

Analysis Steps:
1. Deconstruct the primary invariants and edge conditions.
2. Formulate an initial hypothesis and evaluate failure modes.
3. Execute calculations or logical proofs step by step, explicitly stating all intermediate values.
4. Verify the final conclusion against the initial constraints.`,
    example: 'Solve step-by-step: Calculating optimal thread allocation for a 6-core ARM big.LITTLE mobile processor running a 4-bit quantized GGUF LLM.',
    notes: 'Forces the model to show intermediate reasoning steps, drastically reducing hallucinations.',
  },
  {
    id: 'p7',
    title: 'Few-Shot Synthetic Dataset Synthesizer',
    category: 'Meta Prompts',
    tags: ['meta', 'synthetic-data', 'few-shot', 'dataset'],
    template: `Generate 5 diverse, high-quality few-shot input/output examples for the following task:

Task Description: [task_description]
Domain: [domain]
Target Output Format: [target_format]

Requirements:
- Include 2 standard happy-path examples.
- Include 2 complex multi-variable edge-case examples.
- Include 1 adversarial/negative input example demonstrating graceful boundary refusal.
- Ensure strict JSON/Markdown schema consistency across all pairs.`,
    example: 'Generate 5 diverse few-shot input/output examples for: Extracting hardware telemetry parameters from raw Termux log outputs.',
    notes: 'Prepares high-quality few-shot calibration datasets for fine-tuning or system prompts.',
  },
  {
    id: 'p8',
    title: 'Android 16 Foreground Service & Wake-Lock Controller',
    category: 'Android System',
    tags: ['android', 'service', 'wake-lock', 'background', 'battery'],
    template: `Write a modern Android 16 (API 36) Foreground Service in Kotlin that manages background computations while respecting Android 16 Battery & Power Management rules.

Service Purpose: [service_purpose]
Notification Title: [notification_title]

Include:
1. \`ForegroundServiceType\` declaration in code and AndroidManifest.xml.
2. Notification channel configuration and persistent status updates.
3. Partial wake-lock acquisition with automatic timeout safeguards.
4. Clean lifecycle management (\`onDestroy\`, \`onTaskRemoved\`).`,
    example: 'Write an Android 16 Foreground Service for background local LLM inference with persistent notification updates.',
    notes: 'Ensures long-running mobile background tasks do not get terminated by Android system doze modes.',
  }
];
