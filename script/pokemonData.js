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
      { name: "Icy Vine", damage: 45, cost: 1 },
      { name: "Avalanche Toss", damage: 75, cost: 2 },
      { name: "Frostbite Spore", damage: 15, cost: 1, effect: "freeze" },
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
      { name: "Stone Peck", damage: 50, cost: 1 },
      { name: "Sky Crush", damage: 78, cost: 2 },
      { name: "Wing Gust", damage: 20, cost: 1, effect: "stun" },
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