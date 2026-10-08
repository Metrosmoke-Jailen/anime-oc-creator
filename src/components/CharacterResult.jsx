function CharacterResult({
  character,
  resetCharacter
}) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="mx-auto w-full max-w-4xl animate-fade-up">
      <div className="mb-8 text-center sm:mb-10">
        <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.16em] text-violet-300">
          Character Generated
        </p>

        <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
          Your Anime OC
        </h1>

        <p className="mt-3 text-sm text-[#b8b2c8] sm:text-base">
          Your original character profile
          is ready.
        </p>
      </div>

      <article
        className="overflow-hidden rounded-3xl border border-white/10 bg-[#161222] shadow-2xl shadow-black/30"
        aria-labelledby="profile-name"
      >
        {/* Banner */}
        <div className="flex flex-col items-center gap-5 bg-gradient-to-br from-violet-500/20 via-violet-500/5 to-transparent px-5 py-10 text-center sm:flex-row sm:px-8 sm:py-12 sm:text-left">
          <div
            className="grid size-24 shrink-0 place-items-center rounded-3xl border border-violet-300/20 bg-violet-500/10 text-4xl shadow-xl shadow-violet-950/20"
            aria-hidden="true"
          >
            ⚔️
          </div>

          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-violet-300">
              Original Character
            </p>

            <h2
              id="profile-name"
              className="mt-2 break-words text-3xl font-black text-white sm:text-4xl"
            >
              {character.name}
            </h2>

            <p className="mt-2 text-sm font-semibold text-[#b8b2c8]">
              {character.role ||
                "Character"}
            </p>
          </div>
        </div>

        <div className="space-y-8 p-5 sm:p-8 md:p-10">
          {/* Identity */}
          <section aria-labelledby="identity-heading">
            <h3
              id="identity-heading"
              className="mb-4 text-lg font-bold text-white"
            >
              Identity
            </h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                ["Age", character.age],
                [
                  "Gender",
                  character.gender
                ],
                [
                  "Species",
                  character.species
                ],
                [
                  "Role",
                  character.role ||
                    "Not specified"
                ]
              ].map(
                ([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/10 bg-white/[0.025] p-4"
                  >
                    <span className="block text-xs font-semibold uppercase tracking-wide text-[#817a91]">
                      {label}
                    </span>

                    <strong className="mt-1 block text-sm text-white">
                      {value}
                    </strong>
                  </div>
                )
              )}
            </div>
          </section>

          {/* Personality */}
          <section aria-labelledby="personality-heading">
            <h3
              id="personality-heading"
              className="mb-4 text-lg font-bold text-white"
            >
              Personality
            </h3>

            <div className="flex flex-wrap gap-2">
              {character.personality.map(
                (trait) => (
                  <span
                    key={trait}
                    className="rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1.5 text-xs font-bold text-violet-200"
                  >
                    {trait}
                  </span>
                )
              )}
            </div>
          </section>

          {/* Power */}
          <section aria-labelledby="power-heading">
            <h3
              id="power-heading"
              className="mb-4 text-lg font-bold text-white"
            >
              Power
            </h3>

            <div className="rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-500/10 to-transparent p-5 sm:p-6">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-violet-300">
                {character.powerType}
              </p>

              <h4 className="mt-2 text-2xl font-black text-white">
                {character.powerName}
              </h4>

              <p className="mt-3 text-sm leading-7 text-[#b8b2c8]">
                {
                  character.powerDescription
                }
              </p>
            </div>
          </section>

          {/* Actions */}
          <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row">
            <button
              type="button"
              className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-5 text-sm font-bold text-white transition hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
              onClick={handlePrint}
            >
              🖨️ Print Profile
            </button>

            <button
              type="button"
              className="inline-flex min-h-12 flex-1 items-center justify-center rounded-xl bg-gradient-to-br from-violet-300 to-violet-700 px-5 text-sm font-bold text-white shadow-lg shadow-violet-950/30 transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
              onClick={resetCharacter}
            >
              ✨ Create Another
            </button>
          </div>
        </div>
      </article>
    </section>
  );
}

export default CharacterResult;