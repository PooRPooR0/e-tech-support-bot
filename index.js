const dotenv = require("dotenv");
const {Telegraf, Scenes} = require("telegraf");
const LocalSession = require('telegraf-session-local')
const startHandler = require("./src/start-handler");
const menuScene = require("./src/scenes/menu-scene");
const chatScene = require("./src/scenes/chat-scene");
const isAdmin = require("./src/is-admin");
const resendToAdmin = require("./src/resend-to-admin");
const resendToUser = require("./src/resend-to-user");
dotenv.config()

const bot = new Telegraf(process.env.API_KEY_BOT)

const localSession = new LocalSession({
    database: 'sessions.json',
    state: {
        topics: []
    }
})

const stage = new Scenes.Stage([menuScene, chatScene])

bot.use(localSession.middleware())
bot.use(stage.middleware());

bot.start(startHandler)
bot.on('message', async ctx => {
    try {
        if (ctx.update.message.from.is_bot) return;
        if (!isAdmin(ctx.update.message.chat.id)) return;
        await resendToUser(ctx)
    } catch (e) {
        console.log(e)
        await ctx.reply('Sorry! I have some troubles :-(')
    }
})

bot.launch()
console.log("Bot launched")
