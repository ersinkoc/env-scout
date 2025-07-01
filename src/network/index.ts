interface ConnectionInfo {
  effectiveType?: string;
  downlink?: number;
  rtt?: number;
  saveData?: boolean;
}

export function isOnline(): boolean {
  if (typeof navigator === 'undefined') return true;
  return navigator.onLine !== false;
}

export function isOffline(): boolean {
  return !isOnline();
}

export function getConnectionType(): string | null {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) return null;
  
  const connection = (navigator as any).connection || 
                    (navigator as any).mozConnection || 
                    (navigator as any).webkitConnection;
  
  if (!connection) return null;
  
  if (connection.type) return connection.type;
  if (connection.effectiveType) return connection.effectiveType;
  
  return null;
}

export function isSlowConnection(): boolean {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) return false;
  
  const connection = (navigator as any).connection || 
                    (navigator as any).mozConnection || 
                    (navigator as any).webkitConnection;
  
  if (!connection) return false;
  
  const slowTypes = ['slow-2g', '2g'];
  const effectiveType = connection.effectiveType?.toLowerCase();
  
  if (slowTypes.includes(effectiveType)) return true;
  
  if (connection.downlink && connection.downlink < 1) return true;
  
  if (connection.rtt && connection.rtt > 500) return true;
  
  return false;
}

export function getConnectionInfo(): ConnectionInfo | null {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) return null;
  
  const connection = (navigator as any).connection || 
                    (navigator as any).mozConnection || 
                    (navigator as any).webkitConnection;
  
  if (!connection) return null;
  
  return {
    effectiveType: connection.effectiveType,
    downlink: connection.downlink,
    rtt: connection.rtt,
    saveData: connection.saveData
  };
}