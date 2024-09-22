const languages = ['en', 'ru']
const translations = {
    'en': {
        'start': 'Hi, colleague! This is an assistant bot. Choose where to address your question, then introduce yourself and write it',
        'menu': "Choose where to address your question",
        'chat': 'Introduce yourself and write your question or send `/menu` to go back'
    },
    'ru': {
        'start': 'Привет, коллега! Это бот-помощник. Выбери куда адресовать твой вопрос, затем представься и напиши его',
        'menu': 'Выбери куда адресовать твой вопрос',
        'chat': 'Представься и напиши свой вопрос или отправь `/menu` чтобы вернуться назад'
    }
}

module.exports = {
    languages: languages,
    translations: translations
}