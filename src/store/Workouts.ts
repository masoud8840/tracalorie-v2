import { defineStore } from "pinia";
import { Workout } from "../types";
import useCaloriesStore from "./Calories";

interface IStateShape {
  workouts: Workout[];
}

const useWorkoutsStore = defineStore("WorkoutsStore", {
  state: (): IStateShape => ({
    workouts: [],
  }),

  getters: {
    getWorkouts(): Workout[] {
      return this.workouts;
    },
  },

  actions: {
    addWorkout(payload: Workout) {
      this.workouts.push(payload);

      const caloriesStore = useCaloriesStore();
      caloriesStore.calculateCalories();
    },
  },
});

export default useWorkoutsStore;
