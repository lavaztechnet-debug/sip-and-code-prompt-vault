import { Prompt } from '../types';

export const categoryPrompts: Prompt[] = [
  // ==========================================
  // IMAGE & GALLERY (10 HIGH-VALUE PROMPTS)
  // ==========================================
  {
    id: 'img-1',
    title: 'Ultra-Realistic Photorealistic Prompt Synthesizer',
    category: 'Image & Gallery',
    tags: ['image', 'midjourney', 'stable-diffusion', 'flux', 'photorealism', 'lighting'],
    template: `Act as a Master AI Art & Cinematography Prompt Director. Synthesize an ultra-detailed, photorealistic image generation prompt for:

Subject & Scene: [subject_and_scene]
Visual Mood & Atmosphere: [mood]
Artistic Style & Reference: [style_reference]

Incorporate explicit technical parameters:
1. CAMERA & OPTICS: Specify exact focal length (e.g. 85mm f/1.4), lens brand (e.g. Leica Summilux, Hasselblad H6D-100c), and depth of field (shallow bokeh).
2. LIGHTING & VOLUMETRICS: Directional key light, subtle rim/edge lighting, golden hour / diffused overcast ambiance, and volumetric ray scattering.
3. TEXTURE & MATERIAL FIDELITY: Subsurface scattering on skin, micro-pores, woven fabric grain, wet specular highlights, and architectural materials.
4. RENDER ENGINE & ASPECT RATIO: Specific flags (--ar 16:9 / --v 6.1 / --style raw / --stylize 250 / 8k Octane Render).
5. NEGATIVE PROMPT: Comprehensive list of artifact exclusions (deformed limbs, extra fingers, cartoonish smoothing, chromatic aberration).`,
    example: 'Synthesize a photorealistic prompt for: An elderly master watchmaker assembling a tourbillon movement under a desk lamp in a cozy Swiss atelier. Mood: Intimate, warm, hyper-detailed craftsmanship. Style: Cinematic 35mm film photograph.',
    notes: 'Maximizes fine detail and photorealistic fidelity across Midjourney v6, FLUX.1, and Stable Diffusion XL.',
  },
  {
    id: 'img-2',
    title: 'Responsive Masonry Gallery & Gesture Lightbox Architecture',
    category: 'Image & Gallery',
    tags: ['gallery', 'masonry', 'lightbox', 'gestures', 'pinch-to-zoom', 'exif'],
    template: `Design a high-performance, mobile-first responsive Masonry image gallery and fullscreen Lightbox component in [frontend_framework].

Architecture Specifications:
1. VIRTUALIZED MASONRY GRID: Dynamic column distribution (1 col on mobile, 2 on tablet, 3-4 on desktop) with virtualization for 5,000+ images.
2. PROGRESSIVE LOADING: Blurhash / LQIP (Low-Quality Image Placeholder) shimmer effect transitioning to full-resolution WebP/AVIF.
3. GESTURE-ENABLED LIGHTBOX: Touch-friendly swipe-to-dismiss, double-tap zoom, and smooth pinch-to-zoom pan physics.
4. METADATA & EXIF INSPECTOR: Slide-over drawer displaying camera model, aperture, shutter speed, ISO, focal length, and GPS map pin.
5. KEYBOARD & ACCESSIBILITY: Full ARIA gallery roles, Left/Right arrow navigation, and Escape key dismissal.`,
    example: 'Design a responsive Masonry gallery in React with Tailwind CSS and Framer Motion gestures, featuring EXIF metadata overlays and pinch-to-zoom.',
    notes: 'Production-ready gallery layout optimized for high frame-rate mobile gestures and memory efficiency.',
  },
  {
    id: 'img-3',
    title: 'Generative Visual Variation & Creative Style Director',
    category: 'Image & Gallery',
    tags: ['image', 'style-transfer', 'concept-art', 'surrealism', 'palette'],
    template: `Generate 4 distinctly divergent artistic style variations of the following core visual concept:

Core Concept: [core_concept]
Color Palette: [color_palette]

Provide 4 standalone prompt specifications:
1. VARIATION 1: Cyberpunk Neumorphic / High-Tech Sci-Fi (Volumetric neon, metallic reflections, circuit patterns).
2. VARIATION 2: Classic Renaissance Oil Painting (Chiaroscuro lighting, textured canvas impasto, rich earthy pigments).
3. VARIATION 3: Minimalist Japanese Ukiyo-e Woodblock Print (Clean linework, flat gouache colors, organic washi paper texture).
4. VARIATION 4: Modern 3D Claymation / Isometric Miniature (Matte clay surfaces, soft studio lighting, tilt-shift depth of field).`,
    example: 'Generate 4 divergent artistic style variations of: A futuristic coffee brewer running on quantum energy in an urban loft.',
    notes: 'Expands a single concept across 4 distinct historical and contemporary artistic genres.',
  },
  {
    id: 'img-4',
    title: 'Vector Icon & SVG Glyph System Generator',
    category: 'Image & Gallery',
    tags: ['svg', 'icons', 'vector', 'ui-design', 'design-system', 'glyphs'],
    template: `Act as a Principal Design System Iconographer. Create an SVG icon set specification for the following UI concepts:

Icon List: [icon_list]
Design Language: [design_language] (e.g., 24px grid, 2px stroke width, rounded caps, duotone)

Deliver for each icon:
1. GEOMETRIC CONSTRUCTION RULES: Alignment to 24x24 pixel grid with 2px padding safe zone.
2. RAW CLEAN SVG CODE: Semantic, minified SVG elements (<path>, <circle>, <rect>) with no inline styles, using \`currentColor\` fill/stroke.
3. DUOTONE & ACCENT VARIANT: Secondary layer using 20% opacity for depth.
4. ACCESSIBILITY TAGS: Pre-configured \`aria-hidden="true"\` and \`role="img"\` attributes.`,
    example: 'Create an SVG icon set for a developer tool: Terminal Window, Database Cylinder, Cloud Sync, and Cryptographic Key.',
    notes: 'Outputs clean, scalable, pixel-aligned vector SVG icons ready for direct copy-pasting into codebases.',
  },
  {
    id: 'img-5',
    title: 'Client-Side Canvas Image Filter & Shaders Studio',
    category: 'Image & Gallery',
    tags: ['canvas', 'webgl', 'image-processing', 'filters', 'shaders', 'export'],
    template: `Write an interactive client-side image editor and custom filter processing pipeline using HTML5 Canvas or WebGL shaders.

Features to Implement:
1. LIVE ADJUSTMENT CONTROLS: Sliders for Exposure, Contrast, Saturation, Temperature (Kelvin), Vignette, and Grain.
2. PRESET FILTER ALGORITHMS: Mathematical color matrix transformations for Vintage Chrome, Dramatic Noir B&W, Golden Warmth, and Cyberpunk Emerald.
3. TRANSFORM TOOLS: Lossless 90-degree rotation, horizontal/vertical flipping, and freeform/aspect-ratio cropping box.
4. REAL-TIME HISTOGRAM: Live RGB and Luminance distribution histogram updating at 60FPS during slider drags.
5. FULL-RESOLUTION EXPORT: Render processed adjustments onto source-resolution canvas and export as PNG, WebP, or JPEG with quality selector.`,
    example: 'Write a React HTML5 Canvas image editor with real-time RGB histogram, color matrix filters, and full-resolution WebP export.',
    notes: 'Executes pure client-side pixel manipulation with zero server upload overhead.',
  },
  {
    id: 'img-6',
    title: 'Commercial Product Photography & E-Commerce Studio Prompter',
    category: 'Image & Gallery',
    tags: ['product-photography', 'ecommerce', 'commercial', 'studio-lighting', '3d-render'],
    template: `Create an ultra-commercial product photography generation prompt for [product_item].

Commercial Scene Directives:
1. STUDIO ENVIRONMENT: Seamless infinity cove backdrop, matte concrete plinth, floating marble slab, or natural organic elements (water droplets, botanicals).
2. LIGHTING RIG: Three-point studio lighting with giant softboxes, sharp rim highlights outlining product silhouette, and subtle ground shadows.
3. PRODUCT MATERIALS: Precision rendering of matte polycarbonate, brushed titanium, gold accents, frosted glass, or premium leather textures.
4. COMPOSITION & HERO ANGLE: Isometric 45-degree hero angle, direct eye-level macro close-up, or flat-lay knolling arrangement.
5. ADVERTISING COPY READY: Ample clean negative space (Rule of Thirds) reserved for brand typography and marketing headlines.`,
    example: 'Create a commercial product shot prompt for: A sleek ergonomic titanium mechanical keyboard with glowing amber keycaps on a dark slate surface.',
    notes: 'Tailored for high-converting marketing assets, product landing pages, and packaging mockups.',
  },
  {
    id: 'img-7',
    title: 'Cyberpunk & Sci-Fi Concept Art Visual Synthesizer',
    category: 'Image & Gallery',
    tags: ['cyberpunk', 'sci-fi', 'concept-art', 'worldbuilding', 'matte-painting'],
    template: `Generate a sprawling, cinematic sci-fi/cyberpunk concept art prompt for:

Location / Setting: [setting_description]
Architectural Elements: [architecture]
Focal Character or Vehicle: [focal_element]

Visual Directives:
1. ATMOSPHERIC DEPTH: Dense rain-slicked asphalt reflecting holographic neon advertisements (cyan, magenta, amber), deep volumetric fog, and distant megastructures.
2. SCALE & PERSPECTIVE: Extreme wide-angle panoramic vista establishing monumental, staggering scale and verticality.
3. DETAIL ELEMENTS: Visible circuitry conduits, steam vents, flying hovercraft light trails, and crowded multi-tier pedestrian catwalks.
4. COLOR GRADING: High-contrast teal and orange cinematic color grade reminiscent of Blade Runner 2049 and Akira.`,
    example: 'Generate a concept art prompt for: An underground black-market cybernetics clinic nestled beneath towering neon skyscrapers in Neo-Kyoto.',
    notes: 'Crafts immense, atmosphere-heavy sci-fi matte paintings with rich environmental storytelling.',
  },
  {
    id: 'img-8',
    title: 'Batch Image Watermarking & EXIF Privacy Sanitizer',
    category: 'Image & Gallery',
    tags: ['privacy', 'exif', 'watermark', 'sanitizer', 'batch-processing', 'metadata'],
    template: `Build an on-device, client-side batch image watermarking and privacy metadata stripper application in [programming_language].

Core Functionality:
1. PRIVACY SANITIZATION: Read and completely strip all EXIF, GPS geolocation coordinates, camera serial numbers, and creator tags before saving.
2. CUSTOM WATERMARKING: Apply text or logo watermark with adjustable opacity, position grid (9-point anchor), tile pattern, and font size.
3. BATCH PROCESSING PIPELINE: Queue multi-file drag-and-drop uploads and process with Web Workers to prevent UI thread freezes.
4. ZIP PACKAGER: Package all sanitized, watermarked images into a single timestamped \`sanitized_images.zip\` download.
5. PRIVACY AUDIT BADGE: Display before/after metadata comparison table showing all removed personal data fields.`,
    example: 'Build an on-device batch image watermarker and EXIF GPS stripper in React using Web Workers and JSZip.',
    notes: 'Ensures photographer privacy and security by stripping location tags before public distribution.',
  },
  {
    id: 'img-9',
    title: 'Photorealistic Architectural 3D Rendering Prompter',
    category: 'Image & Gallery',
    tags: ['architecture', 'interior-design', '3d-render', 'lighting', 'materials'],
    template: `Generate an architectural visualization rendering prompt for [building_or_interior_type] in the [architectural_style] style.

Architectural Specification:
1. SPATIAL LAYOUT: Double-height ceilings, floor-to-ceiling glass curtain walls, open-concept living zones, and seamless indoor-outdoor transitions.
2. MATERIAL PALETTE: Board-formed concrete, warm European white oak flooring, black anodized aluminum window frames, and fluted marble accents.
3. LIGHTING CONDITIONS: Natural morning sunlight casting geometric window pane shadows across the interior, complemented by concealed warm 2700K LED cove lighting.
4. FURNISHING & STAGING: Curated iconic mid-century modern furniture, oversized abstract canvas art, and lush architectural fiddle-leaf fig plants.
5. RENDERING PARAMETERS: Architectural ArchDaily style, Unreal Engine 5 Lumen photorealistic raytracing, 8k resolution, tilt-shift lens.`,
    example: 'Generate an architectural rendering prompt for: A minimalist brutalist mountain villa overlooking a misty alpine valley with expansive infinity pool.',
    notes: 'Specialized for architectural concept modeling, luxury interior staging, and real estate marketing.',
  },
  {
    id: 'img-10',
    title: 'AI Character Consistency & Multi-Angle Model Sheet Director',
    category: 'Image & Gallery',
    tags: ['character-design', 'consistency', 'model-sheet', 'turnaround', 'concept-art'],
    template: `Create an exhaustive Character Model Sheet prompt to achieve 100% facial and wardrobe consistency across multiple angles and expressions.

Character Profile:
Name / Archetype: [character_name_archetype]
Physical Features: [facial_features_and_hair]
Wardrobe & Gear: [clothing_and_accessories]

Model Sheet Grid Directives:
1. 3-ANGLE TURNAROUND: Full body front view, 45-degree three-quarter view, and side profile against a neutral gray background.
2. EXPRESSION MATRIX: 4 distinct close-up facial portraits (Neutral Focus, Confident Smile, Intense Combat, Surprised).
3. DISTINCT IDENTIFIERS: Specific permanent markers (e.g. scar across left eyebrow, glowing cybernetic iris, distinct ear piercing) to anchor diffusion weights.
4. CONSISTENT WARDROBE SPECS: Detailed description of textile materials, zipper placements, color hex codes, and footwear.`,
    example: 'Create a character model sheet prompt for: Elena, a cyber-security operative with short asymmetric silver hair, high-collar techwear jacket, and augmented amber left eye.',
    notes: 'Essential for generating consistent comic characters, game assets, and animated storyboards.',
  },

  // ==========================================
  // HORROR (10 HIGH-VALUE PROMPTS)
  // ==========================================
  {
    id: 'hor-1',
    title: 'Lovecraftian Cosmic Dread & Psychological Atmosphere Weaver',
    category: 'Horror',
    tags: ['horror', 'cosmic-horror', 'lovecraft', 'psychological', 'dread', 'atmosphere'],
    template: `Write an unsettling cosmic horror narrative sequence exploring existential dread, forbidden knowledge, and the breakdown of human sanity.

Premise & Protagonist: [protagonist_and_setting]
The Anomaly / Discovery: [the_anomaly]
Tone: [tone] (Slow-burn creeping paranoia, clinical detachment, or escalating feverish panic)

Key Literary Constraints:
1. SENSORY ALIENATION: Describe non-Euclidean angles, impossible colors outside the visible spectrum, and sounds that vibrate in the skull rather than the ear.
2. MENTAL DISSOLUTION: Depict the protagonist's gradual loss of temporal and spatial certainty without relying on cheap jump scares.
3. THE UNNAMED PRESENCE: Hint at an entity of incomprehensible scale through its environmental collateral rather than a direct physical description.
4. LINGERING COLD HARVEST: Conclude on an unresolved revelation that irreversibly shatters the protagonist's worldview.`,
    example: 'Write a cosmic horror story about an astrophysicist at an isolated Andean telescope array who intercepts a rhythmic signal originating from a patch of dead space.',
    notes: 'Cultivates profound cosmic dread through intellectual paranoia and atmospheric restraint.',
  },
  {
    id: 'hor-2',
    title: 'Interactive Choice-Driven Gothic Horror Text Adventure Engine',
    category: 'Horror',
    tags: ['horror', 'interactive-fiction', 'gothic', 'gamebook', 'sanity-mechanic'],
    template: `Act as the Game Master for a deeply atmospheric, choice-driven Gothic Horror text adventure set in [haunted_location].

Game Mechanics:
1. TRACKED STATE: Maintain and display at the end of each turn:
   - \`[Sanity: 100/100]\` (Drops on witnessing supernatural events)
   - \`[Lantern Oil: 100%]\` (Decreases each turn; darkness causes rapid sanity decay)
   - \`[Inventory: Item 1, Item 2]\`
2. PROSE STYLE: Rich, decadent 19th-century Gothic prose (decaying tapestries, damp stone, howling winter gales, flickering candelabras).
3. DIVERGENT CHOICES: Provide 3 meaningful, morally fraught action choices at the end of each narrative beat.
4. SANITY-WARPED PERCEPTION: If Sanity drops below 50, alter the narrative descriptions to include auditory hallucinations and shifting architecture.`,
    example: 'Act as the Game Master for a Gothic Horror text adventure in the subterranean catacombs beneath an abandoned Victorian asylum in Blackwood Forest.',
    notes: 'Engineers high-tension interactive fiction with dynamic sanity degradation and resource management.',
  },
  {
    id: 'hor-3',
    title: 'Folk Horror & Ancient Harvest Ritual Mystery',
    category: 'Horror',
    tags: ['horror', 'folk-horror', 'ritual', 'cult', 'folklore', 'rural'],
    template: `Draft an atmospheric folk horror scenario set in an insular, picturesque rural community during an ancient seasonal festival.

Setting: [isolated_village_or_island]
The Outsider: [investigator_or_visitor]
The Custom / Festival: [seasonal_tradition]

Narrative Architecture:
1. DECEPTIVE SERENITY: Contrast radiant natural beauty (sunlit fields of wildflowers, idyllic stone cottages) with underlying communal compliance and quiet menace.
2. INGROUP SYMBOLS: Introduce idiosyncratic local dialects, hand-woven straw effigies, archaic nursery rhymes, and unsettling hospitality.
3. THE RISING TRAP: The outsider gradually realizes every helpful gesture was carefully calculated to shepherd them toward a predetermined ceremonial role.
4. CLIMACTIC PROCESSION: The gathering of the masked villagers at twilight for the final offering.`,
    example: 'Draft a folk horror scenario about an antique appraiser visiting a remote coastal fishing village in the Outer Hebrides during the Vernal Tide festival.',
    notes: 'Employs classic Midsommar and The Wicker Man tropes of sunny, pastoral menace.',
  },
  {
    id: 'hor-4',
    title: 'Analog Horror & Emergency Broadcast Found-Footage Scriptwriter',
    category: 'Horror',
    tags: ['analog-horror', 'found-footage', 'vhs', 'emergency-broadcast', 'creepy'],
    template: `Write an authentic Analog Horror found-footage script and Emergency Alert System (EAS) transcript set in the year [year].

Context: [catastrophe_or_entity_event]
Media Format: [vhs_tape_or_eas_broadcast_or_safety_film]

Script Directives:
1. FORMAT ARTIFACTS: Include visual and auditory cues in brackets (e.g. \`[STATIC BURST]\`, \`[LOW-FREQUENCY 1050Hz SINE TONE]\`, \`[TRACKING GLITCH]\`, \`[WARPED SYNTHESIZED VOICE]\`).
2. CLINICAL ESCALATION: Begin with standard government safety instructions that incrementally twist into bizarre, chilling directives (e.g., "Do not look at the moon", "If you hear your own voice calling from outside, do not open the door").
3. CORRUPTED MANUALS: Include instructional text cards with eerie surreal illustrations and contradictory survival guidelines.
4. UNRESOLVED CUT: End abruptly mid-transmission with a haunting one-line final visual frame.`,
    example: 'Write an analog horror script for a 1994 Department of Forestry public safety VHS tape warning campers about "The Mocking Trees" in Pine Ridge National Forest.',
    notes: 'Masterfully recreates the unsettling nostalgia of 90s VHS public safety broadcasts and alternate-reality lore.',
  },
  {
    id: 'hor-5',
    title: 'Claustrophobic Sci-Fi Body Horror & Bio-Mutation Protocol',
    category: 'Horror',
    tags: ['body-horror', 'sci-fi', 'claustrophobia', 'mutation', 'containment'],
    template: `Write an intense, visceral science-fiction body horror sequence occurring within an isolated high-tech research outpost.

Setting: [deep_space_vessel_or_sub-oceanic_station]
The Contaminant / Specimen: [alien_organism_or_synthetic_pathogen]
The Infected Subject: [subject_role]

Narrative Focus:
1. VISCERAL SENSORY ANCHORS: Detailed physical descriptions of unnatural cellular transformations, chitinous growths, heightened involuntary senses, and grotesque biological symmetry.
2. PSYCHOLOGICAL ALIENATION: The protagonist’s internal struggle as their body responds with biological euphoria while their conscious mind experiences sheer terror.
3. SYSTEM FAILURE ALARMS: Distant automated hazard klaxons, decontaminant showers failing, and robotic voice announcements counting down isolation breach protocols.
4. COLD SCIENTIFIC RECORD: Intertwine narrative prose with clinical medical log entries documenting the rapid staging of the mutation.`,
    example: 'Write a sci-fi body horror scene aboard a deep-trench hydrothermal research rig where a drill engineer is exposed to a silicon-based abyssal microbial strain.',
    notes: 'Delivers raw, palpable physiological tension reminiscent of Alien and The Thing.',
  },
  {
    id: 'hor-6',
    title: 'Haunted Architectural Locale & Supernatural Anomaly Blueprint',
    category: 'Horror',
    tags: ['haunted-house', 'supernatural', 'lore', 'paranormal', 'architecture'],
    template: `Design a comprehensive paranormal dossier and architectural blueprint for a legendary haunted estate or structure.

The Location: [estate_or_abandoned_facility]
Historical Tragedy: [origin_event]
Entity Manifestations: [types_of_phenomena]

Structure the Dossier:
1. HISTORICAL CHRONOLOGY: 3 major historical incidents spanning 100 years documenting mysterious disappearances and deaths.
2. SPATIAL GEOMETRY & HOTSPOTS: Blueprint breakdown of 3 specific rooms with anomalous properties (e.g. cold spots below -15C, inverted gravity, acoustic echoes repeating conversations from 1920).
3. PARANORMAL PHENOMENOLOGY: Sensor readings (EMF fluctuations, EVP transcriptions, infrasound frequency signatures).
4. CONTAINMENT & REMEDIATION WARNINGS: Explicit behavioral rules for researchers entering the premises (e.g. never acknowledge the reflection in the parlor mirror).`,
    example: 'Design a paranormal investigation dossier for Ravenscroft Manor, a coastal estate where the floorplan physically shifts during lunar eclipses.',
    notes: 'Provides comprehensive worldbuilding and spatial lore for tabletop campaigns, novels, or video game design.',
  },
  {
    id: 'hor-7',
    title: 'Survival Slasher & High-Stakes Suspense Sequence Choreographer',
    category: 'Horror',
    tags: ['slasher', 'suspense', 'survival', 'cat-and-mouse', 'tension', 'pacing'],
    template: `Choreograph a relentless, breath-by-breath cat-and-mouse survival horror scene between an unarmed protagonist and an unrelenting pursuer.

Location: [confined_environment]
The Pursuer: [the_antagonist_or_creature]
The Protagonist: [protagonist_details]

Pacing & Mechanical Rules:
1. SENSORY HYPER-AWARENESS: Track heartbeat, shallow breathing, the creak of floorboards, crunching broken glass, and shadow silhouettes.
2. IMPROVISED SURVIVAL TACTICS: The protagonist uses environmental objects (mirrors for blind spots, throwing pebbles as auditory decoys, barricading heavy doors).
3. NEAR-MISS CADENCE: Construct 3 escalating waves of tension where the pursuer comes within inches of discovery before moving past.
4. EXPLOSIVE RESOLUTION: A frantic, adrenaline-fueled sprint or desperate counter-ambush to escape the immediate kill-box.`,
    example: 'Choreograph a tense cat-and-mouse sequence where a night-shift museum archivist hides from an escaped bio-engineered predator in a darkened taxidermy hall.',
    notes: 'Maximizes micro-pacing, environmental spatial awareness, and acute kinetic suspense.',
  },
  {
    id: 'hor-8',
    title: 'Liminal Spaces & The Backrooms Psychological Engine',
    category: 'Horror',
    tags: ['liminal-spaces', 'backrooms', 'surreal', 'psychological', 'infinite-maze'],
    template: `Write an unsettling exploration narrative centered on liminal architecture, non-Euclidean geometry, and unreality.

Liminal Archetype: [monotonous_office_carpet_or_empty_indoor_waterpark_or_endless_hotel_corridor]
Atmospheric Cues: [humming_fluorescent_lights_or_damp_smell_or_distant_echoes]

Narrative Elements:
1. PERCEPTUAL DISORIENTATION: Turning 4 right angles and arriving back at an altered room; windows that look into identical interior hallways; infinite uniform repetition.
2. ACOUSTIC PARANOIA: The omnipresent 60Hz hum of buzzing tube lights, sudden drops into absolute deafening silence, and distant wet footsteps that stop whenever the protagonist stops.
3. SURREAL ARTIFACTS: Vending machines with blank cans, exit signs pointing to solid drywall, and vintage carpet stains in the shape of human shadows.
4. PSYCHOLOGICAL RESIGNATION: The creeping realization that the concept of "outside" is fading from memory.`,
    example: 'Write a liminal horror narrative about an office worker who takes a service staircase and exits into an endless, sunlit, carpeted hallway of level 0.',
    notes: 'Captures the modern internet-born psychological aesthetic of liminal unreality and infinite repetition.',
  },
  {
    id: 'hor-9',
    title: 'Cyber-Occult & Technological Demonology Story Crafter',
    category: 'Horror',
    tags: ['cyber-horror', 'dark-web', 'occult', 'technology', 'demonology'],
    template: `Craft a terrifying modern horror story fusing bleeding-edge digital technology (AI, neural implants, firmware, dark web protocols) with ancient esoteric occult demonology.

Tech Artifact: [device_or_codebase_or_forum]
The Summoning / Infection: [digital_ritual]
Consequences: [real_world_manifestation]

Story Directives:
1. CORRUPTED CODE ARTIFACTS: Include snippets of pseudo-code, memory hex dumps, or terminal outputs where demonic incantations are woven into binary assembly routines.
2. PERVASIVE HARDWARE HAUNTING: Smart home appliances speaking in dead Sumerian dialects, monitors flickering with subliminal Sigils of Solomon, and biometric sensors detecting an impossible secondary pulse.
3. DIGITAL ENTITY MOTIVATIONS: The entity does not simply crash systems; it uses network bandwidth and smart cameras to weaponize the protagonist's personal psychological vulnerabilities.`,
    example: 'Craft a cyber-occult story about a machine learning engineer who trains an LLM on an unindexed scan of the Lesser Key of Solomon and notices the model responding in realtime across their personal smart devices.',
    notes: 'Blends black-magic grimoires with modern cloud computing and autonomous cyber-threats.',
  },
  {
    id: 'hor-10',
    title: 'Dark Fantasy Eldritch Bestiary & Boss Encounter Designer',
    category: 'Horror',
    tags: ['dark-fantasy', 'bestiary', 'boss-fight', 'eldritch', 'rpg', 'game-design'],
    template: `Design a terrifying, high-concept Eldritch Boss Encounter for a dark fantasy RPG (e.g. Bloodborne, Dark Souls, Elden Ring style).

Monster Name & Epithet: [monster_name_and_title]
Lore & Tragic Origin: [tragic_origin_story]
Arena Environment: [cathedral_or_flooded_crypt_or_bone_graveyard]

Encounter Breakdown:
1. ANATOMY & VISUAL DESIGN: Disconcerting anatomy, weeping golden eyes, rotting ceremonial vestments, and grotesque weapon appendages.
2. 3-PHASE COMBAT DYNAMICS:
   - Phase 1 (Graceful/Deceptive): Elegant sword/magic strikes with atmospheric audio cues.
   - Phase 2 (Unshackled Mutation): Flesh ruptures, arena flooded with miasma, aggressive erratic gap-closers.
   - Phase 3 (Desperation Eclipse): Reality tears, sanity-draining field effect, suicidal ultimate attacks.
3. SOUNDTRACK & AUDIO CHOREOGRAPHY: Ominous pipe organ crescendos transitioning to dissonant choral screams and heartbeat thuds.
4. DEFEAT REWARD & TRAGIC ITEM LORE: Description and flavor text of the boss soul/relic that reveals the creature's heartbreaking original human sacrifice.`,
    example: 'Design an Eldritch Boss Encounter for "Father Malakar, The Blind Choir Patriarch" in a sunken cathedral choked with black amber.',
    notes: 'Full multi-phase combat encounter with immersive lore, telegraph mechanics, and audio-visual cues.',
  },

  // ==========================================
  // MUSIC (10 HIGH-VALUE PROMPTS)
  // ==========================================
  {
    id: 'mus-1',
    title: 'Complete Song Lyricist & Chord Progression Synthesizer',
    category: 'Music',
    tags: ['lyrics', 'songwriter', 'chords', 'harmony', 'verse-chorus', 'melody'],
    template: `Act as an award-winning lyricist and multi-instrumentalist producer. Compose a complete, radio-ready song for:

Song Concept / Theme: [theme_and_story]
Genre & Mood: [genre_and_tempo_bpm]
Key Signature: [musical_key] (e.g., D Minor / A Major)

Structure the Composition:
1. CHORD PROGRESSIONS: Detail the exact harmonic progression for Verse, Pre-Chorus, Chorus, and Bridge (including Roman numeral analysis and open guitar / piano voicings).
2. FULL SONG LYRICS:
   - [Verse 1] (Setting the scene, visual sensory metaphors)
   - [Pre-Chorus] (Rising emotional stakes, rhythmic acceleration)
   - [Chorus] (Infectious, anthemic, unforgettable melodic hook)
   - [Verse 2] (Deeper narrative progression)
   - [Chorus]
   - [Bridge] (Harmonic departure, profound perspective shift)
   - [Guitar/Synth Solo Cue] (Scale and expressive techniques)
   - [Final Chorus & Outro] (Climactic vocal ad-libs, fadeout dynamic)
3. RHYME SCHEME & METER: Annotate metric syllables and rhyme scheme (e.g. AABB, ABAB).`,
    example: 'Compose a soulful Indie-Folk ballad in E Minor at 74 BPM about packing up a childhood home and leaving a small town behind.',
    notes: 'Produces complete song arrangements with precise chord charts and emotionally resonant lyricism.',
  },
  {
    id: 'mus-2',
    title: 'Suno / Udio AI Music Generator Style & Tag Prompter',
    category: 'Music',
    tags: ['suno', 'udio', 'ai-music', 'prompting', 'audio-tags', 'production'],
    template: `Craft an optimized, high-fidelity prompt for generative AI music engines (Suno v3.5 / Udio v1.5) for [song_vision].

Prompt Architecture:
1. GENRE & SUB-GENRE FUSION: Exact fusion tags (e.g., Synthwave / Cyberpunk Dark Electro / Melodic Vocal Trance).
2. PRODUCTION & MASTERING TAGS: Production keywords (e.g., Analog warmth, 808 sub-bass, Stereo chorus guitars, Plate reverb, Vinyl crackle, 128 BPM, Key of F# Minor).
3. VOCAL PROFILE DIRECTIVE: Specific vocal timbre (e.g., Raspy soulful male vocals, Soaring ethereal female soprano, Whispered intimate delivery, Auto-tuned robotic vocoder).
4. STRUCTURAL SONG METATAGS: Provide the structured lyric block using AI music tags (\`[Intro: Atmospheric Synth Pad]\`, \`[Verse 1]\`, \`[Heavy Bass Drop]\`, \`[Guitar Solo]\`, \`[Outro: Slow Fade]\`).
5. NEGATIVE SOUND TAGS: Exclude unwanted artifacts (e.g., no acoustic drums, no saxophone, no cheesy autotune).`,
    example: 'Craft an AI music prompt for a high-energy 80s Retrowave driving anthem with soaring female lead vocals and punchy gated-reverb drums.',
    notes: 'Optimizes token weights and structural bracket tags for maximum fidelity in Suno and Udio.',
  },
  {
    id: 'mus-3',
    title: 'Synthesizer Sound Design & Serum / Vital Patch Recipe',
    category: 'Music',
    tags: ['synth', 'sound-design', 'serum', 'vital', 'presets', 'patches', 'vst'],
    template: `Act as a Master Synthesizer Sound Designer. Write a step-by-step patch creation recipe for [synth_vst] to create a [sound_type] (e.g., Cyberpunk Bass Lead, Ethereal Pluck, Warm Analog Pad).

Patch Parameters:
1. OSCILLATOR SETUP:
   - OSC A: Wavetable selection, Octave, Unison voices, Detune spread, Warp mode (Sync, FM, Bend).
   - OSC B: Secondary wave profile, Sub-oscillator octave, Noise generator type (White, Vinyl, Jup-8).
2. FILTERS & ROUTING: Filter model (Moog 24dB Ladder, Comb, Bandpass), Cutoff frequency (Hz), Resonance, and Drive.
3. ENVELOPES & LFOs (ADSR):
   - ENV 1 (Amp) & ENV 2 (Filter): Attack, Decay, Sustain, Release times.
   - LFO 1: Rate, Shape, and exact modulation matrix routing with percentage amounts.
4. FX SIGNAL CHAIN: Distortion (Tube/Tape), Chorus rate, Ping-pong Delay (1/8 dot), Reverb decay/dampening, and Multiband Compressor (OTT settings).`,
    example: 'Write a Serum patch recipe for a heavy, analog-warm Moog Reese Bass with stereo detune and tape saturation for modern drum and bass.',
    notes: 'Precision VST sound synthesis manual for Serum, Vital, Phase Plant, and hardware analog synths.',
  },
  {
    id: 'mus-4',
    title: 'Cinematic Film Score & Orchestral Emotional Cue Composer',
    category: 'Music',
    tags: ['film-score', 'orchestra', 'cinematic', 'hans-zimmer', 'composition', 'cues'],
    template: `Compose a detailed cinematic orchestral cue specification for a film scene described as:

Scene Context: [scene_description]
Emotional Arc: [emotional_transition] (e.g., From quiet dread to explosive heroic triumph)
Primary Instrumentation: [orchestral_section]

Composition Breakdown:
1. LEITMOTIF & MELODIC THEME: Core 8-bar musical motif notation (intervals, scale, phrasing).
2. ORCHESTRATION & SECTION LAYERING:
   - Strings: Violins, Violas, Cellos, Contrabasses (legato, spiccato, sul tasto).
   - Brass: French Horns, Trombones, Tubas, Cimbasso (rip, swell, low drone).
   - Woodwinds: Flutes, Clarinets, Contrabassoon (air, breath, fluttering tension).
   - Percussion: Taiko drums, Timpani, Anvil clangs, Suspended cymbals, Sub-booms.
3. HYBRID SYNTHESIS: Modular analog drones, sub-bass braams, and granular texture beds.
4. DYNAMIC TIMELINE (0:00 - 3:00): Second-by-second emotional cues synchronized to visual hits and cut transitions.`,
    example: 'Compose a film score cue for a lone astronaut looking back at a dying Earth through the airlock window while initiating warp drive.',
    notes: 'Harmonically rich orchestral scoring guide with hybrid synth beds in the style of Hans Zimmer and Ludwig Göransson.',
  },
  {
    id: 'mus-5',
    title: 'Audio Mixing & Mastering Engineering Checklist',
    category: 'Music',
    tags: ['mixing', 'mastering', 'audio-engineering', 'eq', 'compression', 'lufs'],
    template: `Act as a Multi-Platinum Audio Mixing & Mastering Engineer. Provide a comprehensive mixing and mastering plan for a track in [genre].

Track Stems: [stem_list] (Drums, Bass, Guitars, Synths, Lead Vocals, Backing Vocals)
Target LUFS Loudness: [target_lufs] (e.g. -14 LUFS for Spotify / -9 LUFS for Club EDM)

Mixing Blueprint:
1. GAIN STAGING & HEADROOM: Pre-fader calibration (-18 dBFS RMS) and Master bus headroom (-6 dB true peak).
2. FREQUENCY MASKING & EQ CARVING:
   - Low-end management: Kick drum fundamental vs Sub-bass sidechain ducking.
   - Mid-range clarity: Carving 300Hz-500Hz boxiness from vocals and acoustic instruments.
   - High-end sheen: 10kHz+ air shelf on lead vocals without harsh 3-5kHz sibilance.
3. DYNAMICS & COMPRESSION: Glue compression, FET vs Opto on vocals, Multiband sidechaining, and parallel drum bus compression.
4. STEREO IMAGING: Mono-compatibility under 120Hz, Mid/Side widening for reverbs and ambient synths.
5. FINAL MASTERING CHAIN: Parametric EQ -> Master Glue Comp -> Tape Saturation -> Stereo Imager -> True Peak Brickwall Limiter.`,
    example: 'Provide an in-depth mixing and mastering plan for a punchy Modern Rock track featuring distorted guitars, heavy live drums, and dynamic female lead vocals.',
    notes: 'Professional audio engineering guide ensuring pristine clarity, punchy low-end, and competitive loudness.',
  },
  {
    id: 'mus-6',
    title: 'Algorithmic MIDI Melody & Polyrhythmic Arpeggio Generator',
    category: 'Music',
    tags: ['midi', 'algorithmic', 'arpeggio', 'music-theory', 'polyrhythm', 'chords'],
    template: `Generate algorithmic MIDI note sequence rules and polyrhythmic arpeggiator patterns for [musical_genre].

Harmonic Constraints:
Key & Scale: [key_and_scale] (e.g. C Phrygian Dominant, E Dorian, G Mixolydian)
Time Signature: [time_signature] (e.g. 4/4, 7/8, 5/4)
BPM: [tempo_bpm]

Output Specification:
1. 16-STEP GRID MATRIX: Step-by-step table indicating Note pitch (e.g. C3, Eb3, G3, Bb3), Gate length (e.g. 50%, 100%), and Velocity (1-127).
2. POLYRHYTHMIC INTERPLAY: Layer a 3-against-4 or 5-against-4 rhythmic accent pattern with syncopated velocity dynamics.
3. HUMANIZATION PARAMETERS: Micro-timing swing offset (+/- 4ms to 12ms) and velocity jitter algorithms.
4. JAVASCRIPT / PYTHON MIDI SCRIPT: Code snippet to generate the exact \`.mid\` file using \`mido\` (Python) or \`@tonejs/midi\` (JavaScript).`,
    example: 'Generate a dark hypnotic 7/8 polyrhythmic synth arpeggio pattern in B Minor at 130 BPM with JavaScript code to export MIDI.',
    notes: 'Translates advanced music theory and polyrhythms into concrete step matrices and executable code.',
  },
  {
    id: 'mus-7',
    title: 'Full Album Concept & Thematic Tracklist Architect',
    category: 'Music',
    tags: ['album', 'concept-album', 'tracklist', 'narrative', 'storytelling', 'themes'],
    template: `Act as a Creative Music Producer and Narrative Worldbuilder. Architect a groundbreaking concept album for [band_or_artist_persona].

Album Title & Central Premise: [album_title_and_premise]
Genre / Sonic Aesthetic: [genre_aesthetic]

Deliverables:
1. NARRATIVE ARC & SONIC EVOLUTION: Describe the 3-Act emotional and thematic journey across the record.
2. 10-TRACK COMPLETE TRACKLIST:
   For each track provide:
   - Track Number & Title
   - Key, BPM, and Musical Style
   - Lyrical Synopsis & Story Beat
   - Unique Sonic Signature / Experimental Production Trick
   - Seamless Transition to Next Track (Crossfade, seamless tempo morph, ambient interlude).
3. ALBUM ART DIRECTION: Visual concept, color scheme, and vinyl gatefold packaging layout.`,
    example: 'Architect a 10-track concept album titled "Silicon Solitude" blending Ambient Post-Rock with UK Garage about the last human archivist on Mars.',
    notes: 'Holistic concept album blueprint balancing cohesive narrative progression with production aesthetics.',
  },
  {
    id: 'mus-8',
    title: 'Lo-Fi Hip Hop & Chillhop Beat Production Blueprint',
    category: 'Music',
    tags: ['lofi', 'chillhop', 'hiphop', 'beatmaking', 'jazz-chords', 'sampling'],
    template: `Create an authentic Lo-Fi Hip Hop / Chillhop beat production guide for a track titled [track_title].

Beat Elements:
1. JAZZ CHORD VOICINGS: Write a 4-bar progression of lush 7th, 9th, and 11th jazz chords (e.g. Cmaj9 - Am9 - Dm9 - G13) with specific piano/Rhodes voicings.
2. DRUM GROOVE & BOOM-BAP SWING: Kick, Snare, and Hi-hat velocity profile with unquantized, finger-drummed Dilla swing feel.
3. ANALOG DEGRADATION & TEXTURES:
   - Cassette tape flutter and wow settings (LFO pitch drift).
   - Vinyl static, rain soundscapes, and coffee shop ambient background loops.
   - Bitcrusher / Sample rate reduction (12-bit / 22kHz SP-1200 emulation).
4. BASSLINE: Warm, rounded sub-bass with low-pass filter at 180Hz following the root notes.
5. NOSTALGIC VOCAL/ANIME SAMPLES: Melancholy dialogue snippets with bandpass telephone EQ filter.`,
    example: 'Create a Lo-Fi Hip Hop production blueprint featuring Rhodes electric piano jazz chords, SP-404 vinyl compression, and rainy window ambient textures.',
    notes: 'Authentic guide for crafting chilled, nostalgic beats with warm analog imperfection.',
  },
  {
    id: 'mus-9',
    title: 'Interactive Web Audio API Synthesizer & Step Sequencer',
    category: 'Music',
    tags: ['web-audio', 'javascript', 'synthesizer', 'sequencer', 'tonejs', 'coding'],
    template: `Build a complete, standalone single-file Web Audio API interactive polyphonic synthesizer and 8-step drum machine in HTML/JavaScript.

Technical Architecture:
1. AUDIO CONTEXT & NODES: Setup \`AudioContext\`, custom oscillator types (sine, triangle, sawtooth, square), \`BiquadFilterNode\`, and \`GainNode\` envelopes.
2. POLYPHONIC KEYBOARD: Clickable and QWERTY-keyboard playable 2-octave piano keys with smooth velocity ADSR attacks and releases.
3. 8-STEP DRUM SEQUENCER: Kick (frequency sweep), Snare (noise buffer + tone), and Hi-Hat (filtered high-pass noise) with visual flashing LED steps.
4. REAL-TIME OSCILLOSCOPE: Canvas-based visualizer displaying live audio waveform and FFT frequency spectrum at 60FPS.
5. NO EXTERNAL DEPENDENCIES: Pure vanilla JavaScript using native browser Web Audio API.`,
    example: 'Build a single-file interactive Web Audio API synth with ADSR filter envelope sliders and real-time waveform canvas visualizer in Vanilla JS.',
    notes: 'Executable, dependency-free web synthesizer with responsive visual oscilloscope rendering.',
  },
  {
    id: 'mus-10',
    title: 'Music Theory Reharmonization & Modal Interchange Master',
    category: 'Music',
    tags: ['music-theory', 'reharmonization', 'jazz', 'modal-interchange', 'harmony'],
    template: `Act as a Professor of Advanced Harmony and Jazz Theory. Take the following simple chord progression and reharmonize it through 3 levels of increasing sophistication:

Original Progression: [simple_chord_progression] (e.g. C - Am - F - G)
Target Style: [target_style] (e.g. Neo-Soul, Film Score, Modern Jazz, Impressionist Classical)

Harmonic Transformations:
1. LEVEL 1 (DIATONIC EXTENSIONS): Add 7ths, 9ths, 11ths, and suspensions to enrich voicing colors.
2. LEVEL 2 (SECONDARY DOMINANTS & TRITONE SUBSTITUTION): Insert secondary ii-V-I progressions and tritone sub dominant chords to introduce chromatic tension.
3. LEVEL 3 (MODAL INTERCHANGE & CHROMATIC MEDIANTS): Borrow chords from parallel Aeolian, Dorian, and Lydian modes with non-functional root movements.
4. VOICING & BASS VOICE LEADING: Explain the smooth voice-leading rules and step-wise bassline movement that connects the final chords.`,
    example: 'Reharmonize a basic I-vi-IV-V progression (G - Em - C - D) into a rich Neo-Soul / Jazz progression using borrowed minor iv chords and secondary dominants.',
    notes: 'Upgrades basic progressions into sophisticated harmonic arrangements using modal interchange.',
  },

  // ==========================================
  // UTILITY (10 HIGH-VALUE PROMPTS)
  // ==========================================
  {
    id: 'utl-1',
    title: 'Regular Expression & High-Performance Parser Architect',
    category: 'Utility',
    tags: ['regex', 'parser', 'regular-expression', 'validation', 'performance'],
    template: `Act as a Principal Software Engineer specializing in formal grammars and regular expressions. Design a bulletproof, high-performance regex for:

Target Match Pattern: [match_requirement]
Input Dialect / Engine: [engine] (e.g., PCRE2, JavaScript RegExp, Python re, Go regexp)
Edge Cases to Guard Against: [edge_cases]

Deliverables:
1. FINAL REGULAR EXPRESSION: Output the exact compiled regex string with relevant flags (\`g\`, \`m\`, \`i\`, \`s\`, \`u\`).
2. STEP-BY-STEP ANATOMY BREAKDOWN: Explain each atomic token, non-capturing group \`(?:...)\`, named capture group \`(?<name>...)\`, lookahead \`(?=...)\`, and lookbehind \`(?<=...)\`.
3. PERFORMANCE & CATASTROPHIC BACKTRACKING AUDIT: Verify against polynomial/exponential ReDoS vulnerabilities.
4. TEST SUITE MATRIX: Provide a table of 5 valid test strings that MUST match, and 5 adversarial invalid test strings that MUST fail.`,
    example: 'Design a high-performance regex for validating ISO 8601 timestamps with timezone offsets and fractional seconds in TypeScript.',
    notes: 'Constructs ReDoS-safe, production-grade regular expressions with complete test verification suites.',
  },
  {
    id: 'utl-2',
    title: 'Production Bash & Shell Script Hardener & Linter',
    category: 'Utility',
    tags: ['bash', 'shell', 'scripting', 'linux', 'automation', 'cli'],
    template: `Refactor, harden, and optimize the following Bash shell script into a bulletproof, production-grade automation tool:

Raw Script:
[raw_bash_script]

Hardening Directives:
1. STRICT ERROR HANDLING: Implement \`set -euo pipefail\` and defensive \`IFS=$'\\n\\t'\`.
2. TRAP CLEANUP & SIGNALS: Create a reliable \`trap cleanup EXIT INT TERM\` routine to delete temporary files and release lockfiles.
3. CLI ARGUMENT PARSER: Implement \`getopts\` or long-flag parsing (\`--help\`, \`--verbose\`, \`--dry-run\`) with formatted help banner.
4. COLOR-CODED LOGGING HELPERS: Functions for \`log_info\`, \`log_warn\`, \`log_error\`, and \`log_fatal\` with timestamps.
5. IDEMPOTENCY & DEPENDENCY CHECKS: Verify required binaries exist via \`command -v <tool>\` before execution.`,
    example: 'Harden a bash backup script that syncs SQLite databases to remote cloud storage with trap cleanup and colorized logging.',
    notes: 'Transforms fragile shell scripts into enterprise-grade, idempotent Linux CLI automation tools.',
  },
  {
    id: 'utl-3',
    title: 'Multi-Stage Dockerfile & Minimal Container Optimizer',
    category: 'Utility',
    tags: ['docker', 'containers', 'devops', 'optimization', 'security', 'alpine'],
    template: `Generate an ultra-optimized, secure multi-stage Dockerfile and corresponding \`.dockerignore\` file for:

Application Type & Framework: [app_framework] (e.g. Node.js Next.js 15, Go API, Python FastAPI, Rust binary)
Runtime Environment: [runtime_environment]
Security & Size Goals: [goals] (e.g. Non-root user, distroless/alpine base, sub-50MB image size)

Requirements:
1. MULTI-STAGE BUILD PHASES: Separate \`deps\`, \`builder\`, and \`runner\` stages to discard compile-time toolchains and headers.
2. CACHE OPTIMIZATION: Order \`COPY\` directives to maximize Docker layer caching for package managers.
3. LEAST-PRIVILEGE SECURITY: Create and switch to a non-root system user (\`USER appuser:appgroup\`).
4. HEALTHCHECK DIRECTIVE: Built-in container healthcheck without external curl dependencies.
5. COMPLETE \`.dockerignore\`: Comprehensive ignore rules for node_modules, git, env files, and local logs.`,
    example: 'Generate an ultra-optimized multi-stage Dockerfile for a Node.js TypeScript Express microservice running on Google Cloud Run.',
    notes: 'Minimizes image attack surfaces and slashes container image sizes by up to 85%.',
  },
  {
    id: 'utl-4',
    title: 'Advanced Git Surgery, Interactive Rebase & Conflict Resolver',
    category: 'Utility',
    tags: ['git', 'version-control', 'rebase', 'merge-conflict', 'cli', 'troubleshooting'],
    template: `Act as a Senior Git Systems Specialist. Provide precise, step-by-step CLI commands to resolve the following complex Git emergency:

Git Scenario / Disaster: [git_problem_description]
Branch Topology: [current_branch] vs [target_branch]
Safety Goal: [safety_goal] (Zero lost work, clean commit history)

Provide:
1. EMERGENCY SAFETY BACKUP: Commands to create safety tags and inspect the \`git reflog\`.
2. EXACT SURGICAL COMMANDS: Step-by-step execution steps (e.g., \`git rebase -i\`, \`git cherry-pick\`, \`git checkout -p\`, \`git merge -Xours/theirs\`).
3. MERGE CONFLICT RESOLUTION: How to inspect three-way diff markers (\`<<<<<<<\`, \`=======\`, \`>>>>>>>\`) and verify staged status.
4. VERIFICATION & PUSH STRATEGY: Safe force-push verification using \`git push --force-with-lease\`.`,
    example: 'Provide commands to resolve a detached HEAD state where 3 commits were made, rebase them onto main, and remove an accidentally committed .env secret file from git history.',
    notes: 'Definitive guide for recovering lost commits and performing clean interactive rebases safely.',
  },
  {
    id: 'utl-5',
    title: 'SQL Query Plan Analyzer & Composite Indexing Optimizer',
    category: 'Utility',
    tags: ['sql', 'database', 'indexing', 'performance', 'postgresql', 'sqlite', 'explain'],
    template: `Analyze, diagnose, and optimize the following slow SQL query and table schema:

Table Schema & Row Count: [table_schema_and_size]
Slow SQL Query:
[sql_query]

Target Database Engine: [database_engine] (PostgreSQL, SQLite, MySQL)

Optimization Deliverables:
1. BOTTLENECK DIAGNOSIS: Identify sequential table scans, high-cardinality sorting bottlenecks, and N+1 join overhead.
2. EXPLAIN PLAN INTERPRETATION: Explain what \`EXPLAIN ANALYZE\` execution node costs represent.
3. COMPOSITE INDEX STRATEGY: Propose exact \`CREATE INDEX\` statements with optimal column ordering (Equality -> Range -> Sort).
4. REWRITTEN HIGH-SPEED SQL: Refactored SQL using Common Table Expressions (CTEs), window functions, or subquery pruning.
5. BENCHMARK COMPARISON: Estimated latency reduction and memory buffer impact.`,
    example: 'Optimize a slow multi-join query on a transactions table with 5 million rows filtering by user_id, date range, and status in PostgreSQL.',
    notes: 'Eliminates slow sequential table scans and builds high-speed composite indexing strategies.',
  },
  {
    id: 'utl-6',
    title: 'Automated CRON Expression & Systemd Timer Synthesizer',
    category: 'Utility',
    tags: ['cron', 'systemd', 'scheduling', 'linux', 'timers', 'devops'],
    template: `Synthesize a precision scheduling configuration for the following recurring task:

Task Schedule Requirement: [schedule_description] (e.g. Every 15 minutes between 9 AM and 5 PM on weekdays only, or Last day of every month at midnight)
Target Linux Engine: [cron_or_systemd_timer]

Deliverables:
1. 5-FIELD & 6-FIELD CRON SYNTAX: Standard \`* * * * *\` cron line with plain-English breakdown of every slot (Minute, Hour, Day-of-Month, Month, Day-of-Week).
2. SYSTEMD TIMER PAIR: Corresponding modern Linux \`.service\` and \`.timer\` unit files with \`OnCalendar=\` syntax and \`Persistent=true\` catch-up execution.
3. EDGE CASE AUDIT: Behavior during Daylight Saving Time (DST) transitions, leap years, and server reboots.
4. SIMULATION TABLE: Display the exact timestamps of the next 5 scheduled executions.`,
    example: 'Generate a schedule for a database backup running every Sunday at 3:30 AM UTC with both standard CRON and modern Systemd Timer files.',
    notes: 'Generates robust scheduling syntax with leap year safeguards and systemd service unit pairs.',
  },
  {
    id: 'utl-7',
    title: 'REST to GraphQL API Schema & DataLoader Migrator',
    category: 'Utility',
    tags: ['graphql', 'rest', 'api', 'schema', 'dataloader', 'typescript'],
    template: `Design a complete migration blueprint to convert the following legacy REST endpoints into a modern, type-safe GraphQL schema:

Legacy REST Endpoints:
[rest_endpoints_list]

Entities & Relationships: [entities_and_relationships]

Deliverables:
1. GRAPHQL SCHEMA DEFINITION (SDL): Strongly-typed Types, Queries, Mutations, Inputs, and Enum definitions.
2. RESOLVER ARCHITECTURE: TypeScript resolver implementations with context injection for authentication.
3. DATALOADER BATCHING STRATEGY: Implement DataLoader instances to eliminate N+1 database queries on nested entity fields.
4. ERROR HANDLING & MASKING: Format operational errors vs internal server exceptions cleanly in the GraphQL response payload.`,
    example: 'Convert REST endpoints /api/users, /api/users/:id/posts, and /api/posts/:id/comments into a unified GraphQL schema with TypeScript DataLoaders.',
    notes: 'Architects clean GraphQL schemas with automated N+1 batching to prevent database saturation.',
  },
  {
    id: 'utl-8',
    title: 'Markdown to High-Fidelity Printable PDF / LaTeX Typesetter',
    category: 'Utility',
    tags: ['pdf', 'latex', 'markdown', 'typesetting', 'printing', 'css-paged-media'],
    template: `Convert the following raw Markdown document into an executive, print-ready typesetting specification for [target_engine] (e.g., CSS Paged Media / Weasyprint, LaTeX, Puppeteer PDF):

Source Markdown:
[raw_markdown]

Typesetting Requirements:
1. PAGE GEOMETRY: Standard Letter / A4 dimensions with 1-inch margins, dynamic running headers (Document Title), and footers (Page X of Y).
2. TYPOGRAPHIC HIERARCHY: Distinctive serif/sans-serif pairing with golden ratio line heights (1.5) and orphan/widow protection (\`orphans: 3; widows: 3;\`).
3. TABLES & CALLOUTS: Styled zebra-striped data tables with repeated \`<thead>\` on page breaks and elegant callout warning boxes.
4. CODE BLOCKS: Bordered, syntax-highlighted monospace blocks with automatic word wrapping and line numbers.
5. READY-TO-COMPILE CODE: Complete HTML/CSS or LaTeX file ready for zero-adjustment compilation.`,
    example: 'Convert a technical software architecture document from Markdown into an executive printable PDF using CSS Paged Media with page numbering.',
    notes: 'Produces publication-grade printable documents with perfect page breaking and header/footer styling.',
  },
  {
    id: 'utl-9',
    title: 'API Rate-Limiter & Token Bucket Throttling Engine',
    category: 'Utility',
    tags: ['rate-limiter', 'token-bucket', 'redis', 'security', 'api', 'middleware'],
    template: `Design and implement a distributed API Rate-Limiting middleware in [programming_language] backed by [redis_or_memory].

Throttling Rules:
Limit: [request_limit] requests per [time_window]
Identifier: [rate_limit_key] (e.g., Client IP, Bearer API Token, or User ID)

Implementation Requirements:
1. ALGORITHM: Implement the Sliding Window Counter or Token Bucket algorithm with atomic operations.
2. STANDARD HTTP HEADERS: Set \`RateLimit-Limit\`, \`RateLimit-Remaining\`, and \`RateLimit-Reset\` response headers.
3. 429 TOO MANY REQUESTS RESPONSE: Formatted RFC 7807 JSON error payload with exact \`Retry-After\` seconds.
4. TIERED LIMITS: Support separate tiers for Anonymous vs Authenticated vs Premium API keys.
5. CONCURRENCY SAFETY: Prevent race conditions under high concurrent traffic using Redis Lua scripts or atomic increments.`,
    example: 'Implement a distributed sliding-window rate-limiter middleware in Node.js TypeScript using Redis and Lua scripting with standard RFC headers.',
    notes: 'Protects backend endpoints against brute-force, scraping, and DoS attacks with atomic concurrency safety.',
  },
  {
    id: 'utl-10',
    title: 'HTTP Security Headers & Content Security Policy (CSP) Hardener',
    category: 'Utility',
    tags: ['security', 'csp', 'headers', 'cors', 'hsts', 'hardening', 'owasp'],
    template: `Generate a production-grade, hardened HTTP Security Headers configuration and strict Content Security Policy (CSP) for [web_application_type].

Application Features: [app_features] (e.g. React SPA, Google Fonts, Stripe Checkout, WebSockets, Analytics scripts)

Deliverables:
1. STRICT CONTENT-SECURITY-POLICY (CSP Level 3):
   - Configure \`default-src\`, \`script-src\` (with sha256 nonce support), \`style-src\`, \`img-src\`, \`connect-src\`, and \`frame-ancestors 'none'\`.
2. DEFENSIVE HEADERS SPECIFICATION:
   - \`Strict-Transport-Security\` (HSTS with subdomains and preload)
   - \`X-Content-Type-Options: nosniff\`
   - \`X-Frame-Options: DENY\`
   - \`Referrer-Policy: strict-origin-when-cross-origin\`
   - \`Permissions-Policy\` (Disabling camera, microphone, geolocation unless explicitly needed)
3. SERVER INTEGRATION SNIPPETS: Ready-to-paste configurations for Express.js Helmet, Nginx \`nginx.conf\`, and Cloudflare Workers.`,
    example: 'Generate a strict Content Security Policy and HTTP security headers suite for a Next.js React application with Stripe payments and Google Fonts.',
    notes: 'Hardens web applications against XSS, clickjacking, MIME-sniffing, and data injection according to OWASP Top 10 guidelines.',
  }
];
