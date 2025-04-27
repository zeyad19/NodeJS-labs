const joi = require('joi');
const createTodoSchema = joi.object({
    title:joi.string().required().min(3).max(50),
    status:joi.string().valid("to-do","in-progress","done").default("to-do"),
    time:joi.date(),
    userId:joi.string().required()
})

module.exports = createTodoSchema