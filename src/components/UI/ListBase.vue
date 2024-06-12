<template>
  <section class="list_base">
    <input
      type="text"
      class="list_base-input"
      placeholder="Filter Meals"
      :disabled="!authStore.getAuth.isAuth"
      v-model="search"
    />
    <section class="list_base-header">
      <h2 :class="`list_base-heading theme-${props.theme}`">
        {{ props.listTitle }}
      </h2>
      <button
        :class="`button_base theme-${props.theme}`"
        @click="toggleModal"
        v-if="authStore.getAuth.isAuth"
      >
        {{ props.btnLabel }}
      </button>
    </section>
    <ul :class="`list_base-list theme-${props.theme}`">
      <li v-for="(item, index) in searchableList" :key="index">
        <p>{{ item.title }}</p>
        <span>{{ item.calorie }}</span>
      </li>
    </ul>
  </section>

  <DialogBase v-model="isModalOpen">
    <template #body>
      <form class="add_form">
        <input type="text" placeholder="Name" v-model="formdata.title" />
        <input
          type="number"
          placeholder="Calorie"
          inputmode="numeric"
          v-model="formdata.calorie"
        />
      </form>
    </template>
    <template #footer>
      <button
        :class="`button_base theme-${props.theme}`"
        type="submit"
        @click="onAddItem"
        :disabled="isAddBtnDisabled"
      >
        Add
      </button>
    </template>
  </DialogBase>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { Meal, Workout } from "../../types";
import DialogBase from "./DialogBase.vue";
import useWorkoutsStore from "../../store/Workouts";
import useMealsStore from "../../store/Meals";
import useAuthStore from "../../store/Auth";

interface IPropsShape {
  theme: "green" | "orange";
  btnLabel: string;
  listTitle: string;
  listItem: Meal[] | Workout[];
}

const props = defineProps<IPropsShape>();

interface IFormData {
  title: string;
  calorie: number | null;
}
const formdata = ref<IFormData>({ title: "", calorie: null });
const workoutsStore = useWorkoutsStore();
const mealsStore = useMealsStore();
const onAddItem = () => {
  if (props.listTitle === "Workouts")
    workoutsStore.addWorkout({ ...formdata.value });
  if (props.listTitle === "Meals") mealsStore.addMeal({ ...formdata.value });

  formdata.value.title = "";
  formdata.value.calorie = null;
  toggleModal();
};

const isAddBtnDisabled = computed(() => {
  if (formdata.value.title.trim() !== "" && formdata.value.calorie! > 0)
    return false;
  else return true;
});

const isModalOpen = ref(false);
const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const authStore = useAuthStore();

const search = ref("");
const searchableList = computed(() => {
  if (search.value.trim() === "") {
    return props.listItem;
  }
  return props.listItem.filter((item) =>
    item.title.toLowerCase().includes(search.value.toLowerCase())
  );
});
</script>
