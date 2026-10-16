
const steps = [
  { label: "Basic Info", icon: "✦", description: "Define identity" },
  { label: "Personality", icon: "☯", description: "Shape character" },
  { label: "Powers", icon: "⚡", description: "Choose abilities" },
  { label: "Weapons", icon: "⚔", description: "Select weaponry" },
  { label: "Accessories", icon: "◇", description: "Add details" },
  { label: "Appearance", icon: "◈", description: "Design the look" },
  { label: "Backstory", icon: "📜", description: "Write their history" },
  { label: "Titles", icon: "👑", description: "Forge a legend" },
  { label: "Review", icon: "✧", description: "Finalize character" },
];

function ProgressBar({ currentStep, goToStep }) {
  const progress =
    ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <nav
      className="journey-progress"
      aria-label="Character creation steps"
    >
      <div className="journey-heading">
        <div>
          <p className="journey-eyebrow">
            YOUR CREATION JOURNEY
          </p>

          <h2 className="journey-title">
            Forge Your Character
          </h2>
        </div>

        <div className="journey-counter" aria-live="polite">
          <span className="journey-counter-current">
            {String(currentStep).padStart(2, "0")}
          </span>

          <span className="journey-counter-divider">/</span>

          <span>{String(steps.length).padStart(2, "0")}</span>
        </div>
      </div>

      <div className="journey-track" aria-hidden="true">
        <div
          className="journey-track-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <ol className="journey-steps">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isCompleted = currentStep > stepNumber;

          return (
            <li
              key={step.label}
              className={[
                "journey-step",
                isActive ? "is-active" : "",
                isCompleted ? "is-completed" : "",
                !isActive && !isCompleted
                  ? "is-upcoming"
                  : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <button
                type="button"
                className="journey-step-button"
                onClick={() => {
                  if (isCompleted) {
                    goToStep(stepNumber);
                  }
                }}
                disabled={!isCompleted}
                aria-current={isActive ? "step" : undefined}
                aria-label={`Step ${stepNumber}: ${step.label}${
                  isActive
                    ? ", current step"
                    : isCompleted
                      ? ", completed, click to edit"
                      : ", upcoming"
                }`}
              >
                <span
                  className="journey-step-icon"
                  aria-hidden="true"
                >
                  {isCompleted ? "✓" : step.icon}
                </span>

                <span className="journey-step-copy">
                  <span className="journey-step-number">
                    STEP {String(stepNumber).padStart(2, "0")}
                  </span>

                  <span className="journey-step-label">
                    {step.label}
                  </span>

                  <span className="journey-step-description">
                    {isActive
                      ? "You are here"
                      : isCompleted
                        ? "Completed"
                        : step.description}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <p className="journey-hint">
        <span aria-hidden="true">✦</span>
        {currentStep === steps.length
          ? "The final chapter. Review your character before generating."
          : "Every choice brings your original character to life."}
      </p>
    </nav>
  );
}

export default ProgressBar;
