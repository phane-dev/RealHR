<script setup lang="ts">
// Import accessible dialog and transition components from Headless UI.
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

// Define the supported drawer positions.
type DrawerPosition = "left" | "right";

// Define the supported drawer size options.
type DrawerSize = 
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl";

// Define the configurable properties accepted by the drawer component.
const props = defineProps({
  // Controls whether the drawer is visible.
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

  // Defines which side of the viewport the drawer opens from.
  position: {
    type: String as PropType<DrawerPosition>,
    default: "right",
  },

  // Defines the maximum width of the drawer panel.
  size: {
    type: String as PropType<DrawerSize>,
    default: "sm",
  },

  // Defines custom CSS or Tailwind classes for the drawer panel.
  drawerClass: {
    type: String,
    default: "bg-white shadow-xl",
  },

  // Defines custom classes for the full-screen outer container.
  containerClass: {
    type: String,
    default: "",
  },

  // Defines custom classes for the drawer positioning container.
  subContainerClass: {
    type: String,
    default: "",
  },
});

// Map each drawer size option to its corresponding Tailwind width class.
const sizeClasses: Record<DrawerSize, string> = {
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
  "7xl": "max-w-[1300px]",
  "8xl": "max-w-[1400px]"
};

// Get the drawer width class based on the selected size.
const sizeClass = computed(() => sizeClasses[props.size]);

// Get the drawer alignment class based on the selected position.
const positionClass = computed(() =>
  props.position === "left" ? "left-0" : "right-0",
);

// Get the drawer opening animation based on the selected position.
const enterFromClass = computed(() =>
  props.position === "left" ? "-translate-x-full" : "translate-x-full",
);

// Get the drawer closing animation based on the selected position.
const leaveToClass = computed(() =>
  props.position === "left" ? "-translate-x-full" : "translate-x-full",
);
</script>

<template>
  <!-- Controls the drawer visibility and root transition. -->
  <TransitionRoot as="template" :show="isShow">
    <Dialog class="relative z-10">
      <!-- Animates the drawer backdrop when opening and closing. -->
      <TransitionChild
        v-if="isBackdrop"
        as="template"
        enter="ease-in-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 transition-opacity"
          :class="backdropClass"
        />
      </TransitionChild>

      <!-- Provides the full-screen drawer container. -->
      <div
        class="fixed inset-0 overflow-hidden"
        :class="containerClass"
      >

        <!-- Positions the drawer panel on the selected side of the viewport. -->
        <div
          class="pointer-events-none fixed inset-y-0 flex w-full"
          :class="[positionClass, subContainerClass]"
        >
          <!-- Animates the drawer panel when opening and closing. -->
          <TransitionChild
            as="template"
            enter="transform transition ease-in-out duration-500"
            :enter-from="enterFromClass"
            enter-to="translate-x-0"
            leave="transform transition ease-in-out duration-500"
            leave-from="translate-x-0"
            :leave-to="leaveToClass"
          >
            <DialogPanel
              class="pointer-events-auto absolute inset-y-0 w-full"
              :class="[positionClass, sizeClass, drawerClass]"
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