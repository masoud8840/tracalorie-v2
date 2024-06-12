<template>
  <Transition name="dialog">
    <dialog
      open
      class="dialog_base"
      v-if="props.modelValue"
      @click="clickOutside"
    >
      <section class="dialog_base-inner" ref="dialogInner">
        <button class="button_base dialog_base-close" @click="onCloseModal">
          <Close />
        </button>
        <slot name="body" />
        <section class="dialog_base-footer">
          <slot name="footer" />
        </section>
      </section>
    </dialog>
  </Transition>
</template>

<script lang="ts" setup>
import { ref, ModelRef } from "vue";
import Close from "../icons/Close.vue";

interface IPropsShape {
  modelValue: ModelRef<boolean>;
}
const props = defineProps<IPropsShape>();

interface IEmitsShape {
  (e: "update:modelValue", newValue: boolean): void;
}
const emits = defineEmits<IEmitsShape>();

const onCloseModal = () => {
  emits("update:modelValue", !props.modelValue);
};

const dialogInner = ref<HTMLDialogElement | null>();
const clickOutside = (e: MouseEvent) => {
  if ((e.target as HTMLElement).tagName === "DIALOG") {
    if (dialogInner.value) {
      dialogInner.value.style.animation =
        "anti_close 0.3s ease-in-out backwards";
      setTimeout(() => {
        dialogInner.value!.style.animation = "";
      }, 300);
    }
  }
};
</script>
