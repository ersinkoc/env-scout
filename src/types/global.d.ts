declare global {
  interface Navigator {
    msMaxTouchPoints?: number;
    standalone?: boolean;
  }
  
  const DedicatedWorkerGlobalScope: any;
  const SharedWorkerGlobalScope: any;
  const ServiceWorkerGlobalScope: any;
  function importScripts(...urls: string[]): void;
}

export {};