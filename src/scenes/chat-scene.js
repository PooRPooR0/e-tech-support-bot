const {Scenes} = require("telegraf");
const resendToAdmin = require("../resend-to-admin");

const chatScene = new Scenes.BaseScene('chatScene');

chatScene.enter(async (ctx) => {
    await ctx.replyWithMarkdownV2('Ask your question, when you finish, send `/leave`')
})
chatScene.command('leave', async (ctx) => {
    await ctx.scene.enter('menuScene')
})
chatScene.on("message", async (ctx) => {
    await resendToAdmin(ctx)
})

module.exports = chatScene