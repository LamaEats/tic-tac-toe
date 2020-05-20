/// <reference no-default-lib="true" />
declare var window: Window & typeof globalThis & {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function
}
declare var __SIDE_SIZE__: number
declare var __LINE_SIZE__: number
declare var __DEV__: boolean

declare interface HTMLElement extends Element {
  click: () => void;
  focus: () => void;
}
