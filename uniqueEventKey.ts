import type { EventBusKey } from "@vueuse/core";

export const refreshMatchGroup: EventBusKey<void> = Symbol('refresh-match-group')

export const generateKumiteMatch: EventBusKey<void> = Symbol('generate-kumite-match')

export const generateKumiteDone: EventBusKey<void> = Symbol('generate-kumite-done')

export const selectedKumiteMatch: EventBusKey<void> = Symbol('selected-kumite-match')