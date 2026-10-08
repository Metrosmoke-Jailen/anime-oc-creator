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
      className="mb-10 w-full"
      aria-label="Character creation progress"
    >
      <ol className="grid grid-cols-4 gap-2 sm:gap-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1;

          const isActive =
            currentStep === stepNumber;

          const isCompleted =
            currentStep > stepNumber;

          const canNavigate =
            stepNumber < currentStep;

          return (
            <li
              key={step}
              className="min-w-0"
            >
              <button
                type="button"
                onClick={() =>
                  goToStep(stepNumber)
                }
                disabled={!canNavigate}
                aria-current={
                  isActive
                    ? "step"
                    : undefined
                }
                aria-label={`Step ${stepNumber}: ${step}${
                  isCompleted
                    ? ", completed and editable"
                    : isActive
                      ? ", current step"
                      : ", not yet available"
                }`}
                className={`
                  group
                  flex
                  min-h-20
                  w-full
                  flex-col
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  px-2
                  py-3
                  text-center
                  transition-all
                  duration-200
                  focus-visible:outline-3
                  focus-visible:outline-purple-300
                  focus-visible:outline-offset-2

                  ${
                    isActive
                      ? "border-purple-400/50 bg-purple-500/15 text-white shadow-lg shadow-purple-900/20"
                      : isCompleted
                        ? "border-purple-400/20 bg-purple-500/5 text-purple-200 hover:border-purple-400/40 hover:bg-purple-500/10"
                        : "border-white/10 bg-white/[0.02] text-white/35"
                  }

                  ${
                    canNavigate
                      ? "cursor-pointer"
                      : "cursor-default"
                  }
                `}
              >
                <span
                  aria-hidden="true"
                  className={`
                    grid
                    size-9
                    shrink-0
                    place-items-center
                    rounded-full
                    border
                    text-sm
                    font-black
                    transition-all

                    ${
                      isActive
                        ? "border-purple-300 bg-purple-500 text-white shadow-md shadow-purple-500/30"
                        : isCompleted
                          ? "border-purple-400/40 bg-purple-500/20 text-purple-200"
                          : "border-white/15 bg-white/5 text-white/40"
                    }
                  `}
                >
                  {isCompleted
                    ? "✓"
                    : stepNumber}
                </span>

                <span
                  className={`
                    max-w-full
                    truncate
                    text-xs
                    font-bold
                    sm:text-sm

                    ${
                      isActive
                        ? "text-white"
                        : isCompleted
                          ? "text-purple-200"
                          : "text-white/40"
                    }
                  `}
                >
                  {step}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Current step status */}
      <div className="mt-4 text-center">
        <p
          className="text-sm font-semibold text-white/60"
          aria-live="polite"
        >
          Step {currentStep} of{" "}
          {steps.length}
        </p>

        {currentStep > 1 && (
          <p className="mt-1 text-xs text-white/35">
            ✓ Completed steps can be
            clicked to edit
          </p>
        )}
      </div>
    </nav>
  );
}

export default ProgressBar;