const isAdmin = require("./is-admin");
const resendToUser = require("./resend-to-user");
const resendToAdmin = require("./resend-to-admin");

const messageHandler = async (ctx) => {
    try {
        if (ctx.update.message.from.is_bot) return;

        if (isAdmin(ctx.update.message.chat.id)) await resendToUser(ctx)
        else await resendToAdmin(ctx)
    } catch (_) {
        await ctx.reply('Sorry! I have some troubles :-(')
    }
}

module.exports = messageHandler