import passport from "passport";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import { GraphQLLocalStrategy } from "graphql-passport";

export const configurePassport = async () => {
	passport.serializeUser((user, done) => { // serializeUser  is called when a user is authenticated. It determines how user information is stored in the session.
		console.log("Serializing user");
		done(null, user.id); // null indicating no error 
	});

	passport.deserializeUser(async (id, done) => { // deserializeUser  method is called when a request is made that requires user information from the session.
		console.log("Deserializing user");
		try {
			const user = await User.findById(id);
			done(null, user);
		} catch (err) {
			done(err);
		}
	});

	passport.use(
		new GraphQLLocalStrategy(async (username, password, done) => { // GraphQLLocalStrategy function will be called when a user attempts to log in with their username and password.
			try {
				const user = await User.findOne({ username });
				if (!user) {
					throw new Error("Invalid username or password");
				}
				const validPassword = await bcrypt.compare(password, user.password);

				if (!validPassword) {
					throw new Error("Invalid username or password");
				}

				return done(null, user);
			} catch (err) {
				return done(err);
			}
		})
	);
};