import { powerTypeOptions } from "../data/options";

function Power({
  character,
  updateCharacter,
  errors
}) {
  return (
    <section
      className="creator-step"
      aria-labelledby="power-heading"
    >
      <div className="step-heading">
        <p className="eyebrow">
          STEP 03
        </p>

        <h2 id="power-heading">
          Power
        </h2>

        <p>
          Give your character a unique
          ability and define how their
          power works.
        </p>
      </div>

      <div className="character-form">
        {/* Power Type */}
        <div className="form-group">
          <label htmlFor="powerType">
            Power Type
            <span
              className="required"
              aria-hidden="true"
            >
              *
            </span>
          </label>

          <select
            id="powerType"
            name="powerType"
            value={character.powerType}
            onChange={(event) =>
              updateCharacter(
                "powerType",
                event.target.value
              )
            }
            required
            aria-describedby={
              errors.powerType
                ? "powerType-error"
                : undefined
            }
            aria-invalid={
              errors.powerType
                ? "true"
                : "false"
            }
          >
            <option value="">
              Select a power system
            </option>

            {powerTypeOptions.map(
              (powerType) => (
                <option
                  key={powerType}
                  value={powerType}
                >
                  {powerType}
                </option>
              )
            )}
          </select>

          {errors.powerType && (
            <p
              id="powerType-error"
              className="form-error"
              role="alert"
            >
              {errors.powerType}
            </p>
          )}
        </div>

        {/* Ability Name */}
        <div className="form-group">
          <label htmlFor="powerName">
            Ability Name
            <span
              className="required"
              aria-hidden="true"
            >
              *
            </span>
          </label>

          <input
            id="powerName"
            name="powerName"
            type="text"
            value={character.powerName}
            onChange={(event) =>
              updateCharacter(
                "powerName",
                event.target.value
              )
            }
            placeholder="Example: Shadow Dominion"
            maxLength={60}
            required
            aria-describedby={
              errors.powerName
                ? "powerName-error"
                : "powerName-help"
            }
            aria-invalid={
              errors.powerName
                ? "true"
                : "false"
            }
          />

          <small id="powerName-help">
            {character.powerName.length}/60
            characters
          </small>

          {errors.powerName && (
            <p
              id="powerName-error"
              className="form-error"
              role="alert"
            >
              {errors.powerName}
            </p>
          )}
        </div>

        {/* Ability Description */}
        <div className="form-group form-group-full">
          <label htmlFor="powerDescription">
            Ability Description
            <span
              className="required"
              aria-hidden="true"
            >
              *
            </span>
          </label>

          <textarea
            id="powerDescription"
            name="powerDescription"
            value={
              character.powerDescription
            }
            onChange={(event) =>
              updateCharacter(
                "powerDescription",
                event.target.value
              )
            }
            placeholder="Describe what the ability does, how it works, and what makes it unique..."
            rows="7"
            maxLength={500}
            required
            aria-describedby={
              errors.powerDescription
                ? "powerDescription-error"
                : "powerDescription-help"
            }
            aria-invalid={
              errors.powerDescription
                ? "true"
                : "false"
            }
          />

          <small
            id="powerDescription-help"
            aria-live="polite"
          >
            {
              character.powerDescription
                .length
            }
            /500 characters
          </small>

          {errors.powerDescription && (
            <p
              id="powerDescription-error"
              className="form-error"
              role="alert"
            >
              {errors.powerDescription}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Power;