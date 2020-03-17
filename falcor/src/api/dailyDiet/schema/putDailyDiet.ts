import Joi from "@hapi/joi";

export const dailyDietUpdateSchema: Joi.Schema = Joi.object().keys({
  dietId: Joi.string().required(),
  date: Joi.date().required(),
  dailyMeals: Joi.object().keys({
    breakfast: Joi.string().required(),
    morningSnack: Joi.string().required(),
    lunch: Joi.string().required(),
    afternoonSnack: Joi.string().required(),
    dinner: Joi.string().required()
  })
});
