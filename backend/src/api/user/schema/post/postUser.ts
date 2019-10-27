import Joi = require("@hapi/joi");
import moment from "moment";
import { UserRole } from "../../model/UserRole";

export const userPostSchema: Joi.Schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().required(),
    role: Joi.string().valid(UserRole.USER, UserRole.ADMIN).default(UserRole.USER),
    verification: Joi.string(),
    verified: Joi.boolean().default(false),
    phone: Joi.string(),
    city: Joi.string(),
    country: Joi.string(),
    urlTwitter: Joi.string(),
    urlGitHub: Joi.string().uri(),
    loginAttempts: Joi.number().default(0),
    blockExpires: Joi.string().default(moment().utc().toISOString()),
});
