'use client';

import { useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Button from '@/app/components/ui/Button';

export default function Donate() {
    const [amount, setAmount] = useState('10');
    const [paymentMethod, setPaymentMethod] = useState('card');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Спасибо за вашу поддержку! Пожертвование на сумму ${amount}€ будет обработано.`);
        // В реальном проекте здесь будет логика обработки платежа
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />

            <main className="py-12">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-3">Поддержите Resume Builder</h1>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Ваши пожертвования помогают нам улучшать сервис, добавлять новые шаблоны
                            и поддерживать работу нашего проекта. Мы очень ценим любую помощь!
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                        <h2 className="text-2xl font-bold mb-6">Сделать пожертвование</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Выберите сумму
                                </label>
                                <div className="grid grid-cols-4 gap-4">
                                    {['5', '10', '25', '50'].map((value) => (
                                        <button
                                            key={value}
                                            type="button"
                                            className={`py-2 px-4 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                                                amount === value
                                                    ? 'bg-blue-600 text-white border-blue-600'
                                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                            }`}
                                            onClick={() => setAmount(value)}
                                        >
                                            {value}€
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Другая сумма
                                    </label>
                                    <div className="relative rounded-md shadow-sm">
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="10"
                                            min="1"
                                            step="1"
                                        />
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-gray-500 sm:text-sm">€</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Способ оплаты
                                </label>
                                <div className="space-y-3">
                                    <div className="relative flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="card"
                                                name="paymentMethod"
                                                type="radio"
                                                checked={paymentMethod === 'card'}
                                                onChange={() => setPaymentMethod('card')}
                                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="card" className="font-medium text-gray-700">
                                                Банковская карта
                                            </label>
                                            <p className="text-gray-500">Visa, MasterCard, Maestro</p>
                                        </div>
                                    </div>

                                    <div className="relative flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="crypto"
                                                name="paymentMethod"
                                                type="radio"
                                                checked={paymentMethod === 'crypto'}
                                                onChange={() => setPaymentMethod('crypto')}
                                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="crypto" className="font-medium text-gray-700">
                                                Криптовалюта
                                            </label>
                                            <p className="text-gray-500">Bitcoin, Ethereum, USDT</p>
                                        </div>
                                    </div>

                                    <div className="relative flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="revolut"
                                                name="paymentMethod"
                                                type="radio"
                                                checked={paymentMethod === 'revolut'}
                                                onChange={() => setPaymentMethod('revolut')}
                                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="revolut" className="font-medium text-gray-700">
                                                Revolut
                                            </label>
                                            <p className="text-gray-500">Быстрые переводы внутри системы</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button type="submit" className="w-full py-3">
                                Сделать пожертвование
                            </Button>

                            <p className="mt-3 text-xs text-center text-gray-500">
                                Нажимая кнопку, вы соглашаетесь с тем, что ваши данные будут обрабатываться в соответствии
                                с нашей политикой конфиденциальности.
                            </p>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}