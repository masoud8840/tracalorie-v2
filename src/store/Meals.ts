import { defineStore } from "pinia";
import type { Meal } from "../types";
import useCaloriesStore from "./Calories";

interface IStateShape {
  meals: Meal[];
}
const useMealsStore = defineStore("MealsStore", {
  state: (): IStateShape => ({
    meals: [],
  }),
  getters: {
    getMeals(): Meal[] {
      return this.meals;
    },
  },
  actions: {
    addMeal(payload: Meal) {
      const caloriesStore = useCaloriesStore();
      this.meals.unshift(payload);
      caloriesStore.calculateCalories();
    },
  },
});

export default useMealsStore;
