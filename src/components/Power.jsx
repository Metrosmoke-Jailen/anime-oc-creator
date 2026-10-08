import {
  powerTypeOptions
} from "../data/options";

function Power({
  character,
  updateCharacter,
  errors
}) {
  return (
    <section
      className="p-5 sm:p-7 md:p-8"
      aria-labelledby="power-heading"
    >
      <div className="mb-8">
        <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.16em] text-violet-300">
          Step 03
        </p>

        <h2
          id="power-heading"
          className="text-2xl font-black tracking-tight text-white sm:text-3xl"
        >
          Power
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#b8b2c8] sm:text-base">
          Give your character a unique
          ability and define how their
          power works.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Power Type */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="powerType"
            className="text-sm font-bold text-white"
          >
            Power Type
            <span
              className="ml-1 text-red-400"
              aria-hidden="true"
            >
              *
            </span>
          </label>

          <select
            id="powerType"
            name="powerType"
            value={
              character.powerType
            }
            onChange={(event) =>
              updateCharacter(
                "powerType",
                event.target.value
              )
            }
            required
            className="min-h-12 w-full rounded-xl border border-white/10 bg-[#171322] px-4 text-sm text-white outline-none transition focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/20"
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
              className="text-sm font-medium text-red-400"
              role="alert"
            >
              {errors.powerType}
            </p>
          )}
        </div>

        {/* Ability Name */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="powerName"
            className="text-sm font-bold text-white"
          >
            Ability Name
            <span
              className="ml-1 text-red-400"
              aria-hidden="true"
            >
              *
            </span>
          </label>

          <input
            id="powerName"
            name="powerName"
            type="text"
            value={
              character.powerName
            }
            onChange={(event) =>
              updateCharacter(
                "powerName",
                event.target.value
              )
            }
            placeholder="Example: Shadow Dominion"
            maxLength={60}
            required
            className="min-h-12 w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 text-sm text-white placeholder:text-[#817a91] outline-none transition focus:border-violet-400/60 focus:bg-violet-500/[0.04] focus:ring-2 focus:ring-violet-400/20"
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

          <small
            id="powerName-help"
            className="text-xs text-[#817a91]"
          >
            {
              character.powerName
                .length
            }
            /60 characters
          </small>

          {errors.powerName && (
            <p
              id="powerName-error"
              className="text-sm font-medium text-red-400"
              role="alert"
            >
              {errors.powerName}
            </p>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label
            htmlFor="powerDescription"
            className="text-sm font-bold text-white"
          >
            Ability Description
            <span
              className="ml-1 text-red-400"
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
            className="min-h-40 w-full resize-y rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-sm leading-6 text-white placeholder:text-[#817a91] outline-none transition focus:border-violet-400/60 focus:bg-violet-500/[0.04] focus:ring-2 focus:ring-violet-400/20"
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
            className="text-xs text-[#817a91]"
            aria-live="polite"
          >
            {
              character
                .powerDescription
                .length
            }
            /500 characters
          </small>

          {errors.powerDescription && (
            <p
              id="powerDescription-error"
              className="text-sm font-medium text-red-400"
              role="alert"
            >
              {
                errors.powerDescription
              }
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Power;