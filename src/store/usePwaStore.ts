// Zustand
import { create } from "zustand";

interface PwaState {
	deferredPrompt: any;
	isIos: boolean;
	isStandalone: boolean;
	setDeferredPrompt: (prompt: any) => void;
	checkEnvironment: () => void;
	clearPrompt: () => void;
}

export const usePwaStore = create<PwaState>((set) => ({
	// State
	deferredPrompt: null,
	isIos: false,
	isStandalone: false,

	// Actions
	setDeferredPrompt: (prompt) => set({ deferredPrompt: prompt }),

	checkEnvironment: () => {
		const userAgent = window.navigator.userAgent.toLowerCase();
		const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
		const isInStandaloneMode =
			window.matchMedia("(display-mode: standalone)").matches ||
			(window.navigator as any).standalone ||
			document.referrer.includes("android-app://");

		set({ isIos: isIosDevice, isStandalone: isInStandaloneMode });
	},

	clearPrompt: () => set({ deferredPrompt: null }),
}));
