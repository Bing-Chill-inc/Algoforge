interface RouteHandler {
	route: string;
	callback: (req, res) => void;
}

export default RouteHandler;
