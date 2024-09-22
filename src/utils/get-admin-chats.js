const getAdminChats = () => ([
    {
        id: +process.env.QA_ADMIN_CHAT_ID,
        threadIdKey: 'qa_thread_id',
        action: 'qa_enter',
        command: 'qa',
    },
    {
        id: +process.env.INFRASTRUCTURE_ADMIN_CHAT_ID,
        threadIdKey: 'infrastructure_thread_id',
        action: 'infrastructure_enter',
        command: 'infrastructure',
    },
    {
        id: +process.env.OFFICE_ADMIN_CHAT_ID,
        threadIdKey: 'office_thread_id',
        action: 'office_enter',
        command: 'office',
    }
])

module.exports = getAdminChats