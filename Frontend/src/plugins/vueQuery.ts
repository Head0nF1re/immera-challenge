import type { VueQueryPluginOptions } from '@tanstack/vue-query'

export const vueQueryPluginOptions: VueQueryPluginOptions = {
  enableDevtoolsV6Plugin: true,
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  },
}
