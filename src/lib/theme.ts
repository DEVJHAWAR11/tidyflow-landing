import { useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'

const KEY = 'tidyflow-theme'
const THEME_COLOR: Record<Theme, string> = { light: '#f8f2ef', dark: '#05060b' }

// index.html sets data-theme before first paint (stored choice, else the OS setting), so this is never empty in practice.
const read = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme])
}

function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange)
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

  // Follow the OS until the visitor picks a theme themselves.
  const mq = window.matchMedia('(prefers-color-scheme: light)')
  const onSystem = () => {
    let stored: string | null = null
    try {
      stored = localStorage.getItem(KEY)
    } catch {
      /* storage blocked */
    }
    if (!stored) apply(mq.matches ? 'light' : 'dark')
  }
  mq.addEventListener('change', onSystem)

  return () => {
    mo.disconnect()
    mq.removeEventListener('change', onSystem)
  }
}

export function setTheme(theme: Theme) {
  apply(theme)
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    /* storage blocked: the choice lasts for this visit only */
  }
}

export function useTheme() {
  return useSyncExternalStore(subscribe, read, () => 'dark' as Theme)
}
