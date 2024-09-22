const getAdminChats = require("./get-admin-chats");

const isAdmin = (userChatId) => getAdminChats()
    .map(chat => chat.id)
    .includes(userChatId)

module.exports = isAdmin