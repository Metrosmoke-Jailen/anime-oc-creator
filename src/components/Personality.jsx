import { personalityOptions } from "../data/options";

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
      className="creator-step"
      aria-labelledby="personality-heading"
    >
      <div className="step-heading">
        <p className="eyebrow">
          STEP 02
        </p>

        <h2 id="personality-heading">
          Personality
        </h2>

        <p>
          Choose 3 to 5 traits that
          describe your character.
        </p>

        <p
          className="trait-counter"
          aria-live="polite"
        >
          <strong>
            {selectedTraits.length} / 5
          </strong>{" "}
          traits selected
        </p>
      </div>

      <fieldset className="personality-fieldset">
        <legend>
          Personality Traits
          <span
            className="required"
            aria-hidden="true"
          >
            *
          </span>
        </legend>

        <div
          className="trait-grid"
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
                  className={`trait-button ${
                    isSelected
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    togglePersonality(
                      trait
                    )
                  }
                  disabled={
                    isDisabled
                  }
                  aria-pressed={
                    isSelected
                  }
                >
                  {trait}
                </button>
              );
            }
          )}
        </div>

        {errors.personality && (
          <p
            className="form-error"
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