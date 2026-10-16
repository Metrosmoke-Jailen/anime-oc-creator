import { useEffect, useState } from "react";

import Header from "./components/Header";
import ProgressBar from "./components/ProgressBar";
import BasicInfo from "./components/BasicInfo";
import Titles from "./components/Titles";
import Backstory from "./components/Backstory";
import Personality from "./components/Personality";
import Power from "./components/Power";
import Weapons from "./components/Weapons";
import Accessories from "./components/Accessories";
import Appearance from "./components/Appearance";
import Review from "./components/Review";
import CharacterResult from "./components/CharacterResult";

import { generateRandomCharacter } from "./data/generateCharacter";

const STORAGE_KEYS = {
  character: "animeOCCharacter",
  step: "animeOCCurrentStep",
  generated: "animeOCGenerated"
};

const initialAppearance = {
  hairColor: "",
  hairStyle: "",
  eyeColor: "",
  eyeStyle: "",
  skinTone: "",
  height: "",
  build: "",
  outfit: "",
  accessories: "",
  aesthetic: "",
  distinguishingFeatures: ""
};


const initialCharacter = {
  name: "",
  age: "",
  gender: "",
  species: "",
  role: "",
  personality: [],
  appearance: { ...initialAppearance },

  powerType: "",
  powerName: "",
  powerDescription: "",


  backstory: "",

  titles: [],

  weapon: {
    type: "",
    name: "",
    description: "",
    combatStyle: "",
    origin: "",
    rarity: "",
    abilities: [],
    customAbility: "",
  },

  accessories: {
    items: [],
    current: {
      type: "",
      name: "",
      location: "",
      purpose: "",
      material: "",
      description: "",
      abilities: [],
    },
  },
};

function createInitialCharacter() {
  return {
    ...initialCharacter,
    personality: [],
    appearance: { ...initialAppearance },
    weapon: {
      ...initialCharacter.weapon,
      abilities: [],
    },
    accessories: {
      items: [],
      current: {
        ...initialCharacter.accessories.current,
        abilities: [],
      },
    },
  };
}

function getSavedCharacter() {
  try {
    const saved = localStorage.getItem(
      STORAGE_KEYS.character
    );

    if (!saved) {
      return createInitialCharacter();
    }

    const parsed = JSON.parse(saved);

    if (!parsed || typeof parsed !== "object") {
      return createInitialCharacter();
    }

    
return {
  ...createInitialCharacter(),
  ...parsed,

  personality: Array.isArray(parsed.personality)
    ? parsed.personality
    : [],

  appearance: {
    ...initialAppearance,
    ...(parsed.appearance &&
    typeof parsed.appearance === "object"
      ? parsed.appearance
      : {}),
  },

  weapon: {
    ...initialCharacter.weapon,
    ...(parsed.weapon && typeof parsed.weapon === "object"
      ? parsed.weapon
      : {}),
    abilities: Array.isArray(parsed.weapon?.abilities)
      ? parsed.weapon.abilities
      : [],
  },

  accessories: {
    items: Array.isArray(parsed.accessories?.items)
      ? parsed.accessories.items
      : [],

    current: {
      ...initialCharacter.accessories.current,
      ...(parsed.accessories?.current &&
      typeof parsed.accessories.current === "object"
        ? parsed.accessories.current
        : {}),

      abilities: Array.isArray(
        parsed.accessories?.current?.abilities
      )
        ? parsed.accessories.current.abilities
        : [],
    },
  },
};
  } catch {
    return createInitialCharacter();
  }
}

function getSavedStep() {
  try {
    const step = Number(
      localStorage.getItem(STORAGE_KEYS.step)
    );

    return Number.isInteger(step) && step >= 1 && step <= 9
      ? step
      : 1;
  } catch {
    return 1;
  }
}

function getSavedGenerated() {
  try {
    return (
      localStorage.getItem(STORAGE_KEYS.generated) ===
      "true"
    );
  } catch {
    return false;
  }
}

function App() {
  const [character, setCharacter] = useState(
    getSavedCharacter
  );

  const [currentStep, setCurrentStep] = useState(
    getSavedStep
  );

  const [isGenerated, setIsGenerated] = useState(
    getSavedGenerated
  );

  const [errors, setErrors] = useState({});
  const [isSaved, setIsSaved] = useState(false);

  // Persist the character, including appearance.
  useEffect(() => {
    let savedTimeout;
    let statusTimeout;

    try {
      localStorage.setItem(
        STORAGE_KEYS.character,
        JSON.stringify(character)
      );

      savedTimeout = window.setTimeout(() => setIsSaved(true), 0);
      statusTimeout = window.setTimeout(() => {
        setIsSaved(false);
      }, 1600);
    } catch {
      savedTimeout = window.setTimeout(() => setIsSaved(false), 0);
    }

    return () => {
      window.clearTimeout(savedTimeout);
      window.clearTimeout(statusTimeout);
    };
  }, [character]);

  // Persist the current step.
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.step,
        String(currentStep)
      );
    } catch {
      // Storage may be unavailable.
    }
  }, [currentStep]);

  // Persist whether the profile has been generated.
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.generated,
        String(isGenerated)
      );
    } catch {
      // Storage may be unavailable.
    }
  }, [isGenerated]);

  const updateCharacter = (field, value) => {
    setCharacter((previous) => ({
      ...previous,
      [field]: value
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const validateBasicInfo = () => {
    const newErrors = {};

    if (!character.name.trim()) {
      newErrors.name =
        "Please enter your character's name.";
    }

    if (
      !character.age ||
      !Number.isFinite(Number(character.age)) ||
      Number(character.age) < 1 ||
      Number(character.age) > 999
    ) {
      newErrors.age =
        "Enter an age between 1 and 999.";
    }

    if (!character.gender) {
      newErrors.gender = "Please select a gender.";
    }

    if (!character.species) {
      newErrors.species = "Please select a species.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const validatePersonality = () => {
    const newErrors = {};

    if (character.personality.length < 3) {
      newErrors.personality =
        "Please select at least 3 personality traits.";
    } else if (character.personality.length > 5) {
      newErrors.personality =
        "Please select no more than 5 personality traits.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
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

    if (!character.powerDescription.trim()) {
      newErrors.powerDescription =
        "Please describe your character's ability.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const goToStep = (step) => {
    if (
      !Number.isInteger(step) ||
      step < 1 ||
      step > 9 ||
      step === currentStep
    ) {
      return;
    }

    // Do not skip forward past unfinished sections.
    if (step > currentStep) {
      return;
    }

    setCurrentStep(step);
    setErrors({});
    scrollToTop();
  };

  const generateCharacter = () => {
    setIsGenerated(true);
    setErrors({});
    scrollToTop();
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateBasicInfo()) {
      scrollToTop();
      return;
    }

    if (currentStep === 2 && !validatePersonality()) {
      scrollToTop();
      return;
    }

    if (currentStep === 3 && !validatePower()) {
      scrollToTop();
      return;
    }

    if (currentStep === 9) {
      generateCharacter();
      return;
    }

    setCurrentStep((previous) =>
      Math.min(previous + 1, 9)
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

  const resetCharacter = () => {
    try {
      Object.values(STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key);
      });
    } catch {
      // Storage may be unavailable.
    }

    setCharacter(createInitialCharacter());
    setCurrentStep(1);
    setErrors({});
    setIsGenerated(false);
    setIsSaved(false);

    scrollToTop();
  };

  const hasCharacterProgress = Boolean(
    character.name.trim() ||
    character.age ||
    character.gender ||
    character.species ||
    character.role ||
    character.personality.length ||
    character.powerType ||
    character.powerName.trim() ||
    character.powerDescription.trim() ||
    character.weapon?.name?.trim() ||
    character.accessories?.items?.length ||
    character.accessories?.current?.name?.trim() ||
    character.backstory?.trim() ||
    character.titles?.length ||
    character.weapon?.type ||
    Object.values(character.appearance ?? {}).some(
      (value) => typeof value === "string" && value.trim()
    )
  );

  const randomizeCharacter = () => {
    if (hasCharacterProgress) {
      const confirmed = window.confirm(
        "Randomizing will replace your current character, including appearance details. Continue?"
      );

      if (!confirmed) {
        return;
      }
    }
      
    setCharacter({
      ...createInitialCharacter(),
      ...generateRandomCharacter(),
    });

    setCurrentStep(1);
    setErrors({});
    setIsGenerated(false);
    scrollToTop();
  };

  // The eight original required criteria remain unchanged.
  // Appearance customization is optional.
  const completionCount = [
    character.name.trim(),
    character.age &&
      Number(character.age) >= 1 &&
      Number(character.age) <= 999,
    character.gender,
    character.species,
    character.personality.length >= 3 &&
      character.personality.length <= 5,
    character.powerType,
    character.powerName.trim(),
    character.powerDescription.trim()
  ].filter(Boolean).length;

  const completionPercentage = Math.round(
    (completionCount / 8) * 100
  );


  const stepHeading = {
  1: "Basic Information",
  2: "Personality",
  3: "Powers",
  4: "Weapons",
  5: "Accessories",
  6: "Appearance Creator",
  7: "Backstory",
  8: "Titles",
  9: "Review Your Character",
}[currentStep];

  return (
    <div className="min-h-screen">
      <Header />

      <main
        id="creator"
        className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8"
      >
        {!isGenerated ? (
          <>
            {/* Introduction */}
            <section className="home-hero">
              <div className="home-hero-copy">
                <div className="home-hero-kicker"><span /> YOUR WORLD. YOUR HERO.</div>
                <h1>Every great story<br /><span>starts with a character.</span></h1>
                <p className="home-hero-description">
                  Shape an original anime character from first spark to final detail. Choose their power, style, history, and the choices that make them yours.
                </p>
                <div className="home-hero-actions">
                  <button
                    type="button"
                    className="home-start-button"
                    onClick={() => document.querySelector(".step-panel")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  >
                    Begin your character <span aria-hidden="true">↓</span>
                  </button>
                  <span className="home-hero-note">9 steps · autosaves as you go</span>
                </div>
              </div>

              <div className="home-hero-side">
                <div className="home-orbit-art" aria-hidden="true">
                  <span className="home-orbit home-orbit-one" />
                  <span className="home-orbit home-orbit-two" />
                  <span className="home-orbit-core">✦</span>
                  <span className="home-orbit-dot" />
                  <span className="home-orbit-spark">✧</span>
                </div>
                <div className="home-hero-card">
                  <div className="home-hero-card-top"><span>CHARACTER WORKSHOP</span><span className="home-live-dot">● LIVE</span></div>
                  <p>Your next story<br />is waiting to be made.</p>
                  <div className="home-hero-card-tags"><span>✦ Identity</span><span>◈ Powers</span><span>✧ Story</span></div>
                </div>
              </div>
            </section>

            <section className="home-action-row" aria-label="Character creation actions">
              <div className="home-action-copy">
                <span className="home-action-icon" aria-hidden="true">✧</span>
                <span><strong>Need a spark?</strong><small>Start with a complete themed character, then make it your own.</small></span>
              </div>
              <div className="w-full shrink-0 md:w-auto">
                <button
                  type="button"
                  onClick={randomizeCharacter}
                  aria-label="Randomize character"
                  className="random-character-button inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold text-violet-100 md:w-auto"
                >
                  <span className="random-character-button-icon" aria-hidden="true">✦</span>
                  <span>Randomize Character</span>
                </button>

                <p className="mt-2 text-center text-xs text-white/35 md:text-right">
                  Builds a themed character with a look, story, power, and gear.
                </p>

                {isSaved && (
                  <p
                    className="mt-3 text-center text-sm font-semibold text-emerald-300 md:text-right"
                    role="status"
                    aria-live="polite"
                  >
                    ✓ Progress saved
                  </p>
                )}
              </div>
            </section>

            {/* Required Completion Progress */}
            <section
              className="mb-8 rounded-2xl border border-white/10 bg-white/[0.025] p-4 shadow-xl shadow-black/10 sm:p-5"
              aria-label="Character completion"
            >
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-violet-300">
                    Character Progress
                  </p>

                  <p className="mt-1 text-sm leading-6 text-white/50">
                    {completionPercentage === 100
                      ? "Your character is ready."
                      : "Complete each required section to finish your character."}
                  </p>
                </div>

                <strong className="text-2xl font-black text-white sm:text-3xl">
                  {completionPercentage}%
                </strong>
              </div>

              <div
                className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"
                role="progressbar"
                aria-valuenow={completionPercentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Required character information completed: ${completionPercentage}%`}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-600 via-violet-500 to-fuchsia-400 transition-all duration-500"
                  style={{
                    width: `${completionPercentage}%`
                  }}
                />
              </div>

              <p className="mt-3 text-xs text-white/35">
                {completionCount} of 8 required items completed
              </p>
            </section>

            {/* Five-Step Navigation */}
            <div className="mx-auto w-full max-w-6xl">
              <ProgressBar
                currentStep={currentStep}
                goToStep={goToStep}
              />
            </div>

            {/* Current Step */}
            <section
              className="step-panel mx-auto mt-8 w-full max-w-5xl sm:mt-10"
              aria-label={stepHeading}
            >
              
{currentStep === 1 && (
  <BasicInfo
    character={character}
    updateCharacter={updateCharacter}
    errors={errors}
  />
)}

{currentStep === 2 && (
  <Personality
    character={character}
    updateCharacter={updateCharacter}
    errors={errors}
  />
)}

{currentStep === 3 && (
  <Power
    character={character}
    updateCharacter={updateCharacter}
    errors={errors}
  />
)}

{currentStep === 4 && (
  <Weapons
    character={character}
    setCharacter={setCharacter}
  />
)}

{currentStep === 5 && (
  <Accessories
    character={character}
    setCharacter={setCharacter}
  />
)}

{currentStep === 6 && (
  <Appearance
    character={character}
    updateCharacter={updateCharacter}
    errors={errors}
  />
)}


{currentStep === 7 && (
  <Backstory
    character={character}
    updateCharacter={(field, value) => {
      setCharacter((previous) => ({
        ...previous,
        [field]: value,
      }));
    }}
  />
)}

{currentStep === 8 && (
  <Titles
    character={character}
    updateCharacter={(field, value) => {
      setCharacter((previous) => ({
        ...previous,
        [field]: value,
      }));
    }}
  />
)}

{currentStep === 9 && (
              <Review
                character={character}
                onEdit={goToStep}
                errors={errors}
              />
)}

              {/* Navigation Buttons */}
              <div
                className={`
                  mt-8 flex gap-3 border-t
                  border-white/10 pt-6
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
                    onClick={handleBack}
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-5 text-sm font-bold text-white/70 transition hover:border-white/20 hover:bg-white/[0.07] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 sm:w-auto"
                  >
                    ← Back
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 px-6 text-sm font-black text-white shadow-lg shadow-violet-950/30 transition hover:from-violet-500 hover:to-violet-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 active:scale-[0.98] sm:w-auto"
                >
                  {currentStep === 9
                    ? "⚡ Generate Character"
                    : currentStep === 8
                      ? "Review →"
                      : "Continue →"}
                </button>
              </div>
            </section>
          </>
        ) : (
          <CharacterResult
            character={character}
            resetCharacter={resetCharacter}
          />
        )}
      </main>
    </div>
  );
}

export default App;
