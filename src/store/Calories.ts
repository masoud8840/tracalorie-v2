import { defineStore } from "pinia";
import { Calories } from "../types";
import useMealsStore from "./Meals";
import useWorkoutsStore from "./Workouts";

interface IStateShape {
  calories: Calories;
}
const useCaloriesStore = defineStore("CaloriesStore", {
  state: (): IStateShape => ({
    calories: {
      "Total Calories": 0,
      "Gain/Loss": 0,
      "Calories Consumed": 0,
      "Calories Burned": 0,
      "Calories Remaining": 0,
    },
  }),

  getters: {
    getCalories(): Calories {
      return this.calories;
    },
  },

  actions: {
    calculateCalories(): void {
      this._resetCalories();
      this._calculateMealsCalories();
      this._calculateWorkoutsCalories();
    },

    _calculateMealsCalories(): void {
      const mealsStore = useMealsStore();
      const meals = mealsStore.getMeals;

      meals.map((meal) => {
        this.calories["Calories Consumed"] += meal.calorie;
        this.calories["Gain/Loss"] += meal.calorie;
        this.calories["Calories Remaining"] -= meal.calorie;
      });
    },
    _calculateWorkoutsCalories(): void {
      const workoutsStore = useWorkoutsStore();
      const workouts = workoutsStore.getWorkouts;

      workouts.map((workout) => {
        this.calories["Calories Burned"] += workout.calorie;
        this.calories["Gain/Loss"] -= workout.calorie;
        // this.calories["Calories Remaining"] -= workout.calorie;
      });
    },
    _resetCalories(): void {
      this.calories["Calories Remaining"] = this.calories["Total Calories"];
      this.calories["Calories Burned"] = 0;
      this.calories["Calories Consumed"] = 0;
      this.calories["Gain/Loss"] = 0;
    },
  },
});

export default useCaloriesStore;
