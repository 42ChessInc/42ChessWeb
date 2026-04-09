import { Routes } from "@angular/router";
import { Home } from "./pages/home/home";
import { Game } from "./pages/game/game";
import { Tournament } from "./pages/tournament/tournament";
import { Auth } from "./pages/auth/auth";
import { Construction } from "./pages/construction/construction";

export const routes: Routes = [
	{
		path: "home",
		component: Home,
	},
	{
		path: "game",
		component: Game,
	},
	{
		path: "tournament",
		component: Tournament,
	},
	{
		path: "auth",
		component: Auth,
	},
	{
		path: "",
		component: Construction,
	},
];
