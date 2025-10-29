import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "custom" | "default"
declare module 'nuxt/app' {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}