import fs from "fs/promises";

export let chosenWord = null;

export async function generateRandomWord(length , allowRepeatingLetters) {
  console.log("Generating random word of length:", length);
  const data = await fs.readFile("backend/words_alpha.txt", "utf-8");

  try {
    // Read the file asynchronously with "utf-8" encoding

    // Split the file line by line, trim extra spaces, and filter by word length
    let words = data
      .split("\n")
      .map((word) => word.trim())
      .filter((word) => word.length === length);

    if (words.length === 0) {
      throw new Error("Inga giltiga ord hittades i filen.");
    }

    if (!allowRepeatingLetters) {
      // Filtrera bort ord med upprepade bokstäver
      words = words.filter((word) => {
        const letterSet = new Set(word); // Skapa en Set av bokstäver
        return letterSet.size === word.length; // Kontrollera att inga bokstäver upprepas
      });
    }

    // Select a random word
    const randomIndex = Math.floor(Math.random() * words.length);
    console.log("Slumpat ord:", words[randomIndex].toUpperCase());
    chosenWord = words[randomIndex].toUpperCase(); // Return the word in uppercase

    return chosenWord;
  } catch (error) {
    console.error("Kunde inte läsa eller bearbeta words.txt:", error);
    throw error;
  }
}
