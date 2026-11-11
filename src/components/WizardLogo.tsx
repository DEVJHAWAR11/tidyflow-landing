import type { ImgHTMLAttributes, Ref } from 'react'
import wizardBlack from '../assets/brand/wizard-black.webp'
import wizardWhite from '../assets/brand/wizard-white.webp'
import { WIZARD_HEIGHT, WIZARD_WIDTH } from '../lib/brand'
import { useTheme } from '../lib/theme'

type WizardLogoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  /** Defaults to the page theme: white on the night sky, black on paper. */
  tone?: 'white' | 'black'
  ref?: Ref<HTMLImageElement>
}

/** The TidyFlow flying-wizard mascot: a transparent cutout of the app's logo.png. Decorative unless `alt` is given. */
export function WizardLogo({ tone, alt = '', className = '', ...props }: WizardLogoProps) {
  const theme = useTheme()
  const t = tone ?? (theme === 'light' ? 'black' : 'white')
  return (
    <img
      src={t === 'white' ? wizardWhite : wizardBlack}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      width={WIZARD_WIDTH}
      height={WIZARD_HEIGHT}
      draggable={false}
      decoding="async"
      className={`h-auto select-none ${className}`}
      {...props}
    />
  )
}
