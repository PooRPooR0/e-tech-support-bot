const {Scenes, Markup} = require("telegraf");
const getAdminChats = require("../utils/get-admin-chats");
const getUserLang = require("../utils/get-user-lang");
const {translations} = require("../utils/translations");

const menuScene = new Scenes.BaseScene('menuScene');

menuScene.enter(async ctx => {
    ctx.session.adminChatId = null;
    ctx.session.threadKey = null;

    const userLang = getUserLang(ctx)

    await ctx.reply(translations[userLang].menu, Markup.inlineKeyboard([
        Markup.button.callback('QA', 'qa_enter'),
        Markup.button.callback('Infrastructure', 'infrastructure_enter'),
        Markup.button.callback('Office', 'office_enter'),
    ]));
})

getAdminChats().forEach((chat) => {
    menuScene.action(chat.action, async (ctx) => {
        ctx.session.adminChatId = chat.id;
        ctx.session.threadKey = chat.threadIdKey
        await ctx.scene.enter('chatScene')
    })

    menuScene.command(chat.command, async (ctx) => {
        ctx.session.adminChatId = chat.id;
        ctx.session.threadKey = chat.threadIdKey
        await ctx.scene.enter('chatScene')
    })
})

module.exports = menuScene;