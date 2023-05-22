export interface DataType {
  word: string,
  synonyms: string[],
  meaning: string
}

export const dictionaryData: DataType[] = [
  {
    word: "abate",
    synonyms: ["decrease", "diminish", "lessen"],
    meaning: "to become smaller or less intense"
  },
  {
    word: "accordion",
    synonyms: ["accumulate", "build up", "amass"],
    meaning: "to increase over time"
  },
  {
    word: "accrue",
    synonyms: ["accumulate", "build up", "amass"],
    meaning: "to increase over time"
  },
  {
    word: "bellicose",
    synonyms: ["aggressive", "hostile", "combative"],
    meaning: "demonstrating a willingness to fight"
  },
  {
    word: "capricious",
    synonyms: ["unpredictable", "fickle", "volatile"],
    meaning: "given to sudden changes in mood or behavior"
  },
  {
    word: "deleterious",
    synonyms: ["harmful", "damaging", "detrimental"],
    meaning: "causing harm or damage"
  },
  {
    word: "ebullient",
    synonyms: ["enthusiastic", "exuberant", "energetic"],
    meaning: "cheerful and full of energy"
  },
  {
    word: "facetious",
    synonyms: ["flippant", "frivolous", "joking"],
    meaning: "treating serious issues with inappropriate humor"
  },
  {
    word: "gregarious",
    synonyms: ["sociable", "outgoing", "friendly"],
    meaning: "fond of company; sociable"
  }
];
