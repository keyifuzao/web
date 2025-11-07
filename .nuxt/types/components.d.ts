
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T

interface _GlobalComponents {
  'ActicalPartLeft': typeof import("../../app/components/ActicalPartLeft.vue")['default']
  'ActicalPartMid': typeof import("../../app/components/ActicalPartMid.vue")['default']
  'ActicalPartRight': typeof import("../../app/components/ActicalPartRight.vue")['default']
  'CenterUserInfo': typeof import("../../app/components/CenterUserInfo.vue")['default']
  'CenterUserResource': typeof import("../../app/components/CenterUserResource.vue")['default']
  'CenterUserStyle': typeof import("../../app/components/CenterUserStyle.vue")['default']
  'Footer': typeof import("../../app/components/Footer.vue")['default']
  'Header': typeof import("../../app/components/Header.vue")['default']
  'MessageAlert': typeof import("../../app/components/MessageAlert.vue")['default']
  'ModelBox': typeof import("../../app/components/ModelBox.vue")['default']
  'WidgetsClock': typeof import("../../app/components/WidgetsClock.vue")['default']
  'WidgetsDays': typeof import("../../app/components/WidgetsDays.vue")['default']
  'WidgetsDisplayPic': typeof import("../../app/components/WidgetsDisplayPic.vue")['default']
  'WidgetsMusic': typeof import("../../app/components/WidgetsMusic.vue")['default']
  'WidgetsTxtBar': typeof import("../../app/components/WidgetsTxtBar.vue")['default']
  'WidgetsWeather': typeof import("../../app/components/WidgetsWeather.vue")['default']
  'WidgetsWebTool': typeof import("../../app/components/WidgetsWebTool.vue")['default']
  'NuxtWelcome': typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']
  'NuxtLayout': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
  'NuxtErrorBoundary': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
  'ClientOnly': typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']
  'DevOnly': typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']
  'ServerPlaceholder': typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']
  'NuxtLink': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']
  'NuxtLoadingIndicator': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
  'NuxtTime': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
  'NuxtRouteAnnouncer': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
  'NuxtImg': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
  'NuxtPicture': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
  'NuxtPage': typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']
  'NoScript': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']
  'Link': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']
  'Base': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']
  'Title': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']
  'Meta': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']
  'Style': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']
  'Head': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']
  'Html': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']
  'Body': typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']
  'NuxtIsland': typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']
  'LazyActicalPartLeft': LazyComponent<typeof import("../../app/components/ActicalPartLeft.vue")['default']>
  'LazyActicalPartMid': LazyComponent<typeof import("../../app/components/ActicalPartMid.vue")['default']>
  'LazyActicalPartRight': LazyComponent<typeof import("../../app/components/ActicalPartRight.vue")['default']>
  'LazyCenterUserInfo': LazyComponent<typeof import("../../app/components/CenterUserInfo.vue")['default']>
  'LazyCenterUserResource': LazyComponent<typeof import("../../app/components/CenterUserResource.vue")['default']>
  'LazyCenterUserStyle': LazyComponent<typeof import("../../app/components/CenterUserStyle.vue")['default']>
  'LazyFooter': LazyComponent<typeof import("../../app/components/Footer.vue")['default']>
  'LazyHeader': LazyComponent<typeof import("../../app/components/Header.vue")['default']>
  'LazyMessageAlert': LazyComponent<typeof import("../../app/components/MessageAlert.vue")['default']>
  'LazyModelBox': LazyComponent<typeof import("../../app/components/ModelBox.vue")['default']>
  'LazyWidgetsClock': LazyComponent<typeof import("../../app/components/WidgetsClock.vue")['default']>
  'LazyWidgetsDays': LazyComponent<typeof import("../../app/components/WidgetsDays.vue")['default']>
  'LazyWidgetsDisplayPic': LazyComponent<typeof import("../../app/components/WidgetsDisplayPic.vue")['default']>
  'LazyWidgetsMusic': LazyComponent<typeof import("../../app/components/WidgetsMusic.vue")['default']>
  'LazyWidgetsTxtBar': LazyComponent<typeof import("../../app/components/WidgetsTxtBar.vue")['default']>
  'LazyWidgetsWeather': LazyComponent<typeof import("../../app/components/WidgetsWeather.vue")['default']>
  'LazyWidgetsWebTool': LazyComponent<typeof import("../../app/components/WidgetsWebTool.vue")['default']>
  'LazyNuxtWelcome': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
  'LazyNuxtLayout': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
  'LazyNuxtErrorBoundary': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
  'LazyClientOnly': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']>
  'LazyDevOnly': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']>
  'LazyServerPlaceholder': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
  'LazyNuxtLink': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
  'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
  'LazyNuxtTime': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
  'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
  'LazyNuxtImg': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
  'LazyNuxtPicture': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
  'LazyNuxtPage': LazyComponent<typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']>
  'LazyNoScript': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
  'LazyLink': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']>
  'LazyBase': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']>
  'LazyTitle': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']>
  'LazyMeta': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']>
  'LazyStyle': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']>
  'LazyHead': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']>
  'LazyHtml': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']>
  'LazyBody': LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']>
  'LazyNuxtIsland': LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
