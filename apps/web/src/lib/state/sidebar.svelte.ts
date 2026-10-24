type SidebarRole = 'student' | 'teacher' | 'admin';

export const sidebarState = $state<Record<SidebarRole, boolean>>({
	student: true,
	teacher: true,
	admin: true
});

export function toggleSidebar(role: SidebarRole) {
	sidebarState[role] = !sidebarState[role];
}
