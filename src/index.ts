import express from "express";
import path from "path";
import type RouteHandler from "./types/RouteHandler";

// RouteHandlers
import AssetsDynamiques from "./assetsDynamiques";
import getBibliothèque from "./getBibliotheques";
import { iconHandler } from "./getBibliotheques";

const app = express();
const port = 3000;

AssetsDynamiques.forEach((asset: RouteHandler) => {
	app.get(`/edit/assetsDynamiques${asset.route}`, asset.callback);
});

app.get(getBibliothèque.route, getBibliothèque.callback);

app.get(iconHandler.route, iconHandler.callback);

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
