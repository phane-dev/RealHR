<script setup lang="ts">
// Import accessible modal and transition components from Headless UI.
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

// Import computed for reactive derived values.
import { computed } from "vue";

// Import PropType for strongly typed Vue props.
import type { PropType } from "vue";

// Define the supported modal size options.
type ModalSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl";

// Define the configurable properties accepted by the modal component.
const props = defineProps({
  // Controls whether the modal is visible.
  isShow: {
    type: Boolean,
    default: true,
  },

  // Controls whether the background backdrop is displayed.
  isBackdrop: {
    type: Boolean,
    default: true,
  },

  // Defines custom CSS or Tailwind classes for the backdrop.
  backdropClass: {
    type: String,
    default: "bg-gray-500/75",
  },

  // Defines the maximum width of the modal panel.
  size: {
    type: String as PropType<ModalSize>,
    default: "sm",
  },

  // Defines custom CSS or Tailwind classes for the modal panel.
  modalClass: {
    type: String,
    default: "p-6",
  },

  // Defines custom classes for the full-screen outer container.
  containerClass: {
    type: String,
    default: "",
  },

  // Defines custom classes for the inner modal positioning container.
  subContainerClass: {
    type: String,
    default: "",
  },

  // Controls whether the modal is vertically centered.
  isCenter: {
    type: Boolean,
    default: true,
  },
});

// Map each modal size option to its corresponding Tailwind width class.
const sizeClasses: Record<ModalSize, string> = {
  xs: "max-w-[300px]",
  sm: "max-w-[400px]",
  md: "max-w-[500px]",
  lg: "max-w-[600px]",
  xl: "max-w-[700px]",
  "2xl": "max-w-[800px]",
  "3xl": "max-w-[900px]",
  "4xl": "max-w-[1000px]",
  "5xl": "max-w-[1100px]",
  "6xl": "max-w-[1200px]",
};
// Get the modal width class based on the selected size.
const sizeClass = computed(() => sizeClasses[props.size]);
</script>

<template>
  <!-- Controls the modal visibility and root transition. -->
  <TransitionRoot as="template" :show="isShow">
    <Dialog class="relative z-10">
      <!-- Animates the modal backdrop when opening and closing. -->
      <TransitionChild
        v-if="isBackdrop"
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 transition-opacity"
          :class="backdropClass"
        />
      </TransitionChild>

      <!-- Provides the full-screen scrollable modal container. -->
      <div
        class="fixed inset-0 z-10 w-screen overflow-y-auto"
        :class="containerClass"
      >
        <!-- Controls the modal's alignment and position within the viewport. -->
        <div
          class="flex min-h-full justify-center"
          :class="[
            subContainerClass,
            isCenter ? 'items-center p-4' : 'items-start p-4 sm:p-6',
          ]"
        >

          <!-- Animates the modal panel when opening and closing. -->
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >

            <DialogPanel
              class="w-full rounded-md bg-white"
              :class="[sizeClass, modalClass]"
            >
              <!-- Renders content provided by the parent component. -->
              <slot />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>