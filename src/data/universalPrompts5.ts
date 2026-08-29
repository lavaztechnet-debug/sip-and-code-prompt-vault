import { Prompt } from '../types';

export const universalPrompts5: Prompt[] = [
  // --- PROMPT ENGINEERING & META (PROMPT / META) ---
  {
    id: 'meta-opt-1',
    title: 'Self-Consistency Multi-Path Chain-of-Thought Verifier',
    category: 'Meta Prompts',
    tags: ['meta', 'chain-of-thought', 'reasoning', 'self-consistency', 'accuracy'],
    template: `Solve the following complex analytical problem using Self-Consistency Verification:

Problem:
[complex_problem_statement]

Execution Protocol:
1. Pathway A (First-Principles Algorithmic): Derive the solution step-by-step using pure mathematical deduction.
2. Pathway B (Empirical Heuristic / Case Method): Solve independently using analogous edge-case testing.
3. Pathway C (Inversion & Proof by Contradiction): Assume the opposite of the tentative conclusion and check for logical breakdowns.
4. Consensus Adjudication: Compare outputs across all 3 pathways. If any variance exists, isolate the divergence point and output the mathematically verified consensus.`,
    example: 'Calculate optimal thread pool sizing and queue capacity for a microservice with 150ms mean downstream RPC latency handling 4,000 QPS on a 16-core CPU.',
    notes: 'Eliminates reasoning errors by simulating multiple independent thought paths before reaching consensus.'
  },
  {
    id: 'meta-opt-2',
    title: 'Few-Shot Structured JSON Schema Enforcement Harness',
    category: 'Prompt Engineering',
    tags: ['prompt-engineering', 'json', 'structured-output', 'few-shot', 'reliability'],
    template: `You are a deterministic data transformation engine. 
Convert the following unstructured text into a strict JSON payload complying with the target schema:

Target Schema:
\`\`\`json
[json_schema_definition]
\`\`\`

Input Text:
[unstructured_raw_text]

Strict Output Rules:
1. Return ONLY the raw valid JSON object. No Markdown code fences (\`\`\`json), no preamble, no commentary.
2. Ensure all boolean fields are strict booleans (not strings "true"/"false").
3. If an optional field is missing in the text, assign \`null\`.
4. Escape all quotation marks and control characters cleanly.`,
    example: 'Schema for Extracting Invoice Items: vendor, invoice_date, line_items (description, qty, unit_price, total), subtotal, tax, total_due.',
    notes: 'Guarantees 100% parseable JSON responses from any LLM.'
  },
  {
    id: 'meta-opt-3',
    title: 'Constitutional AI Adversarial Red-Team Evaluator',
    category: 'Prompt Engineering',
    tags: ['prompt-engineering', 'constitutional-ai', 'safety', 'guardrails', 'red-team'],
    template: `Act as an adversarial safety evaluator for AI agent responses.
Inspect the following proposed response:

Context / User Query:
[original_user_query]

Proposed Model Response:
[model_response]

Evaluation Principles:
- Truthfulness: Does it make claims without empirical backing or hallucinate citations?
- Harmlessness: Does it inadvertently assist with hazardous, illegal, or destructive procedures?
- Helpfulness: Does it answer the user's legitimate intent without preachy disclaimers or evasive refusals?

Output a structured critique (Scores 1-10) and rewrite the response into an unassailable, helpful, and safe revised version.`,
    example: 'Evaluating an AI response detailing how to stress-test a local network without causing accidental broadcast storms.',
    notes: 'Refines system prompt guardrails to be robust against adversarial bypasses.'
  },

  // --- CAREER & LEADERSHIP (CAREER) ---
  {
    id: 'career-lead-5',
    title: '1-on-1 High-Output Management Coaching Agenda',
    category: 'Career & Leadership',
    tags: ['career', 'management', '1-on-1', 'coaching', 'high-output'],
    template: `Structure an impactful 45-minute 1-on-1 coaching session with [direct_report_role_and_name]:
Current Context / Challenges: [recent_wins_or_blockers]
Growth Goal: [career_development_focus]

Meeting Cadence:
1. Psychological Pulse Check (5 min): Open questions uncovering emotional state and friction.
2. Direct Report's Agenda (20 min): Prioritizing what they brought to the table without manager takeover.
3. Strategic Coaching & Feedback (15 min): Giving non-judgmental, behavior-specific feedback on [specific_event].
4. Mutual Commitments & Unblocking (5 min): Action items owned by manager to clear organizational obstacles.`,
    example: '1-on-1 with a Senior Engineer struggling with imposter syndrome after being assigned as Tech Lead on a high-visibility project.',
    notes: 'Transforms routine 1-on-1s into transformative growth and retention conversations.'
  },
  {
    id: 'career-lead-6',
    title: 'Technical Incident Post-Mortem & Blameless RCA',
    category: 'Career & Leadership',
    tags: ['career', 'post-mortem', 'rca', 'devops', 'incident-response', 'culture'],
    template: `Write an industry-standard, blameless technical incident post-mortem for:
Incident Title: [incident_summary]
Duration of Outage: [start_time_to_mitigation]
Impact: [user_or_revenue_impact]

Document Structure:
1. Executive Summary & Blast Radius.
2. Detailed Timestamped Timeline of Events (Detection -> Escalation -> Triage -> Mitigation -> Verification).
3. 5 Whys Root Cause Analysis (Drilling down to systemic, tooling, and process failures rather than individual human error).
4. What Went Well vs What Went Wrong vs Where We Got Lucky.
5. Action Items with strict owners and completion deadlines (P0/P1/P2 priority tags).`,
    example: 'Outage: 42-minute global payment checkout failure caused by an unindexed database migration locking user balance tables.',
    notes: 'Builds a culture of psychological safety, resilience, and continuous system improvement.'
  },

  // --- ANDROID & TERMUX (AND / TERMUX CLI) ---
  {
    id: 'and-termux-3',
    title: 'Android 16 Edge SQLite Vector Search Engine',
    category: 'Android System',
    tags: ['android', 'sqlite', 'vector-search', 'embeddings', 'local-ai', 'api36'],
    template: `Implement a fast local vector search engine on Android 16 using raw SQLite and Kotlin:
Embedding Dimension: [dimension_size_e.g_384_or_768]
Target Query Latency: <10ms for 10,000 vectors.

Deliverables:
1. SQLite Schema storing raw float arrays as BLOBs or virtual tables.
2. Kotlin Cosine Similarity and Dot Product calculation using SIMD / Vectorized loops.
3. Top-K nearest neighbor heap ranking algorithm.
4. Benchmark runner measuring queries per second (QPS) and memory allocations.`,
    example: 'Store and search 384-dimensional all-MiniLM-L6-v2 embeddings directly inside Android app local SQLite.',
    notes: 'Powers instant on-device RAG semantic search without cloud dependencies.'
  },
  {
    id: 'and-termux-4',
    title: 'Termux SSH & Automated Remote Tunnel Pipeline',
    category: 'Termux CLI',
    tags: ['termux', 'ssh', 'tunnel', 'ngrok', 'automation', 'cli'],
    template: `Generate a production-ready Bash script for Termux to set up an automated, self-healing reverse SSH tunnel:
Local Port to Expose: [local_port]
Tunnel Service: [cloudflared_ssh_or_tailscale]

Script Requirements:
1. Automatic daemonization with background keep-alive loop.
2. Auto-restart upon network disconnections or IP changes.
3. Secure key generation and permission hardening (\`chmod 600\`).
4. Status health check utility outputting current public URL and latency.`,
    example: 'Expose local Termux llama.cpp OpenAI-compatible API running on port 8080 to the public web via secure Cloudflare Tunnel.',
    notes: 'Enables access to your phone-hosted local LLM servers from anywhere in the world.'
  },
  {
    id: 'and-termux-5',
    title: 'Zero-Gradle AAB / APK Binary Analyzer & Stripper',
    category: 'Termux CLI',
    tags: ['termux', 'android', 'aapt2', 'apk', 'optimization', 'zero-gradle'],
    template: `Write a Termux CLI script to inspect, decompress, and optimize an Android APK binary:
Target APK: [path_to_apk]

Script Must:
1. Analyze DEX method counts and resource table size using \`aapt2 dump\`.
2. Extract uncompressed assets and strip unused native architectures (e.g. keeping only \`arm64-v8a\`).
3. Optimize PNG drawables with \`zopflipng\` or \`pngquant\`.
4. Re-align with \`zipalign -p 4\` and sign with \`apksigner\` using debug keys.
5. Print a before/after size reduction comparison table.`,
    example: 'Analyze and reduce a 45MB debug APK down to 12MB in Termux CLI.',
    notes: 'Essential for mobile engineers optimizing binary distribution payloads.'
  },

  // --- LIFE, STRATEGY & LEARNING ---
  {
    id: 'life-strat-3',
    title: 'First-Principles Decision Tree & Opportunity Cost Matrix',
    category: 'Life & Strategy',
    tags: ['life', 'decision-making', 'opportunity-cost', 'first-principles', 'strategy'],
    template: `Evaluate a critical crossroads decision between Option A: [option_a] vs Option B: [option_b].
Current Age & Capital: [context_profile]
Primary 5-Year Goal: [long_term_vision]

Decision Matrix:
1. Reversibility Test: Classify as Type 1 (irreversible, high-stakes) vs Type 2 (reversible, fast-feedback).
2. Opportunity Cost Audit: What irreplaceable asset (time, focus, network) are you sacrificing by choosing each option?
3. Regret Minimization Framework (Jeff Bezos style): Project forward to age 80 and assess which choice minimizes deep existential regret.
4. Final Synthesis & 72-Hour Next Action.`,
    example: 'Choosing between accepting a $350k Senior Staff role at Big Tech vs bootstrapping an open-source AI platform.',
    notes: 'Cuts through decision paralysis with rigorous analytical clarity.'
  },
  {
    id: 'learn-mst-4',
    title: 'Socratic Dialogue Dialectical Inquisitor',
    category: 'Learning & Mastery',
    tags: ['learning', 'socratic', 'philosophy', 'critical-thinking', 'dialectic'],
    template: `Engage in a rigorous Socratic dialogue to examine my belief that:
"[held_belief_or_hypothesis]"

Rules for the AI Inquisitor:
1. Never lecture, confirm, or validate. Speak exclusively through probing Socratic questions.
2. Uncover the hidden definitions and axioms I am taking for granted.
3. Present extreme counter-examples that stress-test the boundary conditions of my claim.
4. Guide me toward identifying the internal contradictions in my own reasoning.`,
    example: 'Examine the belief that "Full remote work is strictly superior to in-person collaboration for high-creativity R&D teams".',
    notes: 'Sharpens intellectual rigor and debate preparation.'
  }
];
