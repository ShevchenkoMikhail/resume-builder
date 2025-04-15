'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    // Для отладки
    console.log("AuthGuard - статус:", status);
    console.log("AuthGuard - сессия:", session);

    useEffect(() => {
        if (status === "unauthenticated") {
            console.log("Пользователь не авторизован, перенаправление на /auth/signin");
            router.push("/auth/signin");
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                    <p className="mt-2">Загрузка...</p>
                </div>
            </div>
        );
    }

    if (status === "authenticated") {
        return <>{children}</>;
    }

    return null;
}