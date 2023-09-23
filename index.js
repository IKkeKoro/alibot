const token = "6562175959:AAFV-AC9j8-5CWYNvl-0DxQ5LajVIIIdr1E"

const TelegramApi = require('node-telegram-bot-api') 


const bot = new TelegramApi(token, {polling: true})

const chats = {}

const gameOpt =  {
    reply_markup: JSON.stringify( {
        inline_keyboard: [
            [{text: '1', callback_data: '1'},{text: '2', callback_data: '2'},{text: '3', callback_data: '3'}],
            [{text: '4', callback_data: '4'},{text: '5', callback_data: '5'},{text: '6', callback_data: '6'}],
            [{text: '7', callback_data: '7'},{text: '8', callback_data: '8'},{text: '9', callback_data: '9'}],
            [{text: '0', callback_data: '0'}]
        ]
    })
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'начало работы'},
        {command: '/info', description: 'информация'},
        {command: '/game', description: 'game'},
    ])
    
    
    bot.on( 'message', async msg => {
        console.log(msg)
    
        const text = msg.text
        const chatId = msg.chat.id
        if( text === '/start') {
            return bot.sendMessage(chatId, 'Привет! Это чат-бот для быстрого поиска товаров.\n\nНапиши номер товара боту и мы отправим тебе всю информацию. \n \nНапример:  4123')
        }
    
        if(text === '/info')
            return bot.sendMessage(chatId, 'VI VSE INFO')

        if(text === '/game') {
            await bot.sendMessage(chatId, 'choose nmbr')
            const randomNumber = Math.floor(Math.random() * 10)
            chats[chatId] = randomNumber

            return bot.sendMessage(chatId, 'choose', gameOpt)
        }
    
        return bot.sendMessage(chatId,'i dont get it')
    })

    bot.on('callback_query', async msg => {
        const data = msg.data
        const chatId = msg.message.chat.id
        if(data == chats[chatId]) {
            return bot.sendMessage(chatId,'ты отгодал')
        } else {
            return bot.sendMessage(chatId,'sosatb')
        }
    })
}

start()