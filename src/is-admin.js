const isAdmin = (userChatId) => [
    +process.env.QA_ADMIN_CHAT_ID,
    +process.env.INFRASTRUCTURE_ADMIN_CHAT_ID,
    +process.env.OFFICE_ADMIN_CHAT_ID
].includes(userChatId)

module.exports = isAdmin