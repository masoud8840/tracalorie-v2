interface Meal {
  title: string;
  calorie: number | null;
}

interface Workout {
  title: string;
  calorie: number | null;
}

interface Calories {
  "Total Calories": number;
  "Gain/Loss": number;
  "Calories Consumed": number;
  "Calories Burned": number;
  "Calories Remaining": number;
}

export type { Meal, Calories, Workout };
