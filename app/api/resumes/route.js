import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from '@/app/lib/mongodb';
import Resume from '@/app/lib/models/Resume';

// GET: Получить все резюме текущего пользователя
export async function GET() {
    try {
        // Получаем сессию пользователя
        const session = await getServerSession(authOptions);

        // Если пользователь не авторизован, возвращаем ошибку
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;

        await connectToDatabase();
        // Получаем все резюме пользователя и сортируем их по дате обновления (сначала новые)
        const resumes = await Resume.find({ userId }).sort({ updatedAt: -1 });

        return NextResponse.json(resumes);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Создать новое резюме для текущего пользователя
export async function POST(request) {
    try {
        // Получаем сессию пользователя
        const session = await getServerSession(authOptions);

        // Если пользователь не авторизован, возвращаем ошибку
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;
        const data = await request.json();

        await connectToDatabase();

        // Ограничение на количество резюме (максимум 4)
        const count = await Resume.countDocuments({ userId });
        if (count >= 4) {
            return NextResponse.json(
                { error: "Вы достигли максимального количества резюме (4). Удалите одно из существующих, чтобы создать новое." },
                { status: 400 }
            );
        }

        // Создаем новое резюме с полученными данными и ID пользователя
        const resume = new Resume({
            ...data,
            userId
        });

        await resume.save();

        // Возвращаем созданное резюме со статусом 201 (Created)
        return NextResponse.json(resume, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}