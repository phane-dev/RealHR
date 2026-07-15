import { ref } from "vue";
import { defineStore } from "pinia";
import themeContent from "@content/theme.json";
import appThemes from "@json/themes.json";

// Create a type containing all valid theme names.
export type ThemeName = keyof typeof appThemes.themes;

// Create the global theme store.
export const useThemeStore = defineStore("theme", () => {
  // Store the currently selected theme.
  const selectedTheme = ref<ThemeName>(
    themeContent.selectedTheme as ThemeName
  );

  // Apply the selected theme colors as global CSS variables.
  const applyTheme = (themeName: ThemeName) => {
    const theme = appThemes.themes[themeName];

    // Apply every color from the selected theme to the root element.
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(
        `--theme-${key}`,
        value
      );
    });

    // Update the currently selected theme.
    selectedTheme.value = themeName;

    // Save the selected theme for future visits.
    localStorage.setItem("selectedTheme", themeName);
  };

  // Load and apply the previously selected theme.
  const initializeTheme = () => {
    const savedTheme = localStorage.getItem(
      "selectedTheme"
    ) as ThemeName | null;

    // Use the saved theme when valid, otherwise use the default theme.
    const themeName =
      savedTheme && savedTheme in appThemes.themes
        ? savedTheme
        : selectedTheme.value;

    applyTheme(themeName);
  };

  return {
    selectedTheme,
    applyTheme,
    initializeTheme,
  };
});