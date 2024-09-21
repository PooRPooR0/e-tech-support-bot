const isAdmin = require("./is-admin");
const {languages, translations} = require("./translations");
const {Scenes} = require("telegraf");

const startHandler = async ctx => {
    try {
        if (isAdmin(ctx.update.message.chat.id)) await ctx.reply('Hi, admin')
        else {
            let userLang = ctx.update.message?.from?.language_code || 'en'
            if (!languages.includes(userLang)) userLang = 'en'

            await ctx.reply(translations[userLang].start)
            await ctx.scene.enter('menuScene')

            const userTopic = ctx.sessionDB
                .get('topics')
                .value()
                .find((tp) => tp.chatId === ctx.update.message.chat.id)

            if (!!userTopic) return;

            const topics = await Promise.all([
                ctx.createForumTopic(ctx.update.message.from.username, {chat_id: process.env.QA_ADMIN_CHAT_ID}),
                ctx.createForumTopic(ctx.update.message.from.username, {chat_id: process.env.INFRASTRUCTURE_ADMIN_CHAT_ID}),
                ctx.createForumTopic(ctx.update.message.from.username, {chat_id: process.env.OFFICE_ADMIN_CHAT_ID}),
            ])

            const newTopic = {
                qa_thread_id: topics[0].message_thread_id,
                infrastructure_thread_id: topics[1].message_thread_id,
                office_thread_id: topics[2].message_thread_id,
                chatId: ctx.update.message.chat.id
            }

            ctx.sessionDB.get('topics').push(newTopic).write()

            await Promise.all([
                ctx.sendMessage('User started chat', {chat_id: process.env.QA_ADMIN_CHAT_ID, message_thread_id: newTopic.qa_thread_id}),
                ctx.sendMessage('User started chat', {chat_id: process.env.INFRASTRUCTURE_ADMIN_CHAT_ID, message_thread_id: newTopic.infrastructure_thread_id}),
                ctx.sendMessage('User started chat', {chat_id: process.env.OFFICE_ADMIN_CHAT_ID, message_thread_id: newTopic.office_thread_id}),
            ])
        }
    } catch (error) {
        await ctx.reply('Sorry! I have some troubles :-(')
    }
}

module.exports = startHandler