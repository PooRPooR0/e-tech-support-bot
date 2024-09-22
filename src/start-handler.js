const isAdmin = require("./utils/is-admin");
const {languages, translations} = require("./utils/translations");
const {Scenes} = require("telegraf");
const getAdminChats = require("./utils/get-admin-chats");

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

            const adminChats = getAdminChats();

            const topics = await Promise.all(adminChats.map((chat) =>
                ctx.createForumTopic(ctx.update.message.from.username, {chat_id: chat.id})
            ))

            const newTopic = {
                chatId: ctx.update.message.chat.id
            }

            topics.forEach((topic, index) => {
                newTopic[adminChats[index].threadIdKey] = topic.message_thread_id
            })

            ctx.sessionDB.get('topics').push(newTopic).write()

            await Promise.all(adminChats.map((chat) =>
                ctx.sendMessage('User started chat', {chat_id: chat.id, message_thread_id: newTopic[chat.threadIdKey]})
            ))
        }
    } catch (error) {
        await ctx.reply('Sorry! I have some troubles :-(')
    }
}

module.exports = startHandler