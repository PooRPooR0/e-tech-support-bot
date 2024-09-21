const {Scenes, Markup} = require("telegraf");

const menuScene = new Scenes.BaseScene('menuScene');

menuScene.enter(async ctx => {
    ctx.session.adminChatId = null;
    ctx.session.threadKey = null;
    await ctx.reply('menu scene entered', Markup.inlineKeyboard([
        Markup.button.callback('QA', 'qa_enter'),
        Markup.button.callback('Infrastructure', 'infrastructure_enter'),
        Markup.button.callback('Office', 'office_enter'),
    ]));
})
menuScene.action('qa_enter', async (ctx) => {
    ctx.session.adminChatId = +process.env.QA_ADMIN_CHAT_ID;
    ctx.session.threadKey = 'qa_thread_id'
    await ctx.scene.enter('chatScene')
})
menuScene.action('infrastructure_enter', async (ctx) => {
    ctx.session.adminChatId = +process.env.INFRASTRUCTURE_ADMIN_CHAT_ID;
    ctx.session.threadKey = 'infrastructure_thread_id'
    await ctx.scene.enter('chatScene')
})
menuScene.action('office_enter', async (ctx) => {
    ctx.session.adminChatId = +process.env.OFFICE_ADMIN_CHAT_ID;
    ctx.session.threadKey = 'office_thread_id'
    await ctx.scene.enter('chatScene')
})

module.exports = menuScene;