import examStyles from "../exam-style.css" with { type: "text" };
import {
	editeur,
	isExam,
	preferences,
	requiredElement,
} from "./runtime";
import { isVsCodeHost } from "./host";

type DockItem = Element & ElementCSSInlineStyle & {
	isHover?: boolean;
	isNext?: boolean;
};

export function initializeInterfaceEffects(): void {
	if (isExam) {
		const style = document.createElement("style");
		style.dataset.examStyles = "true";
		style.textContent = examStyles;
		document.head.appendChild(style);
	}

	const dataGlowElement = requiredElement<HTMLElement>("[data-glow]");
	const dock = requiredElement<HTMLElement>(".dock");
	const icons = Array.from(
		document.querySelectorAll<DockItem>(".dock-item"),
	);

	const updateGlowState = (): void => {
		if (!preferences.glow) dataGlowElement.classList.remove("active");
	};

	const getCookieBool = (name: string, defaultValue = true): boolean => {
		const value = editeur.getCookie(name);
		return value === "true"
			? true
			: value === "false"
				? false
				: defaultValue;
	};

	preferences.glow = getCookieBool("glow", !isVsCodeHost());
	preferences.dockEffect = getCookieBool("dockEffect", true);

	if (isExam) {
		preferences.glow = false;
		preferences.dockEffect = false;
	}

	updateGlowState();

	const syncPointer = throttle(({ x, y }: { x: number; y: number }) => {
		const root = document.documentElement;
		root.style.setProperty("--x", x.toFixed(2));
		root.style.setProperty("--xp", (x / window.innerWidth).toFixed(2));
		root.style.setProperty("--y", y.toFixed(2));
		root.style.setProperty("--yp", (y / window.innerHeight).toFixed(2));

		const rect = dataGlowElement.getBoundingClientRect();
		dataGlowElement.classList.toggle(
			"active",
			x >= rect.left &&
				x <= rect.right &&
				y >= rect.top &&
				y <= rect.bottom &&
				preferences.glow,
		);
	}, 17);

	document.body.addEventListener("pointermove", syncPointer);

	const updateDock = (): void => {
		for (const icon of icons) {
			let scale = 1;
			let margin = "1px";
			if (icon.isHover) {
				scale = 1.5;
				margin = ".6em";
			} else if (icon.isNext) {
				scale = 1.25;
				margin = ".6em";
			}
			icon.style.transform = `scale(${scale})`;
			icon.style.margin = `0 ${margin}`;
		}
	};

	const reset = (): void => {
		for (const icon of icons) {
			icon.isHover = false;
			icon.isNext = false;
		}
		updateDock();
	};

	const activate = (event: PointerEvent): void => {
		if (!preferences.dockEffect || !(event.target instanceof Element)) return;
		if (!event.target.matches(".dock-item")) return;
		for (const icon of icons) {
			icon.isHover = icon === event.target;
			icon.isNext =
				Math.abs(icons.indexOf(icon) - icons.indexOf(event.target as DockItem)) ===
				1;
		}
		updateDock();
	};

	dock.addEventListener("pointermove", activate);
	dock.addEventListener("pointerleave", reset);
}

function throttle<TArgs extends unknown[]>(
	callback: (...args: TArgs) => void,
	limit: number,
): (...args: TArgs) => void {
	let inThrottle = false;
	return (...args: TArgs) => {
		if (inThrottle) return;
		callback(...args);
		inThrottle = true;
		window.setTimeout(() => {
			inThrottle = false;
		}, limit);
	};
}
