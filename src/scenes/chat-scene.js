const {Scenes} = require("telegraf");
const resendToAdmin = require("../resend-to-admin");
const getAdminChats = require("../utils/get-admin-chats");

const chatScene = new Scenes.BaseScene('chatScene');

chatScene.enter(async (ctx) => {
    await ctx.replyWithMarkdownV2('Ask your question or send `/menu` to go back')
})
chatScene.start(async ctx => {
    await ctx.scene.enter('menuScene')
})
chatScene.command('menu', async (ctx) => {
    await ctx.scene.enter('menuScene')
})

getAdminChats().forEach((chat) => {
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