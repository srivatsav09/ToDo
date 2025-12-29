"use client";

import React from "react";
import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import clsx from "clsx";
import { useAuth } from "@/contexts/AuthContext";
import { link as linkStyles } from "@nextui-org/theme";

export const AuthNavbar = () => {
	const { isAuthenticated, loading, logout, user } = useAuth();
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	if (loading) {
		return null;
	}

	return (
		<NextUINavbar
			maxWidth="xl"
			position="sticky"
			className="glass-card border-b border-white/10"
			isMenuOpen={isMenuOpen}
			onMenuOpenChange={setIsMenuOpen}
		>
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href={isAuthenticated ? "/home" : "/"}>
						<p className="font-bold text-2xl text-white">ToDoo</p>
					</NextLink>
				</NavbarBrand>

				{isAuthenticated && (
					<ul className="hidden lg:flex gap-4 justify-start ml-8">
						<NavbarItem>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"text-white/80 hover:text-white transition-colors"
								)}
								href="/home"
							>
								Home
							</NextLink>
						</NavbarItem>
						<NavbarItem>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"text-white/80 hover:text-white transition-colors"
								)}
								href="/todos"
							>
								Active Todos
							</NextLink>
						</NavbarItem>
						<NavbarItem>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"text-white/80 hover:text-white transition-colors"
								)}
								href="/CompletedTodo"
							>
								Completed
							</NextLink>
						</NavbarItem>
					</ul>
				)}
			</NavbarContent>

			<NavbarContent justify="end">
				{isAuthenticated ? (
					<div className="flex items-center gap-3">
						<span className="hidden sm:inline text-white/70">
							Welcome, {user?.first_name || user?.username}
						</span>
						<Button
							size="sm"
							onClick={logout}
							className="bg-gradient-to-r from-red-400 to-pink-500 text-white font-semibold"
						>
							Logout
						</Button>
					</div>
				) : (
					<div className="flex items-center gap-2">
						<NavbarItem className="hidden sm:flex">
							<NextLink href="/register">
								<Button
									size="sm"
									className="glass-morphism border-white/30 text-white font-semibold"
								>
									Sign Up
								</Button>
							</NextLink>
						</NavbarItem>
						<NavbarItem>
							<NextLink href="/login">
								<Button
									size="sm"
									className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold"
								>
									Login
								</Button>
							</NextLink>
						</NavbarItem>
					</div>
				)}

				{isAuthenticated && (
					<NavbarMenuToggle
						className="sm:hidden text-white"
						aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					/>
				)}
			</NavbarContent>

			{isAuthenticated && (
				<NavbarMenu className="glass-card pt-6">
					<NavbarMenuItem>
						<NextLink
							className="w-full text-white text-lg"
							href="/home"
							onClick={() => setIsMenuOpen(false)}
						>
							Home
						</NextLink>
					</NavbarMenuItem>
					<NavbarMenuItem>
						<NextLink
							className="w-full text-white text-lg"
							href="/todos"
							onClick={() => setIsMenuOpen(false)}
						>
							Active Todos
						</NextLink>
					</NavbarMenuItem>
					<NavbarMenuItem>
						<NextLink
							className="w-full text-white text-lg"
							href="/CompletedTodo"
							onClick={() => setIsMenuOpen(false)}
						>
							Completed Todos
						</NextLink>
					</NavbarMenuItem>
					<NavbarMenuItem>
						<Button
							onClick={() => {
								logout();
								setIsMenuOpen(false);
							}}
							className="bg-gradient-to-r from-red-400 to-pink-500 text-white font-semibold w-full"
						>
							Logout
						</Button>
					</NavbarMenuItem>
				</NavbarMenu>
			)}
		</NextUINavbar>
	);
};