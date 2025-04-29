import { generateRandomWord } from "../logic/generateWord";
import fs from "fs/promises";
import { jest } from "@jest/globals";

describe("generateRandomWord", () => {


const apple = "apple";
const banana = "banana";
const cherry = "cherrys";

it("should generate a random word of 5 length", async () => {
    const length = 5;
    const allowRepeatingLetters = true;
    fs.readFile = jest.fn().mockResolvedValue(`${apple}\n${banana}\n${cherry}`);
    const word = await generateRandomWord(length, allowRepeatingLetters);
    expect(word).toBe("APPLE");
})

it("should generate a random word of 6 length", async () => {
  const length = 6;
  const allowRepeatingLetters = true;
  fs.readFile = jest.fn().mockResolvedValue(`${apple}\n${banana}\n${cherry}`);
  const word = await generateRandomWord(length, allowRepeatingLetters);
  expect(word).toBe("BANANA");
})

it("should generate a random word of 7 length", async () => {
  const length = 7;
  const allowRepeatingLetters = true;
  fs.readFile = jest.fn().mockResolvedValue(`${apple}\n${banana}\n${cherry}`);
  const word = await generateRandomWord(length, allowRepeatingLetters);
  expect(word).toBe("CHERRYS");
})

it("should throw an error if no words are input", async () => {
  const length = 5;
  const allowRepeatingLetters = true;
  fs.readFile = jest.fn().mockResolvedValue("");
  console.log("This is supposed to fail.");
  await expect(generateRandomWord(length, allowRepeatingLetters)).rejects.toThrow("No valid words found in the file.");
});





});