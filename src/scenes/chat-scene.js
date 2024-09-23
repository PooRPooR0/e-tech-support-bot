const {Scenes} = require("telegraf");
const resendToAdmin = require("../resend-to-admin");
const getAdminChats = require("../utils/get-admin-chats");
const getUserLang = require("../utils/get-user-lang");
const {translations} = require("../utils/translations");

const chatScene = new Scenes.BaseScene('chatScene');

chatScene.enter(async (ctx) => {
    const userLang = getUserLang(ctx)

    await ctx.replyWithMarkdownV2(translations[userLang].chat)
})
chatScene.start(async ctx => {
    await ctx.scene.enter('menuScene')
})
chatScene.command('menu', async (ctx) => {
    await ctx.scene.enter('menuScene')
})

getAdminChats().forEach((chat) => {
    chatScene.action(chat.action, async (ctx) => {
        ctx.session.adminChatId = chat.id;
        ctx.session.threadKey = chat.threadIdKey
        await ctx.scene.enter('chatScene')
    })

    chatScene.command(chat.command, async (ctx) => {
        ctx.session.adminChatId = chat.id;
        ctx.session.threadKey = chat.threadIdKey
        await ctx.scene.enter('chatScene')
    })
})

chatScene.on("message", async (ctx) => {
    await resendToAdmin(ctx)
})

module.exports = chatScene
