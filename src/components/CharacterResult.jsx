function CharacterResult({
  character,
  resetCharacter
}) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="character-result">
      <div className="result-heading">
        <p className="eyebrow">
          CHARACTER GENERATED
        </p>

        <h1>
          Your Anime OC
        </h1>

        <p>
          Your original character profile
          is ready.
        </p>
      </div>

      <article
        className="profile-card"
        aria-labelledby="profile-name"
      >
        <div className="profile-banner">
          <div
            className="profile-avatar"
            aria-hidden="true"
          >
            ⚔️
          </div>

          <div className="profile-title">
            <p className="eyebrow">
              ORIGINAL CHARACTER
            </p>

            <h2 id="profile-name">
              {character.name}
            </h2>

            <p>
              {character.role ||
                "Character"}
            </p>
          </div>
        </div>

        <div className="profile-content">
          <section
            className="profile-section"
            aria-labelledby="identity-heading"
          >
            <h3 id="identity-heading">
              Identity
            </h3>

            <div className="profile-grid">
              <div className="profile-item">
                <span>Age</span>

                <strong>
                  {character.age}
                </strong>
              </div>

              <div className="profile-item">
                <span>Gender</span>

                <strong>
                  {character.gender}
                </strong>
              </div>

              <div className="profile-item">
                <span>Species</span>

                <strong>
                  {character.species}
                </strong>
              </div>

              <div className="profile-item">
                <span>Role</span>

                <strong>
                  {character.role ||
                    "Not specified"}
                </strong>
              </div>
            </div>
          </section>

          <section
            className="profile-section"
            aria-labelledby="personality-heading"
          >
            <h3 id="personality-heading">
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
          </section>

          <section
            className="profile-section"
            aria-labelledby="power-heading"
          >
            <h3 id="power-heading">
              Power
            </h3>

            <div className="profile-power">
              <p className="power-type">
                {character.powerType}
              </p>

              <h4>
                {character.powerName}
              </h4>

              <p>
                {
                  character.powerDescription
                }
              </p>
            </div>
          </section>

          <div className="result-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={handlePrint}
            >
              🖨️ Print Profile
            </button>

            <button
              type="button"
              className="primary-button"
              onClick={
                resetCharacter
              }
            >
              ✨ Create Another
            </button>
          </div>
        </div>
      </article>
    </section>
  );
}

export default CharacterResult;