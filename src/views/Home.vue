<template>
  <main class="home-view container">
    <ul class="calorie_card-list">
      <li
        v-for="(card, index) in Object.entries(caloriesStore.getCalories)"
        :key="index"
      >
        <CalorieCard
          :card-title="card[0]"
          :card-subtitle="card[1]"
          :card-theme="
            index === 0
              ? 'dark'
              : index === 1
              ? 'green'
              : index > 1
              ? 'white'
              : ''
          "
        />
      </li>
    </ul>
    <section class="list_base-container">
      <ListBase
        theme="green"
        list-title="Meals"
        btn-label="+ Add Meal"
        :list-item="mealsStore.getMeals"
      />
      <ListBase
        theme="orange"
        list-title="Workouts"
        btn-label="+ Add Workout"
        :list-item="workoutsStore.getWorkouts"
      ></ListBase>
    </section>
  </main>
</template>

<script lang="ts" setup>
import CalorieCard from "../components/UI/CalorieCard.vue";
import ListBase from "../components/UI/ListBase.vue";
import useMealsStore from "../store/Meals";
import useWorkoutsStore from "../store/Workouts";
import useCaloriesStore from "../store/Calories";

const mealsStore = useMealsStore();
const caloriesStore = useCaloriesStore();
const workoutsStore = useWorkoutsStore();
</script>
