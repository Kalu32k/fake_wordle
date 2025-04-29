import fs from "fs/promises";

export let chosenWord = null;

export async function generateRandomWord(length , allowRepeatingLetters) {
  console.log("Generating random word of length:", length);
  const data = await fs.readFile("backend/words_alpha.txt", "utf-8");

  try {
    // Filter words on length
    let words = data
      .split("\n")
      .map((word) => word.trim())
      .filter((word) => word.length === length);

      // Error if no matching words are found
    if (words.length === 0) {
      throw new Error("No valid words found in the file.");
    }

    if (!allowRepeatingLetters) {
      words = words.filter((word) => {
        const letterSet = new Set(word); 
        return letterSet.size === word.length;
      });
    }

    // Select a random word
    const randomIndex = Math.floor(Math.random() * words.length);
    console.log("Random word:", words[randomIndex].toUpperCase());
    chosenWord = words[randomIndex].toUpperCase();

    // If no words are found at all
    if (chosenWord.length === 0) {
      throw new Error("No letters found in the word.");
    }
    return chosenWord;
  } catch (error) {
    console.log("An error has occured:", error);
    throw error;
  }
}
