import { useState } from "react";
import { weaponsOptions } from "../data/options";

export default function Weapons({ character, setCharacter }) {
  const [customAbility, setCustomAbility] = useState("");

  const weapon = character.weapon ?? {
    type: "",
    name: "",
    description: "",
    combatStyle: "",
    origin: "",
    rarity: "",
    abilities: [],
    customAbility: ""
  };

  function updateWeapon(field, value) {
    setCharacter((previous) => ({
      ...previous,
      weapon: {
        ...(previous.weapon ?? weapon),
        [field]: value
      }
    }));
  }

  function toggleAbility(ability) {
    const currentAbilities = weapon.abilities ?? [];

    const updatedAbilities = currentAbilities.includes(ability)
      ? currentAbilities.filter((item) => item !== ability)
      : [...currentAbilities, ability];

    updateWeapon("abilities", updatedAbilities);
  }

  function addCustomAbility() {
    const trimmedAbility = customAbility.trim();

    if (!trimmedAbility) return;

    const currentAbilities = weapon.abilities ?? [];

    if (!currentAbilities.includes(trimmedAbility)) {
      updateWeapon("abilities", [...currentAbilities, trimmedAbility]);
    }

    setCustomAbility("");
  }

  const inputClass =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 " +
    "outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-200";

  const labelClass = "mb-2 block text-sm font-semibold text-gray-700";

  return (
    <section className="weapon-studio space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-purple-600">
          Character Creator / Equipment
        </p>

        <h2 className="mt-2 text-3xl font-bold text-gray-900">
          ⚔️ Weapon Arsenal
        </h2>

        <p className="mt-2 text-gray-600">
          Design your character's signature weapon, define its combat style,
          and uncover the abilities that make it extraordinary.
        </p>
      </div>

      {/* Weapon Type */}
      <div>
        <label htmlFor="weapon-type" className={labelClass}>
          Weapon Type
        </label>

        <select
          id="weapon-type"
          value={weapon.type}
          onChange={(event) => updateWeapon("type", event.target.value)}
          className={inputClass}
        >
          <option value="">Select a weapon type</option>

          {weaponsOptions.weaponTypeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Weapon Name */}
      <div>
        <label htmlFor="weapon-name" className={labelClass}>
          Weapon Name
        </label>

        <input
          id="weapon-name"
          type="text"
          value={weapon.name}
          onChange={(event) => updateWeapon("name", event.target.value)}
          placeholder="e.g. Eclipse Requiem"
          maxLength={100}
          className={inputClass}
        />
      </div>

      {/* Weapon Description */}
      <div>
        <label htmlFor="weapon-description" className={labelClass}>
          Weapon Description
        </label>

        <textarea
          id="weapon-description"
          rows={4}
          value={weapon.description}
          onChange={(event) =>
            updateWeapon("description", event.target.value)
          }
          placeholder="Describe its appearance, materials, design, and unique details..."
          maxLength={1500}
          className={inputClass}
        />

        <p className="mt-1 text-right text-xs text-gray-500">
          {weapon.description.length}/1500 characters
        </p>
      </div>

      {/* Combat Style */}
      <div>
        <label htmlFor="combat-style" className={labelClass}>
          Combat Style
        </label>

        <select
          id="combat-style"
          value={weapon.combatStyle}
          onChange={(event) =>
            updateWeapon("combatStyle", event.target.value)
          }
          className={inputClass}
        >
          <option value="">Select a combat style</option>

          {weaponsOptions.combatStyleOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Weapon Origin */}
      <div>
        <label htmlFor="weapon-origin" className={labelClass}>
          Weapon Origin
        </label>

        <select
          id="weapon-origin"
          value={weapon.origin}
          onChange={(event) => updateWeapon("origin", event.target.value)}
          className={inputClass}
        >
          <option value="">Select its origin</option>

          {weaponsOptions.weaponOriginOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Weapon Rarity */}
      <div>
        <label htmlFor="weapon-rarity" className={labelClass}>
          Weapon Rarity
        </label>

        <select
          id="weapon-rarity"
          value={weapon.rarity}
          onChange={(event) => updateWeapon("rarity", event.target.value)}
          className={inputClass}
        >
          <option value="">Select its rarity</option>

          {weaponsOptions.weaponRarityOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Weapon Abilities */}
      <div>
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900">
            ✨ Special Weapon Abilities
          </h3>

          <p className="mt-1 text-sm text-gray-600">
            Select as many abilities as you want.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {weaponsOptions.weaponAbilityOptions.map((ability) => {
            const selected = (weapon.abilities ?? []).includes(ability);

            return (
              <label
                key={ability}
                className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                  selected
                    ? "border-purple-500 bg-purple-50 text-purple-900"
                    : "border-gray-200 bg-white text-gray-700 hover:border-purple-300"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => toggleAbility(ability)}
                  className="h-4 w-4 accent-purple-600"
                />

                <span className="text-sm font-medium">{ability}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Custom Ability */}
      <div>
        <label htmlFor="custom-weapon-ability" className={labelClass}>
          Custom Weapon Ability
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="custom-weapon-ability"
            type="text"
            value={customAbility}
            onChange={(event) => setCustomAbility(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addCustomAbility();
              }
            }}
            placeholder="e.g. Fate Severance"
            maxLength={100}
            className={inputClass}
          />

          <button
            type="button"
            onClick={addCustomAbility}
            disabled={!customAbility.trim()}
            className="min-h-12 rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white transition hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add Ability
          </button>
        </div>

        {(weapon.abilities ?? []).some(
          (ability) => !weaponsOptions.weaponAbilityOptions.includes(ability)
        ) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {(weapon.abilities ?? [])
              .filter(
                (ability) =>
                  !weaponsOptions.weaponAbilityOptions.includes(ability)
              )
              .map((ability) => (
                <span
                  key={ability}
                  className="inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-2 text-sm text-purple-900"
                >
                  {ability}

                  <button
                    type="button"
                    onClick={() => toggleAbility(ability)}
                    aria-label={`Remove ${ability}`}
                    className="rounded-full font-bold hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    ×
                  </button>
                </span>
              ))}
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="rounded-2xl border border-purple-200 bg-purple-50 p-5">
        <h3 className="font-bold text-purple-950">
          ⚔️ Weapon Summary
        </h3>

        <p className="mt-2 text-sm text-purple-900">
          <strong>Weapon:</strong>{" "}
          {weapon.name || "Unnamed Weapon"}
        </p>

        <p className="mt-1 text-sm text-purple-900">
          <strong>Type:</strong>{" "}
          {weapon.type || "Not selected"}
        </p>

        <p className="mt-1 text-sm text-purple-900">
          <strong>Combat Style:</strong>{" "}
          {weapon.combatStyle || "Not selected"}
        </p>

        <p className="mt-1 text-sm text-purple-900">
          <strong>Rarity:</strong>{" "}
          {weapon.rarity || "Not selected"}
        </p>

        <p className="mt-1 text-sm text-purple-900">
          <strong>Abilities:</strong>{" "}
          {(weapon.abilities ?? []).length
            ? weapon.abilities.join(", ")
            : "None selected"}
        </p>
      </div>
    </section>
  );
}
