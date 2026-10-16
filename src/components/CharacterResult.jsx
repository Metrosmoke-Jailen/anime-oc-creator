import { useState } from "react";

function CharacterResult({ character, resetCharacter }) {
  const [copyStatus, setCopyStatus] = useState("idle");
  const appearance = character.appearance ?? {};

  const personality = Array.isArray(character.personality)
    ? character.personality
    : [];

  const weapon = character.weapon ?? {};

  const accessories = Array.isArray(character.accessories?.items)
    ? character.accessories.items
    : [];
  const titles = Array.isArray(character.titles) ? character.titles : [];

  const weaponAbilities = [
    ...(Array.isArray(weapon.abilities) ? weapon.abilities : []),
    ...(weapon.customAbility?.trim()
      ? [weapon.customAbility.trim()]
      : []),
  ];

  const appearanceItems = [
    ["Hair Color", appearance.hairColor],
    ["Hair Style", appearance.hairStyle],
    ["Eye Color", appearance.eyeColor],
    ["Eye Style", appearance.eyeStyle],
    ["Skin Tone", appearance.skinTone],
    ["Height", appearance.height],
    ["Body Build", appearance.build],
    ["Outfit", appearance.outfit],
    ["Style Accessories", appearance.accessories],
    ["Aesthetic", appearance.aesthetic],
  ];

  const hasAppearance =
    appearanceItems.some(([, value]) => Boolean(value)) ||
    Boolean(appearance.distinguishingFeatures?.trim());

  const handlePrint = () => {
    window.print();
  };

  const buildPlainTextProfile = () => {
    const lines = [
      character.name || "Unnamed Character",
      "=".repeat((character.name || "Unnamed Character").length),
      "",
      "IDENTITY",
      `Age: ${character.age || "Not specified"}`,
      `Gender: ${character.gender || "Not specified"}`,
      `Species: ${character.species || "Not specified"}`,
      `Role: ${character.role || "Not specified"}`,
      "",
      "PERSONALITY",
      personality.length ? personality.join(", ") : "Not specified",
      "",
      "TITLES",
      ...(titles.length
        ? titles.map((title) => `${title.isPrimary ? "Primary: " : ""}${title.name}${title.category ? ` (${title.category})` : ""}`)
        : ["None specified"]),
      "",
      "BACKSTORY",
      character.backstory || "No backstory provided.",
      "",
      "POWERS",
      `Power type: ${character.powerType || "Not specified"}`,
      `Ability: ${character.powerName || "Not specified"}`,
      character.powerDescription || "No power description provided.",
      "",
      "WEAPON",
      `Name: ${weapon.name || "Not specified"}`,
      `Type: ${weapon.type || "Not specified"}`,
      `Combat style: ${weapon.combatStyle || "Not specified"}`,
      `Origin: ${weapon.origin || "Not specified"}`,
      `Rarity: ${weapon.rarity || "Not specified"}`,
      `Abilities: ${weaponAbilities.length ? weaponAbilities.join(", ") : "None specified"}`,
      weapon.description || "",
      "",
      "ACCESSORIES",
      ...(accessories.length
        ? accessories.flatMap((item, index) => [
            `${item.name || item.type || `Accessory ${index + 1}`}${item.type ? ` (${item.type})` : ""}`,
            ...(item.location ? [`Location: ${item.location}`] : []),
            ...(item.purpose ? [`Purpose: ${item.purpose}`] : []),
            ...(item.material ? [`Material: ${item.material}`] : []),
            ...(Array.isArray(item.abilities) && item.abilities.length
              ? [`Abilities: ${item.abilities.join(", ")}`]
              : []),
            ...(item.description ? [item.description] : []),
            "",
          ])
        : ["None specified", ""]),
      "APPEARANCE",
      ...appearanceItems.filter(([, value]) => Boolean(value)).map(([label, value]) => `${label}: ${value}`),
      appearance.distinguishingFeatures ? `Distinguishing features: ${appearance.distinguishingFeatures}` : "",
      "",
      "Created with Anime OC Creator",
    ];

    return lines.filter((line) => line !== undefined).join("\n");
  };

  const handleCopyProfile = async () => {
    try {
      await navigator.clipboard.writeText(buildPlainTextProfile());
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 2200);
    } catch {
      setCopyStatus("failed");
      window.setTimeout(() => setCopyStatus("idle"), 3000);
    }
  };

  const handleDownloadJson = () => {
    const blob = new Blob([JSON.stringify(character, null, 2)], {
      type: "application/json;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const safeName = (character.name || "anime-oc")
      .trim()
      .replace(/[^a-z0-9-_]+/gi, "-")
      .replace(/^-+|-+$/g, "") || "anime-oc";

    link.href = url;
    link.download = `${safeName.toLowerCase()}-character.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <section className="mx-auto w-full max-w-4xl animate-fade-up">
      {/* Page Heading */}
      <div className="mb-8 text-center sm:mb-10">
        <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.16em] text-violet-300">
          Character Generated
        </p>

        <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
          Your Anime OC
        </h1>

        <p className="mt-3 text-sm text-[#b8b2c8] sm:text-base">
          Your original character profile is ready.
        </p>
      </div>

      <article
        className="overflow-hidden rounded-3xl border border-white/10 bg-[#161222] shadow-2xl shadow-black/30"
        aria-labelledby="profile-name"
      >
        {/* Character Banner */}
        <div className="flex flex-col items-center gap-5 bg-gradient-to-br from-violet-500/20 via-violet-500/5 to-transparent px-5 py-10 text-center sm:flex-row sm:px-8 sm:py-12 sm:text-left">
          <div
            className="grid size-24 shrink-0 place-items-center rounded-3xl border border-violet-300/20 bg-violet-500/10 text-4xl shadow-xl shadow-violet-950/20"
            aria-hidden="true"
          >
            ⚔️
          </div>

          <div className="min-w-0">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet-300">
              Original Character
            </p>

            <h2
              id="profile-name"
              className="mt-2 break-words text-3xl font-black text-white sm:text-4xl"
            >
              {character.name || "Unnamed Character"}
            </h2>

            <p className="mt-2 text-sm font-semibold text-[#b8b2c8]">
              {character.role || "Character"}
            </p>
          </div>
        </div>

        <div className="space-y-8 p-5 sm:p-8 md:p-10">
          {/* Identity */}
          <ProfileSection title="Identity" id="identity-heading">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                ["Age", character.age],
                ["Gender", character.gender],
                ["Species", character.species],
                ["Role", character.role],
              ].map(([label, value]) => (
                <ProfileItem
                  key={label}
                  label={label}
                  value={value}
                />
              ))}
            </div>
          </ProfileSection>

          {/* Personality */}
          <ProfileSection
            title="Personality"
            id="personality-heading"
          >
            {personality.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {personality.map((trait) => (
                  <span
                    key={trait}
                    className="inline-flex min-h-9 items-center rounded-full border border-violet-400/20 bg-violet-500/10 px-3 text-xs font-bold text-violet-200 sm:text-sm"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            ) : (
              <EmptyValue text="No personality traits specified." />
            )}
          </ProfileSection>

          {/* Titles */}
          <ProfileSection title="Titles & Epithets" id="titles-heading">
            {titles.length ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {titles.map((title, index) => (
                  <article
                    key={title.id ?? `${title.name}-${index}`}
                    className="rounded-2xl border border-violet-400/15 bg-violet-500/5 p-4"
                  >
                    <p className="text-xs font-bold uppercase tracking-wide text-violet-300">
                      {title.category || "Title"}{title.isPrimary ? " · Primary" : ""}
                    </p>
                    <h4 className="mt-1 font-bold text-white">{title.name}</h4>
                    {title.description && (
                      <p className="mt-2 text-sm leading-6 text-[#b8b2c8]">{title.description}</p>
                    )}
                  </article>
                ))}
              </div>
            ) : (
              <EmptyValue text="No titles specified." />
            )}
          </ProfileSection>

          {/* Powers */}
          <ProfileSection title="Powers" id="power-heading">
            <div className="rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-500/10 to-transparent p-5 sm:p-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-violet-300">
                {character.powerType || "Power type not specified"}
              </p>

              <h4 className="mt-2 break-words text-2xl font-black text-white">
                {character.powerName || "Unnamed Ability"}
              </h4>

              <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-[#b8b2c8]">
                {character.powerDescription || "No power description provided."}
              </p>
            </div>
          </ProfileSection>

          {/* Weapon */}
          <ProfileSection title="Weapon" id="weapon-heading">
            {weapon.name ||
            weapon.type ||
            weapon.description ||
            weapon.combatStyle ||
            weapon.origin ||
            weapon.rarity ||
            weaponAbilities.length > 0 ? (
              <div className="rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-500/10 to-transparent p-5 sm:p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="grid size-11 place-items-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-xl"
                    aria-hidden="true"
                  >
                    ⚔️
                  </span>

                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-violet-300">
                      Combat Equipment
                    </p>

                    <h4 className="mt-1 break-words text-xl font-black text-white">
                      {weapon.name || "Unnamed Weapon"}
                    </h4>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <ProfileItem label="Weapon Type" value={weapon.type} />
                  <ProfileItem label="Combat Style" value={weapon.combatStyle} />
                  <ProfileItem label="Origin" value={weapon.origin} />
                  <ProfileItem label="Rarity" value={weapon.rarity} />
                </div>

                <ProfileTags
                  label="Weapon Abilities"
                  items={weaponAbilities}
                />

                {weapon.description && (
                  <div className="mt-3">
                    <ProfileDescription
                      label="Description"
                      value={weapon.description}
                    />
                  </div>
                )}
              </div>
            ) : (
              <EmptyValue text="No weapon specified. This character may fight unarmed." />
            )}
          </ProfileSection>

          {/* Accessories */}
          <ProfileSection
            title="Accessories"
            id="accessories-heading"
          >
            {accessories.length > 0 ? (
              <div className="grid gap-3">
                {accessories.map((item, index) => (
                  <div
                    key={item.id ?? `${item.name}-${index}`}
                    className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <span
                        className="grid size-11 shrink-0 place-items-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-xl"
                        aria-hidden="true"
                      >
                        💠
                      </span>

                      <div className="min-w-0">
                        <h4 className="break-words font-bold text-white">
                          {item.name || `Accessory ${index + 1}`}
                        </h4>

                        <p className="mt-1 text-xs text-violet-200/70">
                          {[
                            item.type,
                            item.location,
                            item.purpose,
                          ]
                            .filter(Boolean)
                            .join(" • ") || "Details not specified"}
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <ProfileItem
                        label="Material"
                        value={item.material}
                      />

                      <ProfileTags
                        label="Abilities"
                        items={Array.isArray(item.abilities) ? item.abilities : []}
                      />
                    </div>

                    {item.description && (
                      <div className="mt-3">
                        <ProfileDescription
                          label="Description"
                          value={item.description}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <EmptyValue text="No accessories specified." />
            )}
          </ProfileSection>

          {/* Appearance */}
          <ProfileSection
            title="Appearance"
            id="appearance-profile-heading"
          >
            {hasAppearance ? (
              <div className="rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-500/10 to-transparent p-5 sm:p-6">
                <div className="mb-5 flex items-center gap-3">
                  <span
                    className="grid size-11 shrink-0 place-items-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-xl"
                    aria-hidden="true"
                  >
                    🎨
                  </span>

                  <div className="min-w-0">
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-violet-300">
                      Visual Design
                    </p>

                    <p className="mt-1 text-sm text-white/50">
                      Character appearance details
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {appearanceItems
                    .filter(([, value]) => Boolean(value))
                    .map(([label, value]) => (
                      <ProfileItem
                        key={label}
                        label={label}
                        value={value}
                      />
                    ))}
                </div>

                {appearance.distinguishingFeatures?.trim() && (
                  <div className="mt-3">
                    <ProfileDescription
                      label="Distinguishing Features"
                      value={appearance.distinguishingFeatures}
                    />
                  </div>
                )}
              </div>
            ) : (
              <EmptyValue text="No appearance details were specified." />
            )}
          </ProfileSection>


          <ProfileSection title="Backstory" id="backstory-heading">
            {character.backstory?.trim() ? (
              <p className="whitespace-pre-wrap break-words text-sm leading-7 text-[#b8b2c8]">
                {character.backstory}
              </p>
            ) : (
              <EmptyValue text="No backstory provided." />
            )}
          </ProfileSection>


          {/* Actions */}
          <div className="profile-export-panel print:hidden">
            <div>
              <p className="profile-export-kicker">TAKE YOUR CHARACTER WITH YOU</p>
              <h3>Save your creation</h3>
              <p>Copy a readable profile, download the structured character data, or print a keepsake version.</p>
            </div>

            <div className="profile-export-actions">
              <button type="button" className="profile-export-button profile-export-primary" onClick={handleCopyProfile}>
                {copyStatus === "copied" ? "✓ Copied to Clipboard" : copyStatus === "failed" ? "Clipboard Unavailable" : "▣ Copy Profile"}
              </button>
              <button type="button" className="profile-export-button" onClick={handleDownloadJson}>
                ↓ Download JSON
              </button>
              <button type="button" className="profile-export-button" onClick={handlePrint}>
                ⎙ Print Profile
              </button>
            </div>
            <p className="profile-export-status" aria-live="polite">
              {copyStatus === "copied" ? "Your character profile is ready to paste anywhere." : copyStatus === "failed" ? "Your browser blocked clipboard access. Try using Download JSON instead." : "Your character data stays in your browser unless you choose to export it."}
            </p>
          </div>

          <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row print:hidden">
            <button
              type="button"
              className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-gradient-to-br from-violet-300 to-violet-700 px-5 text-sm font-bold text-white shadow-lg shadow-violet-950/30 transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-violet-300"
              onClick={resetCharacter}
            >
              ✨ Create Another Character
            </button>
          </div>
        </div>
      </article>
    </section>
  );
}

function ProfileSection({ title, id, children }) {
  return (
    <section aria-labelledby={id}>
      <h3
        id={id}
        className="mb-4 text-lg font-bold text-white"
      >
        {title}
      </h3>

      {children}
    </section>
  );
}

function ProfileItem({ label, value }) {
  return (
    <div className="min-w-0 rounded-xl border border-white/10 bg-white/[0.025] p-4">
      <span className="block text-xs font-semibold uppercase tracking-wide text-[#817a91]">
        {label}
      </span>

      <strong className="mt-1 block break-words text-sm text-white">
        {value || "Not specified"}
      </strong>
    </div>
  );
}

function ProfileDescription({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/10 p-4">
      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-violet-200/70">
        {label}
      </p>

      <p className="whitespace-pre-wrap break-words text-sm leading-7 text-[#c7c0d5]">
        {value || "Not specified"}
      </p>
    </div>
  );
}

function ProfileTags({ label, items = [] }) {
  return (
    <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.025] p-4">
      <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-white/40">
        {label}
      </span>

      {items.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1.5 text-xs font-semibold text-violet-200"
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-white/50">None selected</p>
      )}
    </div>
  );
}

function EmptyValue({ text }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
      <p className="text-sm leading-6 text-white/50">{text}</p>
    </div>
  );
}

export default CharacterResult;
