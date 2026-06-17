export type Ghost = {
  name: string;
  type: string;
  location: string;
  rating: number; // out of 5
  threat: "LOW" | "MODERATE" | "HIGH" | "EXTREME";
  backstory: string;
  silhouette?: "male" | "female" | "child" | "soldier" | "shadow" | "doctor" | "nun" | "bride";
  noImage?: boolean;
};

export const ghosts: Ghost[] = [
  {
    name: "Mr. Deep Sir",
    type: "Professor Spirit",
    location: "ITC MOGRI",
    rating: 5,
    threat: "EXTREME",
    backstory:
      "A mysterious professor spirit frequently spotted around classrooms. Paranormal activity spikes whenever assignments are due.",
    noImage: true,
  },
  {
    name: "Mrs. Unknown Lady",
    type: "Unknown Apparition",
    location: "ITC MOGRI",
    rating: 4.5,
    threat: "HIGH",
    backstory:
      "An unidentified female spirit seen wandering hallways and empty rooms. Witnesses report whispers and unexplained footsteps.",
    silhouette: "female",
    noImage: true,
  },
  {
    name: "Shadow Walker",
    type: "Umbral Entity",
    location: "Blackwood Forest",
    rating: 4,
    threat: "HIGH",
    backstory:
      "A tall silhouette that drifts between trees at dusk. It mimics the gait of whoever watches it, then vanishes when approached.",
    silhouette: "shadow",
  },
  {
    name: "Phantom Doctor",
    type: "Residual Haunting",
    location: "Abandoned Hospital",
    rating: 4,
    threat: "HIGH",
    backstory:
      "Replays his final surgery in ward 13. The smell of antiseptic and the click of metal trays precede every appearance.",
    silhouette: "doctor",
  },
  {
    name: "The Watcher",
    type: "Sentient Entity",
    location: "Raven Manor",
    rating: 5,
    threat: "EXTREME",
    backstory:
      "Never moves. Never blinks. Always staring from the upstairs window. Photographs taken of him develop completely black.",
    silhouette: "male",
  },
  {
    name: "Bloody Bride",
    type: "Vengeful Spirit",
    location: "Forgotten Church",
    rating: 4.5,
    threat: "EXTREME",
    backstory:
      "Murdered on her wedding day. Walks the aisle every midnight, leaving wet footprints of crimson behind her.",
    silhouette: "bride",
  },
  {
    name: "Cemetery Child",
    type: "Innocent Wraith",
    location: "Silent Cemetery",
    rating: 3.5,
    threat: "MODERATE",
    backstory:
      "Lures visitors with the sound of a music box, then asks them to help find her mother. Those who follow are never seen leaving.",
    silhouette: "child",
  },
  {
    name: "Headless Soldier",
    type: "War Phantom",
    location: "Blackwood Forest",
    rating: 4,
    threat: "HIGH",
    backstory:
      "Patrols the old battlefield trench every full moon, still searching for the bayonet that ended his last campaign.",
    silhouette: "soldier",
  },
  {
    name: "Crying Nun",
    type: "Cursed Apparition",
    location: "Forgotten Church",
    rating: 4,
    threat: "HIGH",
    backstory:
      "Kneels before the broken altar weeping black tears. Approach within three meters and the candles ignite themselves.",
    silhouette: "nun",
  },
  {
    name: "Forest Wraith",
    type: "Nature Entity",
    location: "Blackwood Forest",
    rating: 3.5,
    threat: "MODERATE",
    backstory:
      "Composed of mist and dead leaves. Whispers your name in the voice of someone you've lost.",
    silhouette: "shadow",
  },
  {
    name: "Black Widow Spirit",
    type: "Malevolent Specter",
    location: "Raven Manor",
    rating: 5,
    threat: "EXTREME",
    backstory:
      "Killed seven husbands in life. Continues her hunt in death — male investigators report unbearable chest pressure in her presence.",
    silhouette: "bride",
  },
  {
    name: "Railway Phantom",
    type: "Repeater Spirit",
    location: "Lost Railway Station",
    rating: 4.5,
    threat: "EXTREME",
    backstory:
      "Boards the 03:17 ghost train every night. Passengers who notice him never reach their destination.",
    silhouette: "male",
  },
];

export const locations = [
  { name: "ITC MOGRI", x: 78, y: 42, threat: 5, ghosts: 2, report: "Active sightings in academic blocks. Cold spots reported in seminar halls." },
  { name: "Blackwood Forest", x: 22, y: 30, threat: 4, ghosts: 3, report: "Dense paranormal fog. EMF readings off the scale at midnight." },
  { name: "Raven Manor", x: 60, y: 22, threat: 5, ghosts: 2, report: "Multiple class-S entities. Containment teams required for entry." },
  { name: "Abandoned Hospital", x: 40, y: 60, threat: 4, ghosts: 1, report: "Residual hauntings on every floor. Ward 13 sealed indefinitely." },
  { name: "Silent Cemetery", x: 30, y: 80, threat: 3, ghosts: 1, report: "Low-level activity. Recommended for trainee operatives." },
  { name: "Forgotten Church", x: 50, y: 50, threat: 4, ghosts: 2, report: "Cursed altar. Spirits manifest during religious hours." },
  { name: "Lost Railway Station", x: 88, y: 70, threat: 5, ghosts: 1, report: "Phantom train phenomena. Audio anomalies at 03:17 daily." },
  { name: "Shadow Lake", x: 12, y: 65, threat: 3, ghosts: 1, report: "Drowned spirits surface during new moon. Reflection anomalies." },
];

export const team = [
  { name: "Vihaan Patel", age: 24, role: "EMF Specialist", ability: "Reads spectral frequencies up to 9.6 THz", equipment: "Quantum EMF Reader v7", exp: 92, gender: "male" as const },
  { name: "Vrund Mehta", age: 23, role: "Paranormal Combat Expert", ability: "Banishment strikes & salt-iron katana", equipment: "Plasma Banisher Mk-II", exp: 88, gender: "male" as const },
  { name: "Arjun Rathod", age: 22, role: "Ghost Tracking Engineer", ability: "Maps spectral routes in real-time", equipment: "Holographic Scanner Drone", exp: 81, gender: "male" as const },
  { name: "Archi Patel", age: 24, role: "Psychic Communicator", ability: "Two-way contact with class-A entities", equipment: "Resonant Talisman Array", exp: 95, gender: "female" as const },
  { name: "Ananya Desai", age: 21, role: "Curse Analyst", ability: "Decodes hex glyphs & dispels bindings", equipment: "Spectral Codex / UV Lens", exp: 79, gender: "female" as const },
];

export const captured = [
  { name: "White Hall Phantom", date: "2098-11-14", threat: "HIGH", status: "STABLE", method: "Iron Salt Trap" },
  { name: "Railway Phantom", date: "2099-01-03", threat: "EXTREME", status: "VOLATILE", method: "Resonance Lockdown" },
  { name: "Red Eyed Watcher", date: "2098-12-21", threat: "EXTREME", status: "CONTAINED", method: "Mirror Inversion" },
  { name: "Cemetery Screamer", date: "2099-02-09", threat: "HIGH", status: "STABLE", method: "Banishment Sigil" },
  { name: "Hospital Shadow", date: "2098-10-30", threat: "MODERATE", status: "STABLE", method: "UV Containment" },
  { name: "Whispering Child", date: "2099-03-17", threat: "MODERATE", status: "STABLE", method: "Music Box Bind" },
  { name: "Black Widow Spirit", date: "2099-04-02", threat: "EXTREME", status: "CRITICAL", method: "Quantum Cage" },
  { name: "Forest Wraith", date: "2099-04-25", threat: "HIGH", status: "STABLE", method: "Salt Circle Lv9" },
];

export const reports = [
  { id: "087", location: "ITC MOGRI", status: "Active", threat: "EXTREME" },
  { id: "086", location: "Raven Manor", status: "Active", threat: "EXTREME" },
  { id: "085", location: "Abandoned Hospital", status: "Pending", threat: "HIGH" },
  { id: "084", location: "Forgotten Church", status: "Active", threat: "HIGH" },
  { id: "083", location: "Blackwood Forest", status: "Closed", threat: "MODERATE" },
];
