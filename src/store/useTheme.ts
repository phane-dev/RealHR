import { ref } from "vue";
import { defineStore } from "pinia";
import appThemes from "@json/themes.json";

export type ThemeName = keyof typeof appThemes.themes;

export const useThemeStore = defineStore("theme", () => {
  // Set the default application theme.
  const selectedTheme = ref<ThemeName>("ocean");

  // Apply the selected theme.
  const applyTheme = (themeName: ThemeName) => {
    const theme = appThemes.themes[themeName];

    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(
        `--theme-${key}`,
        String(value)
      );
    });

    selectedTheme.value = themeName;
    localStorage.setItem("selectedTheme", themeName);
  };

  // Restore the saved theme or use the default theme.
  const initializeTheme = () => {
    const savedTheme = localStorage.getItem("selectedTheme");

    const themeName: ThemeName =
      savedTheme && savedTheme in appThemes.themes
        ? (savedTheme as ThemeName)
        : selectedTheme.value;

    applyTheme(themeName);
  };

  return {
    selectedTheme,
    applyTheme,
    initializeTheme,
  };
});