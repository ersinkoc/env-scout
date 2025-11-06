declare global {
  interface Navigator {
    msMaxTouchPoints?: number;
    standalone?: boolean;
  }

  var Bun: any;
  var Deno: any;

  const DedicatedWorkerGlobalScope: any;
  const SharedWorkerGlobalScope: any;
  const ServiceWorkerGlobalScope: any;
  function importScripts(...urls: string[]): void;
}

export {};