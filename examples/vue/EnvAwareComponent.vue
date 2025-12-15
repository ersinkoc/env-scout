<template>
  <div :class="['env-aware-app', { 'dark-mode': isDarkMode }]">
    <h1>Vue + @oxog/env-scout Example</h1>

    <!-- Loading state -->
    <div v-if="loading" class="loading">
      Loading environment information...
    </div>

    <!-- Main content -->
    <div v-else class="content">
      <!-- Device-specific rendering -->
      <div v-if="isMobile" class="mobile-view">
        <h2>Mobile View</h2>
        <p>Touch-optimized interface</p>
      </div>

      <div v-else-if="isTablet" class="tablet-view">
        <h2>Tablet View</h2>
        <p>Balanced layout for medium screens</p>
      </div>

      <div v-else class="desktop-view">
        <h2>Desktop View</h2>
        <p>Full-featured desktop interface</p>
      </div>

      <!-- Connection status -->
      <div class="connection-status" :class="{ offline: !isOnline }">
        <span v-if="isOnline">🟢 Online</span>
        <span v-else>🔴 Offline</span>
        <span v-if="connectionType"> - {{ connectionType }}</span>
      </div>

      <!-- Feature gates -->
      <div class="features">
        <h3>Available Features</h3>
        <div class="feature-grid">
          <div 
            v-for="(supported, feature) in features" 
            :key="feature"
            :class="['feature-card', { supported }]"
          >
            <span class="feature-name">{{ feature }}</span>
            <span class="feature-status">{{ supported ? '✓' : '✗' }}</span>
          </div>
        </div>
      </div>

      <!-- Environment details -->
      <div class="env-details">
        <h3>Environment Details</h3>
        <table>
          <tr>
            <td>Runtime:</td>
            <td>{{ envInfo.runtime }}</td>
          </tr>
          <tr>
            <td>OS:</td>
            <td>{{ envInfo.os }}</td>
          </tr>
          <tr>
            <td>Browser:</td>
            <td>{{ browserInfo }}</td>
          </tr>
          <tr>
            <td>Device Type:</td>
            <td>{{ envInfo.device.type }}</td>
          </tr>
          <tr>
            <td>Screen Size:</td>
            <td>{{ screenSize }}</td>
          </tr>
          <tr>
            <td>Orientation:</td>
            <td>{{ orientation }}</td>
          </tr>
          <tr>
            <td>Language:</td>
            <td>{{ envInfo.preferences.language }}</td>
          </tr>
          <tr>
            <td>Timezone:</td>
            <td>{{ envInfo.preferences.timezone }}</td>
          </tr>
        </table>
      </div>

      <!-- Adaptive components -->
      <div class="adaptive-section">
        <h3>Adaptive Components</h3>
        
        <!-- Responsive grid -->
        <div :class="gridClasses">
          <div v-for="i in 6" :key="i" class="grid-item">
            Item {{ i }}
          </div>
        </div>

        <!-- Performance mode indicator -->
        <div v-if="isSlowConnection" class="performance-warning">
          ⚠️ Slow connection detected - Performance mode enabled
        </div>
      </div>

      <!-- Actions -->
      <div class="actions">
        <button @click="refresh">Refresh Data</button>
        <button @click="toggleTheme">Toggle Theme</button>
        <button @click="showRawData = !showRawData">
          {{ showRawData ? 'Hide' : 'Show' }} Raw Data
        </button>
      </div>

      <!-- Raw data display -->
      <pre v-if="showRawData" class="raw-data">{{ JSON.stringify(envInfo, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import {
  getEnvironmentInfo,
  isMobile,
  isTablet,
  isDesktop,
  isDarkMode as checkDarkMode,
  isOnline as checkOnline,
  getConnectionType,
  isSlowConnection as checkSlowConnection,
  checkFeatureSupport,
  getOrientation,
  isEnvironment,
  type EnvironmentInfo
} from '@oxog/env-scout';

// Reactive state
const loading = ref(true);
const envInfo = ref<EnvironmentInfo | null>(null);
const isDarkMode = ref(false);
const isOnline = ref(true);
const connectionType = ref<string | null>(null);
const isSlowConnection = ref(false);
const showRawData = ref(false);
const orientation = ref<string | null>(null);

// Device type checks
const isMobile = computed(() => envInfo.value?.device.type === 'mobile');
const isTablet = computed(() => envInfo.value?.device.type === 'tablet');
const isDesktop = computed(() => envInfo.value?.device.type === 'desktop');

// Features
const features = ref<Record<string, boolean>>({});

// Computed properties
const browserInfo = computed(() => {
  const browser = envInfo.value?.browser;
  return browser ? `${browser.name} ${browser.version}` : 'Unknown';
});

const screenSize = computed(() => {
  const screen = envInfo.value?.screen;
  return screen ? `${screen.width}x${screen.height}` : 'Unknown';
});

const gridClasses = computed(() => {
  return [
    'adaptive-grid',
    {
      'mobile-grid': isMobile.value,
      'tablet-grid': isTablet.value,
      'desktop-grid': isDesktop.value
    }
  ];
});

// Methods
const loadEnvironmentInfo = () => {
  envInfo.value = getEnvironmentInfo();
  isDarkMode.value = checkDarkMode();
  isOnline.value = checkOnline();
  connectionType.value = getConnectionType();
  isSlowConnection.value = checkSlowConnection();
  orientation.value = getOrientation();
  
  // Check features
  features.value = checkFeatureSupport([
    'webgl',
    'webgl2',
    'canvas',
    'webassembly',
    'serviceworker',
    'notification',
    'geolocation'
  ]);
  
  loading.value = false;
};

const refresh = () => {
  loading.value = true;
  setTimeout(loadEnvironmentInfo, 300);
};

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  // In a real app, you would also update the theme preference
};

// Event handlers
const handleResize = () => {
  if (envInfo.value) {
    envInfo.value = getEnvironmentInfo();
  }
};

const handleOnline = () => {
  isOnline.value = true;
  connectionType.value = getConnectionType();
};

const handleOffline = () => {
  isOnline.value = false;
  connectionType.value = null;
};

const handleOrientationChange = () => {
  orientation.value = getOrientation();
};

// Lifecycle
onMounted(() => {
  loadEnvironmentInfo();
  
  // Add event listeners
  window.addEventListener('resize', handleResize);
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
  window.addEventListener('orientationchange', handleOrientationChange);
  
  // Media query listeners
  const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  darkModeQuery.addEventListener('change', (e) => {
    isDarkMode.value = e.matches;
  });
});

onUnmounted(() => {
  // Clean up event listeners
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('online', handleOnline);
  window.removeEventListener('offline', handleOffline);
  window.removeEventListener('orientationchange', handleOrientationChange);
});
</script>

<style scoped>
.env-aware-app {
  font-family: system-ui, -apple-system, sans-serif;
  padding: 20px;
  min-height: 100vh;
  transition: background-color 0.3s, color 0.3s;
}

.env-aware-app.dark-mode {
  background-color: #1a1a1a;
  color: #f0f0f0;
}

.loading {
  text-align: center;
  padding: 40px;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
}

.connection-status {
  padding: 10px 20px;
  background: #d4edda;
  color: #155724;
  border-radius: 4px;
  display: inline-block;
  margin: 20px 0;
}

.connection-status.offline {
  background: #f8d7da;
  color: #721c24;
}

.features {
  margin: 30px 0;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
  margin-top: 10px;
}

.feature-card {
  padding: 15px;
  background: #f8f9fa;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dark-mode .feature-card {
  background: #2d2d2d;
}

.feature-card.supported {
  border-left: 4px solid #28a745;
}

.feature-card:not(.supported) {
  border-left: 4px solid #dc3545;
}

.env-details table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.env-details td {
  padding: 8px;
  border-bottom: 1px solid #e0e0e0;
}

.dark-mode .env-details td {
  border-bottom-color: #3d3d3d;
}

.env-details td:first-child {
  font-weight: 600;
  width: 150px;
}

.adaptive-grid {
  display: grid;
  gap: 15px;
  margin: 20px 0;
}

.mobile-grid {
  grid-template-columns: 1fr;
}

.tablet-grid {
  grid-template-columns: repeat(2, 1fr);
}

.desktop-grid {
  grid-template-columns: repeat(3, 1fr);
}

.grid-item {
  padding: 20px;
  background: #f0f0f0;
  border-radius: 4px;
  text-align: center;
}

.dark-mode .grid-item {
  background: #2d2d2d;
}

.performance-warning {
  padding: 15px;
  background: #fff3cd;
  color: #856404;
  border-radius: 4px;
  margin: 20px 0;
}

.actions {
  margin: 30px 0;
}

button {
  padding: 10px 20px;
  margin-right: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background: #0056b3;
}

.raw-data {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 14px;
}

.dark-mode .raw-data {
  background: #2d2d2d;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .env-aware-app {
    padding: 10px;
  }
  
  .feature-grid {
    grid-template-columns: 1fr;
  }
  
  button {
    display: block;
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>