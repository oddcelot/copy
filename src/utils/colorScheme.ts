export function useColorScheme() {
  const prefersDarkColorScheme = window.matchMedia('(prefers-color-scheme: dark)')
  type ColorScheme = 'light' | 'dark' | 'no-preference'

  prefersDarkColorScheme.addEventListener('change', (ev) => {
    if (checkSavedPreference() === 'no-preference') {
      setColorScheme('dark')
    }
    if (ev.matches) {
      setColorScheme('dark')
    } else {
      setColorScheme('light')
    }
  })

  if (prefersDarkColorScheme.matches) {
    setColorScheme('dark')
  } else {
    setColorScheme('light')
  }
  function checkSavedPreference(): ColorScheme {
    if (localStorage.colorScheme === 'dark') {
      return 'dark'
    }
    if (localStorage.colorScheme === 'light') {
      return 'light'
    }
    return 'no-preference'
  }

  function setColorScheme(scheme: ColorScheme) {
    localStorage.colorScheme = scheme
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(scheme)
  }
}
