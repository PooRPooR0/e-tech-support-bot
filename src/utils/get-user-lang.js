const {languages} = require("./translations");

const getUserLang = (ctx) => {
    let userLang = ctx.update.message?.from?.language_code || ctx.update.callback_query?.from?.language_code || 'en'
    if (!languages.includes(userLang)) userLang = 'en'

    return userLang
}

module.exports = getUserLang