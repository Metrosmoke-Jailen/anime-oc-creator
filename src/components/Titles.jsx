
import { useMemo, useState } from "react";

const titleCategories = [
  {
    label: "Formal Title",
    icon: "👑",
    description: "Royal, official, or recognized position",
    placeholder: "e.g. Prince of Shadowy Solitude",
  },
  {
    label: "Epithet",
    icon: "✦",
    description: "A name earned through deeds or reputation",
    placeholder: "e.g. The Last Reflection",
  },
  {
    label: "Honorific",
    icon: "⚜",
    description: "A name expressing respect or authority",
    placeholder: "e.g. The Eternal Sovereign",
  },
  {
    label: "Legendary Alias",
    icon: "🌑",
    description: "A feared, mysterious, or legendary identity",
    placeholder: "e.g. The King Beyond the Veil",
  },
  {
    label: "Combat Title",
    icon: "⚔",
    description: "A title earned through battle or mastery",
    placeholder: "e.g. The Unbroken Blade",
  },
  {
    label: "Divine Title",
    icon: "☼",
    description: "A celestial, divine, or cosmic designation",
    placeholder: "e.g. The Arbiter of Eternity",
  },
];

const EMPTY_TITLES = [];

function createTitleId() {
  return `title-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 9)}`;
}

function Titles({ character = {}, updateCharacter }) {
  const [selectedCategory, setSelectedCategory] =
    useState("Epithet");

  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] =
    useState("");
  const [notice, setNotice] = useState("");

  const titles = Array.isArray(character.titles)
    ? character.titles
    : EMPTY_TITLES;

  const activeCategory = titleCategories.find(
    (category) => category.label === selectedCategory
  );

  const primaryTitle = useMemo(
    () => titles.find((title) => title.isPrimary),
    [titles]
  );

  const epithets = useMemo(
    () =>
      titles.filter(
        (title) => title.category === "Epithet"
      ),
    [titles]
  );

  function syncTitles(nextTitles) {
    updateCharacter("titles", nextTitles);
  }

  function addTitle(event) {
    event.preventDefault();

    const name = titleInput.trim();
    const description = descriptionInput.trim();

    if (!name) {
      setNotice("Enter a name for your title first.");
      return;
    }

    const duplicate = titles.some(
      (title) =>
        title.name.trim().toLowerCase() ===
        name.toLowerCase()
    );

    if (duplicate) {
      setNotice("That title already exists.");
      return;
    }

    if (titles.length >= 10) {
      setNotice("You can add up to 10 titles.");
      return;
    }

    const newTitle = {
      id: createTitleId(),
      category: selectedCategory,
      name,
      description,
      isPrimary: titles.length === 0,
    };

    syncTitles([...titles, newTitle]);
    setTitleInput("");
    setDescriptionInput("");
    setNotice("Title added to your character.");
  }

  function removeTitle(titleId) {
    let nextTitles = titles.filter(
      (title) => title.id !== titleId
    );

    if (
      nextTitles.length > 0 &&
      !nextTitles.some((title) => title.isPrimary)
    ) {
      nextTitles = nextTitles.map((title, index) => ({
        ...title,
        isPrimary: index === 0,
      }));
    }

    syncTitles(nextTitles);
    setNotice("Title removed.");
  }

  function setPrimaryTitle(titleId) {
    const nextTitles = titles.map((title) => ({
      ...title,
      isPrimary: title.id === titleId,
    }));

    syncTitles(nextTitles);
    setNotice("Primary title updated.");
  }

  function clearTitles() {
    syncTitles([]);
    setNotice("All titles have been cleared.");
  }

  return (
    <section className="titles-studio">
      <header className="titles-header">
        <div>
          <p className="titles-eyebrow">
            CHARACTER IDENTITY · HONOR & REPUTATION
          </p>

          <h2 className="titles-heading">
            Titles &amp; Epithets
          </h2>

          <p className="titles-intro">
            Every legend is known by something. Create the
            titles your character carries, the names their
            enemies fear, and the epithets that history
            remembers.
          </p>
        </div>

        <div className="titles-counter" aria-live="polite">
          <span>{titles.length}</span>
          <small>of 10 titles</small>
        </div>
      </header>

      <div className="titles-section-heading">
        <span className="titles-section-icon" aria-hidden="true">
          ✧
        </span>

        <div>
          <h3>Choose a Title Category</h3>
          <p>What kind of reputation does your character carry?</p>
        </div>
      </div>

      <div
        className="title-category-grid"
        role="group"
        aria-label="Title categories"
      >
        {titleCategories.map((category) => {
          const selected =
            selectedCategory === category.label;

          return (
            <button
              key={category.label}
              type="button"
              className={[
                "title-category-card",
                selected ? "is-selected" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => {
                setSelectedCategory(category.label);
                setNotice("");
              }}
              aria-pressed={selected}
            >
              <span
                className="title-category-icon"
                aria-hidden="true"
              >
                {category.icon}
              </span>

              <span className="title-category-name">
                {category.label}
              </span>

              <span className="title-category-description">
                {category.description}
              </span>

              <span
                className="title-category-check"
                aria-hidden="true"
              >
                {selected ? "✓" : "+"}
              </span>
            </button>
          );
        })}
      </div>

      <form className="title-entry-form" onSubmit={addTitle}>
        <div className="titles-section-heading">
          <span className="titles-section-icon" aria-hidden="true">
            ✎
          </span>

          <div>
            <h3>Create a Title</h3>
            <p>Add a name and the story behind it.</p>
          </div>
        </div>

        <div className="title-input-field">
          <label htmlFor="character-title-name">
            Title Name <span aria-hidden="true">*</span>
          </label>

          <input
            id="character-title-name"
            type="text"
            value={titleInput}
            onChange={(event) => {
              setTitleInput(event.target.value);
              setNotice("");
            }}
            placeholder={
              activeCategory?.placeholder ??
              "Enter a title..."
            }
            maxLength={80}
            autoComplete="off"
          />

          <span className="title-field-counter">
            {titleInput.length}/80
          </span>
        </div>

        <div className="title-input-field">
          <label htmlFor="character-title-description">
            Meaning &amp; Origin
          </label>

          <textarea
            id="character-title-description"
            value={descriptionInput}
            onChange={(event) =>
              setDescriptionInput(event.target.value)
            }
            placeholder="What deed, power, event, or reputation earned this title?"
            rows={3}
            maxLength={300}
          />

          <span className="title-field-counter">
            {descriptionInput.length}/300
          </span>
        </div>

        <div className="title-form-footer">
          <p className="title-selected-category">
            <span aria-hidden="true">
              {activeCategory?.icon ?? "✦"}
            </span>
            Adding: {selectedCategory}
          </p>

          <button
            className="title-add-button"
            type="submit"
            disabled={titles.length >= 10}
          >
            <span aria-hidden="true">+</span>
            Add Title
          </button>
        </div>

        {notice && (
          <p className="title-notice" role="status">
            {notice}
          </p>
        )}
      </form>

      <div className="titles-section-heading">
        <span className="titles-section-icon" aria-hidden="true">
          ♛
        </span>

        <div>
          <h3>Title Collection</h3>
          <p>
            Choose one designation as your character's
            primary title.
          </p>
        </div>
      </div>

      {titles.length === 0 ? (
        <div className="titles-empty-state">
          <span aria-hidden="true">✧</span>
          <h4>No titles have been forged yet</h4>
          <p>
            Add a formal title, an earned epithet, or a
            legendary alias to begin your character's legend.
          </p>
        </div>
      ) : (
        <div className="title-collection">
          {titles.map((title) => {
            const category = titleCategories.find(
              (item) => item.label === title.category
            );

            return (
              <article
                key={title.id}
                className={[
                  "title-collection-card",
                  title.isPrimary ? "is-primary" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className="title-card-top">
                  <span
                    className="title-card-category-icon"
                    aria-hidden="true"
                  >
                    {category?.icon ?? "✦"}
                  </span>

                  <span className="title-card-category">
                    {title.category}
                  </span>

                  {title.isPrimary && (
                    <span className="title-primary-badge">
                      PRIMARY
                    </span>
                  )}
                </div>

                <h4 className="title-card-name">
                  {title.name}
                </h4>

                {title.description && (
                  <p className="title-card-description">
                    {title.description}
                  </p>
                )}

                <div className="title-card-actions">
                  {!title.isPrimary && (
                    <button
                      type="button"
                      className="title-secondary-button"
                      onClick={() => setPrimaryTitle(title.id)}
                    >
                      Make Primary
                    </button>
                  )}

                  <button
                    type="button"
                    className="title-remove-button"
                    onClick={() => removeTitle(title.id)}
                    aria-label={`Remove title ${title.name}`}
                  >
                    Remove
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <section className="title-dossier" aria-label="Live title preview">
        <div className="title-dossier-decoration" aria-hidden="true">
          ✦
        </div>

        <p className="title-dossier-eyebrow">
          THE LEGENDARY DOSSIER
        </p>

        <h3>
          {character.name?.trim() || "Unnamed Character"}
        </h3>

        <p className="title-dossier-primary">
          {primaryTitle?.name || "A Legend Yet Unnamed"}
        </p>

        {epithets.length > 0 && (
          <div className="title-dossier-epithets">
            {epithets.map((epithet) => (
              <span key={epithet.id}>
                “{epithet.name}”
              </span>
            ))}
          </div>
        )}

        <div className="title-dossier-divider">
          <span>✧</span>
        </div>

        <p className="title-dossier-summary">
          {titles.length === 0
            ? "A name becomes a legend through the deeds that give it meaning."
            : `${titles.length} title${titles.length === 1 ? "" : "s"} recorded in this character's legend.`}
        </p>
      </section>

      <footer className="titles-footer-actions">
        <p>
          <span aria-hidden="true">◇</span>
          Your titles are part of your character's identity.
        </p>

        <button
          type="button"
          className="title-clear-button"
          onClick={clearTitles}
          disabled={titles.length === 0}
        >
          Clear All Titles
        </button>
      </footer>
    </section>
  );
}

export default Titles;
