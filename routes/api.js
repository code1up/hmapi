// Util.
var util = require("util");

var HttpStatus = {
	OK: 200,
	BadRequest: 400,
	NotFound: 404,
	ServerError: 500
};

function _sendApiError(res, message) {
	var error = {
		name: "ApiError",
		message: message
	};

	res.send(HttpStatus.BadRequest, error);
}

function _sendNotFoundError(res, message) {
	var error = {
		name: "ApiError",
		message: message
	};

	res.send(HttpStatus.NotFound, error);
}

exports.app = function(app) {
	app.post("/api/item", function(req, res) {	
		// Title and description.
		var title = req.body.title;
		var description = req.body.description;

		// Category and tags.
		var category = req.body.category;
		var tags = req.body.tags;

		res.contentType("application/json");

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
			title: title
		};

		console.log(response);
		res.send(HttpStatus.OK, response);
	});

	app.get("/api/item", function(req, res) {	
		_sendApiError(res, "ItemId is required.");
	});

	app.get("/api/item/:itemId", function(req, res) {	
		var itemId = parseInt(req.params.itemId, 10);
		var message;

		if (!itemId) {
			_sendNotFoundError(
				res,
				util.format("Item not found, itemId: %d.", itemId));

			return;
		}

		var title;
		var description;
		var category;
		var tags;

		switch (itemId) {
			case 1:
				title = "Ladder";
				description = "It's a ladder.";
				category = "Home";
				tags = [
					"red",
					"long"
				];

				break;

			case 2:
				title = "Wheelbarrow";
				description = "Two handles.";
				category = "Home";
				tags = [
					"rusty"
				];

				break;

			default:
				title = "Drill";
				description = "Hammer action.";
				category = "DIY";

				break;
		}

		var response = {
			itemId: itemId,
			title: title,
			description: description,
			category: category,
			tags: tags
		};

		res.send(HttpStatus.OK, response);
	});
};
