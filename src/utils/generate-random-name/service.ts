import fruits from './fruits.json';
import animals from './animals.json';

export function generateRandomName(): string {
  // Get a random element from an array
  const getRandomElement = (elements: string[]): string => {
    return elements[Math.floor(Math.random() * elements.length)];
  };

  // Combine a random fruit and a random animal
  const randomName: string = `${getRandomElement(fruits)}${getRandomElement(
    animals
  )}`;
  return randomName;
}
