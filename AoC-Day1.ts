import * as fs from 'fs';

async function maxCalories() {
  const input = fs.readFileSync('input.txt', 'utf8');
  const elfsByCalories = input.split('\n\n');
  let maxCalories = 0;
  let elfWithMaxCalories = -1;
  elfsByCalories.forEach((foodWithEachElf: string, index: number) => {
    const calorieList = foodWithEachElf
      .split('\n')
      .map((calorie: string) => Number(calorie));
    const totalCalories = calorieList.reduce(
      (total: number, currentCalorie: number) => currentCalorie + total,
      0
    );
    if (totalCalories > maxCalories) {
      maxCalories = totalCalories;
      elfWithMaxCalories = index;
    }
  });
  console.log({maxCalories, elfWithMaxCalories});
}

async function topThreeMaxCalories() {
  const input = fs.readFileSync('input.txt', 'utf8');
  const elfsByCalories = input.split('\n\n');
  let maxCalories1 = 0;
  let maxCalories2 = 0;
  let maxCalories3 = 0;
  elfsByCalories.forEach((foodWithEachElf: string) => {
    const calorieList = foodWithEachElf
      .split('\n')
      .map((calorie: string) => Number(calorie));
    const totalCalories = calorieList.reduce(
      (total: number, currentCalorie: number) => currentCalorie + total,
      0
    );
    if (totalCalories > maxCalories1) {
      maxCalories3 = maxCalories2;
      maxCalories2 = maxCalories1;
      maxCalories1 = totalCalories;
    } else if (totalCalories > maxCalories2) {
      maxCalories3 = maxCalories2;
      maxCalories2 = totalCalories;
    } else if (totalCalories > maxCalories3) {
      maxCalories3 = totalCalories;
    }
  });
  console.log(
    {maxCalories1, maxCalories2, maxCalories3},
    maxCalories1 + maxCalories2 + maxCalories3
  );
}

maxCalories();
topThreeMaxCalories();
