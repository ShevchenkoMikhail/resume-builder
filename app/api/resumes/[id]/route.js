import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectToDatabase from '@/app/lib/mongodb';
import Resume from '@/app/lib/models/Resume';

// GET: Получить конкретное резюме по ID
export async function GET(request, { params }) {
    try {
        const { id } = params;

        // Получаем сессию пользователя
        const session = await getServerSession(authOptions);

        // Если пользователь не авторизован, возвращаем ошибку
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;

        await connectToDatabase();
        const resume = await Resume.findOne({ _id: id, userId });

        if (!resume) {
            return NextResponse.json({ error: 'Резюме не найдено' }, { status: 404 });
        }

        return NextResponse.json(resume);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT: Обновить резюме
export async function PUT(request, { params }) {
    try {
        const { id } = params;

        // Получаем сессию пользователя
        const session = await getServerSession(authOptions);

        // Если пользователь не авторизован, возвращаем ошибку
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;
        const data = await request.json();

        await connectToDatabase();

        // Обновляем резюме и получаем обновленную версию
        // Убедимся, что обновляем только резюме текущего пользователя
        const updatedResume = await Resume.findOneAndUpdate(
            { _id: id, userId },
            { ...data, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        if (!updatedResume) {
            return NextResponse.json({ error: 'Резюме не найдено' }, { status: 404 });
        }

        return NextResponse.json(updatedResume);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE: Удалить резюме
export async function DELETE(request, { params }) {
    try {
        const { id } = params;

        // Получаем сессию пользователя
        const session = await getServerSession(authOptions);

        // Если пользователь не авторизован, возвращаем ошибку
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;

        await connectToDatabase();
        // Убедимся, что удаляем только резюме текущего пользователя
        const deletedResume = await Resume.findOneAndDelete({ _id: id, userId });

        if (!deletedResume) {
            return NextResponse.json({ error: 'Резюме не найдено' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Резюме успешно удалено' });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}