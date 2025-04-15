import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Необходимо определить MONGODB_URI в файле .env.local');
}

// Кеширование соединения для избежания повторных подключений
let cachedConnection = { conn: null, promise: null };

async function connectToDatabase() {
    // Если у нас уже есть соединение, возвращаем его
    if (cachedConnection.conn) {
        return cachedConnection.conn;
    }

    // Если попытка подключения уже в процессе, ждем ее завершения
    if (!cachedConnection.promise) {
        const opts = {
            bufferCommands: false,
        };

        // Создаем обещание подключения к MongoDB
        cachedConnection.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    // Ожидаем завершения подключения
    cachedConnection.conn = await cachedConnection.promise;
    return cachedConnection.conn;
}

export default connectToDatabase;