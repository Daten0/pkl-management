<!-- src/lib/components/admin/Sidebar.svelte -->
<script lang="ts">
    let { isOpen } = $props();

    // Menyimpan nama submenu yang sedang terbuka (string kosong = semua tertutup)
    let activeSubmenu = $state('');

    const toggleSubmenu = (name: string) => {
        // Jika menu yang ditekan sudah terbuka, tutup menu tersebut. Jika belum, buka menu baru.
        activeSubmenu = activeSubmenu === name ? '' : name;
    };

    const menus = [
        { name: 'Dashboard', icon: '📊', href: '#' },
        { name: 'Data Mitra DUDI', icon: '🏢', href: '#' },
        { 
            name: 'Data Akun', 
            icon: '👥',
            children: [
                { name: 'Akun Siswa', href: '#' },
                { name: 'Akun Guru', href: '#' },
                { name: 'Akun Admin', href: '#' }
            ]
        },
        { 
            name: 'Pengaturan Surat', 
            icon: '✉️',
            children: [
                { name: 'Surat Pengantar PKL Siswa', href: '#' },
                { name: 'Surat Pembimbing PKL', href: '#' },
				{ name: 'MoU Perusahaan', href: '#' },
                { name: 'Surat Pengadaan PKL', href: '#' }
            ]
        },
        { name: 'Manajemen Grup PKL', icon: '⚙️', href: '#' },
        { name: 'Profil Admin', icon: '👨‍💼', href: '#' }
    ];
</script>

<aside 
    class="bg-white border-r border-[#e6d9cc] transition-all duration-300 flex flex-col shadow-sm {isOpen ? 'w-64' : 'w-0 overflow-hidden'}"
>
    <div class="p-4 border-b border-[#e6d9cc] flex justify-center items-center h-16">
        <span class="text-orange-500 font-extrabold text-xl whitespace-nowrap">Menu Admin</span>
    </div>
    <nav class="flex-1 overflow-y-auto py-4">
        <ul class="flex flex-col gap-1 px-3">
            {#each menus as menu}
                <li>
                    {#if menu.children}
                        <!-- Parent Menu Collapsible -->
                        <button 
                            type="button"
                            onclick={() => toggleSubmenu(menu.name)}
                            class="w-full flex items-center justify-between px-4 py-3 rounded-lg text-[#6f4e37] font-medium transition-colors duration-200 hover:bg-orange-500 hover:text-white group text-left"
                        >
                            <div class="flex items-center gap-3">
                                <span class="text-lg">{menu.icon}</span>
                                <span class="whitespace-nowrap">{menu.name}</span>
                            </div>
                            <span class="text-xs transition-transform duration-200 {activeSubmenu === menu.name ? 'rotate-180' : ''}">
                                ▼
                            </span>
                        </button>

                        <!-- Submenu List -->
                        {#if activeSubmenu === menu.name}
                            <ul class="flex flex-col gap-1 mt-1 pl-9 pr-1">
                                {#each menu.children as child}
                                    <li>
                                        <a 
                                            href={child.href}
                                            class="block px-3 py-2 rounded-lg text-sm text-[#6f4e37] font-medium transition-colors duration-200 hover:bg-orange-100 hover:text-orange-600"
                                        >
                                            {child.name}
                                        </a>
                                    </li>
                                {/each}
                            </ul>
                        {/if}
                    {:else}
                        <!-- Standard Menu Link -->
                        <a 
                            href={menu.href} 
                            class="flex items-center gap-3 px-4 py-3 rounded-lg text-[#6f4e37] font-medium transition-colors duration-200 hover:bg-orange-500 hover:text-white group"
                        >
                            <span class="text-lg">{menu.icon}</span>
                            <span class="whitespace-nowrap">{menu.name}</span>
                        </a>
                    {/if}
                </li>
            {/each}
        </ul>
    </nav>
</aside>