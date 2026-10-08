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
      className="p-5 sm:p-7 md:p-8"
      aria-labelledby="basic-info-heading"
    >
      <div className="mb-8">
        <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.16em] text-violet-300">
          Step 01
        </p>

        <h2
          id="basic-info-heading"
          className="text-2xl font-black tracking-tight text-white sm:text-3xl"
        >
          Basic Information
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#b8b2c8] sm:text-base">
          Start by defining the basic
          identity of your character.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-sm font-bold text-white"
          >
            Character Name
            <span
              className="ml-1 text-red-400"
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
            className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 text-sm text-white placeholder:text-[#817a91] outline-none transition focus:border-violet-400/60 focus:bg-violet-500/[0.04] focus:ring-2 focus:ring-violet-400/20"
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

          <small
            id="name-help"
            className="text-xs text-[#817a91]"
          >
            {character.name.length}/40
            characters
          </small>

          {errors.name && (
            <p
              id="name-error"
              className="text-sm font-medium text-red-400"
              role="alert"
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Age */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="age"
            className="text-sm font-bold text-white"
          >
            Age
            <span
              className="ml-1 text-red-400"
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
            className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 text-sm text-white placeholder:text-[#817a91] outline-none transition focus:border-violet-400/60 focus:bg-violet-500/[0.04] focus:ring-2 focus:ring-violet-400/20"
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
              className="text-sm font-medium text-red-400"
              role="alert"
            >
              {errors.age}
            </p>
          )}
        </div>

        {/* Gender */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="gender"
            className="text-sm font-bold text-white"
          >
            Gender
            <span
              className="ml-1 text-red-400"
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
            className="min-h-12 w-full rounded-xl border border-white/10 bg-[#171322] px-4 text-sm text-white outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/20"
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
              className="text-sm font-medium text-red-400"
              role="alert"
            >
              {errors.gender}
            </p>
          )}
        </div>

        {/* Species */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="species"
            className="text-sm font-bold text-white"
          >
            Species
            <span
              className="ml-1 text-red-400"
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
            className="min-h-12 w-full rounded-xl border border-white/10 bg-[#171322] px-4 text-sm text-white outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/20"
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
              className="text-sm font-medium text-red-400"
              role="alert"
            >
              {errors.species}
            </p>
          )}
        </div>

        {/* Role */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label
            htmlFor="role"
            className="text-sm font-bold text-white"
          >
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
            className="min-h-12 w-full rounded-xl border border-white/10 bg-[#171322] px-4 text-sm text-white outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/20"
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