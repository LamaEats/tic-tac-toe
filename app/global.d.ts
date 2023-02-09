// / <reference no-default-lib="true" />
declare interface Window extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
}

/* eslint-disable no-underscore-dangle */
declare const __SIDE_SIZE__: number
declare const __LINE_SIZE__: number
declare const __DEV__: boolean
/* eslint-enable no-underscore-dangle */

declare interface HTMLElement extends Element {
  click: () => void
  focus: () => void
}
