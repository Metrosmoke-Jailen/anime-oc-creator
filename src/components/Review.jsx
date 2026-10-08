function Review({
  character,
  onEdit
}) {
  const hasRole =
    Boolean(character.role);

  return (
    <section
      className="creator-step"
      aria-labelledby="review-heading"
    >
      {/* Heading */}
      <div className="step-heading">
        <p className="eyebrow">
          STEP 04
        </p>

        <h2 id="review-heading">
          Review Your Character
        </h2>

        <p>
          Review everything before
          generating your final character.
          You can edit any completed section
          below.
        </p>
      </div>

      {/* Review Notice */}
      <div className="mb-6 rounded-2xl border border-purple-400/20 bg-purple-500/5 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span
            className="grid size-10 shrink-0 place-items-center rounded-xl border border-purple-400/20 bg-purple-500/10 text-lg"
            aria-hidden="true"
          >
            ✓
          </span>

          <div>
            <p className="text-sm font-bold text-purple-200">
              Almost there!
            </p>

            <p className="mt-1 text-sm leading-6 text-white/60">
              Everything looks good?
              Generate your character when
              you're ready.
            </p>
          </div>
        </div>
      </div>

      {/* Character Card */}
      <div className="review-card overflow-hidden rounded-2xl border border-white/10 bg-black/20">
        {/* Character Header */}
        <div className="review-header flex items-start gap-4 border-b border-white/10 p-5 sm:p-6">
          <div
            className="character-avatar grid size-14 shrink-0 place-items-center rounded-2xl border border-purple-400/30 bg-purple-500/10 text-2xl"
            aria-hidden="true"
          >
            ⚔️
          </div>

          <div className="min-w-0">
            <p className="eyebrow">
              ORIGINAL CHARACTER
            </p>

            <h3 className="mt-1 break-words text-xl font-bold sm:text-2xl">
              {character.name ||
                "Unnamed Character"}
            </h3>

            <p className="mt-1 text-sm text-white/60">
              {hasRole
                ? character.role
                : "Role not specified"}
            </p>
          </div>
        </div>

        {/* Basic Information */}
        <div className="review-section border-b border-white/10 p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow">
                IDENTITY
              </p>

              <h3 className="mt-1 text-lg font-bold">
                Basic Information
              </h3>
            </div>

            <button
              type="button"
              onClick={() => onEdit(1)}
              className="min-h-11 shrink-0 rounded-xl border border-purple-400/20 bg-purple-500/5 px-4 text-sm font-bold text-purple-200 transition hover:border-purple-400/40 hover:bg-purple-500/10 hover:text-white focus-visible:outline-3 focus-visible:outline-purple-300 focus-visible:outline-offset-2"
              aria-label="Edit basic information"
            >
              ✏️ Edit
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <ReviewItem
              label="Name"
              value={
                character.name ||
                "Not specified"
              }
            />

            <ReviewItem
              label="Age"
              value={
                character.age ||
                "Not specified"
              }
            />

            <ReviewItem
              label="Gender"
              value={
                character.gender ||
                "Not specified"
              }
            />

            <ReviewItem
              label="Species"
              value={
                character.species ||
                "Not specified"
              }
            />

            <ReviewItem
              label="Role"
              value={
                character.role ||
                "Not specified"
              }
            />
          </div>
        </div>

        {/* Personality */}
        <div className="review-section border-b border-white/10 p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow">
                CHARACTER TRAITS
              </p>

              <h3 className="mt-1 text-lg font-bold">
                Personality
              </h3>
            </div>

            <button
              type="button"
              onClick={() => onEdit(2)}
              className="min-h-11 shrink-0 rounded-xl border border-purple-400/20 bg-purple-500/5 px-4 text-sm font-bold text-purple-200 transition hover:border-purple-400/40 hover:bg-purple-500/10 hover:text-white focus-visible:outline-3 focus-visible:outline-purple-300 focus-visible:outline-offset-2"
              aria-label="Edit personality traits"
            >
              ✏️ Edit
            </button>
          </div>

          {character.personality
            .length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {character.personality.map(
                (trait) => (
                  <span
                    key={trait}
                    className="inline-flex min-h-9 items-center rounded-full border border-purple-400/20 bg-purple-500/10 px-3 text-sm font-semibold text-purple-200"
                  >
                    {trait}
                  </span>
                )
              )}
            </div>
          ) : (
            <p className="text-sm text-white/50">
              No personality traits
              selected.
            </p>
          )}
        </div>

        {/* Power */}
        <div className="review-section p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow">
                ABILITY SYSTEM
              </p>

              <h3 className="mt-1 text-lg font-bold">
                Power
              </h3>
            </div>

            <button
              type="button"
              onClick={() => onEdit(3)}
              className="min-h-11 shrink-0 rounded-xl border border-purple-400/20 bg-purple-500/5 px-4 text-sm font-bold text-purple-200 transition hover:border-purple-400/40 hover:bg-purple-500/10 hover:text-white focus-visible:outline-3 focus-visible:outline-purple-300 focus-visible:outline-offset-2"
              aria-label="Edit power information"
            >
              ✏️ Edit
            </button>
          </div>

          <div className="grid gap-3">
            <ReviewItem
              label="Power Type"
              value={
                character.powerType ||
                "Not specified"
              }
            />

            <ReviewItem
              label="Ability Name"
              value={
                character.powerName ||
                "Not specified"
              }
            />

            <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
              <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-white/40">
                Description
              </span>

              <p className="m-0 break-words text-sm leading-7 text-white/70">
                {character.powerDescription ||
                  "No description provided."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewItem({
  label,
  value
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
      <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-white/40">
        {label}
      </span>

      <strong className="break-words text-sm text-white">
        {value}
      </strong>
    </div>
  );
}

export default Review;