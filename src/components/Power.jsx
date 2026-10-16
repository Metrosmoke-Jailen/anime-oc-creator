import { powerTypeOptions } from "../data/options";

const powerArchetypes = [
  {
    title: "Elemental Force",
    type: "Elemental Magic",
    icon: "✦",
    tone: "ember",
    description: "Command fire, ice, lightning, wind, or the forces of nature.",
  },
  {
    title: "Shadow & Void",
    type: "Shadow Power",
    icon: "☾",
    tone: "shadow",
    description: "Shape darkness, summon shadows, or bend the space between worlds.",
  },
  {
    title: "Arcane Arts",
    type: "Magic",
    icon: "✧",
    tone: "arcane",
    description: "Weave spells, runes, enchantments, and mysterious magical systems.",
  },
  {
    title: "Spirit Energy",
    type: "Spiritual Energy",
    icon: "◈",
    tone: "spirit",
    description: "Harness life force, spiritual pressure, souls, or inner energy.",
  },
  {
    title: "Cosmic Authority",
    type: "Space Magic",
    icon: "✺",
    tone: "cosmic",
    description: "Manipulate stars, dimensions, gravity, space, or celestial phenomena.",
  },
  {
    title: "Psychic Gift",
    type: "Psychic Power",
    icon: "◎",
    tone: "psychic",
    description: "Use telepathy, telekinesis, foresight, or mind-based abilities.",
  },
  {
    title: "Divine / Demonic",
    type: "Divine Power",
    icon: "♜",
    tone: "divine",
    description: "Draw on sacred blessings, infernal contracts, or supernatural authority.",
  },
  {
    title: "Combat Mastery",
    type: "Martial Arts",
    icon: "⚔",
    tone: "combat",
    description: "Turn technique, precision, weapon mastery, or physical skill into power.",
  },
  {
    title: "Custom System",
    type: "Custom",
    icon: "＋",
    tone: "custom",
    description: "Invent an original power system that belongs entirely to your character.",
  },
];

const nameIdeas = [
  "Eclipse Dominion",
  "Astral Rupture",
  "Phantom Arsenal",
  "Crimson Resonance",
  "Void Genesis",
  "Celestial Breaker",
];

function Power({ character, updateCharacter, errors }) {
  const selectedArchetype = powerArchetypes.find(
    (archetype) => archetype.type === character.powerType,
  );

  const abilityName = character.powerName.trim();
  const abilityDescription = character.powerDescription.trim();

  return (
    <section className="power-studio" aria-labelledby="power-heading">
      <div className="power-studio-header">
        <div>
          <p className="power-step-label">STEP 03 · POWER DESIGN STUDIO</p>
          <h2 id="power-heading" className="power-studio-title">
            Forge their power<span>.</span>
          </h2>
          <p className="power-studio-intro">
            Choose the source of their strength, give it a name, and define what makes it legendary.
          </p>
        </div>
        <div className="power-studio-emblem" aria-hidden="true">✧</div>
      </div>

      <div className="power-section-heading">
        <div>
          <p className="power-overline">01 / CHOOSE A PATH</p>
          <h3>What fuels their abilities?</h3>
        </div>
        <span className="power-selection-count">{character.powerType ? "1 selected" : "Choose one"}</span>
      </div>

      <div className="power-archetype-grid" role="group" aria-label="Power archetypes">
        {powerArchetypes.map((archetype) => {
          const isSelected = character.powerType === archetype.type;
          return (
            <button
              key={archetype.title}
              type="button"
              className={`power-archetype-card power-tone-${archetype.tone}${isSelected ? " is-selected" : ""}`}
              aria-pressed={isSelected}
              onClick={() => updateCharacter("powerType", archetype.type)}
            >
              <span className="power-card-icon" aria-hidden="true">{archetype.icon}</span>
              <span className="power-card-copy">
                <span className="power-card-title">{archetype.title}</span>
                <span className="power-card-description">{archetype.description}</span>
              </span>
              <span className="power-card-check" aria-hidden="true">{isSelected ? "✓" : "＋"}</span>
            </button>
          );
        })}
      </div>

      <div className="power-form-panel">
        <div className="power-section-heading power-section-heading-form">
          <div>
            <p className="power-overline">02 / DEFINE THE ABILITY</p>
            <h3>Give the power an identity</h3>
          </div>
        </div>

        <div className="power-form-grid">
          <div className="power-field">
            <label htmlFor="powerType">Power system <span aria-hidden="true">*</span></label>
            <select
              id="powerType"
              name="powerType"
              value={character.powerType}
              onChange={(event) => updateCharacter("powerType", event.target.value)}
              required
              aria-invalid={errors.powerType ? "true" : "false"}
              aria-describedby={errors.powerType ? "powerType-error" : undefined}
            >
              <option value="">Select a power system</option>
              {powerTypeOptions.map((powerType) => (
                <option key={powerType} value={powerType}>{powerType}</option>
              ))}
            </select>
            {errors.powerType && <p id="powerType-error" className="power-error" role="alert">{errors.powerType}</p>}
          </div>

          <div className="power-field">
            <label htmlFor="powerName">Ability name <span aria-hidden="true">*</span></label>
            <input
              id="powerName"
              name="powerName"
              type="text"
              value={character.powerName}
              onChange={(event) => updateCharacter("powerName", event.target.value)}
              placeholder="e.g. Shadow Dominion"
              maxLength={60}
              required
              aria-invalid={errors.powerName ? "true" : "false"}
              aria-describedby={errors.powerName ? "powerName-error" : "powerName-help"}
            />
            <div className="power-field-meta">
              <small id="powerName-help">Make it memorable.</small>
              <small>{character.powerName.length}/60</small>
            </div>
            {errors.powerName && <p id="powerName-error" className="power-error" role="alert">{errors.powerName}</p>}
          </div>

          <div className="power-field power-field-full">
            <label htmlFor="powerDescription">Ability description <span aria-hidden="true">*</span></label>
            <textarea
              id="powerDescription"
              name="powerDescription"
              value={character.powerDescription}
              onChange={(event) => updateCharacter("powerDescription", event.target.value)}
              placeholder="Explain how the ability works, what it can do, and what makes it distinct..."
              rows={5}
              maxLength={500}
              required
              aria-invalid={errors.powerDescription ? "true" : "false"}
              aria-describedby={errors.powerDescription ? "powerDescription-error" : "powerDescription-help"}
            />
            <div className="power-field-meta">
              <small id="powerDescription-help">Think effect, range, style, and signature technique.</small>
              <small>{character.powerDescription.length}/500</small>
            </div>
            {errors.powerDescription && <p id="powerDescription-error" className="power-error" role="alert">{errors.powerDescription}</p>}
          </div>
        </div>

        <div className="power-name-ideas" aria-label="Ability name suggestions">
          <span>NEED A NAME?</span>
          {nameIdeas.map((name) => (
            <button key={name} type="button" onClick={() => updateCharacter("powerName", name)}>
              {name}
            </button>
          ))}
        </div>
      </div>

      <aside className="power-preview" aria-live="polite" aria-label="Live power preview">
        <div className="power-preview-topline">
          <span className="power-preview-orbit" aria-hidden="true">✧</span>
          <span>ABILITY DOSSIER</span>
          <span className="power-preview-status"><i /> LIVE PREVIEW</span>
        </div>
        <div className="power-preview-content">
          <p className="power-preview-type">{character.powerType || "POWER SYSTEM UNASSIGNED"}</p>
          <h3>{abilityName || "Unnamed Ability"}</h3>
          <p className="power-preview-description">
            {abilityDescription || "Your ability description will appear here as you shape your character’s signature power."}
          </p>
          <div className="power-preview-footer">
            <span>{selectedArchetype ? selectedArchetype.title : "Custom power path"}</span>
            <span>{abilityDescription ? `${abilityDescription.length} characters written` : "Awaiting description"}</span>
          </div>
        </div>
      </aside>
    </section>
  );
}

export default Power;