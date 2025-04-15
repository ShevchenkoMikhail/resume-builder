'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
import Button from '@/app/components/ui/Button';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Если пользователь авторизован, показываем соответствующий контент
  // Не перенаправляем на другую страницу автоматически

  // Для отладки
  console.log("Статус сессии:", status);
  console.log("Данные сессии:", session);

  // Пока проверяем аутентификацию, показываем загрузку
  if (status === 'loading') {
    return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-2">Загрузка...</p>
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <main>
          {/* Hero section */}
          <div className="bg-white">
            <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
                  Создавайте профессиональные резюме
                </h1>
                <p className="mt-4 text-xl text-gray-500">
                  Resume Builder помогает быстро создать привлекательное резюме,
                  которое выделит вас среди других кандидатов.
                </p>
                <div className="mt-10">
                  {status === 'authenticated' ? (
                      <Button
                          onClick={() => router.push('/dashboard')}
                          className="px-8 py-3 text-lg"
                      >
                        Мои резюме
                      </Button>
                  ) : (
                      <Button
                          onClick={() => router.push('/auth/signin')}
                          className="px-8 py-3 text-lg"
                      >
                        Начать бесплатно
                      </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Features section */}
          <div className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900">
                  Все необходимые функции
                </h2>
                <p className="mt-4 text-lg text-gray-500">
                  Простой и интуитивно понятный процесс, который поможет создать идеальное резюме.
                </p>
              </div>

              <div className="mt-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="p-2 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Разнообразные шаблоны</h3>
                    <p className="mt-2 text-gray-500">
                      Выбирайте из нескольких профессионально разработанных шаблонов,
                      подходящих для любой отрасли.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="p-2 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Предварительный просмотр</h3>
                    <p className="mt-2 text-gray-500">
                      Видите изменения в реальном времени при редактировании резюме,
                      что упрощает процесс создания.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="p-2 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Экспорт в PDF</h3>
                    <p className="mt-2 text-gray-500">
                      Загружайте ваше резюме в формате PDF, готовом для отправки
                      работодателям или печати.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA section */}
          <div className="bg-blue-600">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                <span className="block">Готовы создать своё резюме?</span>
                <span className="block text-blue-200">Присоединяйтесь к нам бесплатно.</span>
              </h2>
              <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                <div className="inline-flex rounded-md shadow">
                  {status === 'authenticated' ? (
                      <Button
                          onClick={() => router.push('/dashboard')}
                          className="px-5 py-3 text-base font-medium bg-white text-blue-600 hover:bg-blue-50"
                      >
                        Мои резюме
                      </Button>
                  ) : (
                      <Button
                          onClick={() => router.push('/auth/signin')}
                          className="px-5 py-3 text-base font-medium bg-white text-blue-600 hover:bg-blue-50"
                      >
                        Начать сейчас
                      </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
  );
}