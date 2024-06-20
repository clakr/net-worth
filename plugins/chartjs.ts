import { Chart, Tooltip, Legend, ArcElement } from "chart.js";

export default defineNuxtPlugin(() => {
	Chart.register(ArcElement, Tooltip, Legend);
});
