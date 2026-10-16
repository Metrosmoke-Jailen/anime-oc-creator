import { appearanceOptions } from "../data/options";

const appearanceFields = [
  {
    name: "hairColor",
    label: "Hair Color",
    placeholder: "Select hair color",
    options: appearanceOptions.hairColorOptions
  },
  {
    name: "hairStyle",
    label: "Hair Style",
    placeholder: "Select hair style",
    options: appearanceOptions.hairStyleOptions
  },
  {
    name: "eyeColor",
    label: "Eye Color",
    placeholder: "Select eye color",
    options: appearanceOptions.eyeColorOptions
  },
  {
    name: "eyeStyle",
    label: "Eye Style",
    placeholder: "Select eye style",
    options: appearanceOptions.eyeStyleOptions
  },
  {
    name: "skinTone",
    label: "Skin Tone",
    placeholder: "Select skin tone",
    options: appearanceOptions.skinToneOptions
  },
  {
    name: "height",
    label: "Height",
    placeholder: "Select height",
    options: appearanceOptions.heightOptions
  },
  {
    name: "build",
    label: "Body Build",
    placeholder: "Select body build",
    options: appearanceOptions.buildOptions
  },
  {
    name: "outfit",
    label: "Clothing / Outfit",
    placeholder: "Select outfit style",
    options: appearanceOptions.outfitOptions
  },
  {
    name: "accessories",
    label: "Accessories",
    placeholder: "Select accessories",
    options: appearanceOptions.accessoryOptions
  },
  {
    name: "aesthetic",
    label: "Overall Aesthetic",
    placeholder: "Select visual aesthetic",
    options: appearanceOptions.aestheticOptions
  }
];

function Appearance({
  character,
  updateCharacter,
  errors = {}
}) {
  const appearance = character.appearance ?? {};

  const updateAppearance = (field, value) => {
    updateCharacter("appearance", {
      ...appearance,
      [field]: value
    });
  };

  const completedFields = appearanceFields.filter(
    ({ name }) => Boolean(appearance[name]?.trim())
  ).length;

  const appearancePercentage = Math.round(
    (completedFields / appearanceFields.length) * 100
  );

  const appearanceDescription = [
    appearance.hairStyle && appearance.hairColor
      ? `${appearance.hairStyle.toLowerCase()} ${appearance.hairColor.toLowerCase()} hair`
      : appearance.hairColor
        ? `${appearance.hairColor.toLowerCase()} hair`
        : appearance.hairStyle
          ? `${appearance.hairStyle.toLowerCase()} hair`
          : null,
    appearance.eyeColor
      ? `${appearance.eyeColor.toLowerCase()} eyes`
      : null,
    appearance.eyeStyle
      ? `${appearance.eyeStyle.toLowerCase()} eyes`
      : null,
    appearance.skinTone
      ? `${appearance.skinTone.toLowerCase()} skin`
      : null,
    appearance.height
      ? `${appearance.height.toLowerCase()} stature`
      : null,
    appearance.build
      ? `${appearance.build.toLowerCase()} build`
      : null,
    appearance.outfit
      ? `wearing ${appearance.outfit.toLowerCase()}`
      : null,
    appearance.accessories &&
    appearance.accessories !== "None"
      ? `accessorized with ${appearance.accessories.toLowerCase()}`
      : null,
    appearance.aesthetic
      ? `${appearance.aesthetic.toLowerCase()} aesthetic`
      : null,
    appearance.distinguishingFeatures?.trim() || null
  ].filter(Boolean);

  return (
    <section
      className="p-5 sm:p-7 md:p-8"
      aria-labelledby="appearance-heading"
    >
      {/* Heading */}
      <div className="mb-8">
        <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.16em] text-violet-300">
          Step 06
        </p>

        <h2
          id="appearance-heading"
          className="text-2xl font-black tracking-tight text-white sm:text-3xl"
        >
          Appearance Creator
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#b8b2c8] sm:text-base">
          Design your character's visual identity.
          Choose their hair, eyes, outfit, physique,
          accessories, and overall aesthetic.
        </p>

        <p className="mt-3 text-xs leading-5 text-white/40">
          Appearance details are optional. Fill in
          as much or as little as you like.
        </p>
      </div>

      {/* Appearance Completion */}
      <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-white">
              Visual Design Progress
            </p>

            <p className="mt-1 text-xs text-white/45">
              {completedFields} of {appearanceFields.length} details selected
            </p>
          </div>

          <strong className="text-xl font-black text-violet-200">
            {appearancePercentage}%
          </strong>
        </div>

        <div
          className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-label="Appearance details completed"
          aria-valuenow={appearancePercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-400 transition-all duration-300"
            style={{ width: `${appearancePercentage}%` }}
          />
        </div>
      </div>

      {/* Quick visual palettes */}
      <div className="appearance-studio-block">
        <div className="appearance-studio-heading">
          <div>
            <p className="appearance-kicker">01 / COLOR DIRECTION</p>
            <h3>Choose the character's palette</h3>
            <p>Tap a swatch to instantly set the matching detail.</p>
          </div>
          <span className="appearance-studio-icon" aria-hidden="true">✦</span>
        </div>

        <div className="appearance-palette-group">
          <p className="appearance-palette-label">HAIR COLOR</p>
          <div className="appearance-swatches" role="group" aria-label="Quick hair color palette">
            {[
              ["Black", "#17151d"], ["White", "#f4f0ff"], ["Silver", "#aeb8ca"],
              ["Brown", "#79513d"], ["Blonde", "#f3d36a"], ["Crimson", "#c92c50"],
              ["Purple", "#9b6cff"], ["Blue", "#4c8dff"], ["Green", "#49c99a"]
            ].map(([label, color]) => (
              <button
                type="button"
                key={label}
                className={`appearance-swatch ${appearance.hairColor === label ? "is-selected" : ""}`}
                onClick={() => updateAppearance("hairColor", label)}
                aria-label={`Set hair color to ${label}`}
                aria-pressed={appearance.hairColor === label}
                title={label}
              >
                <span style={{ background: color }} />
                <small>{label}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="appearance-palette-group">
          <p className="appearance-palette-label">EYE COLOR</p>
          <div className="appearance-swatches" role="group" aria-label="Quick eye color palette">
            {[
              ["Brown", "#8b5739"], ["Amber", "#d99435"], ["Crimson", "#d52c4c"],
              ["Gold", "#f4ce54"], ["Emerald", "#32b985"], ["Ice Blue", "#8ce7ff"],
              ["Violet", "#a879ff"], ["Silver", "#c8d2e6"], ["Glowing", "#fff5a6"]
            ].map(([label, color]) => (
              <button
                type="button"
                key={label}
                className={`appearance-swatch ${appearance.eyeColor === label ? "is-selected" : ""}`}
                onClick={() => updateAppearance("eyeColor", label)}
                aria-label={`Set eye color to ${label}`}
                aria-pressed={appearance.eyeColor === label}
                title={label}
              >
                <span style={{ background: color }} />
                <small>{label}</small>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Style direction cards */}
      <div className="appearance-studio-block">
        <div className="appearance-studio-heading">
          <div>
            <p className="appearance-kicker">02 / STYLE DIRECTION</p>
            <h3>Set the visual aesthetic</h3>
            <p>Choose a starting point, then fine-tune the details below.</p>
          </div>
        </div>
        <div className="appearance-style-grid">
          {[
            { name: "Dark Fantasy", icon: "☾", note: "Shadowed, ornate, dramatic" },
            { name: "Celestial", icon: "✧", note: "Radiant, ethereal, divine" },
            { name: "Cyberpunk", icon: "⌁", note: "Neon, techwear, futuristic" },
            { name: "High Fantasy", icon: "♜", note: "Regal, magical, legendary" },
            { name: "Gothic", icon: "♢", note: "Elegant, moody, intricate" },
            { name: "Classic Shonen", icon: "⚡", note: "Bold, energetic, iconic" }
          ].map((style) => (
            <button
              type="button"
              key={style.name}
              className={`appearance-style-card ${appearance.aesthetic === style.name ? "is-selected" : ""}`}
              onClick={() => updateAppearance("aesthetic", style.name)}
              aria-pressed={appearance.aesthetic === style.name}
            >
              <span className="appearance-style-icon" aria-hidden="true">{style.icon}</span>
              <span className="appearance-style-copy">
                <strong>{style.name}</strong>
                <small>{style.note}</small>
              </span>
              <span className="appearance-style-check" aria-hidden="true">{appearance.aesthetic === style.name ? "✓" : "+"}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Select Fields */}
      <div className="appearance-studio-block appearance-detail-block">
        <div className="appearance-studio-heading">
          <div>
            <p className="appearance-kicker">03 / DETAIL WORK</p>
            <h3>Refine the design</h3>
            <p>Dial in the silhouette, outfit, features, and finishing touches.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {appearanceFields.map((field) => (
          <div
            key={field.name}
            className="flex min-w-0 flex-col gap-2"
          >
            <label
              htmlFor={`appearance-${field.name}`}
              className="text-sm font-bold text-white"
            >
              {field.label}
            </label>

            <select
              id={`appearance-${field.name}`}
              name={field.name}
              value={appearance[field.name] ?? ""}
              onChange={(event) =>
                updateAppearance(field.name, event.target.value)
              }
              className="min-h-12 w-full min-w-0 rounded-xl border border-white/10 bg-[#171322] px-4 text-sm text-white outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/20"
            >
              <option value="">
                {field.placeholder}
              </option>

              {field.options.map((option) => (
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
        </div>
      </div>

      {/* Distinguishing Features */}
      <div className="mt-6 flex flex-col gap-2">
        <label
          htmlFor="appearance-distinguishingFeatures"
          className="text-sm font-bold text-white"
        >
          Distinguishing Features
        </label>

        <p
          id="distinguishing-features-help"
          className="text-xs leading-5 text-white/45"
        >
          Describe scars, tattoos, markings, horns,
          unusual pupils, facial features, or other
          details that make your character unique.
        </p>

        <textarea
          id="appearance-distinguishingFeatures"
          name="distinguishingFeatures"
          rows={4}
          maxLength={500}
          value={appearance.distinguishingFeatures ?? ""}
          onChange={(event) =>
            updateAppearance(
              "distinguishingFeatures",
              event.target.value
            )
          }
          placeholder="Example: A thin scar crosses the left eyebrow. Glowing violet markings appear along the neck when using magic."
          aria-describedby="distinguishing-features-help distinguishing-features-count"
          className="min-h-32 w-full resize-y rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm leading-6 text-white placeholder:text-[#817a91] outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/20"
        />

        <p
          id="distinguishing-features-count"
          className="text-right text-xs text-white/40"
          aria-live="polite"
        >
          {(appearance.distinguishingFeatures ?? "").length}/500 characters
        </p>

        {errors.distinguishingFeatures && (
          <p
            className="text-sm font-medium text-red-400"
            role="alert"
          >
            {errors.distinguishingFeatures}
          </p>
        )}
      </div>

      {/* Live Summary */}
      <div className="mt-8 rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/10 via-purple-500/[0.04] to-transparent p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div
            className="appearance-character-token"
            aria-hidden="true"
            style={{
              "--preview-hair": ({
                Black: "#17151d", White: "#f4f0ff", Silver: "#aeb8ca", Gray: "#777887",
                Brown: "#79513d", Blonde: "#f3d36a", "Platinum Blonde": "#f2e7c5",
                Red: "#c92c50", Crimson: "#c92c50", Pink: "#f18bc4", Purple: "#9b6cff",
                Blue: "#4c8dff", Cyan: "#67e8f9", Green: "#49c99a", Teal: "#2dd4bf",
                Orange: "#f97316", Golden: "#facc15", Rainbow: "#c084fc", "Two-Tone": "#9b6cff"
              })[appearance.hairColor] || "#262033"
            }}
          >
            <span className="appearance-token-hair" />
            <span className="appearance-token-face" style={{
              "--preview-eyes": ({
                Black: "#17151d", Brown: "#8b5739", Amber: "#d99435", Red: "#d52c4c",
                Crimson: "#d52c4c", Orange: "#f97316", Yellow: "#f4ce54", Gold: "#f4ce54",
                Green: "#32b985", Emerald: "#32b985", Blue: "#4c8dff", "Ice Blue": "#8ce7ff",
                Cyan: "#67e8f9", Purple: "#9b6cff", Violet: "#a879ff", Pink: "#f18bc4",
                Silver: "#c8d2e6", White: "#fff", Glowing: "#fff5a6"
              })[appearance.eyeColor] || "#2a163b"
            }}>
              <i />
              <i />
            </span>
            <span className="appearance-token-collar" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet-300">
              Appearance Preview
            </p>

            <h3 className="mt-1 text-lg font-bold text-white">
              {character.name?.trim() || "Your Character"}
            </h3>
            <div className="appearance-preview-tags">
              {[appearance.aesthetic, appearance.outfit, appearance.hairColor && `${appearance.hairColor} hair`].filter(Boolean).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            {appearanceDescription.length > 0 ? (
              <p className="mt-3 break-words text-sm leading-7 text-[#c7c0d5]">
                {character.name?.trim() || "This character"} has{" "}
                {appearanceDescription.join(", ")}.
              </p>
            ) : (
              <p className="mt-3 text-sm leading-6 text-white/50">
                Your visual description will appear here as
                you choose appearance details.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Appearance;