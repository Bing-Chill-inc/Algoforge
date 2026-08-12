import AssetsDynamiques from "../../../back/assetsDynamiques";

export function resolveDynamicAssetUrl(relativeUrl: string): string {
	const parsed = new URL(relativeUrl, "https://algoforge.invalid/");
	const route = parsed.pathname.replace(/^\/assetsDynamiques/, "");
	const asset = AssetsDynamiques.find((candidate) => candidate.route === route);
	if (!asset) return relativeUrl;

	let svg = "";
	asset.callback(
		{
			query: Object.fromEntries(parsed.searchParams),
		} as never,
		{
			setHeader: () => undefined,
			send: (value: unknown) => {
				svg = String(value);
			},
		} as never,
	);
	if (!svg) return relativeUrl;
	return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
