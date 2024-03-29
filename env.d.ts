/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
interface Window {
  foo: string;
}
interface ImportMetaEnv {
  readonly VITE_BASE: string
  // 更多环境变量...
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
