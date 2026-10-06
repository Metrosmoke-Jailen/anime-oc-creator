function ProgressBar({
  currentStep,
  goToStep
}) {
  const steps = [
    "Basic Info",
    "Personality",
    "Power",
    "Review"
  ];

  return (
    <nav
      className="progress"
      aria-label="Character creation progress"
    >
      <ol>
        {steps.map(
          (step, index) => {
            const stepNumber =
              index + 1;

            const isActive =
              currentStep ===
              stepNumber;

            const isCompleted =
              currentStep >
              stepNumber;

            const canNavigate =
              stepNumber <
              currentStep;

            return (
              <li
                key={step}
                className={`
                  ${
                    isActive
                      ? "active"
                      : ""
                  }
                  ${
                    isCompleted
                      ? "completed"
                      : ""
                  }
                `}
              >
                <button
                  type="button"
                  className="progress-step-button"
                  onClick={() =>
                    goToStep(
                      stepNumber
                    )
                  }
                  disabled={
                    !canNavigate
                  }
                  aria-current={
                    isActive
                      ? "step"
                      : undefined
                  }
                  aria-label={`Step ${stepNumber}: ${step}${
                    isCompleted
                      ? ", completed"
                      : ""
                  }`}
                >
                  <span
                    className="progress-number"
                    aria-hidden="true"
                  >
                    {isCompleted
                      ? "✓"
                      : stepNumber}
                  </span>

                  <span className="progress-label">
                    {step}
                  </span>
                </button>
              </li>
            );
          }
        )}
      </ol>

      <p className="progress-status">
        Step {currentStep} of{" "}
        {steps.length}
      </p>
    </nav>
  );
}

export default ProgressBar;