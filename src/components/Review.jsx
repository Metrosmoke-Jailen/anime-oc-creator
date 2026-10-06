function Review({ character }) {
  const hasRole =
    Boolean(character.role);

  return (
    <section
      className="creator-step"
      aria-labelledby="review-heading"
    >
      <div className="step-heading">
        <p className="eyebrow">
          STEP 04
        </p>

        <h2 id="review-heading">
          Review Your Character
        </h2>

        <p>
          Everything looks good? Generate
          your final character profile.
        </p>
      </div>

      <div className="review-card">
        <div className="review-header">
          <div
            className="character-avatar"
            aria-hidden="true"
          >
            ⚔️
          </div>

          <div>
            <p className="eyebrow">
              ORIGINAL CHARACTER
            </p>

            <h3>
              {character.name ||
                "Unnamed Character"}
            </h3>

            <p>
              {hasRole
                ? character.role
                : "Role not specified"}
            </p>
          </div>
        </div>

        <div className="review-section">
          <h3>
            Basic Information
          </h3>

          <div className="review-grid">
            <div>
              <span>Name</span>

              <strong>
                {character.name}
              </strong>
            </div>

            <div>
              <span>Age</span>

              <strong>
                {character.age}
              </strong>
            </div>

            <div>
              <span>Gender</span>

              <strong>
                {character.gender}
              </strong>
            </div>

            <div>
              <span>Species</span>

              <strong>
                {character.species}
              </strong>
            </div>

            <div>
              <span>Role</span>

              <strong>
                {character.role ||
                  "Not specified"}
              </strong>
            </div>
          </div>
        </div>

        <div className="review-section">
          <h3>
            Personality
          </h3>

          <div className="trait-list">
            {character.personality.map(
              (trait) => (
                <span
                  key={trait}
                  className="trait-tag"
                >
                  {trait}
                </span>
              )
            )}
          </div>
        </div>

        <div className="review-section">
          <h3>
            Power
          </h3>

          <div className="power-review">
            <div>
              <span>
                Power Type
              </span>

              <strong>
                {character.powerType}
              </strong>
            </div>

            <div>
              <span>
                Ability Name
              </span>

              <strong>
                {character.powerName}
              </strong>
            </div>

            <div>
              <span>
                Description
              </span>

              <p>
                {
                  character.powerDescription
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Review;