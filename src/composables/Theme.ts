import { ref } from "vue";

enum ETheme {
  Light = "light",
  Dark = "dark",
}

const theme = ref<ETheme>(_loadSavedTheme());

const onChangeTheme = () => {
  if (theme.value === ETheme.Light) {
    theme.value = ETheme.Dark;
  } else {
    theme.value = ETheme.Light;
  }
  _saveTheme();
  _setThemeToDocument(theme.value);
};

function _loadSavedTheme() {
  let savedTheme = localStorage.getItem("theme") as ETheme;
  if (!savedTheme) {
    const now = new Date().getHours();
    if (now > 18) savedTheme = ETheme.Dark;
    else savedTheme = ETheme.Light;
  }

  _setThemeToDocument(savedTheme);
  return savedTheme;
}

function _saveTheme() {
  localStorage.setItem("theme", theme.value);
}

function _setThemeToDocument(givenTheme: ETheme) {
  const doc = document.body as HTMLBodyElement;
  doc.className = `theme-${givenTheme}`;
}
export { ETheme, onChangeTheme, theme };
