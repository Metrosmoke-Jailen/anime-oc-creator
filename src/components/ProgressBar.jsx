
function ProgressBar({ currentStep, goToStep }) {
  const steps = [
    { label: "Basic Info", icon: "📝" },
    { label: "Personality", icon: "🎭" },
    { label: "Powers", icon: "🔥" },
    { label: "Weapons", icon: "⚔️" },
    { label: "Accessories", icon: "💍" },
    { label: "Appearance", icon: "👁️" },
    { label: "Review", icon: "📋" },
  ];

  return (
    <nav
      className="mb-10 w-full"
      aria-label="Character creation progress"
    >
      <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7 lg:gap-3">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isCompleted = currentStep > stepNumber;
          const canNavigate = stepNumber < currentStep;

          return (
            <li key={step.label} className="min-w-0">
              <button
                type="button"
                onClick={() => goToStep(stepNumber)}
                disabled={!canNavigate}
                aria-current={isActive ? "step" : undefined}
                aria-label={`Step ${stepNumber}: ${step.label}${
                  isCompleted
                    ? ", completed and editable"
                    : isActive
                      ? ", current step"
                      : ", not yet available"
                }`}
                className={`
                  flex min-h-24 w-full min-w-0 flex-col
                  items-center justify-center gap-2
                  rounded-xl border px-2 py-3 text-center
                  transition-colors duration-200
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-violet-300

                  ${
                    isActive
                      ? "border-violet-400/50 bg-violet-500/15 text-white shadow-lg shadow-violet-950/20"
                      : isCompleted
                        ? "border-violet-400/20 bg-violet-500/5 text-violet-200 hover:border-violet-400/40 hover:bg-violet-500/10"
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
                  className="text-lg"
                >
                  {isCompleted ? "✓" : step.icon}
                </span>

                <span
                  aria-hidden="true"
                  className={`
                    grid size-7 shrink-0 place-items-center
                    rounded-full border text-xs font-black
                    sm:size-8

                    ${
                      isActive
                        ? "border-violet-300 bg-violet-500 text-white"
                        : isCompleted
                          ? "border-violet-400/40 bg-violet-500/20 text-violet-200"
                          : "border-white/15 bg-white/5 text-white/40"
                    }
                  `}
                >
                  {isCompleted ? "✓" : stepNumber}
                </span>

                <span
                  className={`
                    max-w-full break-words text-[10px]
                    font-bold leading-tight sm:text-xs

                    ${
                      isActive
                        ? "text-white"
                        : isCompleted
                          ? "text-violet-200"
                          : "text-white/40"
                    }
                  `}
                >
                  {step.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-4 text-center">
        <p
          className="text-sm font-semibold text-white/60"
          aria-live="polite"
        >
          Step {currentStep} of {steps.length}
        </p>

        <div
          className="mx-auto mt-3 h-1.5 max-w-md overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-valuenow={currentStep}
          aria-valuemin={1}
          aria-valuemax={steps.length}
          aria-label={`Creation progress: step ${currentStep} of ${steps.length}`}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-600 via-violet-500 to-fuchsia-400 transition-all duration-500"
            style={{
              width: `${(currentStep / steps.length) * 100}%`,
            }}
          />
        </div>

        {currentStep > 1 && (
          <p className="mt-2 text-xs text-white/35">
            ✓ Previous steps can be clicked to edit
          </p>
        )}
      </div>
    </nav>
  );
}

export default ProgressBar;
