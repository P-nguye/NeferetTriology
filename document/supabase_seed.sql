-- ============================================================
-- Neferet Trilogy — Seed Data
-- Run AFTER schema.sql in your Supabase SQL Editor.
-- ============================================================

-- BOOKS
insert into books (slug, title, short_description, "order", status) values
(
  'the-eight-gate',
  'The Eight Gate',
  'Graduate student John Carter discovers an ancient portal hidden beneath an Indiana cave. When he steps through, he finds himself in ancient Egypt and becomes entangled in a destiny that spans thousands of years.',
  1,
  'published'
),
(
  'princess-neferet',
  'Princess Neferet',
  'After crossing five thousand years into the future, Princess Neferet must learn to navigate a world of talking rocks, metal birds, and endless wonders while longing for the family she left behind.',
  2,
  'published'
),
(
  'the-journey-home',
  'The Journey Home',
  'Returning to ancient Egypt, John and Neferet must discover where they truly belong and whether love can survive the pull of time itself.',
  3,
  'coming_soon'
);

-- CHAPTERS — Book One: The Eight Gate
with book1 as (select id from books where slug = 'the-eight-gate')
insert into chapters (book_id, slug, title, "order", content, published_at)
select
  book1.id,
  c.slug,
  c.title,
  c."order",
  c.content,
  now()
from book1, (values
  (
    'the-cave',
    'Chapter 1: The Cave',
    1,
    E'Dr. John Carter ducked beneath the low limestone overhang, his headlamp cutting a pale wedge through the darkness. The air in the Indiana cave was cool and mineral-sharp — the smell of deep time.\n\n"Carter, you see this?" His research assistant Maya appeared at his shoulder, pointing her flashlight at the far wall.\n\nJohn moved closer. Cut into the stone — impossibly precise for a natural formation — were symbols he had never encountered in fifteen years of studying ancient languages. Not Sumerian. Not Proto-Sinaitic. Not anything in his database.\n\nHis hand reached out before his mind could stop it, fingertips grazing the edge of the largest symbol, a circle with eight radiating lines.\n\nThe wall hummed.\n\nHe yanked his hand back, heart lurching. Maya grabbed his arm.\n\n"Did you feel that?"\n\n"Yeah," John breathed. "I felt that."\n\nThey stood very still in the dark, listening to the stone breathe.'
  ),
  (
    'the-investigation',
    'Chapter 2: The Investigation',
    2,
    E'John spent three sleepless nights photographing every inch of the cave wall. He cross-referenced the symbols against every ancient writing system in the university database and came up empty.\n\nHis colleague Dr. Ethan Mitchell — the physicist — had a different theory.\n\n"You said the wall *hummed*." Mitchell peered over his reading glasses in the way he always did when he was about to say something improbable. "Not vibrated. Hummed."\n\n"Is there a difference?"\n\n"All the difference in the world." Mitchell set down his coffee. "Vibration is mechanical. A hum implies resonance. It implies the stone was responding to *you*."\n\nJohn stared at him.\n\n"Ethan, walls don''t respond to people."\n\n"No," Mitchell agreed pleasantly. "They don''t."\n\nHe slid a manila folder across the desk. Inside was a satellite image of southern Egypt, with a red circle drawn around a site near Giza that no one had excavated. The red circle was the same shape as the symbol on the cave wall.\n\nJohn felt the back of his neck prickle.\n\n"When can we leave?" he said.'
  ),
  (
    'the-ancient-controls',
    'Chapter 3: The Ancient Controls',
    3,
    E'They returned to the cave with Mitchell''s equipment — electromagnetic field sensors, acoustic resonance monitors, and one very bewildered grad student named Jack Reynolds who had been promised "light fieldwork."\n\n"Light fieldwork," Jack muttered, hauling a battery pack through the narrow entrance. "He said *light*."\n\nJohn ignored him. He was focused on the wall.\n\nIn daylight — or rather, in the bright flood of their portable LEDs — the carvings were even more remarkable. The symbols weren''t random. They formed a sequence, left to right, that Mitchell kept calling "a control array."\n\n"It''s like a panel," the physicist said, his voice hushed with something that sounded dangerously close to awe. "Each symbol is a function. And this one—" He pointed to the eight-pointed circle at the center. "—is the activation sequence."\n\n"For what?" Jack asked.\n\nMitchell looked at John. John looked at the wall.\n\n"A gate," John said quietly. "Eight spokes. The Egyptians were obsessed with the number eight — they called it the ogdoad, the primordial eight. The gods who existed before creation."\n\nSilence held the cave for a long moment.\n\n"So," Jack said carefully. "A gate to where, exactly?"'
  ),
  (
    'first-activation',
    'Chapter 4: First Activation',
    4,
    E'It was an accident. That was what John told himself afterward, in the hours and days and weeks that came after — if "after" was even a word that meant anything anymore.\n\nMitchell had asked him to trace the sequence to map the symbol dimensions. John had started at the outer ring of the eight-pointed circle, moving clockwise the way his instincts told him to, pressing lightly at each point.\n\nOn the eighth touch, the cave disappeared.\n\nNot into darkness. Into light — warm, golden, searing — and sound, a low resonant tone that wasn''t heard so much as *felt* in the bones, and heat, sudden and total, and the smell of river water and stone baking in sun.\n\nJohn landed hard on sand.\n\nHe lay still for several seconds, staring at a sky that was exactly the right shade of blue and also contained no aircraft, no contrails, no satellites. Just blue. Just sun. Just a pair of ibises wheeling far overhead.\n\nHe sat up slowly.\n\nThe Nile gleamed copper in the late afternoon light. On the opposite bank, a structure rose that he recognized from every textbook he''d ever owned, but the scaffolding was still up.\n\nThe Great Pyramid was not yet finished.\n\n"Oh," said John Carter. "Oh no."'
  ),
  (
    'the-impossible-image',
    'Chapter 5: The Impossible Image',
    5,
    E'He was found at dawn by a royal patrol.\n\nThey were disciplined soldiers, efficient and unsurprised by almost everything, but the sight of a man dressed in clothes made of fabric they had no word for, emerging from the desert with no caravan and no identification, was apparently worth reporting to the palace.\n\nJohn was escorted — firmly, though not unkindly — through the outer gates of a compound larger and more complex than any archaeological reconstruction had guessed. He was doing his best to look calm, which was difficult because every surface he passed contained information that would reshape his career.\n\n*My career,* he thought distantly. *Right. That''s the concern here.*\n\nThe chamber they brought him to was cooler than the courtyard. Painted scenes covered every wall — the Nile at flood, a pharaoh hunting, boats laden with grain. Standard iconography.\n\nAnd then, in the corner, half-hidden behind a limestone column: a figure in strange clothing, with dark hair and eyes that looked out from the wall with an expression of bemused alarm.\n\nJohn''s knees went weak.\n\nThe figure in the ancient painting was him.\n\nBehind him, a door opened, and someone spoke in a language he somehow, impossibly, understood.\n\n"We have been waiting," said the voice, "for four thousand years."'
  )
) as c(slug, title, "order", content);

-- CHAPTERS — Book Two: Princess Neferet (placeholder opening chapters)
with book2 as (select id from books where slug = 'princess-neferet')
insert into chapters (book_id, slug, title, "order", content, published_at)
select
  book2.id,
  c.slug,
  c.title,
  c."order",
  c.content,
  now()
from book2, (values
  (
    'the-other-side',
    'Chapter 1: The Other Side',
    1,
    E'The noise was the first thing that overwhelmed her.\n\nNeferet had grown up in a palace, a place of deliberate sound — the measured rhythm of drums at ceremony, the soft percussion of sandaled feet on stone, the hush of the Nile at distance. Sound had meaning and place in her world.\n\nThis world was *screaming*.\n\nNot with voices, or not only with voices. The air itself screamed: a flat, mechanical roar that pressed against her ears and didn''t stop. Metal birds — John''s word for them had been *airplanes* — crossed the sky in straight lines, too high to see clearly but loud enough to feel in her chest.\n\nShe stood very still on a paved surface outside a building made entirely of glass.\n\n"Breathe," John said beside her. He was watching her the way he always watched her when she encountered something new — measuring her reaction, ready to explain.\n\nShe breathed.\n\n"It is always this loud?" she asked.\n\n"In cities, yes. We can go somewhere quieter."\n\n"No." She straightened her spine the way her mother had always taught her. A princess of Egypt does not flinch. "Show me everything."'
  ),
  (
    'talking-rocks',
    'Chapter 2: Talking Rocks',
    2,
    E'The talking rock — John called it a *phone* — was the thing that most fascinated her in those first bewildering weeks.\n\nEveryone had one. People spoke to them, consulted them, ignored the people around them to stare into their glowing faces. It was, Neferet had decided, either a religious practice or a form of madness, and she was not yet certain which.\n\n"Can I hold it?" she asked John one morning.\n\nHe handed it over without hesitation. She turned it in her hands — lighter than it looked, warm from his pocket — and examined the glass face.\n\n"It shows you things?"\n\n"Almost anything. Ask it a question."\n\nShe thought carefully. Then she said, in her accented English that was improving daily: "What is the Great Pyramid?"\n\nThe phone spoke back to her.\n\nNeferet went very still. She looked at the phone. She looked at John.\n\n"It knows of my father''s monument?"\n\n"The whole world knows of your father''s monument," John said gently. "It''s one of the most famous things that ever existed."\n\nFor the first time since she had stepped through the gate, Princess Neferet felt something that was not fear or wonder but something older and more complicated.\n\nShe felt proud.'
  )
) as c(slug, title, "order", content);

-- CHARACTERS
insert into characters (name, age, role, description, personality, story_role, book_ids, "order") values
(
  'John Carter',
  '24',
  'main',
  'Graduate student and historian with dark brown hair and an athletic build. Has the look of both an adventurer and a scholar — someone equally at home in a library and in the field. Discovered the Eight Gate during a routine cave survey in Indiana.',
  'Curious, courageous, self-doubting, deeply empathetic. Has a historian''s instinct to observe before acting, which serves him well in ancient Egypt but sometimes frustrates him in the modern world.',
  'The protagonist. His accidental activation of the Eight Gate sets the entire trilogy in motion. Serves as the bridge between two worlds and two timelines.',
  array['the-eight-gate','princess-neferet','the-journey-home'],
  1
),
(
  'Princess Neferet',
  'Early 20s',
  'main',
  'Daughter of Pharaoh Khufu and Queen Meritites. Described by the royal court as having Egyptian royal beauty — intelligent, graceful, with the bearing of someone raised to lead. In Book 2, must adapt to the modern world while preserving her sense of self.',
  'Intelligent, dignified, fiercely adaptable, and possessed of a quiet courage that surprises even those who underestimate her. Her grace is not fragility — it is precision.',
  'Co-protagonist. Her displacement through time mirrors John''s — each is a stranger in the other''s world. Her journey of adaptation in the modern era forms the heart of Book 2.',
  array['the-eight-gate','princess-neferet','the-journey-home'],
  2
),
(
  'Jack Reynolds',
  'Mid-20s',
  'main',
  'John''s research assistant. Slightly broader build than John, with short light-brown or sandy hair. Often wearing practical outdoor clothing or technical gear. Has an engineer and inventor''s approach to every problem.',
  'Pragmatic, resourceful, and quietly funny. Where John theorizes, Jack builds. Often the one who keeps the group alive through practical ingenuity.',
  'Primary supporting character. Provides both comic relief and essential problem-solving throughout the trilogy. His loyalty to John is tested as events become increasingly impossible to explain.',
  array['the-eight-gate','princess-neferet','the-journey-home'],
  3
),
(
  'Dr. Ethan Mitchell',
  'Late 50s',
  'main',
  'Distinguished physics professor with glasses and the unhurried manner of someone who has spent decades being right about improbable things. Was the first to suggest the cave symbols represented a functional system rather than decoration.',
  'Methodical, quietly brilliant, and almost unnervingly calm in a crisis. Has a gift for explaining the impossible in ways that make it seem inevitable.',
  'The scientific mentor of the group. His understanding of the physics behind the Eight Gate deepens across all three books, and his arc involves reckoning with the limits of rational explanation.',
  array['the-eight-gate','princess-neferet'],
  4
),
(
  'Ethan Blake',
  '40s',
  'main',
  'Successful corporate executive. Polished, confident, and charismatic in the way of someone used to being the most important person in any room.',
  'Ambitious, controlled, and perceptive. His motivations are complex — he is not simply a villain, but a man whose priorities place power above most other values.',
  'Secondary antagonist in Books 2 and 3. His interest in the Eight Gate and in Neferet herself creates significant conflict as the modern-world storyline develops.',
  array['princess-neferet','the-journey-home'],
  5
),
(
  'Pharaoh Khufu',
  'Mid-50s',
  'royal_family',
  'The King of Egypt, overseeing the construction of the Great Pyramid at Giza. Commands respect throughout the kingdom. Powerful in bearing and in deed.',
  'Wise, strategic, authoritative, and deeply protective of his family. Struggles to balance the duties of a pharaoh with the love of a father. Initially suspicious of John Carter but eventually recognizes his honor and courage.',
  'Father figure and moral authority. His growing acceptance of John across Book 1 forms one of the trilogy''s most significant relationship arcs. His reunion with Neferet in Book 3 is emotionally pivotal.',
  array['the-eight-gate','the-journey-home'],
  6
),
(
  'Queen Meritites',
  'Early 40s',
  'royal_family',
  'Wife of Pharaoh Khufu. Elegant and highly respected throughout the royal court. Possesses strong intuition and a diplomat''s understanding of people.',
  'Compassionate, intelligent, diplomatic, and warm-hearted. Often understands Neferet better than Khufu does. Adds historical authenticity as a documented historical figure.',
  'In Book 1, she is one of the first to realize Neferet''s feelings for John. In Book 3, her reunion with Neferet is expected to be one of the most emotionally powerful scenes in the trilogy.',
  array['the-eight-gate','the-journey-home'],
  7
),
(
  'Princess Henutsen',
  '15–16',
  'royal_family',
  'Neferet''s younger sister. Playful and energetic, with a curiosity about everything that often gets her into trouble. Admires Neferet deeply and tries to imitate her older sister''s grace — with mixed results.',
  'Cheerful, mischievous, loyal, and fearless. The kind of person who sneaks away from palace lessons not out of laziness but because the world outside is too interesting to ignore.',
  'Appears in Neferet''s dreams during Book 2, symbolizing what she left behind. When Neferet disappeared through the Gate, Henutsen was devastated. Their reunion in Book 3 is one of the most anticipated emotional payoffs of the series.',
  array['the-eight-gate','the-journey-home'],
  8
);

-- LORE ARTICLES
insert into lore_articles (slug, title, content, category, "order") values
(
  'ancient-egypt-giza',
  'Ancient Egypt & Giza',
  E'# Ancient Egypt & Giza\n\nThe setting of the Neferet Trilogy is rooted in one of history''s most remarkable civilizations at one of its most remarkable moments: the Old Kingdom of Egypt, circa 2560 BCE, during the reign of Pharaoh Khufu.\n\n## The Old Kingdom\n\nThe Old Kingdom (c. 2686–2181 BCE) is the period Egyptologists sometimes call the "Age of the Pyramids." It was a time of extraordinary administrative organization, artistic achievement, and architectural ambition. The pharaoh was considered a living god — the intermediary between the human world and the divine order of *Ma''at*, the cosmic principle of truth and balance.\n\n## Giza at the Time of the Story\n\nWhen John Carter arrives in ancient Egypt, the Great Pyramid of Khufu is still under construction. The plateau at Giza is a working site — organized, loud, and populated by thousands of skilled workers (not slaves, as modern research has confirmed, but paid laborers who received food, medical care, and burial honors).\n\nThe Sphinx, which the trilogy identifies as having a hidden connection to the Eight Gate, stands nearby — its purpose debated by scholars for millennia.\n\n## The Royal Court\n\nPharaoh Khufu''s court was a sophisticated administrative and ceremonial center. The royal family — including Queen Meritites, Princess Neferet, and Princess Henutsen — lived at the heart of this world, navigating the complex intersection of divine duty and human feeling.',
  'Setting',
  1
),
(
  'the-eight-gate',
  'The Eight Gate',
  E'# The Eight Gate\n\nThe Eight Gate is the central supernatural element of the trilogy — a portal discovered in an Indiana cave that connects the modern world to ancient Egypt.\n\n## Discovery\n\nJohn Carter first encountered the Gate during a routine geological survey of a cave system outside Bloomington, Indiana. The cave wall bore symbols unlike any known ancient writing system, arranged in a circular pattern centered on an eight-spoked wheel — the symbol that gives the Gate its name.\n\n## The Number Eight\n\nThe choice of eight is significant. In ancient Egyptian cosmology, the *Ogdoad* — a group of eight primordial deities — represented the forces that existed before creation: darkness, water, air, and eternity, each in male-female pairs. Eight was the number of what came *before*.\n\nThe Eight Gate appears to operate on a similar principle: it doesn''t simply move people through space, but through the fabric of what came before — through time itself.\n\n## Rules of the Gate\n\nBased on events in Books 1 and 2, the following rules appear to govern the Gate:\n\n- **Activation requires physical contact** with the central symbol in a specific sequence.\n- **The destination appears to be fixed** — the Gate connects specifically to Egypt during the reign of Khufu, though the reason for this anchoring is not yet understood.\n- **Two-way travel is possible**, but the return sequence is more complex than the departure.\n- **The Gate responds to individual users differently** — Mitchell''s research suggests it may have some form of intentionality.\n\n## Unanswered Questions\n\nWhy does the Gate exist? Who built it, and when? Why does it connect specifically to Khufu''s reign? These questions drive the mythology of the trilogy toward its resolution in Book 3.',
  'Mythology',
  2
),
(
  'the-cave',
  'The Cave',
  E'# The Cave\n\nThe cave in southern Indiana where John Carter made his discovery is, on its surface, unremarkable: a limestone karst formation typical of the region, accessible by a single narrow entrance, with no particular geological distinction from the dozens of similar caves in the area.\n\nWhat sets it apart is what''s on the wall.\n\n## The Carvings\n\nThe symbols carved into the cave''s deepest chamber are unlike anything in the archaeological record. They are precise — laser-precise, though obviously made without modern tools — and they are old. Carbon dating of organic material embedded near the carvings has produced results that Dr. Mitchell refuses to publish, because no peer reviewer would accept them.\n\n## The Location Question\n\nWhy Indiana? Why a cave in the American Midwest and not in Egypt, where the Gate connects? This remains one of the most puzzling aspects of the discovery. One theory holds that the cave end of the Gate was placed deliberately in a location that would not be disturbed — in a land that, in 2560 BCE, was unknown to the Gate''s builders.\n\n## Current Status\n\nThe cave is currently under investigation by a team from the university, with Dr. Mitchell coordinating research. Access is restricted. The wall has not been touched since John''s accidental activation.',
  'Locations',
  3
),
(
  'the-second-sphinx',
  'The Second Sphinx',
  E'# The Second Sphinx\n\nAmong the many mysteries of the Giza plateau, none is more controversial — or more relevant to the Neferet Trilogy — than the theory of a second Sphinx.\n\n## Historical Background\n\nThe existing Great Sphinx faces east, toward the rising sun. For decades, a minority of Egyptologists and geologists have argued that the erosion patterns on the Sphinx enclosure suggest the monument is far older than the Fourth Dynasty, possibly predating Khufu by thousands of years.\n\nA smaller group has gone further: they argue that ancient texts refer to a *companion* monument, a second Sphinx that faced west — toward the setting sun and the land of the dead.\n\n## In the Trilogy\n\nThe Second Sphinx is not simply a historical theory in the Neferet Trilogy — it is real, and it is connected to the Eight Gate in ways that will be fully revealed in *The Journey Home*.\n\nJohn Carter first hears of it from an aged temple scribe in Book 1, who refers to it obliquely as "the guardian of the other threshold." Its location, buried somewhere beneath the western sands of Giza, is one of the central mysteries driving the plot of Book 3.\n\n## What It Means\n\nIf the cave in Indiana is one end of the Eight Gate, the Second Sphinx may be the other — the Egyptian terminus of the same connection that brought John to the ancient world. Understanding it may be the key to making a permanent choice between two times.',
  'Mysteries',
  4
);

-- BLOG POSTS
insert into blog_posts (slug, title, content, published_at, excerpt) values
(
  'why-i-wrote-this',
  'Why I Wrote the Neferet Trilogy',
  E'# Why I Wrote the Neferet Trilogy\n\nEvery story begins with a question. For me, the question was simple: *What if the past wasn''t gone?*\n\nI''ve been fascinated by ancient Egypt since I was a child — the scale of the monuments, the complexity of the mythology, the sheer ambition of a civilization that decided the most important thing it could do was build something that would last forever. There''s a reason the Great Pyramid is still standing. It was built by people who understood permanence in a way we''ve largely forgotten.\n\nBut the thing that always moved me most wasn''t the monuments. It was the people.\n\nWe know their names. We know Khufu''s name, and his queen''s name, and some of his children''s names. We have their letters and their accounts and their shopping lists. They were real people who loved and worried and hoped for things, and they have been gone for four thousand years.\n\nThe Neferet Trilogy is my attempt to close that distance — to imagine what it would be like to meet them. Not as historical figures, but as people.\n\nJohn Carter is the reader''s stand-in: the person who falls through time and has to figure out how to exist in a world that is completely foreign and also completely human. Neferet is the mirror image: the woman from the ancient world who has to find herself in ours.\n\nThe love story between them isn''t incidental. It''s the point. Because love is the thing that crosses time. It''s the thing the pyramids were built to outlast.\n\nI hope you feel that when you read it.',
  now(),
  'The story behind the story — why ancient Egypt, why time travel, and why love is at the center of it all.'
);
