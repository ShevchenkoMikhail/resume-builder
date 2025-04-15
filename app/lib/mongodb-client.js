import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!uri) {
    throw new Error("Пожалуйста, добавьте MONGODB_URI в .env.local");
}

if (process.env.NODE_ENV === "development") {
    // В режиме разработки используем глобальную переменную для сохранения подключения
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // В режиме production создаем новое подключение
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;