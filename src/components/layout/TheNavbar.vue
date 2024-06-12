<template>
  <header>
    <nav class="navbar container">
      <h1 class="brand" @click="onChangeTheme">
        Tracalorie
        <transition name="theme" mode="out-in">
          <Sun v-if="theme === ETheme.Light" />
          <Moon v-else />
        </transition>
      </h1>
      <button
        class="button_base theme-orange"
        @click="toggleAccountDialogModel"
        v-if="!authStore.getAuth.isAuth"
      >
        Create Account
      </button>
      <button
        class="button_base theme-orange"
        @click="toggleDailyLimitDialogModel"
        v-else
      >
        Set Daily Calorie Limit
      </button>
    </nav>
  </header>
  <DialogBase v-model="createAccountDialogModel">
    <template #body>
      <form class="accounting_form">
        <input type="text" placeholder="Username (min 6 charecters)" required />
        <input type="password" placeholder="Password (min 6 charecters)" />
      </form>
    </template>
    <template #footer>
      <button class="button_base theme-orange">Create Account</button>
      <router-link to="/">Login to account</router-link>
    </template>
  </DialogBase>

  <DialogBase v-model="dailyLimitDialogModel">
    <template #body>
      <form class="daily_limit_form">
        <input
          type="number"
          inputmode="decimal"
          placeholder="Daily Calorie Limit (e.g. 2000)"
          required
          v-model="dailyLimit"
        />
      </form>
    </template>
    <template #footer>
      <button
        :disabled="!(dailyLimit! > 0)"
        class="button_base theme-orange"
        @click="setDailyCalorieLimit"
      >
        Set Daily Limit
      </button>
    </template>
  </DialogBase>
</template>

<script lang="ts" setup>
import Sun from "../icons/Sun.vue";
import Moon from "../icons/Moon.vue";
import { theme, ETheme, onChangeTheme } from "../../composables/Theme";
import DialogBase from "../UI/DialogBase.vue";
import useAuthStore from "../../store/Auth";
import { ref } from "vue";
const authStore = useAuthStore();

const dailyLimitDialogModel = ref(false);
const toggleDailyLimitDialogModel = () => {
  dailyLimitDialogModel.value = !dailyLimitDialogModel.value;
};
const dailyLimit = ref<number | null>(null);
const setDailyCalorieLimit = () => {
  // todo: set daily limit
  toggleDailyLimitDialogModel();
};

const createAccountDialogModel = ref(false);
const toggleAccountDialogModel = () => {
  createAccountDialogModel.value = !createAccountDialogModel.value;
};
</script>
