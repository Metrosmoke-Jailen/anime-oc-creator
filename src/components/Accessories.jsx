
import { useState } from "react";
import { accessoryOptions } from "../data/options";

const createEmptyAccessory = () => ({
  type: "",
  name: "",
  location: "",
  purpose: "",
  material: "",
  description: "",
  abilities: []
});

export default function Accessories({ character, setCharacter }) {
  const accessoryData = character.accessories ?? {
    items: [],
    current: createEmptyAccessory()
  };

  const draft = accessoryData.current ?? createEmptyAccessory();
  const accessories = accessoryData.items ?? [];

  const [customAbility, setCustomAbility] = useState("");

  function updateDraft(field, value) {
    setCharacter((previous) => {
      const existing = previous.accessories ?? {
        items: [],
        current: createEmptyAccessory()
      };

      return {
        ...previous,
        accessories: {
          ...existing,
          items: existing.items ?? [],
          current: {
            ...createEmptyAccessory(),
            ...(existing.current ?? {}),
            [field]: value
          }
        }
      };
    });
  }

  function toggleAbility(ability) {
    const currentAbilities = draft.abilities ?? [];

    const updatedAbilities = currentAbilities.includes(ability)
      ? currentAbilities.filter((item) => item !== ability)
      : [...currentAbilities, ability];

    updateDraft("abilities", updatedAbilities);
  }

  function addCustomAbility() {
    const value = customAbility.trim();

    if (!value) return;

    const currentAbilities = draft.abilities ?? [];

    if (!currentAbilities.includes(value)) {
      updateDraft("abilities", [...currentAbilities, value]);
    }

    setCustomAbility("");
  }

  function addAccessory(event) {
    event.preventDefault();

    if (!draft.type) return;

    const newAccessory = {
      ...draft,
      abilities: [...(draft.abilities ?? [])],
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    };

    setCharacter((previous) => {
      const existing = previous.accessories ?? {
        items: [],
        current: createEmptyAccessory()
      };

      return {
        ...previous,
        accessories: {
          ...existing,
          items: [...(existing.items ?? []), newAccessory],
          current: createEmptyAccessory()
        }
      };
    });

    setCustomAbility("");
  }

  function removeAccessory(id) {
    setCharacter((previous) => {
      const existing = previous.accessories ?? {
        items: [],
        current: createEmptyAccessory()
      };

      return {
        ...previous,
        accessories: {
          ...existing,
          items: (existing.items ?? []).filter(
            (item) => item.id !== id
          )
        }
      };
    });
  }

  const inputClass =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 " +
    "outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-200";

  const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

  return (
    <section className="space-y-8">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-pink-600">
          Character Creator / Equipment
        </p>

        <h2 className="mt-2 text-3xl font-bold text-gray-900">
          💍 Accessories & Artifacts
        </h2>

        <p className="mt-2 text-gray-600">
          Add the finishing touches to your character. Create meaningful
          keepsakes, enchanted artifacts, signature accessories, and
          mysterious objects with unique histories.
        </p>
      </div>

      {/* Existing Accessories */}
      {accessories.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-gray-900">
            Your Accessories ({accessories.length})
          </h3>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {accessories.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-pink-200 bg-pink-50 p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {item.name || item.type}
                    </h4>

                    <p className="mt-1 text-sm text-pink-700">
                      {item.type}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeAccessory(item.id)}
                    aria-label={`Remove ${item.name || item.type}`}
                    className="min-h-11 min-w-11 rounded-lg border border-red-200 bg-white px-3 text-sm font-semibold text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Remove
                  </button>
                </div>

                {item.location && (
                  <p className="mt-3 text-sm text-gray-700">
                    <strong>Location:</strong> {item.location}
                  </p>
                )}

                {item.purpose && (
                  <p className="mt-1 text-sm text-gray-700">
                    <strong>Purpose:</strong> {item.purpose}
                  </p>
                )}

                {item.material && (
                  <p className="mt-1 text-sm text-gray-700">
                    <strong>Material:</strong> {item.material}
                  </p>
                )}

                {item.description && (
                  <p className="mt-3 whitespace-pre-wrap text-sm text-gray-600">
                    {item.description}
                  </p>
                )}

                {item.abilities?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.abilities.map((ability) => (
                      <span
                        key={ability}
                        className="rounded-full bg-white px-3 py-1 text-xs font-medium text-pink-800"
                      >
                        {ability}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      )}

      {/* Accessory Form */}
      <form onSubmit={addAccessory} className="space-y-6">
        <div className="border-b border-gray-200 pb-3">
          <h3 className="text-xl font-bold text-gray-900">
            ✨ {accessories.length ? "Create Another Accessory" : "Design Your First Accessory"}
          </h3>

          <p className="mt-1 text-sm text-gray-600">
            Fill in the details below, then select Add Accessory to save it.
          </p>
        </div>

        {/* Accessory Type */}
        <div>
          <label htmlFor="accessory-type" className={labelClass}>
            Accessory Type <span className="text-red-500">*</span>
          </label>

          <select
            id="accessory-type"
            required
            value={draft.type}
            onChange={(event) => updateDraft("type", event.target.value)}
            className={inputClass}
          >
            <option value="">Select an accessory type</option>

            {accessoryOptions.accessoryTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Name */}
        <div>
          <label htmlFor="accessory-name" className={labelClass}>
            Accessory Name
          </label>

          <input
            id="accessory-name"
            type="text"
            value={draft.name}
            onChange={(event) => updateDraft("name", event.target.value)}
            placeholder="e.g. Heart of the Fallen Star"
            maxLength={100}
            className={inputClass}
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="accessory-location" className={labelClass}>
            Equipped Location
          </label>

          <select
            id="accessory-location"
            value={draft.location}
            onChange={(event) => updateDraft("location", event.target.value)}
            className={inputClass}
          >
            <option value="">Select a location</option>

            {accessoryOptions.accessoryLocationOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Purpose */}
        <div>
          <label htmlFor="accessory-purpose" className={labelClass}>
            Purpose & Significance
          </label>

          <select
            id="accessory-purpose"
            value={draft.purpose}
            onChange={(event) => updateDraft("purpose", event.target.value)}
            className={inputClass}
          >
            <option value="">Select its purpose</option>

            {accessoryOptions.accessoryPurposeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Material */}
        <div>
          <label htmlFor="accessory-material" className={labelClass}>
            Material
          </label>

          <select
            id="accessory-material"
            value={draft.material}
            onChange={(event) => updateDraft("material", event.target.value)}
            className={inputClass}
          >
            <option value="">Select a material</option>

            {accessoryOptions.accessoryMaterialOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="accessory-description" className={labelClass}>
            Description & Lore
          </label>

          <textarea
            id="accessory-description"
            rows={4}
            value={draft.description}
            onChange={(event) =>
              updateDraft("description", event.target.value)
            }
            placeholder="Describe its appearance, markings, history, sentimental meaning, or hidden secrets..."
            maxLength={1500}
            className={inputClass}
          />

          <p className="mt-1 text-right text-xs text-gray-500">
            {draft.description.length}/1500 characters
          </p>
        </div>

        {/* Special Abilities */}
        <div>
          <h3 className="text-lg font-bold text-gray-900">
            🌟 Special Properties
          </h3>

          <p className="mb-3 mt-1 text-sm text-gray-600">
            Select any magical, protective, or technological abilities.
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {accessoryOptions.accessoryAbilityOptions.map((ability) => {
              const selected = (draft.abilities ?? []).includes(ability);

              return (
                <label
                  key={ability}
                  className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                    selected
                      ? "border-pink-500 bg-pink-50 text-pink-900"
                      : "border-gray-200 bg-white text-gray-700 hover:border-pink-300"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => toggleAbility(ability)}
                    className="h-4 w-4 accent-pink-600"
                  />

                  <span className="text-sm font-medium">{ability}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Add Accessory */}
        <button
          type="submit"
          disabled={!draft.type}
          className="min-h-12 w-full rounded-xl bg-pink-600 px-6 py-3 font-bold text-white transition hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          + Add Accessory
        </button>
      </form>

      {/* Summary */}
      <div className="rounded-2xl border border-pink-200 bg-pink-50 p-5">
        <h3 className="font-bold text-pink-950">
          💍 Accessory Collection
        </h3>

        <p className="mt-2 text-sm text-pink-900">
          <strong>Saved accessories:</strong> {accessories.length}
        </p>

        <p className="mt-1 text-sm text-pink-900">
          <strong>Current design:</strong>{" "}
          {draft.name || draft.type || "Not started"}
        </p>
      </div>
    </section>
  );
}
