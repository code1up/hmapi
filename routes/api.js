// Util.
var util = require("util");

var HttpStatus = {
	OK: 200,
	BadRequest: 400,
	NotFound: 404,
	ServerError: 500
};

var ladder = {
	itemId: 1,
	title: "Ladder",
	description: "It's a ladder.",
	category: "Home",
	tags: [
		"red",
		"long"
	]
};

var wheelbarrow = {
	itemId: 2,
	title: "Wheelbarrow",
	description: "Two handles.",
	category: "Home",
	tags: [
		"rusty"
	]
};

var drill = {
	itemId: 3,
	title: "Drill",
	description: "Hammer action.",
	category: "DIY"
};

function _sendJsonResponse(status, res, response) {
	res.contentType("application/json");
	res.send(status, response);
}

function _sendApiError(res, message) {
	var error = {
		name: "ApiError",
		message: message
	};

	_sendJsonResponse(HttpStatus.BadRequest, res, error);
}

function _sendNotFoundError(res, message) {
	var error = {
		name: "ApiError",
		message: message
	};

	_sendJsonResponse(HttpStatus.NotFound, res, error);
}

exports.app = function(app) {
	app.get("/api/ping", function(req, res) {
		_sendJsonResponse(HttpStatus.OK, res, {
			ping: "pong"
		});
	});

	app.post("/api/items", function(req, res) {	
		// Title and description.
		var title = req.body.title;
		var description = req.body.description;

		// Category and tags.
		var category = req.body.category;
		var tags = req.body.tag;

		if (!title) {
			_sendApiError(res, "Title is required.");
			return;
		}

		if (!description) {
			_sendApiError(res, "Description is required.");
			return;
		}

		if (!category) {
			_sendApiError(res, "Category is required.");
			return;
		}

		// Feedback input parameters.
		var response = {
			itemId: Math.floor(Math.random() * 100000) + 1,
			title: title,
			description: description,
			category: category,
			tags: tags
		};

		res.send(HttpStatus.OK, response);
	});

	app.get("/api/items", function(req, res) {
		var response = [
			ladder,
			wheelbarrow,
			drill
		];

		_sendJsonResponse(HttpStatus.OK, res, response);
	});

	app.get("/api/items/:itemId", function(req, res) {	
		var itemId = parseInt(req.params.itemId, 10);
		var message;

		if (!itemId) {
			_sendNotFoundError(
				res,
				util.format("Item not found, itemId: %d.", itemId));

			return;
		}

		var response;

		switch (itemId) {
			case 1:
				response = ladder;
				break;

			case 2:
				response = wheelbarrow;
				break;

			default:
				response = drill;
				break;
		}

		_sendJsonResponse(HttpStatus.OK, res, response);
	});
};
