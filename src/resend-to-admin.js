const resendToAdmin = async (ctx) => {
    const userTopic = ctx.sessionDB
        .get('topics')
        .value()
        .find((tp) => tp.chatId === ctx.update.message.chat.id)

    if (!userTopic) return;

    await ctx.copyMessage(ctx.session.adminChatId, {message_thread_id: userTopic[ctx.session.threadKey]})
}

module.exports = resendToAdmin