
import { useState } from "react";

const originOptions = [
  {
    label: "Forgotten Orphan",
    icon: "🌑",
    description: "A lost child with a past nobody remembers.",
  },
  {
    label: "Royal Bloodline",
    icon: "👑",
    description: "Born into a legacy of power and expectation.",
  },
  {
    label: "Chosen Hero",
    icon: "✦",
    description: "Marked by a destiny they never requested.",
  },
  {
    label: "Forbidden Experiment",
    icon: "🧪",
    description: "Created or altered by an ambitious power.",
  },
  {
    label: "Reincarnated Soul",
    icon: "♾",
    description: "A new life haunted by an older existence.",
  },
  {
    label: "Fallen Deity",
    icon: "☄",
    description: "Once exalted, now forced to live among mortals.",
  },
  {
    label: "Wandering Warrior",
    icon: "⚔",
    description: "A traveler searching for purpose and answers.",
  },
  {
    label: "Ordinary Beginning",
    icon: "🌱",
    description: "An everyday life changed by an extraordinary event.",
  },
];

const eventOptions = [
  "The loss of someone precious",
  "A devastating betrayal",
  "The destruction of their home",
  "The discovery of a forbidden secret",
  "An unexpected awakening of power",
  "A failed attempt to save someone",
  "A mysterious encounter",
  "A victory that came at a terrible cost",
  "A forgotten memory returning",
  "A prophecy that changed everything",
];

const motivationOptions = [
  "Protect the people they love",
  "Seek revenge against those responsible",
  "Discover the truth about their past",
  "Atone for a terrible mistake",
  "Become strong enough to stand alone",
  "Break free from destiny",
  "Find a place to belong",
  "Surpass the limits imposed on them",
  "Restore something that was lost",
  "Understand the true nature of their power",
];

const toneOptions = [
  {
    label: "Dark Fantasy",
    icon: "🌘",
    description: "Bleak secrets, dangerous power, and hard choices.",
  },
  {
    label: "Heroic Adventure",
    icon: "🔥",
    description: "Courage, discovery, and rising against the odds.",
  },
  {
    label: "Tragic Drama",
    icon: "🥀",
    description: "Loss, emotional scars, and the struggle to heal.",
  },
  {
    label: "Mystery",
    icon: "🔮",
    description: "Hidden truths, unanswered questions, and intrigue.",
  },
  {
    label: "Cosmic Mythology",
    icon: "🌌",
    description: "Ancient forces, cosmic destinies, and forgotten eras.",
  },
  {
    label: "Lighthearted Adventure",
    icon: "☀",
    description: "Warm friendships, unexpected trouble, and optimism.",
  },
];

const lengthOptions = [
  {
    value: "quick",
    label: "Quick Origin",
    description: "A compact character history",
  },
  {
    value: "detailed",
    label: "Detailed Biography",
    description: "A fuller, multi-paragraph backstory",
  },
  {
    value: "legendary",
    label: "Legendary Chronicle",
    description: "A dramatic, lore-rich narrative",
  },
];

const toneOpenings = {
  "Dark Fantasy": [
    "Long before their name became whispered in fearful rooms,",
    "In a world where mercy was rarely offered,",
    "Their story began beneath an ill omen,",
  ],
  "Heroic Adventure": [
    "Every great journey begins somewhere, and theirs began when",
    "Before the world knew what they could become,",
    "Their legend began with a choice that demanded courage,",
  ],
  "Tragic Drama": [
    "Some lives are shaped by the things they never get to keep,",
    "Before they learned how to endure,",
    "Their story began with a happiness they did not know would end,",
  ],
  Mystery: [
    "The earliest chapter of their life contains a question nobody can answer:",
    "There is a missing piece in the story of their beginning,",
    "Their past is a puzzle with one impossible detail,",
  ],
  "Cosmic Mythology": [
    "Before their name entered the records of the known world,",
    "In an age when ancient powers still shaped mortal fate,",
    "Their existence began beneath the shadow of something older than history,",
  ],
  "Lighthearted Adventure": [
    "Their story began on what should have been an ordinary day,",
    "Nobody expected much from their humble beginning, until",
    "Their life was peaceful enough, right up until",
  ],
};

const originDetails = {
  "Forgotten Orphan":
    "They grew up without reliable answers about their family or the circumstances of their birth.",
  "Royal Bloodline":
    "They were raised beneath the weight of a family legacy, surrounded by traditions, expectations, and secrets.",
  "Chosen Hero":
    "An extraordinary sign marked them for a role that others believed had already been decided.",
  "Forbidden Experiment":
    "Their earliest memories are tangled with sealed records, unfamiliar laboratories, and questions about who they were meant to become.",
  "Reincarnated Soul":
    "Fragments of another existence followed them into their new life, appearing in dreams, instincts, and memories they could not explain.",
  "Fallen Deity":
    "Their former existence was defined by extraordinary status, but a mysterious fall left them facing a world they no longer understood.",
  "Wandering Warrior":
    "They learned early that the road could be unforgiving, and survival depended on observation, discipline, and adaptability.",
  "Ordinary Beginning":
    "Their early life was relatively ordinary, shaped by familiar routines, personal relationships, and modest hopes for the future.",
};

const eventDetails = {
  "The loss of someone precious":
    "The loss of someone precious changed the way they understood attachment, grief, and the fragile nature of happiness.",
  "A devastating betrayal":
    "A devastating betrayal shattered their trust and forced them to reconsider who truly deserved a place in their life.",
  "The destruction of their home":
    "The destruction of their home stripped away the certainty they once relied upon and left them searching for somewhere to belong.",
  "The discovery of a forbidden secret":
    "The discovery of a forbidden secret revealed that the world they understood was built upon an incomplete truth.",
  "An unexpected awakening of power":
    "An unexpected awakening of power changed their future and drew the attention of people who wanted to control their potential.",
  "A failed attempt to save someone":
    "A failed attempt to save someone left them wrestling with guilt and the painful limits of what one person can do.",
  "A mysterious encounter":
    "A mysterious encounter introduced a question that continued to follow them long after the moment had passed.",
  "A victory that came at a terrible cost":
    "A victory that came at a terrible cost taught them that success and happiness were not always the same thing.",
  "A forgotten memory returning":
    "A forgotten memory returned without warning, challenging everything they believed about their own history.",
  "A prophecy that changed everything":
    "A prophecy changed the way others saw them, placing expectations upon a future they had not chosen.",
};

const motivationDetails = {
  "Protect the people they love":
    "Above all, they want to protect the people who have given their life meaning, even when doing so demands difficult sacrifices.",
  "Seek revenge against those responsible":
    "They pursue the people responsible for their suffering, determined to confront the past rather than allow it to define them silently.",
  "Discover the truth about their past":
    "They seek answers about their origins, hoping the truth will finally connect the scattered pieces of their identity.",
  "Atone for a terrible mistake":
    "They strive to make amends for their mistakes, knowing that redemption requires more than regret.",
  "Become strong enough to stand alone":
    "They pursue strength and self-reliance, determined never again to feel completely powerless in the face of adversity.",
  "Break free from destiny":
    "They refuse to accept that a prophecy, institution, or inherited expectation has the right to dictate their future.",
  "Find a place to belong":
    "They search for a place where they can be accepted for who they are rather than what others expect them to become.",
  "Surpass the limits imposed on them":
    "They want to surpass every boundary others have placed upon them and discover the full extent of their potential.",
  "Restore something that was lost":
    "They hope to recover something precious that was taken from their life, even if the path toward restoration remains uncertain.",
  "Understand the true nature of their power":
    "They seek to understand their abilities, their origins, and the consequences of wielding a force they do not yet fully comprehend.",
};

function pick(items, seed) {
  const index = Math.abs(seed) % items.length;
  return items[index];
}

function getCharacterValue(character, key, fallback = "") {
  const value = character?.[key];

  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  return fallback;
}

function createBackstory({
  character,
  origin,
  event,
  motivation,
  tone,
  length,
  customDetails,
  seed,
}) {
  const name =
    getCharacterValue(character, "name").trim() ||
    "the protagonist";

  const species =
    getCharacterValue(character, "species").trim();

  const role =
    getCharacterValue(character, "role").trim();

  const powerName =
    getCharacterValue(character, "powerName").trim();

  const powerDescription =
    getCharacterValue(character, "powerDescription").trim();

  const primaryTitle = Array.isArray(character?.titles)
    ? character.titles.find((title) => title.isPrimary)?.name
    : "";

  const opening = pick(
    toneOpenings[tone] ?? toneOpenings["Dark Fantasy"],
    seed
  );

  const originText =
    originDetails[origin] ?? originDetails["Ordinary Beginning"];

  const eventText =
    eventDetails[event] ??
    eventDetails["The discovery of a forbidden secret"];

  const motivationText =
    motivationDetails[motivation] ??
    motivationDetails["Find a place to belong"];

  const identityDetails = [
    species ? `${name} is a ${species.toLowerCase()}.` : "",
    role ? `Their role is that of ${role.toLowerCase()}.` : "",
    primaryTitle ? `They are known as ${primaryTitle}.` : "",
  ].filter(Boolean);

  const identityParagraph = identityDetails.join(" ");

  const powerParagraph = powerName
    ? `${name}'s power, ${powerName}, is an important part of their identity.${
        powerDescription ? ` ${powerDescription}` : ""
      }`
    : powerDescription
      ? `Their abilities are described as follows: ${powerDescription}`
      : "";

  const detailsParagraph = customDetails.trim()
    ? customDetails.trim()
    : "";

  const coreParagraph =
    `${opening} ${originText} ` +
    `${eventText} ` +
    `${motivationText}`;

  if (length === "quick") {
    return [
      `${name}'s Backstory`,
      "",
      coreParagraph,
      identityParagraph,
      powerParagraph,
      detailsParagraph,
    ]
      .filter(Boolean)
      .join("\n\n");
  }

  if (length === "legendary") {
    const legendParagraph =
      `Yet this is not merely a tale of what happened to ${name}. ` +
      `It is a chronicle of what they choose to become. ` +
      `The past may have shaped their path, but every decision ` +
      `from this point forward will determine the meaning of their legend.`;

    const destinyParagraph =
      tone === "Cosmic Mythology"
        ? `Beyond the boundaries of ordinary history, questions remain about the forces that shaped their existence. Whether their life is part of a greater design or something entirely their own remains to be discovered.`
        : tone === "Mystery"
          ? `Important pieces of the story remain hidden. Every answer threatens to reveal another question, and the truth may be more complicated than the explanations they have been given.`
          : tone === "Lighthearted Adventure"
            ? `Even when the road becomes difficult, unexpected companions, small victories, and new discoveries may offer reasons to keep moving forward.`
            : `The future offers no guarantee of peace, forgiveness, or victory. What it offers is the chance to make a choice that belongs to them alone.`;

    return [
      `${name}: The Chronicle of a Legend`,
      "",
      coreParagraph,
      identityParagraph,
      powerParagraph,
      detailsParagraph,
      destinyParagraph,
      legendParagraph,
    ]
      .filter(Boolean)
      .join("\n\n");
  }

  const developmentParagraph =
    `As time passed, the lessons of their earlier life influenced ` +
    `the way they approached trust, responsibility, and the pursuit ` +
    `of their goals. They did not necessarily leave their past behind; ` +
    `instead, they learned to carry it while continuing forward.`;

  const futureParagraph =
    `Now, ${name} stands at another turning point. ` +
    `${motivationText} ` +
    `The choices they make next will determine whether their history ` +
    `remains a burden, becomes a source of strength, or transforms ` +
    `into something they never expected.`;

  return [
    `${name}'s Backstory`,
    "",
    coreParagraph,
    identityParagraph,
    powerParagraph,
    detailsParagraph,
    developmentParagraph,
    futureParagraph,
  ]
    .filter(Boolean)
    .join("\n\n");
}

function Backstory({ character = {}, updateCharacter }) {
  const [origin, setOrigin] = useState("Forgotten Orphan");

  const [event, setEvent] = useState(
    "The discovery of a forbidden secret"
  );

  const [motivation, setMotivation] = useState(
    "Discover the truth about their past"
  );

  const [tone, setTone] = useState("Dark Fantasy");
  const [length, setLength] = useState("detailed");

  const [customDetails, setCustomDetails] = useState("");
  const [seed, setSeed] = useState(0);
  const [notice, setNotice] = useState("");

  const backstory =
    typeof character.backstory === "string"
      ? character.backstory
      : "";

  function generateBackstory() {
    const result = createBackstory({
      character,
      origin,
      event,
      motivation,
      tone,
      length,
      customDetails,
      seed,
    });

    updateCharacter("backstory", result);
    setNotice("A new backstory draft has been generated.");
  }

  function regenerateBackstory() {
    const nextSeed = seed + 1;

    setSeed(nextSeed);

    const result = createBackstory({
      character,
      origin,
      event,
      motivation,
      tone,
      length,
      customDetails,
      seed: nextSeed,
    });

    updateCharacter("backstory", result);
    setNotice("A new variation has been generated.");
  }

  async function copyBackstory() {
    if (!backstory.trim()) {
      setNotice("Generate a backstory before copying it.");
      return;
    }

    try {
      await navigator.clipboard.writeText(backstory);
      setNotice("Backstory copied to your clipboard.");
    } catch {
      setNotice(
        "Clipboard access is unavailable. Select and copy the text manually."
      );
    }
  }

  function clearBackstory() {
    updateCharacter("backstory", "");
    setNotice("The backstory draft has been cleared.");
  }

  return (
    <section className="backstory-studio">
      <header className="backstory-header">
        <div className="backstory-header-copy">
          <p className="backstory-eyebrow">
            CHARACTER LORE · ORIGINS · DESTINY
          </p>

          <h2 className="backstory-heading">
            Backstory Forge
          </h2>

          <p className="backstory-intro">
            Every legend has a beginning. Shape the events,
            losses, discoveries, and ambitions that made
            your character who they are.
          </p>
        </div>

        <div className="backstory-header-symbol" aria-hidden="true">
          📜
        </div>
      </header>

      <div className="backstory-section-heading">
        <span aria-hidden="true">✦</span>
        <div>
          <h3>01 · Define Their Beginning</h3>
          <p>
            Choose the circumstances that shaped your
            character's earliest life.
          </p>
        </div>
      </div>

      <div className="backstory-origin-grid">
        {originOptions.map((option) => {
          const selected = origin === option.label;

          return (
            <button
              key={option.label}
              type="button"
              className={[
                "backstory-origin-card",
                selected ? "is-selected" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setOrigin(option.label)}
              aria-pressed={selected}
            >
              <span className="backstory-origin-icon" aria-hidden="true">
                {option.icon}
              </span>

              <span className="backstory-origin-name">
                {option.label}
              </span>

              <span className="backstory-origin-description">
                {option.description}
              </span>

              <span className="backstory-origin-check" aria-hidden="true">
                {selected ? "✓" : "+"}
              </span>
            </button>
          );
        })}
      </div>

      <div className="backstory-form-grid">
        <div className="backstory-field">
          <label htmlFor="backstory-defining-event">
            <span aria-hidden="true">◈</span>
            Defining Event
          </label>

          <select
            id="backstory-defining-event"
            value={event}
            onChange={(e) => setEvent(e.target.value)}
          >
            {eventOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <p>
            The event that changed the course of their life.
          </p>
        </div>

        <div className="backstory-field">
          <label htmlFor="backstory-motivation">
            <span aria-hidden="true">✧</span>
            Core Motivation
          </label>

          <select
            id="backstory-motivation"
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
          >
            {motivationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <p>
            The goal that drives them forward.
          </p>
        </div>
      </div>

      <div className="backstory-section-heading">
        <span aria-hidden="true">☯</span>
        <div>
          <h3>02 · Choose the Narrative Tone</h3>
          <p>
            Set the atmosphere and emotional direction
            of the story.
          </p>
        </div>
      </div>

      <div className="backstory-tone-grid">
        {toneOptions.map((option) => {
          const selected = tone === option.label;

          return (
            <button
              key={option.label}
              type="button"
              className={[
                "backstory-tone-card",
                selected ? "is-selected" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setTone(option.label)}
              aria-pressed={selected}
            >
              <span className="backstory-tone-icon" aria-hidden="true">
                {option.icon}
              </span>

              <span className="backstory-tone-name">
                {option.label}
              </span>

              <span className="backstory-tone-description">
                {option.description}
              </span>
            </button>
          );
        })}
      </div>

      <div className="backstory-section-heading">
        <span aria-hidden="true">✎</span>
        <div>
          <h3>03 · Add Your Own Lore</h3>
          <p>
            Include personal details that make this
            character uniquely yours.
          </p>
        </div>
      </div>

      <div className="backstory-field backstory-custom-field">
        <label htmlFor="backstory-custom-details">
          Additional Details
        </label>

        <textarea
          id="backstory-custom-details"
          value={customDetails}
          onChange={(e) => setCustomDetails(e.target.value)}
          placeholder="Mention important people, childhood memories, rivalries, secret origins, major accomplishments, or anything else the generator should include..."
          maxLength={1500}
          rows={5}
        />

        <div className="backstory-textarea-footer">
          <span>
            Personal lore will be included in the generated draft.
          </span>

          <span>{customDetails.length}/1500</span>
        </div>
      </div>

      <div className="backstory-section-heading">
        <span aria-hidden="true">◇</span>
        <div>
          <h3>04 · Select the Chronicle Length</h3>
          <p>
            Decide how much detail your character's history needs.
          </p>
        </div>
      </div>

      <div className="backstory-length-grid">
        {lengthOptions.map((option) => {
          const selected = length === option.value;

          return (
            <button
              key={option.value}
              type="button"
              className={[
                "backstory-length-card",
                selected ? "is-selected" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => setLength(option.value)}
              aria-pressed={selected}
            >
              <span className="backstory-length-radio" aria-hidden="true">
                {selected ? "●" : "○"}
              </span>

              <span className="backstory-length-name">
                {option.label}
              </span>

              <span className="backstory-length-description">
                {option.description}
              </span>
            </button>
          );
        })}
      </div>

      <div className="backstory-actions">
        <button
          type="button"
          className="backstory-generate-button"
          onClick={generateBackstory}
        >
          <span aria-hidden="true">✦</span>
          Generate Backstory
        </button>

        <button
          type="button"
          className="backstory-secondary-button"
          onClick={regenerateBackstory}
        >
          ↻ Regenerate Variation
        </button>
      </div>

      {notice && (
        <p className="backstory-notice" role="status" aria-live="polite">
          {notice}
        </p>
      )}

      <section className="backstory-result">
        <div className="backstory-result-header">
          <div>
            <p className="backstory-result-eyebrow">
              THE CHARACTER ARCHIVE
            </p>

            <h3>Generated Backstory</h3>
          </div>

          <span className="backstory-result-seal" aria-hidden="true">
            📖
          </span>
        </div>

        {backstory ? (
          <>
            <textarea
              className="backstory-result-editor"
              aria-label="Edit generated character backstory"
              value={backstory}
              onChange={(e) => {
                updateCharacter("backstory", e.target.value);
                setNotice("");
              }}
              rows={14}
            />

            <div className="backstory-result-actions">
              <button
                type="button"
                className="backstory-secondary-button"
                onClick={copyBackstory}
              >
                Copy Backstory
              </button>

              <button
                type="button"
                className="backstory-clear-button"
                onClick={clearBackstory}
              >
                Clear Draft
              </button>
            </div>
          </>
        ) : (
          <div className="backstory-empty-state">
            <span aria-hidden="true">✧</span>

            <h4>Your character's past awaits.</h4>

            <p>
              Choose an origin, define a turning point, and
              generate a story to begin your character's
              personal chronicle.
            </p>
          </div>
        )}
      </section>
    </section>
  );
}

export default Backstory;
