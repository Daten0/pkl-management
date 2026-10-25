import { isMobileViewport, onMobileViewportChange } from '#lib/utils/responsive.ts';

type SidebarRole = 'student' | 'teacher' | 'admin';

export const sidebarState = $state<Record<SidebarRole, boolean>>({
	student: true,
	teacher: true,
	admin: true
});

export const mobileSidebarState = $state<Record<SidebarRole, boolean>>({
	student: false,
	teacher: false,
	admin: false
});

export function toggleSidebar(role: SidebarRole) {
	if (isMobileViewport()) {
		mobileSidebarState[role] = !mobileSidebarState[role];
		return;
	}

	sidebarState[role] = !sidebarState[role];
}

export function closeMobileSidebar(role: SidebarRole) {
	mobileSidebarState[role] = false;
}

export function syncSidebarForViewport() {
	return onMobileViewportChange((isMobile) => {
		if (isMobile) return;

		mobileSidebarState.student = false;
		mobileSidebarState.teacher = false;
		mobileSidebarState.admin = false;
	});
}
