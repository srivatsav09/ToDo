export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "ToDoo",
	description: "Make beautiful websites regardless of your design experience.",
	todo: {
		create: "/about"
		},
	navItems: [
		{
			label: "Home",
			href: "/home",
		},
    {
      label: "Create a Todo",
      href: "/about",
    },
	{
		label: "Todos",
		href: "/todos"
	},
	{
		label: "Completed Todos",
		href: "/CompletedTodo"
	},
	
	],
	navMenuItems: [
		{
			label: "Login",
			href: "/login",
		},
		{
			label: "Profile",
			href: "/profile",
		},
		{
			label: "Dashboard",
			href: "/dashboard",
		},
		{
			label: "Todos",
			href: "/todos",
		},
		{
			label: "Team",
			href: "/team",
		},
		{
			label: "Calendar",
			href: "/calendar",
		},
		{
			label: "Settings",
			href: "/settings",
		},
		{
			label: "Help & Feedback",
			href: "/help-feedback",
		},
		{
			label: "Logout",
			href: "/logout",
		},
	],
	links: {
		github: "https://github.com",
		twitter: "https://twitter.com",
		docs: "https://nextui.org",
		discord: "https://discord.gg",
    sponsor: "https://patreon.com/jrgarciadev"
	},
};
