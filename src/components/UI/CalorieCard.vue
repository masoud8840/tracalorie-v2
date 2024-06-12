<template>
  <section :class="`calorie_card theme-${props.cardTheme}`">
    <span>{{ props.cardSubtitle }}</span>
    <h3>{{ props.cardTitle }}</h3>
  </section>
</template>

<script lang="ts" setup>
interface IPropsShape {
  cardTitle: string;
  cardSubtitle: number;
  cardTheme: string;
}
const props = withDefaults(defineProps<IPropsShape>(), {
  cardTitle: "Total Calories",
  cardSubtitle: 3000,
  cardTheme: "dark",
});
</script>
