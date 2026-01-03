declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

declare module '*.glb?url' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

export {};
