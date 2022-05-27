const userservice = require("../service/user-service");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-erorr");

module.exports.registrFn = async (req, res, next) => {
	try {
		const errors = validationResult(req);

		console.log(errors.isEmpty());

		if (!errors.isEmpty()) {
			return next(ApiError.badRequest("Validation Error", errors.array()));
		}

		const { email, password } = req.body;
		const user = await userservice.registration(email, password);

		res.cookie("refreshToken", user.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		});

		res.status(200).json({
			status: "success",
			data: user,
		});
	} catch (err) {
		next(err);
	}
};

module.exports.loginFn = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const logindata = await userservice.login(email, password);

		res.cookie("refreshToken", logindata.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		});

		res.status(200).json({
			status: "success",
			message: "User Successfully Logined",
		});
	} catch (err) {
		next(err);
	}
};

module.exports.logoutFn = async (req, res, next) => {
	const { email } = req.body;
	try {
		const { refreshToken } = req.cookies;
		await userservice.logout(email, refreshToken);

		res.clearCookie("refreshToken");

		res.status(200).json({
			status: "success",
			message: "User successfully logout!",
		});
	} catch (err) {
		next(err);
	}
};

module.exports.activateFn = async (req, res) => { };

module.exports.refreshFn = async (req, res, next) => {
	try {
		const { refreshToken } = req.cookies;
		const refreshData = await userservice.refresh(refreshToken);
		res.cookie("refreshToken", refreshData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000 });

		res.status(200).json({
			"status": "success",
			"message": "Token refreshed!"
		})

	} catch (err) {
		next(err);
	}
};

module.exports.usersFn = async (req, res, next) => {
	try {

		const users = await userservice.getUsers();

		res.status(200).json({
			"status": "success",
			"data": users
		})

	} catch (err) {
		next(err);
	}
};
