"use client";

import Tabs, { TabsConfig } from "@/shared/components/tabs/tabs";
import "./landing.scss";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { User, getAuth } from "firebase/auth";
import { firebase_app } from "@/firebase/config";
import signOutUser from "@/firebase/auth/signOut";

export const UserContext = createContext<User | null>(null);

export default function Landing({
	inter,
	children,
}: Readonly<{
	inter: any;
	children: React.ReactNode;
}>) {
	const [user, setUser] = useState<User | null>(null);

	const router = useRouter();

	const tabsConfig: TabsConfig[] = [
		{
			label: "Home",
			url: "/home",
		},
		{
			label: "Ranking",
			url: "/ranking",
		},
		{
			label: "Historial",
			url: "/history",
		},
		...(user?.email === "mtapialopez@deloitte.es"
			? [
					{
						label: "Admin",
						url: "/admin",
					},
			  ]
			: []),
	];

	useEffect(() => {
		const auth = getAuth(firebase_app);
		auth.onAuthStateChanged(async (user) => {
			setUser(user);
			if (!user) router.push("/login");
		});
	}, []);

	async function clientSignOut() {
		const { result, error } = await signOutUser();

		if (error) {
			return console.error(error);
		}

		console.log(result);
		return router.push("/login");
	}

	return (
		<html lang="en">
			<body className={inter.className}>
				{user && (
					<header>
						<Tabs tabsConfig={tabsConfig}></Tabs>
						{user && (
							<div
								style={{
									display: "flex",
									gap: 12,
									alignItems: "center",
								}}
							>
								<h4 style={{ marginRight: 16 }}>
									Bienvenid@, {user?.email}
								</h4>
								<button
									onClick={clientSignOut}
									className="sign-out-button"
								>
									Cerrar sesión
								</button>
							</div>
						)}
					</header>
				)}
				<main>
					<UserContext.Provider value={user}>
						{children}
					</UserContext.Provider>
				</main>
			</body>
		</html>
	);
}
