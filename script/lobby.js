const TYPE_FILENAME_MAP = {
  "grass": "grass.png",
  "metal": "metal.png",
  "ground": "ground.png",
  "pyschic": "psychic.png",
  "poision": "poison.png",
  "ghost": "ghost.png",
  "fairy": "fairy.png",
  "bug": "bug.png",
  "electric": "electric.png",
  "fighting": "fighting",
  "fire": "fire.png",
  "water": "water.png",
  "dragon": "dragon.png",
  "flying": "flying.png",
  "normal": "normal.png",
  "dark": "dark.png",

};

function getTypeIconPath(typeText) {
  const key = normalizeTypeKey(typeText);
  const filename = TYPE_FILENAME_MAP[key] || TYPE_FILENAME_MAP[key.split('-')[0]] || 'normal.png';
  return `types/${filename}`;
}


const pokemonData = {
  "Abomasnow_Mega.gif": { 
    name:"Abomasnow", 
    type:"🌱Grass  ❄️Ice",
    hp:100, atk:132, def:105, spd:30, 
    skills:["Icy Vine","Avalanche Toss","Frostbite Spore","Gaia Guard"] 
  },
  "Aerodactyl_Mega.gif": { 
    name:"Aerodactyl", 
    type:"Rock / Flying", 
    hp:100, atk:135, def:85, spd:150, 
    skills:["Stone Peck","Sky Crush","Wing Gust","Rocky Shell"] 
  },
  "Aggron_Mega.gif": { 
    name:"Aggron", 
    type:"Steel", 
    hp:100, atk:140, def:230, spd:50, 
    skills:["Steel Charge","Iron Slam","Rust Spray","Heavy Barrier"] 
  },
  "Alakazam_Mega.gif": { 
    name:"Alakazam", 
    type:"Psychic", 
    hp:100, atk:50, def:65, spd:150, 
    skills:["Psy Jab","Mind Lance","Confuse Ray","Reflex Veil"] 
  },
  "Altaria_Mega.gif": { 
    name:"Altaria", 
    type:"Dragon/Fairy", 
    hp:100, atk:110, def:110, spd:80, 
    skills:["Dragon Note","Heavenly Roost","Serene Song","Cloud Shield"] 
  },
  "Ampharos_Mega.gif": { 
    name:"Ampharos", 
    type:"Electric/Dragon", 
    hp:100, atk:95, def:105, spd:45, 
    skills:["Spark Tail","Dragon Bolt","Static Field","Volt Guard"] 
  },
  "Audino_Mega.gif": { 
    name:"Audino", 
    type:"Normal/Fairy", 
    hp:100, atk:60, def:126, spd:50, 
    skills:["Comfort Punch","Healing Chorus","Warm Embrace","Guardian Ward"] 
  },
  "Banette_Mega.gif": { 
    name:"Banette", 
    type:"Ghost", 
    hp:100, atk:165, def:75, spd:75, 
    skills:["Hex Snap","Curse Grasp","Phantom Spores","Doll Shroud"] 
  },
  "Beedrill_Mega.gif": { 
    name:"Beedrill", 
    type:"Bug/Poison", 
    hp:100, atk:150, def:40, spd:145, 
    skills:["Stinger Jab","Venom Blitz","Toxic Spray","Swarm Cover"] 
  },
  "Blastoise_Mega.gif": { 
    name:"Blastoise", 
    type:"Water", 
    hp:100, atk:103, def:120, spd:78, 
    skills:["Aqua Bash","Hydro Cannon","Soaking Mist","Shell Fortify"] 
  },
  "Blaziken_Mega.gif": { 
    name:"Blaziken", 
    type:"Fire/Fighting", 
    hp:100, atk:160, def:80, spd:100, 
    skills:["Flare Kick","Phoenix Rush","Scorching Feint","Battle Focus"] 
  },
  "Camerupt_Mega.gif": { 
    name:"Camerupt", 
    type:"Fire/Ground", 
    hp:100, atk:120, def:100, spd:20, 
    skills:["Magma Slam","Volcanic Spike","Eruption Ash","Earthen Bulwark"] 
  },
  "Charizard_MegaY.gif": { 
    name:"Charizard", 
    type:"Fire/Flying", 
    hp:100, atk:104, def:78, spd:100, 
    skills:["Solar Flare","Sky Inferno","Heat Haze","Flame Guard"] 
  },
  "Diancie_Mega.gif": { 
    name:"Diancie", 
    type:"Rock/Fairy", 
    hp:100, atk:160, def:160, spd:110, 
    skills:["Crystal Jab","Prismatic Burst","Sparkling Lure","Diamond Wall"] 
  },
  "Gallade_Mega.gif": { 
    name:"Gallade", 
    type:"Psychic/Fighting", 
    hp:100, atk:165, def:95, spd:110, 
    skills:["Psych Blade","Knight Slash","Mind Rend","Valor Guard"] 
  },
  "Garchomp_Mega.gif": { 
    name:"Garchomp", 
    type:"Dragon/Ground", 
    hp:100, atk:170, def:115, spd:95, 
    skills:["Sand Fang","Earth Dragon","Grounded Roar","Scale Barrier"] 
  },
  "Gardevoir_Mega.gif": { 
    name:"Gardevoir", 
    type:"Psychic/Fairy", 
    hp:100, atk:85, def:95, spd:100, 
    skills:["Moon Pulse","Heartbreak Wave","Lullaby Veil","Ethereal Guard"] 
  },
  "Gengar_Mega.gif": { 
    name:"Gengar", 
    type:"Ghost/Poison",
    hp:100, atk:65, def:100, spd:130, 
    skills:["Shadow Jab","Nightmare Burst","Toxic Haunt","Wraith Veil"] 
    },
  "Glalie_Mega.gif": { 
    name:"Glalie", 
    type:"❄️Ice", 
    hp:100, atk:120, def:80, spd:100,
    skills:["Ice Shard","Frozen Crater","Hail Mist","Frost Armor"] 
    },
  "Gyarados_Mega.gif": { 
    name:"Gyarados",
    type:"Water/Dark", 
    hp:100, atk:155, def:109, spd:81, 
    skills:["Raging Bite","Tidal Maelstrom","Fury Roar","Dragonhide"] 
  },
  "Houndoom_Mega.gif": { 
    name:"Houndoom", 
    type:"Dark/Fire", 
    hp:100, atk:90, def:90, spd:115, 
    skills:["Searing Fang","Hellfire Howl","Curse Smoke","Infernal Coat"] 
  },
  "Heracross_Mega.gif": { 
    name:"Heracross", 
    type:"Bug/Fighting", 
    hp:100, atk:185, def:115, spd:75, 
    skills:["Horn Tackle","Giga Crush","Beetle Charge","Juggernaut Guard"] 
  },
  "Kangaskhan_Mega.gif": { 
    name:"Kangaskhan", 
    type:"Normal", 
    hp:100, atk:125, def:100, spd:100, 
    skills:["Parent Pound","Double Nap","Protective Hug","Mama Shield"] 
  },
  "Latios_Mega.gif": { 
    name:"Latios", 
    type:"Dragon/Psychic", 
    hp:100, atk:130, def:100, spd:110, 
    skills:["Psy Wing","Luminous Beam","Lucid Drift","Aerial Ward"] 
  },
  "Lopunny_Mega.gif": { 
    name:"Lopunny", 
    type:"Normal/Fighting", 
    hp:100, atk:136, def:94, spd:135, 
    skills:["Quick Jab","Blitz Kick","Graceful Dodge","Fury Guard"] 
  },
  "Lucario_Mega.gif": { 
    name:"Lucario", 
    type:"Fighting/Steel", 
    hp:100, atk:145, def:88, spd:112, 
    skills:["Aura Strike","Steel Pulse","Focus Surge","Iron Aegis"] 
  },
  "Manectric_Mega.gif": { 
    name:"Manectric", 
    type:"Electric", 
    hp:100, atk:85, def:80, spd:135, 
    skills:["Spark Fang","Lightning Storm","Charge Field","Conductive Shell"] 
  },
  "Mawile_Mega.gif": { 
    name:"Mawile", 
    type:"Steel/Fairy", 
    hp:100, atk:150, def:125, spd:50, 
    skills:["Bite Illusion","Titan Maw","Confounding Smile","Steel Bloom"] 
  },
  "Medicham_Mega.gif": { 
    name:"Medicham", 
    type:"Fighting/Psychic", 
    hp:100, atk:150, def:75, spd:100, 
    skills:["Meditative Punch","Mind-Body Smash","Zen Focus","Spirit Guard"] 
  },
  "Meganium.gif": { 
    name:"Meganium", 
    type:"🌱Grass", 
    hp:100, atk:82, def:100, spd:80, 
    skills:["Leaf Whip","Solar Beam","Aromatic Breeze","Vine Shield"] 
  },
  "Metagross_Mega.gif": { 
    name:"Metagross", 
    type:"Steel/Psychic", 
    hp:100, atk:170, def:150, spd:110, 
    skills:["Steel Punch","Titan Crash","Magnetize","Adamant Guard"] 
  },
  "Mewtwo_MegaX.gif": { 
    name:"Mewtwo", 
    type:"Psychic/Fighting", 
    hp:100, atk:190, def:100, spd:130, 
    skills:["Psy Fist","Mega Overdrive","Mind Break","Psi Barrier"] 
  },
  "Pidgeot_Mega.gif": { 
    name:"Pidgeot", 
    type:"Normal/Flying", 
    hp:100, atk:80, def:80, spd:121, 
    skills:["Gale Slash","Hurricane Dive","Aerial Push","Feather Guard"] 
  },
  "Pinsir_Mega.gif": { 
    name:"Pinsir", 
    type:"Bug/Flying", 
    hp:100, atk:155, def:120, spd:105, 
    skills:["Spiral Horn","Sky Chopper","Winged Roar","Chitin Shield"] 
  },
  "Sceptile_Mega.gif": { 
    name:"Sceptile", 
    type:"🌱Grass/Dragon", 
    hp:100, atk:110, def:75, spd:145, 
    skills:["Leaf Slice","Dragon Thorn","Root Bind","Camouflage Guard"] 
  },
  "Sableye_Mega.gif": { 
    name:"Sableye", 
    type:"Dark/Ghost",
    hp:100, atk:85, def:125, spd:20, 
    skills:["Shadow Claw","Night Trick","Mischief Hex","Eerie Shell"] 
  },
  "Scizor_Mega.gif": { 
    name:"Scizor", 
    type:"Bug/Steel", 
    hp:100, atk:150, def:140, spd:75, 
    skills:["Pincer Strike","Steel Assault","Precision Cut","Blade Guard"] 
  },
  "Sharpedo_Mega.gif": { 
    name:"Sharpedo", 
    type:"Water/Dark", hp:100, atk:140, def:70, spd:105, 
    skills:["Razor Surge","Abyssal Bite","Blood Frenzy","Hydro Skin"] 
  },
  "Swampert_Mega.gif": { 
    name:"Swampert", 
    type:"Water/Ground", 
    hp:100, atk:150, def:110, spd:70, 
    skills:["Mud Slam","Tsunami Crush","Quagmire","Earth Bulwark"] 
  },
  "Steelix_Mega.gif": { 
    name:"Steelix", 
    type:"Steel/Ground", 
    hp:100, atk:125, def:230, spd:30, 
    skills:["Iron Coil","Seismic Rupture","Gravel Spit","Titan Wall"] 
  },
  "Tyranitar_Mega.gif": { 
    name:"Tyranitar", 
    type:"Rock/Dark", 
    hp:100, atk:165, def:150, spd:71, 
    skills:["Sand Crush","Ravager Strike","Dark Howl","Obsidian Guard"] 
  },
  "Venusaur_Mega.gif": { 
    name:"Venusaur", 
    type:"🌱Grass/Poison", 
    hp:100, atk:100, def:123, spd:80, 
    skills:["Vine Lash","Toxic Bloom","Spore Cloud","Thorn Aegis"] 
  },
  "Rayquaza_Mega.gif": { 
    name:"Rayquaza", 
    type:"Dragon/Flying", 
    hp:100, atk:180, def:100, spd:115,
    skills:["Sky Serpent","Celestial Storm","Tempest Shred","Dragon Scales"] 
  }

}

const pokemonDB = [
  {
    sprite: "Abomasnow_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 132, 
    DEF: 105, 
    SPD: 30,
    skills: [
      { name: "Icy Vine", damage: 25, cost: 1 },
      { name: "Avalanche Toss", damage: 50, cost: 2 },
      { name: "Frostbite Spore", damage: 25, cost: 1, effect: "freeze" },
      { name: "Gaia Guard", shield: 50, cost: 1 }
    ]
  },

  {
    sprite: "Aerodactyl_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 135, 
    DEF: 85, 
    SPD: 150,
    skills: [
      { name: "Stone Peck", damage: 25, cost: 1 },
      { name: "Sky Crush", damage: 50, cost: 2 },
      { name: "Wing Gust", damage: 30, cost: 1, effect: "stun" },
      { name: "Rocky Shell", shield: 45, cost: 1 }
    ]
  },

  {
    sprite: "Aggron_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 140, 
    DEF: 230, 
    SPD: 50,
    skills: [
      { name: "Steel Charge", damage: 50, cost: 1 },
      { name: "Iron Slam", damage: 85, cost: 2 },
      { name: "Rust Spray", damage: 18, cost: 1, effect: "defense down" },
      { name: "Heavy Barrier", shield: 70, cost: 2 }
    ]
  },

  {
    sprite: "Alakazam_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 50,  
    DEF: 65,  
    SPD: 150,
    skills: [
      { name: "Psy Jab", damage: 48, cost: 1 },
      { name: "Mind Lance", damage: 90, cost: 2 },
      { name: "Confuse Ray", damage: 0, cost: 1, effect: "confuse" },
      { name: "Reflex Veil", shield: 40, cost: 1 }
    ]
  },

  {
    sprite: "Altaria_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 110, 
    DEF: 110, 
    SPD: 80,
    skills: [
      { name: "Dragon Note", damage: 52, cost: 1 },
      { name: "Heavenly Roost", damage: 76, cost: 2 },
      { name: "Serene Song", damage: 0, cost: 1, effect: "heal over time" },
      { name: "Cloud Shield", shield: 55, cost: 1 }
    ]
  },

  {
    sprite: "Ampharos_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 95,  
    DEF: 105, 
    SPD: 45,
    skills: [
      { name: "Spark Tail", damage: 46, cost: 1 },
      { name: "Dragon Bolt", damage: 82, cost: 2 },
      { name: "Static Field", damage: 18, cost: 1, effect: "paralyze" },
      { name: "Volt Guard", shield: 45, cost: 1 }
    ]
  },

  {
    sprite: "Audino_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 60,  
    DEF: 126, 
    SPD: 50,
    skills: [
      { name: "Comfort Punch", damage: 40, cost: 1 },
      { name: "Healing Chorus", damage: 0, cost: 2, effect: "mass heal" },
      { name: "Warm Embrace", damage: 0, cost: 1, effect: "defense up" },
      { name: "Guardian Ward", shield: 60, cost: 1 }
    ]
  },

  {
    sprite: "Banette_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 165, 
    DEF: 75,  
    SPD: 75,
    skills: [
      { name: "Hex Snap", damage: 50, cost: 1 },
      { name: "Curse Grasp", damage: 80, cost: 2 },
      { name: "Phantom Spores", damage: 20, cost: 1, effect: "curses / damage over time" },
      { name: "Doll Shroud", shield: 40, cost: 1 }
    ]
  },

  {
    sprite: "Beedrill_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 150, 
    DEF: 40,  
    SPD: 145,
    skills: [
      { name: "Stinger Jab", damage: 48, cost: 1 },
      { name: "Venom Blitz", damage: 70, cost: 2 },
      { name: "Toxic Spray", damage: 16, cost: 1, effect: "poison" },
      { name: "Swarm Cover", shield: 40, cost: 1 }
    ]
  },

  {
    sprite: "Blastoise_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 103, 
    DEF: 120, 
    SPD: 78,
    skills: [
      { name: "Aqua Bash", damage: 50, cost: 1 },
      { name: "Hydro Cannon", damage: 88, cost: 2 },
      { name: "Soaking Mist", damage: 10, cost: 1, effect: "slow" },
      { name: "Shell Fortify", shield: 60, cost: 1 }
    ]
  },

  {
    sprite: "Blaziken_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 160, 
    DEF: 80,  
    SPD: 100,
    skills: [
      { name: "Flare Kick", damage: 55, cost: 1 },
      { name: "Phoenix Rush", damage: 95, cost: 2 },
      { name: "Scorching Feint", damage: 20, cost: 1, effect: "burn" },
      { name: "Battle Focus", shield: 35, cost: 1, effect: "attack up" }
    ]
  },

  {
    sprite: "Camerupt_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 120, 
    DEF: 100, 
    SPD: 20,
    skills: [
      { name: "Magma Slam", damage: 60, cost: 1 },
      { name: "Volcanic Spike", damage: 86, cost: 2 },
      { name: "Eruption Ash", damage: 18, cost: 1, effect: "burn" },
      { name: "Earthen Bulwark", shield: 65, cost: 2 }
    ]
  },

  {
    sprite: "Charizard_MegaY.gif",
    hp: 100,
    maxHP: 100,
    ATK: 104, 
    DEF: 78,  
    SPD: 100,
    skills: [
      { name: "Solar Flare", damage: 60, cost: 1 },
      { name: "Sky Inferno", damage: 100, cost: 2 },
      { name: "Heat Haze", damage: 0, cost: 1, effect: "evasion up" },
      { name: "Flame Guard", shield: 55, cost: 1 }
    ]
  },

  {
    sprite: "Diancie_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 160, 
    DEF: 160, 
    SPD: 110,
    skills: [
      { name: "Crystal Jab", damage: 48, cost: 1 },
      { name: "Prismatic Burst", damage: 90, cost: 2 },
      { name: "Sparkling Lure", damage: 0, cost: 1, effect: "charm / attack down" },
      { name: "Diamond Wall", shield: 70, cost: 2 }
    ]
  },

  {
    sprite: "Gallade_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 165, 
    DEF: 95,  
    SPD: 110,
    skills: [
      { name: "Psych Blade", damage: 54, cost: 1 },
      { name: "Knight Slash", damage: 84, cost: 2 },
      { name: "Mind Rend", damage: 16, cost: 1, effect: "confuse" },
      { name: "Valor Guard", shield: 50, cost: 1 }
    ]
  },

  {
    sprite: "Garchomp_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 170, 
    DEF: 115, 
    SPD: 95,
    skills: [
      { name: "Sand Fang", damage: 56, cost: 1 },
      { name: "Earth Dragon", damage: 92, cost: 2 },
      { name: "Grounded Roar", damage: 20, cost: 1, effect: "reduce speed" },
      { name: "Scale Barrier", shield: 60, cost: 1 }
    ]
  },

  {
    sprite: "Gardevoir_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 85,  
    DEF: 95,  
    SPD: 100,
    skills: [
      { name: "Moon Pulse", damage: 50, cost: 1 },
      { name: "Heartbreak Wave", damage: 86, cost: 2 },
      { name: "Lullaby Veil", damage: 0, cost: 1, effect: "sleep" },
      { name: "Ethereal Guard", shield: 55, cost: 1 }
    ]
  },

  {
    sprite: "Gengar_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 65,  
    DEF: 100, 
    SPD: 130,
    skills: [
      { name: "Shadow Jab", damage: 52, cost: 1 },
      { name: "Nightmare Burst", damage: 92, cost: 2 },
      { name: "Toxic Haunt", damage: 18, cost: 1, effect: "poison" },
      { name: "Wraith Veil", shield: 40, cost: 1 }
    ]
  },

  {
    sprite: "Glalie_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 120, 
    DEF: 80,  
    SPD: 100,
    skills: [
      { name: "Ice Shard", damage: 46, cost: 1 },
      { name: "Frozen Crater", damage: 84, cost: 2 },
      { name: "Hail Mist", damage: 12, cost: 1, effect: "freeze chance" },
      { name: "Frost Armor", shield: 60, cost: 1 }
    ]
  },

  {
    sprite: "Gyarados_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 155, 
    DEF: 109, 
    SPD: 81,
    skills: [
      { name: "Raging Bite", damage: 58, cost: 1 },
      { name: "Tidal Maelstrom", damage: 96, cost: 2 },
      { name: "Fury Roar", damage: 0, cost: 1, effect: "intimidate / attack down" },
      { name: "Dragonhide", shield: 50, cost: 1 }
    ]
  },

  {
    sprite: "Houndoom_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 90,  
    DEF: 90,  
    SPD: 115,
    skills: [
      { name: "Searing Fang", damage: 54, cost: 1 },
      { name: "Hellfire Howl", damage: 88, cost: 2 },
      { name: "Curse Smoke", damage: 15, cost: 1, effect: "burn" },
      { name: "Infernal Coat", shield: 45, cost: 1 }
    ]
  },

  {
    sprite: "Heracross_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 185, 
    DEF: 115, 
    SPD: 75,
    skills: [
      { name: "Horn Tackle", damage: 56, cost: 1 },
      { name: "Giga Crush", damage: 90, cost: 2 },
      { name: "Beetle Charge", damage: 20, cost: 1, effect: "stun" },
      { name: "Juggernaut Guard", shield: 60, cost: 1 }
    ]
  },

  {
    sprite: "Kangaskhan_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 125, 
    DEF: 100, 
    SPD: 100,
    skills: [
      { name: "Parent Pound", damage: 50, cost: 1 },
      { name: "Double Nap", damage: 84, cost: 2 },
      { name: "Protective Hug", damage: 0, cost: 1, effect: "reduce incoming damage" },
      { name: "Mama Shield", shield: 65, cost: 2 }
    ]
  },

  {
    sprite: "Latios_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 130, 
    DEF: 100, 
    SPD: 110,
    skills: [
      { name: "Psy Wing", damage: 54, cost: 1 },
      { name: "Luminous Beam", damage: 92, cost: 2 },
      { name: "Lucid Drift", damage: 0, cost: 1, effect: "speed up" },
      { name: "Aerial Ward", shield: 50, cost: 1 }
    ]
  },

  {
    sprite: "Lopunny_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 136, 
    DEF: 94,  
    SPD: 135,
    skills: [
      { name: "Quick Jab", damage: 48, cost: 1 },
      { name: "Blitz Kick", damage: 80, cost: 2 },
      { name: "Graceful Dodge", damage: 0, cost: 1, effect: "evasion up" },
      { name: "Fury Guard", shield: 40, cost: 1 }
    ]
  },

  {
    sprite: "Lucario_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 145, 
    DEF: 88,  
    SPD: 112,
    skills: [
      { name: "Aura Strike", damage: 56, cost: 1 },
      { name: "Steel Pulse", damage: 86, cost: 2 },
      { name: "Focus Surge", damage: 0, cost: 1, effect: "attack up" },
      { name: "Iron Aegis", shield: 55, cost: 1 }
    ]
  },

  {
    sprite: "Manectric_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 85,  
    DEF: 80,  
    SPD: 135,
    skills: [
      { name: "Spark Fang", damage: 50, cost: 1 },
      { name: "Lightning Storm", damage: 88, cost: 2 },
      { name: "Charge Field", damage: 0, cost: 1, effect: "paralyze chance" },
      { name: "Conductive Shell", shield: 45, cost: 1 }
    ]
  },

  {
    sprite: "Mawile_Mega.gif",
    hp: 100,
    maxHP: 100, 
    ATK: 150, 
    DEF: 125, 
    SPD: 50,
    skills: [
      { name: "Bite Illusion", damage: 46, cost: 1 },
      { name: "Titan Maw", damage: 84, cost: 2 },
      { name: "Confounding Smile", damage: 0, cost: 1, effect: "attack down" },
      { name: "Steel Bloom", shield: 60, cost: 1 }
    ]
  },

  {
    sprite: "Medicham_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 150, 
    DEF: 75,  
    SPD: 100,
    skills: [
      { name: "Meditative Punch", damage: 52, cost: 1 },
      { name: "Mind-Body Smash", damage: 88, cost: 2 },
      { name: "Zen Focus", damage: 0, cost: 1, effect: "crit up" },
      { name: "Spirit Guard", shield: 50, cost: 1 }
    ]
  },

  {
    sprite: "Meganium.gif",
    hp: 100,
    maxHP: 100,
    ATK: 82,  
    DEF: 100, 
    SPD: 80,
    skills: [
      { name: "Leaf Whip", damage: 45, cost: 1 },
      { name: "Solar Beam", damage: 90, cost: 2 },
      { name: "Aromatic Breeze", damage: 0, cost: 1, effect: "heal" },
      { name: "Vine Shield", shield: 55, cost: 1 }
    ]
  },

  {
    sprite: "Metagross_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 170, 
    DEF: 150, 
    SPD: 110,
    skills: [
      { name: "Steel Punch", damage: 58, cost: 1 },
      { name: "Titan Crash", damage: 98, cost: 2 },
      { name: "Magnetize", damage: 12, cost: 1, effect: "reduce enemy accuracy" },
      { name: "Adamant Guard", shield: 70, cost: 2 }
    ]
  },

  {
    sprite: "Mewtwo_MegaX.gif",
    hp: 100,
    maxHP: 100,
    ATK: 190, 
    DEF: 100, 
    SPD: 130,
    skills: [
      { name: "Psy Fist", damage: 60, cost: 1 },
      { name: "Mega Overdrive", damage: 110, cost: 2 },
      { name: "Mind Break", damage: 20, cost: 1, effect: "silence/disable buffs" },
      { name: "Psi Barrier", shield: 60, cost: 1 }
    ]
  },

  {
    sprite: "Pidgeot_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 80,  
    DEF: 80,  
    SPD: 121,
    skills: [
      { name: "Gale Slash", damage: 48, cost: 1 },
      { name: "Hurricane Dive", damage: 82, cost: 2 },
      { name: "Aerial Push", damage: 0, cost: 1, effect: "knockback / slow" },
      { name: "Feather Guard", shield: 45, cost: 1 }
    ]
  },

  {
    sprite: "Pinsir_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 155, 
    DEF: 120, 
    SPD: 105,
    skills: [
      { name: "Spiral Horn", damage: 56, cost: 1 },
      { name: "Sky Chopper", damage: 88, cost: 2 },
      { name: "Winged Roar", damage: 0, cost: 1, effect: "stun" },
      { name: "Chitin Shield", shield: 60, cost: 1 }
    ]
  },

  {
    sprite: "Sceptile_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 110, 
    DEF: 75,  
    SPD: 145,
    skills: [
      { name: "Leaf Slice", damage: 50, cost: 1 },
      { name: "Dragon Thorn", damage: 92, cost: 2 },
      { name: "Root Bind", damage: 12, cost: 1, effect: "entangle / slow" },
      { name: "Camouflage Guard", shield: 45, cost: 1 }
    ]
  },

  {
    sprite: "Sableye_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 85,  
    DEF: 125, 
    SPD: 20,
    skills: [
      { name: "Shadow Claw", damage: 46, cost: 1 },
      { name: "Night Trick", damage: 76, cost: 2 },
      { name: "Mischief Hex", damage: 0, cost: 1, effect: "steal buff" },
      { name: "Eerie Shell", shield: 40, cost: 1 }
    ]
  },

  {
    sprite: "Scizor_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 150, 
    DEF: 140, 
    SPD: 75,
    skills: [
      { name: "Pincer Strike", damage: 54, cost: 1 },
      { name: "Steel Assault", damage: 90, cost: 2 },
      { name: "Precision Cut", damage: 20, cost: 1, effect: "bleed" },
      { name: "Blade Guard", shield: 60, cost: 1 }
    ]
  },

  {
    sprite: "Sharpedo_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 140, 
    DEF: 70,  
    SPD: 105,
    skills: [
      { name: "Razor Surge", damage: 56, cost: 1 },
      { name: "Abyssal Bite", damage: 94, cost: 2 },
      { name: "Blood Frenzy", damage: 15, cost: 1, effect: "lifesteal" },
      { name: "Hydro Skin", shield: 45, cost: 1 }
    ]
  },

  {
    sprite: "Swampert_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 150, 
    DEF: 110, 
    SPD: 70,
    skills: [
      { name: "Mud Slam", damage: 52, cost: 1 },
      { name: "Tsunami Crush", damage: 92, cost: 2 },
      { name: "Quagmire", damage: 18, cost: 1, effect: "slow" },
      { name: "Earth Bulwark", shield: 65, cost: 2 }
    ]
  },

  {
    sprite: "Steelix_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 125, 
    DEF: 230, 
    SPD: 30,
    skills: [
      { name: "Iron Coil", damage: 54, cost: 1 },
      { name: "Seismic Rupture", damage: 94, cost: 2 },
      { name: "Gravel Spit", damage: 12, cost: 1, effect: "defense down" },
      { name: "Titan Wall", shield: 80, cost: 2 }
    ]
  },

  {
    sprite: "Tyranitar_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 165, 
    DEF: 150, 
    SPD: 71,
    skills: [
      { name: "Sand Crush", damage: 58, cost: 1 },
      { name: "Ravager Strike", damage: 98, cost: 2 },
      { name: "Dark Howl", damage: 0, cost: 1, effect: "fear / attack down" },
      { name: "Obsidian Guard", shield: 70, cost: 2 }
    ]
  },

  {
    sprite: "Venusaur_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 100, 
    DEF: 123, 
    SPD: 80,
    skills: [
      { name: "Vine Lash", damage: 50, cost: 1 },
      { name: "Toxic Bloom", damage: 86, cost: 2 },
      { name: "Spore Cloud", damage: 12, cost: 1, effect: "poison" },
      { name: "Thorn Aegis", shield: 60, cost: 1 }
    ]
  },

  {
    sprite: "Rayquaza_Mega.gif",
    hp: 100,
    maxHP: 100,
    ATK: 180, 
    DEF: 100, 
    SPD: 115,
    skills: [
      { name: "Sky Serpent", damage: 64, cost: 1 },
      { name: "Celestial Storm", damage: 110, cost: 2 },
      { name: "Tempest Shred", damage: 20, cost: 1, effect: "reduce accuracy" },
      { name: "Dragon Scales", shield: 75, cost: 2 }
    ]
  }
];






/* lobby.js - match + VS splash + battle integration
   Updated: automatic matchmaking → immediate VS splash → battle
*/

const spriteFiles = [
"Abomasnow_Mega.gif",
"Aerodactyl_Mega.gif",
"Aggron_Mega.gif",
"Alakazam_Mega.gif",
"Altaria_Mega.gif",
"Ampharos_Mega.gif",
"Audino_Mega.gif",
"Banette_Mega.gif",
"Beedrill_Mega.gif",
"Blastoise_Mega.gif",
"Blaziken_Mega.gif",
"Camerupt_Mega.gif",
"Charizard_MegaY.gif",
"Diancie_Mega.gif",
"Gallade_Mega.gif",
"Garchomp_Mega.gif",
"Gardevoir_Mega.gif",
"Gengar_Mega.gif",
"Glalie_Mega.gif",
"Gyarados_Mega.gif",
"Houndoom_Mega.gif",
"Heracross_Mega.gif",
"Kangaskhan_Mega.gif",
"Latios_Mega.gif",
"Lopunny_Mega.gif",
"Lucario_Mega.gif",
"Manectric_Mega.gif",
"Mawile_Mega.gif",
"Medicham_Mega.gif",
"Meganium.gif",
"Metagross_Mega.gif",
"Mewtwo_MegaX.gif",
"Pidgeot_Mega.gif",
"Pinsir_Mega.gif",
"Sceptile_Mega.gif",
"Sableye_Mega.gif",
"Scizor_Mega.gif",
"Sharpedo_Mega.gif",
"Swampert_Mega.gif",
"Steelix_Mega.gif",
"Tyranitar_Mega.gif",
"Venusaur_Mega.gif",
"Rayquaza_Mega.gif"

];

/* ---------- simple audio manager ---------- */
const audioManager = {
    mainVolume: 1.0,
    sfxVolume: 1.0,
    musicVolume: 1.0,
    muted: false,

    updateVolumes() {
        const effectiveMusicVolume = this.muted ? 0 : Number(this.mainVolume) * Number(this.musicVolume);
        const effectiveSfxVolume = this.muted ? 0 : Number(this.mainVolume) * Number(this.sfxVolume);

        const bg = document.getElementById("bgMusic");
        if (bg) bg.volume = effectiveMusicVolume;

        const click = document.getElementById("clickSound");
        if (click) click.volume = effectiveSfxVolume;
    }
};

/* ---------- simple match client abstraction (simulated) ---------- */
const MatchClient = (function(){
    let connected = false;
    let ws = null;

    return {
        connect() {
            connected = true;
            console.info("MatchClient: connected (simulated)");
        },

        disconnect() {
            if (ws) ws.close();
            connected = false;
        },

        isConnected() { return connected; },

        findMatch({onSearching, onFound, onError}) {
            if (!connected) {
                if (onError) onError("Not connected to match server");
                return { cancel: () => {} };
            }

            let cancelled = false;
            onSearching && onSearching();

            let ticks = 0;
            const tickInterval = setInterval(() => {
                ticks++;
                if (cancelled) {
                    clearInterval(tickInterval);
                } else {
                    onSearching && onSearching(`Searching... ${ticks * 1}s`);
                }
            }, 1000);

            const time = 1200 + Math.floor(Math.random() * 2200);
            const timer = setTimeout(() => {
                if (cancelled) return;
                clearInterval(tickInterval);
                const opp = {
                    id: "opp-" + Math.floor(Math.random() * 10000),
                    name: ["Ryu","Mika","Zeru","Kora","Ash","Moe","Lina"][Math.floor(Math.random()*7)],
                    level: 1 + Math.floor(Math.random()*35),
                    sprite: spriteFiles[Math.floor(Math.random()*spriteFiles.length)]
                };
                onFound && onFound(opp);
            }, time);

            return {
                cancel() {
                    cancelled = true;
                    clearTimeout(timer);
                    clearInterval(tickInterval);
                }
            };
        }
    };
})();

function createBattle(playerSpriteFile, opponent) {

    //////////////////////////////////////////////////////////////
    // 3v3 ROUND ROBIN AXIE STYLE BATTLE WITH ENERGY SYSTEM
    //////////////////////////////////////////////////////////////

    const battleOverlay = document.getElementById("battleOverlay");
    battleOverlay.setAttribute("aria-hidden", "false");

    // ====== 3 Pokémon per team ======
    // Pick 3 random Pokémon for player from DB
    const playerTeam = [
        pokemonDB[Math.floor(Math.random() * pokemonDB.length)],
        pokemonDB[Math.floor(Math.random() * pokemonDB.length)],
        pokemonDB[Math.floor(Math.random() * pokemonDB.length)]
    ];

    // Enemy team — also use DB to pick
    const enemyTeam = [
        pokemonDB[Math.floor(Math.random() * pokemonDB.length)],
        pokemonDB[Math.floor(Math.random() * pokemonDB.length)],
        pokemonDB[Math.floor(Math.random() * pokemonDB.length)]
    ];


    let currentPlayer = 0;
    let currentEnemy  = 0;

    // ====== ENERGY SYSTEM ======
    let energy = 3;
    const maxEnergy = 10;

    // ====== UI ELEMENTS (already in your game) ======
    const playerSprite = document.getElementById("playerSprite");
    const oppSprite     = document.getElementById("oppSprite");

    const playerHPBar   = document.getElementById("playerHP");
    const enemyHPBar    = document.getElementById("oppHP");
    const playerHPText  = document.getElementById("playerHPText");
    const enemyHPText   = document.getElementById("oppHPText");

    const skillCards    = document.getElementById("skillCards");
    const skipBtn       = document.getElementById("skipTurnBtn");
    const forfeitBtn    = document.getElementById("forfeitBtn");

    const damageLayer   = document.getElementById("damageLayer");

    const energyDots    = document.getElementById("energyDots");
    const energyCount   = document.getElementById("energyCount");

    //////////////////////////////////////////////////////////////
    // UI UPDATE HELPERS
    //////////////////////////////////////////////////////////////

    function updateSprites() {
        playerSprite.src = `pokeSprites/${playerTeam[currentPlayer].sprite}`;
        oppSprite.src = `pokeSprites/${enemyTeam[currentEnemy].sprite}`;
        updateHP();
    }

    function updateHP() {
        const p = playerTeam[currentPlayer];
        const e = enemyTeam[currentEnemy];

        playerHPBar.style.width = (p.hp / p.maxHP * 100) + "%";
        enemyHPBar.style.width  = (e.hp / e.maxHP * 100) + "%";

        playerHPText.textContent = `${p.hp} / ${p.maxHP}`;
        enemyHPText.textContent  = `${e.hp} / ${e.maxHP}`;
    }

    function updateEnergy() {
        energyDots.innerHTML = "";

        for (let i = 0; i < energy; i++) {
            const dot = document.createElement("div");
            dot.classList.add("energyDot");
            energyDots.appendChild(dot);
        }

        energyCount.textContent = `${energy} / ${maxEnergy}`;

        refreshCardStates();
    }

    function refreshCardStates() {
        [...skillCards.children].forEach(card => {
            const cost = Number(card.dataset.cost);
            if (energy < cost) {
                card.classList.add("disabled");
            } else {
                card.classList.remove("disabled");
            }
        });
    }

    // Floating damage numbers
    function showDamage(target, text) {
        const dm = document.createElement("div");
        dm.classList.add("damageText");
        dm.textContent = text;

        const rect = target.getBoundingClientRect();
        dm.style.left = (rect.left + rect.width / 2) + "px";
        dm.style.top  = (rect.top - 10) + "px";

        damageLayer.appendChild(dm);
        setTimeout(() => dm.remove(), 2000);
    }

    //////////////////////////////////////////////////////////////
    // SKILL / CARDS
    //////////////////////////////////////////////////////////////

    function generateCards() {
        const names = ["Horn Jab", "Leaf Burst", "Wing Smash", "Shell Bash", "Quill Strike"];

        const cards = [];

        for (let i = 0; i < 3; i++) {
            cards.push({
                name: names[Math.floor(Math.random()*names.length)],
                dmg: Math.floor(25 + Math.random()*55),
                cost: Math.floor(1 + Math.random()*3) // 1–3 energy
            });
        }

        return cards;
    }

    function renderCards() {
        skillCards.innerHTML = "";
        const skills = playerTeam[currentPlayer].skills;

        skills.forEach(skill => {
            const card = document.createElement("div");
            card.classList.add("skill-card");
            card.dataset.cost = skill.cost;

            card.innerHTML = `
                <div class="skill-name">${skill.name}</div>
                <div class="skill-cost">⚡ ${skill.cost}${skill.damage ? " • Dmg: " + skill.damage : ""}${skill.shield ? " • Shield: " + skill.shield : ""}</div>
            `;

            card.onclick = () => useSkill(skill);
            skillCards.appendChild(card);
        });

        refreshCardStates();
    }

    function useSkill(skill) {

        // Not enough energy
        if (energy < skill.cost) return;

        const player = playerTeam[currentPlayer];
        const enemy  = enemyTeam[currentEnemy];

        energy -= skill.cost;
        updateEnergy();

        // Skill with damage
        if (skill.damage) {
            enemy.hp = Math.max(0, enemy.hp - skill.damage);
            showDamage(oppSprite, `-${skill.damage}`);
        }

        // Skill with shield
        if (skill.shield) {
            player.shield = (player.shield || 0) + skill.shield;
            showDamage(playerSprite, `+${skill.shield} Shield`);
        }

        updateHP();

        // KO check
        if (enemy.hp <= 0) {
            currentEnemy++;
            if (currentEnemy >= enemyTeam.length) {
                return endBattle("win");
            }
            updateSprites();
        }

        setTimeout(enemyAttack, 1200);
    }



    //////////////////////////////////////////////////////////////
    // PLAYER ATTACK TURN
    //////////////////////////////////////////////////////////////

    function playerAttack(skill) {
        const enemy = enemyTeam[currentEnemy];

        // Not enough energy
        if (energy < skill.cost) return;

        // Spend energy
        energy -= skill.cost;
        updateEnergy();

        let damage = skill.dmg;

        // 10% MISS
        if (Math.random() <= 0.20) {
            showDamage(oppSprite, "MISS");
            return setTimeout(enemyAttack, 3000);
        }

        // 1% CRITICAL — double damage
        if (Math.random() <= 0.015) {
            damage *= 2;
            showDamage(oppSprite, "CRIT!");
        }

        enemy.hp -= damage;
        if (enemy.hp < 0) enemy.hp = 0;

        showDamage(oppSprite, `-${damage}`);
        updateHP();

        // Enemy fainted
        if (enemy.hp <= 0) {
            currentEnemy++;

            // All enemy down → victory
            if (currentEnemy >= enemyTeam.length) {
                return endBattle("win");
            }

            updateSprites();
        }

        setTimeout(enemyAttack, 3000)
    }

    //////////////////////////////////////////////////////////////
    // ENEMY ATTACK
    //////////////////////////////////////////////////////////////

    function enemyAttack() {

        const player = playerTeam[currentPlayer];

        let dmg = Math.floor(25 + Math.random()*60);

        // MISS
        if (Math.random() <= 0.20) {
            showDamage(playerSprite, "MISS");
            return nextTurn();
        }

        // CRITICAL
        if (Math.random() <= 0.015) {
            dmg *= 2;
            showDamage(playerSprite, "CRIT!");
        }

        player.hp -= dmg;
        if (player.hp < 0) player.hp = 0;

        showDamage(playerSprite, `-${dmg}`);
        updateHP();

        // Player fainted
        if (player.hp <= 0) {
            currentPlayer++;

            // All player fainted → defeat
            if (currentPlayer >= playerTeam.length) {
                return endBattle("lose");
            }

            updateSprites();
        }

        nextTurn();
    }

    //////////////////////////////////////////////////////////////
    // TURN TRANSITION
    //////////////////////////////////////////////////////////////

    function nextTurn() {
        // Enemy turn replenishes 1 energy
        energy = Math.min(maxEnergy, energy + 1);
        updateEnergy();
        renderCards();
    }

    //////////////////////////////////////////////////////////////
    // BUTTONS: KEEP YOURS
    //////////////////////////////////////////////////////////////

    skipBtn.onclick = () => {
        // Skip gives +1 energy
        energy = Math.min(maxEnergy, energy + 1);
        updateEnergy();
        enemyAttack();
    };

    forfeitBtn.onclick = () => {
        endBattle("lose");
    };

    //////////////////////////////////////////////////////////////
    // END MATCH
    //////////////////////////////////////////////////////////////

    function endBattle(state) {
        battleOverlay.setAttribute("aria-hidden", "true");

        const winnerOverlay = document.getElementById("winnerOverlay");
        const title = document.getElementById("winnerTitle");
        const sprite = document.getElementById("winnerSprite");

        sprite.style.maxHeight = "300px"; // Winner size D fix

        if (state === "win") {
            title.textContent = "YOU WIN!";
            sprite.src = `pokeSprites/${playerTeam[0].sprite}`;
        } else {
            title.textContent = "YOU LOSE!";
            sprite.src = `pokeSprites/${enemyTeam[0].sprite}`;
        }

        winnerOverlay.setAttribute("aria-hidden", "false");
    }

    //////////////////////////////////////////////////////////////
    // START BATTLE
    //////////////////////////////////////////////////////////////

    updateSprites();
    updateEnergy();
    renderCards();
}


function showWinnerScreen(result, playerSpriteFile, opponent) {
    const overlay = document.getElementById("winnerOverlay");
    const title = document.getElementById("winnerTitle");
    const sprite = document.getElementById("winnerSprite");

    const victorySound = document.getElementById("victorySound");
    const defeatSound = document.getElementById("defeatSound");

    // Stop battle music if any
    const bgMusic = document.getElementById("bgMusic");
    if (bgMusic) bgMusic.pause();

    // WIN or LOSE text + sprite
    if (result === "win") {
        title.textContent = "YOU WIN!";
        sprite.src = `pokeSprites/${playerSpriteFile}`;

        victorySound.currentTime = 0;
        victorySound.volume = 1.0;
        victorySound.play().catch(()=>{});
    } else {
        title.textContent = "YOU LOSE!";
        sprite.src = `pokeSprites/${opponent.sprite}`;

        defeatSound.currentTime = 0;
        defeatSound.volume = 1.0;
        defeatSound.play().catch(()=>{});
    }

    overlay.setAttribute("aria-hidden", "false");

    startFireworks(); // fireworks start
}

// ===== MULTIPLAYER MATCH SERVER INTEGRATION =====
const MATCH_SERVER = (location.hostname === 'localhost')
  ? 'ws://localhost:3000'
  : 'wss://your.match.server:443';

let battleWS = null;

function connectMatchServer() {
  battleWS = new WebSocket(MATCH_SERVER);

  battleWS.onopen = () => {
    console.log("Connected to match server");
  };

  battleWS.onmessage = (ev) => {
    try {
      const data = JSON.parse(ev.data);
      handleServerMessage(data);
    } catch (e) {
      console.error(e);
    }
  };

  battleWS.onclose = () => {
    console.log("Match server disconnected");
  };
}

async function joinMatch() {
  if (!battleWS || battleWS.readyState !== WebSocket.OPEN) {
    connectMatchServer();
  }

  const wallet = Web3Client.getWalletAddress ? Web3Client.getWalletAddress() : null;
  const equipped = JSON.parse(localStorage.getItem("equippedPokemon") || "[]");

  let meta = { power: 50, equipped };

  // If equipped contains tokenIds, try to load metadata
  if (equipped.length > 0 && /^\d+$/.test(String(equipped[0]))) {
    const metas = [];

    for (let t of equipped) {
      try {
        const tokenURI = await Web3Client.getTokenURI(Number(t));
        const md = await Web3Client.fetchMetadata(tokenURI);
        metas.push(md);
      } catch (e) {
        metas.push(null);
      }
    }

    meta = {
      power: metas.reduce((s,m)=> s + ((m && m.power) ? Number(m.power) : 20), 0),
      equipped: metas
    };
  }

  const payload = {
    type: 'join',
    wallet,
    meta
  };

  battleWS.send(JSON.stringify(payload));
  setLobbyStatus("🔎 Searching for opponent...");
}

function handleServerMessage(data) {
  if (!data || !data.type) return;

  if (data.type === 'match_found') {
    setLobbyStatus("⚔ Match found — Preparing battle...");

    // After server match is found, start battle here:
    const playerSprite = spriteFiles[0]; // Replace if dynamic
    createBattle(playerSprite, data.opponent);

  } else if (data.type === 'match_result') {
    const youWin = data.yourSide === data.winner;
    setLobbyStatus( youWin ? "🏆 You won!" : "💀 You lost" );
  }
}

function setLobbyStatus(msg) {
  const el = document.getElementById('status');
  if (el) {
    el.innerText = msg;
    el.style.display = 'block';
    el.style.opacity = '1';
  }
}

  let currentPokemonIndex = 0;

  function showPokemon(i) {
      const file = spriteFiles[i];
      const p = pokemonData[file];
      
  }

    document.getElementById("prevPokemon").addEventListener("click", () => {
        currentPokemonIndex = (currentPokemonIndex - 1 + spriteFiles.length) % spriteFiles.length;
        showPokemon(currentPokemonIndex);
    });

    document.getElementById("nextPokemon").addEventListener("click", () => {
        currentPokemonIndex = (currentPokemonIndex + 1) % spriteFiles.length;
        showPokemon(currentPokemonIndex);
    });


// Expose as global if needed
window.BattleClient = { connectMatchServer, joinMatch };




/* ---------- UI logic + wiring ---------- */
document.addEventListener("DOMContentLoaded", () => {
    const clickSound = document.getElementById("clickSound");
    const buttons = document.querySelector(".buttons");
    const status = document.getElementById("status");
    const settingsSection = document.getElementById("settingsSection");
    const backToLobby = document.getElementById("backToLobby");

    const findMatchBtn = document.getElementById("find-match");
    const pokeSprites = document.getElementById("poke-sprites");
    const achievements = document.getElementById("achievements");
    const settingsBtn = document.getElementById("settings");

    const audioPanel = document.getElementById("audioSettingsPanel");
    const backToSettings = document.getElementById("backToSettings");
    const audioSettingsBtn = document.getElementById("audioSettings");

    const mainVolume = document.getElementById("mainVolume");
    const sfxVolume = document.getElementById("sfxVolume");
    const musicVolume = document.getElementById("musicVolume");

    const pokeSpritesPanel = document.getElementById("pokeSpritesPanel");
    const spritesContainer = document.getElementById("spritesContainer");

    const matchOverlay = document.getElementById("matchOverlay");
    const searchingView = document.getElementById("searchingView");
    const foundView = document.getElementById("foundView");
    const cancelSearchBtn = document.getElementById("cancelSearch");
    const oppAvatar = document.getElementById("oppAvatar");
    const oppName = document.getElementById("oppName");
    const oppInfo = document.getElementById("oppInfo");

    const vsOverlay = document.getElementById("vsOverlay");
    const vsFlash = document.getElementById("vsFlash");
    const vsSparks = document.getElementById("vsSparks");
    const vsImpact = document.getElementById("vsImpact");
    const vsSound = document.getElementById("vsSound");
    const vsPlayerSprite = document.getElementById("vsPlayerSprite");
    const vsOppSprite = document.getElementById("vsOppSprite");
    const vsPlayerName = document.getElementById("vsPlayerName");
    const vsOppName = document.getElementById("vsOppName");

    const winnerOverlay = document.getElementById("winnerOverlay");
    const winnerLobbyBtn = document.getElementById("winnerLobbyBtn");
    const winnerRematchBtn = document.getElementById("winnerRematchBtn");

    winnerLobbyBtn.addEventListener("click", () => {
        winnerOverlay.setAttribute("aria-hidden", "true");
        // Close battle and go lobby
        const battleOverlay = document.getElementById("battleOverlay");
        battleOverlay.setAttribute("aria-hidden", "true");
        showLobby();
    });

    winnerRematchBtn.addEventListener("click", () => {
        winnerOverlay.setAttribute("aria-hidden", "true");
        // start a fresh battle with same settings
        document.getElementById("battleOverlay").setAttribute("aria-hidden", "false");


       const playerSprite = document.getElementById("playerSprite").src.split("/").pop();
        createBattle(playerSprite, lastOpponentUsed);
    });


    mainVolume.value = audioManager.mainVolume;
    sfxVolume.value = audioManager.sfxVolume;
    musicVolume.value = audioManager.musicVolume;
    audioManager.updateVolumes();

    function hideLobby() {
        buttons.style.opacity = "0";
        setTimeout(() => buttons.style.display = "none", 300);
        backToLobby.style.display = "block";
    }

    function showLobby() {
        settingsSection.style.display = "none";
        audioPanel.style.display = "none";
        pokeSpritesPanel.style.display = "none";
        document.querySelector(".top-bar").style.display = "flex";


        buttons.style.display = "flex";
        buttons.style.opacity = "1";
        backToLobby.style.display = "none";
    }   

    function showStatus(msg) {
        hideLobby();
        if (clickSound) clickSound.play();

        status.innerText = msg;
        status.style.display = "block";
        setTimeout(() => status.style.opacity = "1", 50);
    }

    backToLobby.addEventListener("click", () => {
        if (clickSound) clickSound.play();
        showLobby();
    });

    settingsBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (clickSound) clickSound.play();
        hideLobby();
        setTimeout(() => {
            settingsSection.style.display = "block";
        }, 300);
    });

    pokeSprites.addEventListener("click", (e) => {
        document.querySelector(".top-bar").style.display = "none";
        currentPokemonIndex = 0;
        showPokemon(0);

        e.preventDefault();
        if (clickSound) clickSound.play();
        hideLobby();
        pokeSpritesPanel.style.display = "block";
        backToLobby.style.display = "block";
        loadAllSprites();
    });

    achievements.addEventListener("click", (e) => {
        e.preventDefault();
        showStatus("🏆 Opening Collections...");
    });

    document.getElementById("fullscreenToggle").addEventListener("click", () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(()=>{});
    } else {
        document.exitFullscreen().catch(()=>{});
    }
});

    audioSettingsBtn.addEventListener("click", () => {
        if (clickSound) clickSound.play();
        settingsSection.style.display = "none";
        audioPanel.style.display = "block";
        backToSettings.style.display = "block";
        backToLobby.style.display = "none";
    });

    backToSettings.addEventListener("click", () => {
        if (clickSound) clickSound.play();
        audioPanel.style.display = "none";
        settingsSection.style.display = "block";
        backToSettings.style.display = "none";
        backToLobby.style.display = "block";
    });

    mainVolume.addEventListener("input", (e) => {
        audioManager.mainVolume = e.target.value;
        audioManager.updateVolumes();
    });

    sfxVolume.addEventListener("input", (e) => {
        audioManager.sfxVolume = e.target.value;
        audioManager.updateVolumes();
    });

    musicVolume.addEventListener("input", (e) => {
        audioManager.musicVolume = e.target.value;
        audioManager.updateVolumes();
    });

    function loadAllSprites() {
        if (spritesContainer.children.length) return;
        spriteFiles.forEach(file => {
            const box = document.createElement("div");
            box.classList.add("sprite-box");

            const img = document.createElement("img");
            img.src = `pokeSprites/${file}`;
            img.alt = file;
            box.appendChild(img);

            spritesContainer.appendChild(box);
        });
    }

    /* ---------- Matchmaking flow ---------- */
    MatchClient.connect();

    let currentSearch = null;
    let currentOpponent = null;

    function openMatchOverlay() {
        matchOverlay.setAttribute('aria-hidden','false');
    }
    function closeMatchOverlay() {
        matchOverlay.setAttribute('aria-hidden','true');
        searchingView.style.display = '';
        foundView.style.display = 'none';
    }

    findMatchBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        if (clickSound) clickSound.play();

        hideLobby();
        openMatchOverlay();
        searchingView.style.display = 'block';
        foundView.style.display = 'none';

        currentSearch = MatchClient.findMatch({
            onSearching: (msg) => {
                searchingView.querySelector('h3').innerText = typeof msg === 'string' ? msg : 'Searching for match...';
            },
            onFound: (opp) => {
                currentOpponent = opp;
                lastOpponentUsed = opp;

                closeMatchOverlay();
                startVsSplash();
            },
            onError: (err) => {
                showStatus("Match error: " + err);
                closeMatchOverlay();
            }
        });
    });

    cancelSearchBtn.addEventListener('click', (e) => {
        if (clickSound) clickSound.play();
        if (currentSearch && currentSearch.cancel) currentSearch.cancel();
        currentSearch = null;
        closeMatchOverlay();
        showLobby();
    });

    /* ESC handling: cancel searching or ignore if in battle */
    document.addEventListener('keydown', (ev) => {
        if (ev.key === 'Escape') {
            if (matchOverlay.getAttribute('aria-hidden') === 'false') {
                if (currentSearch && currentSearch.cancel) currentSearch.cancel();
                currentSearch = null;
                closeMatchOverlay();
                showLobby();
            }
        }
    });

    /* Preload sprites */
    (function preloadSprites() {
        spriteFiles.forEach(f => {
            const img = new Image();
            img.src = `pokeSprites/${f}`;
        });
    })();

    /* ---------- VS splash controller ---------- */
    function startVsSplash() {
        if (!currentOpponent) {
            console.warn("startVsSplash called without opponent");
            showLobby();
            return;
        }

        // set sprites and names
        vsPlayerSprite.src = `pokeSprites/${spriteFiles[0]}`; // player choice; change as needed
        vsOppSprite.src = `pokeSprites/${currentOpponent.sprite}`;
        vsPlayerName.textContent = "";
        vsOppName.textContent = currentOpponent.name;

        // open VS overlay
        vsOverlay.setAttribute("aria-hidden", "false");

        // visual effects
        vsFlash.style.animation = "flashEffect .9s ease-out";
        vsSparks.style.opacity = "1";
        vsSparks.style.animation = "sparksFlash .7s ease-out";
        vsImpact.style.opacity = "1";
        vsImpact.style.animation = "impactPunch .45s ease-out";

        // sound
        if (vsSound) { vsSound.volume = 1.0; vsSound.play().catch(()=>{}); }
        if (clickSound) clickSound.play();

        // clear temporary effects
        setTimeout(() => {
            vsFlash.style.animation = "";
            vsSparks.style.opacity = "0";
            vsImpact.style.opacity = "0";
        }, 3000);

        // after the animation, close VS and open battle
        setTimeout(() => {
            vsOverlay.setAttribute("aria-hidden", "true");
            // start battle
            const playerSprite = spriteFiles[0];
            createBattle(playerSprite, currentOpponent);
            currentOpponent = null;
        }, 3000);
    }

    document.getElementById("viewDetailsBtn").addEventListener("click", () => {
        const file = spriteFiles[currentPokemonIndex];
        const p = pokemonData[file];

        document.getElementById("skillsList").innerHTML =
            p.skills.map(s => `<div>${s}</div>`).join("");

        document.getElementById("skillsPanel").style.display = "block";
    });

    document.getElementById("closeSkills").addEventListener("click", () => {
        document.getElementById("skillsPanel").style.display = "none";
    });


    let selectedTeam = []; // max 3
    let currentSelectedSprite = null;

    document.getElementById("equipBtn").addEventListener("click", () => {

        if (!currentSelectedSprite) return;

        // Prevent duplicates
        if (selectedTeam.includes(currentSelectedSprite)) {
            alert("This sprite is already equipped!");
            return;
        }

        // Limit to 3
        if (selectedTeam.length >= 3) {
            alert("Maximum of 3 sprites can be equipped.");
            return;
        }

        selectedTeam.push(currentSelectedSprite);
        updateTeamDisplay();
    });

    function updateTeamDisplay() {
        const slotArea = document.getElementById("teamSlots");
        slotArea.innerHTML = "";

        selectedTeam.forEach(sprite => {
            let img = document.createElement("img");
            img.src = "pokeSprites/" + sprite;
            slotArea.appendChild(img);
        });
    }

    document.getElementById("poke-sprites").addEventListener("click", () => {
        document.getElementById("pokeSpritesPanel").style.display = "block";
        loadSpriteList();
    });

    function loadSpriteList() {
        const sliderSprite = document.getElementById("sliderSprite");

        const spriteKeys = Object.keys(pokemonData); // your existing data source

        if (spriteKeys.length === 0) {
            console.error("No sprites found in pokemonData");
            return;
        }

        // Always start at first sprite
        currentIndex = 0;
        showSprite(spriteKeys[currentIndex]);
    }

    function showSprite(spriteName) {
        const data = pokemonData[spriteName];

        if (!data) {
            console.error("Sprite not found:", spriteName);
            return;
        }

        // Store current selected
        currentSelectedSprite = spriteName;

        // Update slider
        document.getElementById("sliderSprite").src = "pokeSprites/" + spriteName;

        // Update text
        document.getElementById("infoName").textContent = data.name;
        document.getElementById("infoType").textContent = data.type;
        document.getElementById("infoHP").textContent = "HP: " + data.hp;
        document.getElementById("infoAtk").textContent = "ATK: " + data.atk;
        document.getElementById("infoDef").textContent = "DEF: " + data.def;

        
    }

    let currentIndex = 0;

    document.getElementById("prevPokemon").addEventListener("click", () => {
        const keys = Object.keys(pokemonData);
        currentIndex = (currentIndex - 1 + keys.length) % keys.length;
        showSprite(keys[currentIndex]);
    });

    document.getElementById("nextPokemon").addEventListener("click", () => {
        const keys = Object.keys(pokemonData);
        currentIndex = (currentIndex + 1) % keys.length;
        showSprite(keys[currentIndex]);
    });


});
