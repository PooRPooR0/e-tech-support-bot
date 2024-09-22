const getAdminChats = require("./utils/get-admin-chats");
const resendToUser = async (ctx) => {
    const threadKey = getAdminChats().find(chat => ctx.update.message.chat.id === chat.id).threadIdKey

    const topic = ctx.sessionDB
        .get('topics')
        .value()
        .find((tp) => tp[threadKey] === ctx.update.message.message_thread_id)

    if (!topic) return;

    await ctx.copyMessage(topic.chatId)
}

module.exports = resendToUser