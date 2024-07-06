import { sidebarLinks } from "@/constants/sidebar-links";
import SidebarItem from "./sidebar-item";
import { ThemeSwitcher } from "@/app/components/theme-switcher";

export default function Sidebar() {
	return (
		<aside className="w-[250px] h-full px-2 pb-4 pt-6 lg:flex flex-col justify-between gap-2 dark:bg-secondary hidden bg-slate-50">
			<div className="flex flex-col gap-2">
				{sidebarLinks.map((link) => (
					<SidebarItem
						key={link.label}
						label={link.label}
						route={link.route}
						icon={link.imgURL}
					/>
				))}
			</div>

			<ThemeSwitcher />
		</aside>
	);
}
