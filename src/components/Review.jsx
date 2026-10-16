function Review({ character, onEdit }) {
  const appearance = character.appearance ?? {};
  const personality = Array.isArray(character.personality)
    ? character.personality
    : [];
  const weapon = character.weapon ?? {};
  const accessories = Array.isArray(character.accessories?.items)
    ? character.accessories.items
    : [];
  const titles = Array.isArray(character.titles) ? character.titles : [];

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

  const weaponAbilities = [
    ...(Array.isArray(weapon.abilities) ? weapon.abilities : []),
    ...(weapon.customAbility?.trim()
      ? [weapon.customAbility.trim()]
      : []),
  ];

  return (
    <section
      className="p-5 sm:p-7 md:p-8"
      aria-labelledby="review-heading"
    >
      <div className="mb-8">
        <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.16em] text-violet-300">
          Step 09
        </p>

        <h2
          id="review-heading"
          className="text-2xl font-black tracking-tight text-white sm:text-3xl"
        >
          Review Your Character
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#b8b2c8] sm:text-base">
          Review every part of your original character before
          generating the final profile.
        </p>
      </div>

      <div className="mb-6 rounded-2xl border border-violet-400/20 bg-violet-500/5 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span
            className="grid size-10 shrink-0 place-items-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-lg"
            aria-hidden="true"
          >
            ✓
          </span>

          <div>
            <p className="text-sm font-bold text-violet-200">
              Your character is taking shape!
            </p>

            <p className="mt-1 text-sm leading-6 text-white/60">
              Use the Edit buttons to revisit any section.
              Weapons and accessories are optional.
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
        {/* Character Header */}
        <div className="flex items-start gap-4 border-b border-white/10 p-5 sm:p-6">
          <div
            className="grid size-14 shrink-0 place-items-center rounded-2xl border border-violet-400/30 bg-violet-500/10 text-2xl"
            aria-hidden="true"
          >
            ⚔️
          </div>

          <div className="min-w-0">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet-300">
              Original Character
            </p>

            <h3 className="mt-1 break-words text-xl font-bold text-white sm:text-2xl">
              {character.name || "Unnamed Character"}
            </h3>

            <p className="mt-1 text-sm text-white/60">
              {character.role || "Role not specified"}
            </p>
          </div>
        </div>

        {/* Basic Information */}
        <ReviewSection
          eyebrow="IDENTITY"
          title="Basic Information"
          onEdit={() => onEdit(1)}
          editLabel="Edit basic information"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <ReviewItem label="Name" value={character.name} />
            <ReviewItem label="Age" value={character.age} />
            <ReviewItem label="Gender" value={character.gender} />
            <ReviewItem label="Species" value={character.species} />
            <ReviewItem label="Role" value={character.role} />
          </div>
        </ReviewSection>

        {/* Personality */}
        <ReviewSection
          eyebrow="CHARACTER TRAITS"
          title="Personality"
          onEdit={() => onEdit(2)}
          editLabel="Edit personality traits"
        >
          {personality.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {personality.map((trait) => (
                <span
                  key={trait}
                  className="inline-flex min-h-9 items-center rounded-full border border-violet-400/20 bg-violet-500/10 px-3 text-sm font-semibold text-violet-200"
                >
                  {trait}
                </span>
              ))}
            </div>
          ) : (
            <EmptyValue text="No personality traits selected." />
          )}
        </ReviewSection>

        {/* Powers */}
        <ReviewSection
          eyebrow="ABILITY SYSTEM"
          title="Powers"
          onEdit={() => onEdit(3)}
          editLabel="Edit power information"
        >
          <div className="grid gap-3">
            <ReviewItem
              label="Power Type"
              value={character.powerType}
            />

            <ReviewItem
              label="Ability Name"
              value={character.powerName}
            />

            <DescriptionBox
              label="Power Description"
              value={character.powerDescription}
            />
          </div>
        </ReviewSection>

        {/* Weapons */}
        <ReviewSection
          eyebrow="COMBAT EQUIPMENT"
          title="Weapons"
          onEdit={() => onEdit(4)}
          editLabel="Edit weapon information"
        >
          {weapon.name ||
          weapon.type ||
          weapon.description ||
          weapon.combatStyle ||
          weapon.origin ||
          weapon.rarity ||
          weaponAbilities.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              <ReviewItem
                label="Weapon Name"
                value={weapon.name}
              />

              <ReviewItem
                label="Weapon Type"
                value={weapon.type}
              />

              <ReviewItem
                label="Combat Style"
                value={weapon.combatStyle}
              />

              <ReviewItem
                label="Origin"
                value={weapon.origin}
              />

              <ReviewItem
                label="Rarity"
                value={weapon.rarity}
              />

              <TagList
                label="Weapon Abilities"
                items={weaponAbilities}
              />

              <div className="sm:col-span-2">
                <DescriptionBox
                  label="Weapon Description"
                  value={weapon.description}
                />
              </div>
            </div>
          ) : (
            <EmptyValue text="No weapon details added. Your character may fight unarmed." />
          )}
        </ReviewSection>

        {/* Accessories */}
        <ReviewSection
          eyebrow="PERSONAL ITEMS"
          title="Accessories"
          onEdit={() => onEdit(5)}
          editLabel="Edit accessories"
        >
          {accessories.length > 0 ? (
            <div className="grid gap-3">
              {accessories.map((item, index) => (
                <div
                  key={item.id ?? `${item.name}-${index}`}
                  className="rounded-xl border border-white/10 bg-white/[0.025] p-4"
                >
                  <div className="mb-3 flex items-start gap-3">
                    <span
                      className="grid size-10 shrink-0 place-items-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-lg"
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
                    <ReviewItem
                      label="Material"
                      value={item.material}
                    />

                    <TagList
                      label="Abilities"
                      items={Array.isArray(item.abilities) ? item.abilities : []}
                    />
                  </div>

                  {item.description && (
                    <div className="mt-3">
                      <DescriptionBox
                        label="Description"
                        value={item.description}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <EmptyValue text="No accessories added." />
          )}
        </ReviewSection>

        {/* Backstory */}
        <ReviewSection
          eyebrow="HISTORY"
          title="Backstory"
          onEdit={() => onEdit(7)}
          editLabel="Edit backstory"
        >
          {character.backstory?.trim() ? (
            <DescriptionBox label="Character history" value={character.backstory} />
          ) : (
            <EmptyValue text="No backstory added." />
          )}
        </ReviewSection>

        {/* Titles */}
        <ReviewSection
          eyebrow="HONOR & REPUTATION"
          title="Titles & Epithets"
          onEdit={() => onEdit(8)}
          editLabel="Edit titles"
        >
          {titles.length ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {titles.map((title, index) => (
                <article
                  key={title.id ?? `${title.name}-${index}`}
                  className="rounded-xl border border-white/10 bg-white/[0.025] p-4"
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-violet-300">
                    {title.category || "Title"}{title.isPrimary ? " · Primary" : ""}
                  </p>
                  <h4 className="mt-1 font-bold text-white">{title.name}</h4>
                  {title.description && (
                    <p className="mt-2 text-sm leading-6 text-white/60">{title.description}</p>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <EmptyValue text="No titles added." />
          )}
        </ReviewSection>

        {/* Appearance */}
        <ReviewSection
          eyebrow="VISUAL DESIGN"
          title="Appearance"
          onEdit={() => onEdit(6)}
          editLabel="Edit character appearance"
          last
        >
          {hasAppearance ? (
            <>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {appearanceItems
                  .filter(([, value]) => Boolean(value))
                  .map(([label, value]) => (
                    <ReviewItem
                      key={label}
                      label={label}
                      value={value}
                    />
                  ))}
              </div>

              {appearance.distinguishingFeatures?.trim() && (
                <div className="mt-3">
                  <DescriptionBox
                    label="Distinguishing Features"
                    value={appearance.distinguishingFeatures}
                  />
                </div>
              )}
            </>
          ) : (
            <div>
              <EmptyValue text="No appearance details added yet." />

              <button
                type="button"
                onClick={() => onEdit(6)}
                className="mt-3 min-h-11 rounded-xl border border-violet-400/20 px-4 text-sm font-bold text-violet-200 transition hover:bg-violet-500/10 focus-visible:outline-2 focus-visible:outline-violet-300"
              >
                Customize Appearance
              </button>
            </div>
          )}
        </ReviewSection>
      </div>
    </section>
  );
}

function ReviewSection({
  eyebrow,
  title,
  onEdit,
  editLabel,
  last = false,
  children,
}) {
  return (
    <div
      className={`p-5 sm:p-6 ${
        last ? "" : "border-b border-white/10"
      }`}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-violet-300">
            {eyebrow}
          </p>

          <h3 className="mt-1 text-lg font-bold text-white">
            {title}
          </h3>
        </div>

        <button
          type="button"
          onClick={onEdit}
          aria-label={editLabel}
          className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-violet-400/20 bg-violet-500/5 px-3 text-sm font-bold text-violet-200 transition hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 sm:px-4"
        >
          <span aria-hidden="true">✏️</span>
          Edit
        </button>
      </div>

      {children}
    </div>
  );
}

function ReviewItem({ label, value }) {
  return (
    <div className="min-w-0 rounded-xl border border-white/10 bg-white/[0.025] p-4">
      <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-white/40">
        {label}
      </span>

      <strong className="break-words text-sm text-white">
        {value || "Not specified"}
      </strong>
    </div>
  );
}

function DescriptionBox({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
      <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-white/40">
        {label}
      </span>

      <p className="whitespace-pre-wrap break-words text-sm leading-7 text-white/70">
        {value || "Not specified"}
      </p>
    </div>
  );
}

function TagList({ label, items = [] }) {
  return (
    <div className="min-w-0 rounded-xl border border-white/10 bg-white/[0.025] p-4">
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
    <p className="text-sm text-white/50">
      {text}
    </p>
  );
}

export default Review;
