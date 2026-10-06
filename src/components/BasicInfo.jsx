import {
  genderOptions,
  speciesOptions,
  roleOptions
} from "../data/options";

function BasicInfo({
  character,
  updateCharacter,
  errors
}) {
  return (
    <section
      className="creator-step"
      aria-labelledby="basic-info-heading"
    >
      <div className="step-heading">
        <p className="eyebrow">
          STEP 01
        </p>

        <h2 id="basic-info-heading">
          Basic Information
        </h2>

        <p>
          Start by defining the basic
          identity of your character.
        </p>
      </div>

      <div className="character-form">
        {/* Character Name */}
        <div className="form-group">
          <label htmlFor="name">
            Character Name
            <span
              className="required"
              aria-hidden="true"
            >
              *
            </span>
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={character.name}
            onChange={(event) =>
              updateCharacter(
                "name",
                event.target.value
              )
            }
            placeholder="Example: Kael Vanth"
            maxLength={40}
            autoComplete="name"
            required
            aria-describedby={
              errors.name
                ? "name-error"
                : "name-help"
            }
            aria-invalid={
              errors.name
                ? "true"
                : "false"
            }
          />

          <small id="name-help">
            {character.name.length}/40
            characters
          </small>

          {errors.name && (
            <p
              id="name-error"
              className="form-error"
              role="alert"
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Age */}
        <div className="form-group">
          <label htmlFor="age">
            Age
            <span
              className="required"
              aria-hidden="true"
            >
              *
            </span>
          </label>

          <input
            id="age"
            name="age"
            type="number"
            min="1"
            max="999"
            value={character.age}
            onChange={(event) =>
              updateCharacter(
                "age",
                event.target.value
              )
            }
            placeholder="19"
            required
            aria-describedby={
              errors.age
                ? "age-error"
                : undefined
            }
            aria-invalid={
              errors.age
                ? "true"
                : "false"
            }
          />

          {errors.age && (
            <p
              id="age-error"
              className="form-error"
              role="alert"
            >
              {errors.age}
            </p>
          )}
        </div>

        {/* Gender */}
        <div className="form-group">
          <label htmlFor="gender">
            Gender
            <span
              className="required"
              aria-hidden="true"
            >
              *
            </span>
          </label>

          <select
            id="gender"
            name="gender"
            value={character.gender}
            onChange={(event) =>
              updateCharacter(
                "gender",
                event.target.value
              )
            }
            required
            aria-describedby={
              errors.gender
                ? "gender-error"
                : undefined
            }
            aria-invalid={
              errors.gender
                ? "true"
                : "false"
            }
          >
            <option value="">
              Select gender
            </option>

            {genderOptions.map(
              (gender) => (
                <option
                  key={gender}
                  value={gender}
                >
                  {gender}
                </option>
              )
            )}
          </select>

          {errors.gender && (
            <p
              id="gender-error"
              className="form-error"
              role="alert"
            >
              {errors.gender}
            </p>
          )}
        </div>

        {/* Species */}
        <div className="form-group">
          <label htmlFor="species">
            Species
            <span
              className="required"
              aria-hidden="true"
            >
              *
            </span>
          </label>

          <select
            id="species"
            name="species"
            value={character.species}
            onChange={(event) =>
              updateCharacter(
                "species",
                event.target.value
              )
            }
            required
            aria-describedby={
              errors.species
                ? "species-error"
                : undefined
            }
            aria-invalid={
              errors.species
                ? "true"
                : "false"
            }
          >
            <option value="">
              Select species
            </option>

            {speciesOptions.map(
              (species) => (
                <option
                  key={species}
                  value={species}
                >
                  {species}
                </option>
              )
            )}
          </select>

          {errors.species && (
            <p
              id="species-error"
              className="form-error"
              role="alert"
            >
              {errors.species}
            </p>
          )}
        </div>

        {/* Character Role */}
        <div className="form-group form-group-full">
          <label htmlFor="role">
            Character Role
          </label>

          <select
            id="role"
            name="role"
            value={character.role}
            onChange={(event) =>
              updateCharacter(
                "role",
                event.target.value
              )
            }
          >
            <option value="">
              Select a role
            </option>

            {roleOptions.map(
              (role) => (
                <option
                  key={role}
                  value={role}
                >
                  {role}
                </option>
              )
            )}
          </select>
        </div>
      </div>
    </section>
  );
}

export default BasicInfo;