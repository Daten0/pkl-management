export const MOBILE_MEDIA_QUERY = '(max-width: 1023px)';

export function isMobileViewport() {
	if (typeof window === 'undefined') return false;
	return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
}

export function onMobileViewportChange(callback: (isMobile: boolean) => void) {
	if (typeof window === 'undefined') return () => {};

	const query = window.matchMedia(MOBILE_MEDIA_QUERY);
	const handler = (event: MediaQueryListEvent) => callback(event.matches);

	query.addEventListener('change', handler);

	return () => query.removeEventListener('change', handler);
}
