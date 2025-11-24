/**
 * Capacitor Runtime Initialization
 * This file initializes Capacitor and ensures proper app lifecycle handling
 */

// Prevent errors from crashing the app
window.addEventListener('error', (event) => {
	console.log('Global error caught:', event.error);
	// Don't rethrow, allow app to continue
});

window.addEventListener('unhandledrejection', (event) => {
	console.log('Unhandled promise rejection:', event.reason);
	// Don't rethrow, allow app to continue
	event.preventDefault();
});

// Mark when the DOM is ready
let isReady = false;

function setupCapacitor() {
	if (typeof window !== 'undefined' && window.capacitorRuntime) {
		console.log('Capacitor runtime detected, initializing...');
		isReady = true;
	}
}

// Initialize on DOMContentLoaded
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', setupCapacitor);
} else {
	setupCapacitor();
}

// Handle app pausing to prevent crashes
if (typeof window !== 'undefined' && window.capacitor) {
	document.addEventListener('pause', function() {
		console.log('App paused');
	});

	document.addEventListener('resume', function() {
		console.log('App resumed');
	});
}
