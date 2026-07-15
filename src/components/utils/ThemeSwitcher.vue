<script setup lang="ts">
import Sidebar from "@components/Sidebar.vue";
import themeContent from "@content/theme.json";
import appThemes from "@json/themes.json";
import { onMounted, ref } from "vue";
import { useThemeStore } from "@store/useTheme";

const themeStore = useThemeStore();
const isShow = ref(true);
onMounted(()=>{
    themeStore.initializeTheme();
})
</script>

<template>
  <div>
    <Sidebar :show="isShow" size="xl">
      <!-- Display the currently selected theme. -->
      <p>Selected theme: {{ themeStore.selectedTheme }}</p>

      <!-- Display the theme description. -->
      <p
        v-if="themeContent?.description"
        class="mb-3 text-sm"
      >
        {{ themeContent.description }}
      </p>

      <!-- Display all available themes. -->
      <div class="grid gap-3 md:grid-cols-3">
        <div
          v-for="(item, index) in appThemes.themes"
          :key="index"
          class="flex min-h-[120px] cursor-pointer flex-nowrap overflow-hidden rounded-lg border"
          :style="{
            backgroundColor: `rgb(${item.background})`,
            color: `rgb(${item.text})`,
            borderColor: `rgb(${item.primary})`,
          }"
          @click="themeStore.applyTheme(index)"
        >
          <!-- Display the primary theme color. -->
          <div
            class="w-[35px] shrink-0"
            :style="{
              backgroundColor: `rgb(${item.primary})`,
            }"
          />

          <!-- Display the theme content preview. -->
          <div class="flex w-full flex-col overflow-hidden">
            {{ index }}
          </div>
        </div>
      </div>
    </Sidebar>
  </div>
</template>