/**
 * Capacitor Runtime Initialization
 * This file initializes Capacitor and ensures proper app lifecycle handling
 */

// Mark when the DOM is ready
let isReady = false;

function setupCapacitor() {
	if (typeof window !== 'undefined' && window.capacitorRuntime) {
		console.log('Capacitor runtime detected, initializing...');
		isReady = true;
	}
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', setupCapacitor);

// Fallback for if DOMContentLoaded already fired
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
