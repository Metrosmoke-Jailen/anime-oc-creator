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

function getSavedCharacter() {
  try {
    const saved =
      localStorage.getItem(
        "animeOCCharacter"
      );

    if (!saved) {
      return initialCharacter;
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
    return initialCharacter;
  }
}

function getSavedStep() {
  try {
    const saved =
      localStorage.getItem(
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

  useEffect(() => {
    try {
      localStorage.setItem(
        "animeOCCharacter",
        JSON.stringify(character)
      );

      setIsSaved(true);

      const timeout = setTimeout(() => {
        setIsSaved(false);
      }, 1200);

      return () =>
        clearTimeout(timeout);
    } catch {
      setIsSaved(false);
    }
  }, [character]);

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

  const generateCharacter = () => {
    setIsGenerated(true);
    setErrors({});

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateBasicInfo()) {
        return;
      }
    }

    if (currentStep === 2) {
      if (!validatePersonality()) {
        return;
      }
    }

    if (currentStep === 3) {
      if (!validatePower()) {
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

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleBack = () => {
    setCurrentStep((previous) =>
      Math.max(previous - 1, 1)
    );

    setErrors({});

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

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

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
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

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
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

  const randomizeCharacter = () => {
    const randomNames = [
      "Kael Vanth",
      "Aeris Nocturne",
      "Riven Kuro",
      "Liora Veyne",
      "Ren Ashvale",
      "Sora Nightfall",
      "Aiden Cross",
      "Mira Valen"
    ];

    const randomPowerNames = [
      "Shadow Dominion",
      "Astral Rupture",
      "Void Pulse",
      "Eclipse Drive",
      "Crimson Resonance",
      "Celestial Breaker",
      "Phantom Arsenal",
      "Infinite Flame"
    ];

    const newCharacter = {
      name: randomItem(randomNames),

      age: String(
        Math.floor(
          Math.random() * 20
        ) + 16
      ),

      gender: randomItem(
        genderOptions.slice(0, 2)
      ),

      species:
        randomItem(
          speciesOptions
        ),

      role:
        randomItem(
          roleOptions
        ),

      personality:
        randomItems(
          personalityOptions,
          3
        ),

      powerType:
        randomItem(
          powerTypeOptions
        ),

      powerName:
        randomItem(
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

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const completionCount =
    [
      character.name.trim(),
      character.age,
      character.gender,
      character.species,
      character.role,
      character.personality.length >=
        3,
      character.powerType,
      character.powerName.trim(),
      character.powerDescription.trim()
    ].filter(Boolean).length;

  const completionPercentage =
    Math.round(
      (completionCount / 9) * 100
    );

  return (
    <>
      <Header />

      <main
        id="creator"
        className="creator-page"
      >
        {!isGenerated ? (
          <>
            <section className="creator-intro">
              <div className="creator-intro-content">
                <p className="eyebrow">
                  ANIME OC CREATOR
                </p>

                <h1>
                  Create Your Original
                  Character
                </h1>

                <p>
                  Build your character
                  from the ground up.
                  Define their identity,
                  personality, powers,
                  and role.
                </p>
              </div>

              <div className="creator-tools">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={
                    randomizeCharacter
                  }
                >
                  🎲 Randomize
                </button>

                {isSaved && (
                  <span
                    className="save-status"
                    role="status"
                    aria-live="polite"
                  >
                    ✓ Saved
                  </span>
                )}
              </div>
            </section>

            <section
              className="completion-card"
              aria-label="Character completion"
            >
              <div className="completion-header">
                <span>
                  Character Progress
                </span>

                <strong>
                  {completionPercentage}%
                </strong>
              </div>

              <div
                className="completion-track"
                aria-hidden="true"
              >
                <div
                  className="completion-fill"
                  style={{
                    width: `${completionPercentage}%`
                  }}
                />
              </div>
            </section>

            <ProgressBar
              currentStep={
                currentStep
              }
              goToStep={goToStep}
            />

            <section className="creator-container">
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
                />
              )}

              <div className="step-navigation">
                {currentStep > 1 && (
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={
                      handleBack
                    }
                  >
                    Back
                  </button>
                )}

                <button
                  type="button"
                  className="primary-button"
                  onClick={
                    handleNext
                  }
                >
                  {currentStep === 4
                    ? "Generate Character"
                    : "Continue"}
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
    </>
  );
}

export default App;