import { useEffect, useState } from "react";

import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";
import BasicInfo from "./components/BasicInfo";
import Personality from "./components/Personality";
import Power from "./components/Power";
import Review from "./components/Review";
import CharacterResult from "./components/CharacterResult";

import {
  genderOptions,
  speciesOptions,
  roleOptions,
  personalityOptions,
  powerTypeOptions
} from "./data/options";

const initialCharacter = {
  name: "",
  age: "",
  gender: "",
  species: "",
  role: "",
  personality: [],
  powerType: "",
  powerName: "",
  powerDescription: ""
};

const randomNames = [
  "Kael Vanth",
  "Aeris Nocturne",
  "Riven Kuro",
  "Liora Veyne",
  "Ren Ashvale",
  "Sora Nightfall",
  "Aiden Cross",
  "Mira Valen",
  "Lucian Veyre",
  "Akira Kurogane",
  "Rai Vex",
  "Seraphina Vale",
  "Darius Crowe",
  "Nyx Arclight",
  "Cassian Noir",
  "Elara Voss",
  "Zane Evernight",
  "Lyra Solenne",
  "Orion Draven",
  "Kaien Shiro",
  "Reina Astra",
  "Veyra Lunaris",
  "Ronan Blackwell",
  "Astra Veyne",
  "Kieran Ash",
  "Selene Noctis",
  "Dante Ravencroft",
  "Aria Nightshade",
  "Zephyr Vale",
  "Elias Storm"
];

const randomPowerNames = [
  "Shadow Dominion",
  "Astral Rupture",
  "Void Pulse",
  "Eclipse Drive",
  "Crimson Resonance",
  "Celestial Breaker",
  "Phantom Arsenal",
  "Infinite Flame",
  "Abyssal Crown",
  "Heaven's Judgment",
  "Voidwalker",
  "Soul Requiem",
  "Dragon's Wrath",
  "Starfall Genesis",
  "Reality Breaker",
  "Temporal Collapse",
  "Chaos Manifest",
  "Eternal Frost",
  "Divine Thunder",
  "Blood Moon",
  "Phantom Step",
  "World Ender",
  "Astral Dominion",
  "Nightmare Engine",
  "Celestial Ruin",
  "Infinite Edge",
  "Black Sun",
  "Heavenly Spear",
  "Void Genesis",
  "Eternal Eclipse"
];

function getSavedCharacter() {
  try {
    const saved = localStorage.getItem(
      "animeOCCharacter"
    );

    if (!saved) {
      return {
        ...initialCharacter,
        personality: []
      };
    }

    const parsed = JSON.parse(saved);

    return {
      ...initialCharacter,
      ...parsed,
      personality: Array.isArray(
        parsed.personality
      )
        ? parsed.personality
        : []
    };
  } catch {
    return {
      ...initialCharacter,
      personality: []
    };
  }
}

function getSavedStep() {
  try {
    const saved = localStorage.getItem(
      "animeOCCurrentStep"
    );

    const step = Number(saved);

    if (
      Number.isInteger(step) &&
      step >= 1 &&
      step <= 4
    ) {
      return step;
    }

    return 1;
  } catch {
    return 1;
  }
}

function getSavedGenerated() {
  try {
    return (
      localStorage.getItem(
        "animeOCGenerated"
      ) === "true"
    );
  } catch {
    return false;
  }
}

function App() {
  const [character, setCharacter] =
    useState(getSavedCharacter);

  const [currentStep, setCurrentStep] =
    useState(getSavedStep);

  const [isGenerated, setIsGenerated] =
    useState(getSavedGenerated);

  const [errors, setErrors] =
    useState({});

  const [isSaved, setIsSaved] =
    useState(false);

  /*
   * Save character progress.
   */
  useEffect(() => {
    try {
      localStorage.setItem(
        "animeOCCharacter",
        JSON.stringify(character)
      );

      setIsSaved(true);

      const timeout = setTimeout(() => {
        setIsSaved(false);
      }, 1600);

      return () => {
        clearTimeout(timeout);
      };
    } catch {
      setIsSaved(false);
    }
  }, [character]);

  /*
   * Save current step.
   */
  useEffect(() => {
    try {
      localStorage.setItem(
        "animeOCCurrentStep",
        String(currentStep)
      );
    } catch {
      // Storage unavailable.
    }
  }, [currentStep]);

  /*
   * Save generated state.
   */
  useEffect(() => {
    try {
      localStorage.setItem(
        "animeOCGenerated",
        String(isGenerated)
      );
    } catch {
      // Storage unavailable.
    }
  }, [isGenerated]);

  const updateCharacter = (
    field,
    value
  ) => {
    setCharacter((previous) => ({
      ...previous,
      [field]: value
    }));
  };

  const validateBasicInfo = () => {
    const newErrors = {};

    if (!character.name.trim()) {
      newErrors.name =
        "Please enter your character's name.";
    }

    if (!character.age) {
      newErrors.age =
        "Please enter your character's age.";
    }

    if (!character.gender) {
      newErrors.gender =
        "Please select a gender.";
    }

    if (!character.species) {
      newErrors.species =
        "Please select a species.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const validatePersonality = () => {
    const newErrors = {};

    if (
      character.personality.length < 3
    ) {
      newErrors.personality =
        "Please select at least 3 personality traits.";
    }

    if (
      character.personality.length > 5
    ) {
      newErrors.personality =
        "Please select no more than 5 personality traits.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const validatePower = () => {
    const newErrors = {};

    if (!character.powerType) {
      newErrors.powerType =
        "Please select a power type.";
    }

    if (!character.powerName.trim()) {
      newErrors.powerName =
        "Please enter an ability name.";
    }

    if (
      !character.powerDescription.trim()
    ) {
      newErrors.powerDescription =
        "Please describe your character's ability.";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const generateCharacter = () => {
    setIsGenerated(true);
    setErrors({});
    scrollToTop();
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateBasicInfo()) {
        scrollToTop();
        return;
      }
    }

    if (currentStep === 2) {
      if (!validatePersonality()) {
        scrollToTop();
        return;
      }
    }

    if (currentStep === 3) {
      if (!validatePower()) {
        scrollToTop();
        return;
      }
    }

    if (currentStep === 4) {
      generateCharacter();
      return;
    }

    setCurrentStep((previous) =>
      Math.min(previous + 1, 4)
    );

    setErrors({});
    scrollToTop();
  };

  const handleBack = () => {
    setCurrentStep((previous) =>
      Math.max(previous - 1, 1)
    );

    setErrors({});
    scrollToTop();
  };

  /*
   * Allows navigation only to
   * completed/current steps.
   */
  const goToStep = (step) => {
    if (
      step < 1 ||
      step > 4 ||
      step === currentStep
    ) {
      return;
    }

    if (step > currentStep) {
      return;
    }

    setCurrentStep(step);
    setErrors({});
    scrollToTop();
  };

  const resetCharacter = () => {
    try {
      localStorage.removeItem(
        "animeOCCharacter"
      );

      localStorage.removeItem(
        "animeOCCurrentStep"
      );

      localStorage.removeItem(
        "animeOCGenerated"
      );
    } catch {
      // Storage unavailable.
    }

    setCharacter({
      ...initialCharacter,
      personality: []
    });

    setCurrentStep(1);
    setErrors({});
    setIsGenerated(false);
    setIsSaved(false);

    scrollToTop();
  };

  const randomItem = (array) => {
    return array[
      Math.floor(
        Math.random() * array.length
      )
    ];
  };

  const randomItems = (
    array,
    amount
  ) => {
    const shuffled = [...array].sort(
      () => Math.random() - 0.5
    );

    return shuffled.slice(
      0,
      amount
    );
  };

  const hasCharacterProgress =
    Boolean(
      character.name.trim() ||
        character.age ||
        character.gender ||
        character.species ||
        character.role ||
        character.personality.length ||
        character.powerType ||
        character.powerName.trim() ||
        character.powerDescription.trim()
    );

  const randomizeCharacter = () => {
    if (hasCharacterProgress) {
      const confirmed =
        window.confirm(
          "Randomizing will replace your current character. Your saved character will be overwritten. Continue?"
        );

      if (!confirmed) {
        return;
      }
    }

    const newCharacter = {
      name: randomItem(
        randomNames
      ),

      age: String(
        Math.floor(
          Math.random() * 20
        ) + 16
      ),

      gender: randomItem(
        genderOptions.slice(0, 2)
      ),

      species: randomItem(
        speciesOptions
      ),

      role: randomItem(
        roleOptions
      ),

      personality: randomItems(
        personalityOptions,
        3
      ),

      powerType: randomItem(
        powerTypeOptions
      ),

      powerName: randomItem(
        randomPowerNames
      ),

      powerDescription:
        "The user channels their energy through a unique supernatural ability, creating powerful offensive and defensive techniques that adapt to the situation."
    };

    setCharacter(
      newCharacter
    );

    setCurrentStep(1);
    setErrors({});
    setIsGenerated(false);

    scrollToTop();
  };

  /*
   * Eight required completion criteria.
   */
  const completionCount =
    [
      character.name.trim(),
      character.age,
      character.gender,
      character.species,
      character.personality.length >= 3,
      character.powerType,
      character.powerName.trim(),
      character.powerDescription.trim()
    ].filter(Boolean).length;

  const completionPercentage =
    Math.round(
      (completionCount / 8) * 100
    );

  return (
    <div className="min-h-screen">
      <Header />

      <main
        id="creator"
        className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8"
      >
        {!isGenerated ? (
          <>
            {/* =========================
                INTRO
            ========================== */}
            <section className="flex flex-col gap-6 py-8 md:flex-row md:items-end md:justify-between md:gap-12 lg:py-10">
              <div className="min-w-0 max-w-3xl">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-purple-300">
                  ANIME OC CREATOR
                </p>

                <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Create Your Original
                  Character
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-white/55 sm:text-base sm:leading-7">
                  Build your character
                  from the ground up.
                  Define their identity,
                  personality, powers,
                  and role.
                </p>
              </div>

              {/* =========================
                  CREATOR TOOLS
              ========================== */}
              <div className="w-full shrink-0 md:w-auto">
                <button
                  type="button"
                  onClick={
                    randomizeCharacter
                  }
                  aria-label="Randomize character"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-purple-400/25 bg-purple-500/10 px-5 text-sm font-bold text-purple-100 shadow-lg shadow-purple-950/20 transition-all duration-200 hover:border-purple-400/50 hover:bg-purple-500/20 hover:text-white hover:shadow-purple-900/30 focus-visible:outline-3 focus-visible:outline-purple-300 focus-visible:outline-offset-2 active:scale-[0.98] md:w-auto"
                >
                  <span aria-hidden="true">
                    🎲
                  </span>

                  Randomize Character
                </button>

                <p className="mt-2 text-center text-xs text-white/35 md:text-right">
                  Generates a completely
                  new character.
                </p>

                {isSaved && (
                  <div
                    className="mt-3 flex min-h-11 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-4 text-sm font-semibold text-emerald-300"
                    role="status"
                    aria-live="polite"
                  >
                    ✓ Progress saved
                  </div>
                )}
              </div>
            </section>

            {/* =========================
                CHARACTER PROGRESS
            ========================== */}
            <section
              className="mb-8 rounded-2xl border border-white/10 bg-white/[0.025] p-4 shadow-xl shadow-black/10 sm:p-5"
              aria-label="Character completion"
            >
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-purple-300">
                    Character Progress
                  </p>

                  <p className="mt-1 text-sm leading-6 text-white/50">
                    {completionPercentage ===
                    100
                      ? "Your character is ready."
                      : "Complete each section to finish your character."}
                  </p>
                </div>

                <strong className="text-2xl font-black text-white sm:text-3xl">
                  {
                    completionPercentage
                  }
                  %
                </strong>
              </div>

              <div
                className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"
                role="progressbar"
                aria-valuenow={
                  completionPercentage
                }
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label={`Character completion: ${completionPercentage}%`}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-600 via-violet-500 to-fuchsia-400 transition-all duration-500"
                  style={{
                    width: `${completionPercentage}%`
                  }}
                />
              </div>

              <p className="mt-3 text-xs text-white/35">
                {
                  completionCount
                }{" "}
                of 8 required items
                completed
              </p>
            </section>

            {/* =========================
                STEP PROGRESS
            ========================== */}
            <div className="mx-auto w-full max-w-6xl">
              <ProgressBar
                currentStep={
                  currentStep
                }
                goToStep={goToStep}
              />
            </div>

            {/* =========================
                CREATOR CONTENT
            ========================== */}
            <section className="mx-auto mt-8 w-full max-w-5xl sm:mt-10">
              {currentStep === 1 && (
                <BasicInfo
                  character={
                    character
                  }
                  updateCharacter={
                    updateCharacter
                  }
                  errors={errors}
                />
              )}

              {currentStep === 2 && (
                <Personality
                  character={
                    character
                  }
                  updateCharacter={
                    updateCharacter
                  }
                  errors={errors}
                />
              )}

              {currentStep === 3 && (
                <Power
                  character={
                    character
                  }
                  updateCharacter={
                    updateCharacter
                  }
                  errors={errors}
                />
              )}

              {currentStep === 4 && (
                <Review
                  character={
                    character
                  }
                  onEdit={goToStep}
                />
              )}

              {/* =========================
                  STEP NAVIGATION
              ========================== */}
              <div
                className={`
                  mt-8
                  flex
                  gap-3
                  border-t
                  border-white/10
                  pt-6
                  ${
                    currentStep > 1
                      ? "flex-col-reverse sm:flex-row sm:items-center sm:justify-between"
                      : "flex-col sm:items-end"
                  }
                `}
              >
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={
                      handleBack
                    }
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-5 text-sm font-bold text-white/70 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.07] hover:text-white focus-visible:outline-3 focus-visible:outline-purple-300 focus-visible:outline-offset-2 sm:w-auto"
                  >
                    ← Back
                  </button>
                )}

                <button
                  type="button"
                  onClick={
                    handleNext
                  }
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 px-6 text-sm font-black text-white shadow-lg shadow-purple-950/30 transition-all duration-200 hover:from-purple-500 hover:to-violet-400 hover:shadow-purple-900/40 focus-visible:outline-3 focus-visible:outline-purple-300 focus-visible:outline-offset-2 active:scale-[0.98] sm:w-auto"
                >
                  {currentStep === 4
                    ? "⚡ Generate Character"
                    : currentStep === 3
                      ? "Review →"
                      : "Continue →"}
                </button>
              </div>
            </section>
          </>
        ) : (
          <CharacterResult
            character={character}
            resetCharacter={
              resetCharacter
            }
          />
        )}
      </main>
    </div>
  );
}

export default App;