import {
  personalityOptions
} from "../data/options";

function Personality({
  character,
  updateCharacter,
  errors
}) {
  const selectedTraits =
    character.personality;

  const togglePersonality = (
    trait
  ) => {
    const isSelected =
      selectedTraits.includes(
        trait
      );

    if (isSelected) {
      updateCharacter(
        "personality",
        selectedTraits.filter(
          (item) =>
            item !== trait
        )
      );

      return;
    }

    if (
      selectedTraits.length >= 5
    ) {
      return;
    }

    updateCharacter(
      "personality",
      [
        ...selectedTraits,
        trait
      ]
    );
  };

  return (
    <section
      className="p-5 sm:p-7 md:p-8"
      aria-labelledby="personality-heading"
    >
      <div className="mb-8">
        <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.16em] text-violet-300">
          Step 02
        </p>

        <h2
          id="personality-heading"
          className="text-2xl font-black tracking-tight text-white sm:text-3xl"
        >
          Personality
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#b8b2c8] sm:text-base">
          Choose 3 to 5 traits that
          best describe your character.
        </p>

        <p
          className="mt-4 text-sm text-[#817a91]"
          aria-live="polite"
        >
          <strong className="text-white">
            {selectedTraits.length} / 5
          </strong>{" "}
          traits selected
        </p>
      </div>

      <fieldset>
        <legend className="mb-4 text-sm font-bold text-white">
          Personality Traits
          <span
            className="ml-1 text-red-400"
            aria-hidden="true"
          >
            *
          </span>
        </legend>

        <div
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          role="group"
          aria-label="Personality traits"
        >
          {personalityOptions.map(
            (trait) => {
              const isSelected =
                selectedTraits.includes(
                  trait
                );

              const isDisabled =
                !isSelected &&
                selectedTraits.length >=
                  5;

              return (
                <button
                  key={trait}
                  type="button"
                  className={`
                    min-h-12 rounded-xl border
                    px-3 py-2 text-sm font-semibold
                    transition

                    ${
                      isSelected
                        ? "border-violet-300/60 bg-violet-500/20 text-white shadow-lg shadow-violet-950/20"
                        : "border-white/10 bg-white/[0.025] text-[#b8b2c8] hover:border-violet-400/30 hover:bg-violet-500/[0.08] hover:text-white"
                    }

                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-violet-300

                    disabled:cursor-not-allowed
                    disabled:opacity-40
                  `}
                  onClick={() =>
                    togglePersonality(
                      trait
                    )
                  }
                  disabled={isDisabled}
                  aria-pressed={
                    isSelected
                  }
                >
                  {isSelected && (
                    <span aria-hidden="true">
                      ✓{" "}
                    </span>
                  )}

                  {trait}
                </button>
              );
            }
          )}
        </div>

        {errors.personality && (
          <p
            className="mt-4 text-sm font-medium text-red-400"
            role="alert"
          >
            {errors.personality}
          </p>
        )}
      </fieldset>
    </section>
  );
}

export default Personality;