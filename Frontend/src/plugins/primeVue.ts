import type { PrimeVueConfiguration } from 'primevue'
import Aura from '@primevue/themes/aura'

export const primeVueOptions: PrimeVueConfiguration = {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark-mode',
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities',
      },
    },
  },
}
