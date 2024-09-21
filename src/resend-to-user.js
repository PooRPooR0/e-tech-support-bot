const resendToUser = async (ctx) => {
    const threadKey = {
        [process.env.QA_ADMIN_CHAT_ID]: 'qa_thread_id',
        [process.env.INFRASTRUCTURE_ADMIN_CHAT_ID]: 'infrastructure_thread_id',
        [process.env.OFFICE_ADMIN_CHAT_ID]: 'office_thread_id',
    }

    const topic = ctx.sessionDB
        .get('topics')
        .value()
        .find((tp) => tp[threadKey[`${ctx.update.message.chat.id}`]] === ctx.update.message.message_thread_id)

    if (!topic) return;

    await ctx.copyMessage(topic.chatId)
}

module.exports = resendToUser