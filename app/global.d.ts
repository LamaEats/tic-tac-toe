// / <reference no-default-lib="true" />
declare let window: Window & typeof globalThis & {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function
};
declare let __SIDE_SIZE__: number;
declare let __LINE_SIZE__: number;
declare let __DEV__: boolean;

declare interface HTMLElement extends Element {
  click: () => void;
  focus: () => void;
}
