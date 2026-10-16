import {
  appearanceOptions,
  genderOptions,
} from "./options";

const pick = (items) => items[Math.floor(Math.random() * items.length)];
const pickName = () => `${pick(givenNames)} ${pick(familyNames)}`;

const givenNames = [
  "Aiko", "Akira", "Amaya", "Arin", "Asahi", "Aya", "Daichi", "Emi",
  "Hana", "Haru", "Hikari", "Itsuki", "Kaede", "Kai", "Kaito", "Kira",
  "Mika", "Nari", "Ren", "Rin", "Ryo", "Sora", "Toma", "Yuna", "Yuki",
];

const familyNames = [
  "Akiyama", "Amari", "Arashi", "Fujimoto", "Hoshino", "Ishikawa",
  "Kagami", "Kurosawa", "Mori", "Nakamura", "Shimizu", "Tachibana",
  "Takeda", "Tsukino", "Watanabe", "Yamamoto",
];

const builds = [
  {
    archetype: "The Starfall Wanderer",
    species: "Human", role: "Wanderer", powerType: "Celestial Power",
    powerName: "Starfall Thread",
    powerDescription: "They draw thin strands of starlight into blades, shields, or brief paths through the air. Each use dims the light around them, and shaping too many threads at once leaves their hands trembling.",
    personality: ["Curious", "Reserved", "Protective"],
    hairColor: ["Silver", "Blue", "Black"], outfit: ["Long Coat", "Hooded Cloak", "Casual Streetwear"],
    aesthetic: ["Celestial", "Modern Urban", "Classic Shonen"],
    weapon: ["Rapier", "Katana", "Bow"], combatStyle: ["Fast and Precise Strikes", "Fencing", "Ranged Combat"],
    weaponOrigin: ["Discovered", "Inherited", "Magically Summoned"], weaponAbility: "Energy Projection",
    title: "The Far-Walking Comet", titleCategory: "Epithet",
    backstory: (name) => `${name} grew up beneath a sky where one star vanished every winter. When a falling fragment landed beyond the old border, they followed its trail rather than wait for someone else to explain it. Now they travel from town to town, using their strange starlight to protect people caught between rival factions. They still hope to learn why the stars are disappearing—and whether the answer is following them.`,
  },
  {
    archetype: "The Emberbound Guardian",
    species: "Dragonkin", role: "Guardian", powerType: "Elemental Magic",
    powerName: "Cinderwake",
    powerDescription: "They shape warm, golden fire into protective barriers and focused bursts. Their flames grow stronger when they defend someone, but panic makes the heat surge beyond their control.",
    personality: ["Loyal", "Hot-Tempered", "Kind"],
    hairColor: ["Crimson", "Black", "Golden"], outfit: ["Fantasy Armor", "Battle Outfit", "Knight Armor"],
    aesthetic: ["High Fantasy", "Classic Shonen", "Demonic"],
    weapon: ["Spear", "Greatsword", "Shield"], combatStyle: ["Defensive Counterattacks", "Elemental Combat", "Heavy Weapon Combat"],
    weaponOrigin: ["Family Heirloom", "Personally Forged", "Blacksmith-Crafted"], weaponAbility: "Fire Generation",
    title: "Keeper of the Last Hearth", titleCategory: "Honorific",
    backstory: (name) => `${name} was raised in a mountain village whose hearth had burned for generations without fuel. When raiders came seeking the secret, the old flame answered ${name} instead. They left home to keep that power from becoming a weapon, carrying the village's shield and a promise to return only when the road is safe.`,
  },
  {
    archetype: "The Moonlit Archivist",
    species: "Elf", role: "Mage", powerType: "Illusion Magic",
    powerName: "Lunar Palimpsest",
    powerDescription: "They can pull a remembered image into the present as a convincing illusion. The illusion cannot cause physical harm, and every recreation blurs one small detail of the original memory.",
    personality: ["Intelligent", "Patient", "Mysterious"],
    hairColor: ["White", "Purple", "Platinum Blonde"], outfit: ["Dark Academia", "Robe and Sash", "Priest / Cleric Robes"],
    aesthetic: ["Elegant", "Celestial", "Gothic"],
    weapon: ["Book / Grimoire", "Staff", "Wand"], combatStyle: ["Tactical Combat", "Magic-Infused Combat", "Adaptive Combat"],
    weaponOrigin: ["Ancient Artifact", "Inherited", "Discovered"], weaponAbility: "Illusion Generation",
    title: "The Marginalia Witch", titleCategory: "Epithet",
    backstory: (name) => `${name} catalogued books in a library that was erased from every map overnight. The building vanished, but its index remained in ${name}'s notes, including references to people no one else remembers. They now collect the stories that history leaves out, searching for the missing library one annotation at a time.`,
  },
  {
    archetype: "The Neon Ghost",
    species: "Android", role: "Outlaw", powerType: "Technology",
    powerName: "Ghost Protocol",
    powerDescription: "They can briefly make their signal and outline disappear from nearby sensors, then reappear at a connected device. The jump needs a clear signal path and overheats their core if repeated too quickly.",
    personality: ["Clever", "Rebellious", "Sarcastic"],
    hairColor: ["Cyan", "Pink", "Two-Tone"], outfit: ["Techwear", "Cyberpunk Fashion", "Casual Streetwear"],
    aesthetic: ["Cyberpunk", "Mecha", "Streetwear"],
    weapon: ["Dual Pistols", "Mechanical Weapon", "Dagger"], combatStyle: ["Stealth Combat", "Gun Fu", "Tactical Combat"],
    weaponOrigin: ["Lost Technology", "Stolen", "Advanced Technology"], weaponAbility: "Energy Projection",
    title: "The Unlisted Signal", titleCategory: "Epithet",
    backstory: (name) => `${name} was built to patrol the city's transit grid, until a routine update revealed a list of people marked for removal. They copied the list and disappeared into the maintenance tunnels. Now ${name} helps those people escape, while trying to discover who wrote the code—and why it recognizes ${name} as its author.`,
  },
  {
    archetype: "The Uncrowned Heir",
    species: "Fallen Angel", role: "Royalty", powerType: "Light Magic",
    powerName: "Dawn Without a Throne",
    powerDescription: "They weave light into temporary wings and sanctuaries that shelter nearby allies. The light reveals hidden things—including secrets ${name} would rather keep—and cannot protect them from their own choices.",
    personality: ["Humble", "Determined", "Compassionate"],
    hairColor: ["Gold", "White", "Brown"], outfit: ["Royal Clothing", "Modern Suit", "Hooded Cloak"],
    aesthetic: ["Angelic", "Elegant", "High Fantasy"],
    weapon: ["Spear", "Rapier", "Summoned Weapon"], combatStyle: ["Defensive Counterattacks", "Fencing", "Magic-Infused Combat"],
    weaponOrigin: ["Celestial Origin", "Gifted", "Divine Creation"], weaponAbility: "Light Manipulation",
    title: "Heir to No Kingdom", titleCategory: "Honorific",
    backstory: (name) => `${name} was next in line to inherit a shining kingdom, until they refused to sign an order that would have displaced an entire district. The crown called it treason; the people called it the first honest choice in years. Exiled with only a ceremonial spear, ${name} now travels without a court, learning what leadership means when nobody is required to bow.`,
  },
  {
    archetype: "The Quiet Reaper",
    species: "Dhampir", role: "Assassin", powerType: "Shadow Power",
    powerName: "Afterimage Oath",
    powerDescription: "They can step between connected shadows and leave a decoy in their place. The trick fails in direct, even light, and each jump briefly dulls their senses.",
    personality: ["Stoic", "Merciful", "Cautious"],
    hairColor: ["Black", "Crimson", "Silver"], outfit: ["Ninja Attire", "Gothic Attire", "Long Coat"],
    aesthetic: ["Vampiric", "Dark Fantasy", "Gothic"],
    weapon: ["Twin Daggers", "Scythe", "Throwing Knives"], combatStyle: ["Assassination", "Acrobatic Combat", "Stealth Combat"],
    weaponOrigin: ["Cursed Relic", "Personally Forged", "Stolen"], weaponAbility: "Darkness Manipulation",
    title: "The Mercy in the Dark", titleCategory: "Epithet",
    backstory: (name) => `${name} once accepted contracts without asking who would be hurt. That changed when a target surrendered and revealed the contract had been forged to settle a private feud. ${name} vanished before dawn, taking the ledger and every name inside it. They now hunt the people who profit from quiet violence, and refuse a job without hearing both sides.`,
  },
];

export function generateRandomCharacter() {
  const build = pick(builds);
  const name = pickName();
  const powerDescription = build.powerDescription.replaceAll("${name}", name);
  const weaponType = pick(build.weapon);
  const weaponName = pick({
    Rapier: ["Northstar", "Glasswing"], Katana: ["Last Light", "Hoshikiri"],
    Bow: ["Farline", "Quiet Orbit"], Spear: ["Hearthpiercer", "First Dawn"],
    Greatsword: ["Ashwake", "Mountain's Answer"], Shield: ["Hearthwall", "Oathkeeper"],
    Book: ["The Unwritten Index", "Moon Margin"], Staff: ["Nightglass", "Tidekeeper"],
    Wand: ["Silver Script", "Lunette"], "Book / Grimoire": ["The Unwritten Index", "Moon Margin"],
    "Dual Pistols": ["Afterimage", "Static Bloom"], "Mechanical Weapon": ["Ghostline", "Blackbox"],
    Dagger: ["Soft Static", "Mercy"], "Twin Daggers": ["Mercy and Measure", "Dusk / Dawn"],
    Scythe: ["Pale Promise", "Night's Due"], "Throwing Knives": ["Small Mercies", "Quietus"],
  }[weaponType] ?? ["Wayfinder", "Oathbound"]);

  const firstGenderOptions = genderOptions.filter((gender) => !["Other", "Prefer not to say"].includes(gender));
  const hairColor = pick(build.hairColor);
  const eyeColor = pick(build.aesthetic.includes("Cyberpunk") ? ["Cyan", "Silver", "Purple", "Red"] : appearanceOptions.eyeColorOptions.filter((color) => color !== "Custom"));
  const accessory = pick(build.aesthetic.includes("Cyberpunk") ? ["Goggles", "Gloves", "Earrings", "Mask"] : ["Pendant", "Charm", "Earrings", "Scarf", "Gloves"]);

  return {
    name,
    age: String(18 + Math.floor(Math.random() * 19)),
    gender: pick(firstGenderOptions),
    species: build.species,
    role: build.role,
    personality: [...build.personality],
    appearance: {
      hairColor,
      hairStyle: pick(appearanceOptions.hairStyleOptions.filter((item) => item !== "Custom")),
      eyeColor,
      eyeStyle: pick(appearanceOptions.eyeStyleOptions.filter((item) => item !== "Custom")),
      skinTone: pick(appearanceOptions.skinToneOptions.filter((item) => item !== "Fantasy / Custom")),
      height: pick(appearanceOptions.heightOptions.filter((item) => item !== "Custom")),
      build: pick(appearanceOptions.buildOptions.filter((item) => item !== "Other")),
      outfit: pick(build.outfit),
      accessories: accessory,
      aesthetic: pick(build.aesthetic),
      distinguishingFeatures: pick([
        "A faint constellation of freckles across one cheek",
        "A thin scar that catches the light",
        "A small, unusually bright birthmark",
        "One eye has a subtly different ring of color",
      ]),
    },
    powerType: build.powerType,
    powerName: build.powerName,
    powerDescription,
    backstory: build.backstory(name),
    titles: [{
      id: `generated-${Date.now()}`,
      category: build.titleCategory,
      name: build.title,
      description: `A name earned through the choices that define ${name}.`,
      isPrimary: true,
    }],
    weapon: {
      type: weaponType,
      name: weaponName,
      description: `A well-kept ${weaponType.toLowerCase()} carried as a reminder of the path ${name} chose.`,
      combatStyle: pick(build.combatStyle),
      origin: pick(build.weaponOrigin),
      rarity: pick(["Rare", "Epic", "Legendary", "Unique"]),
      abilities: [build.weaponAbility],
      customAbility: "",
    },
    accessories: {
      items: [{
        id: `generated-accessory-${Date.now()}`,
        type: accessory,
        name: pick(["The Wayfinder Charm", "Old Promise", "Signal Bloom", "Dawnmark"]),
        location: pick(["Neck", "Wrist", "Chest", "Floating / Orbiting"]),
        purpose: pick(["Sentimental Value", "Protection", "Identification"]),
        material: pick(["Silver", "Obsidian", "Crystal", "Mixed Materials"]),
        description: `A personal keepsake that ${name} never leaves behind.`,
        abilities: [],
      }],
      current: {
        type: "", name: "", location: "", purpose: "", material: "",
        description: "", abilities: [],
      },
    },
  };
}
