'use client';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import Link from "next/link";
import {Button, Spinner} from "flowbite-react";

type AnswerData = {
    answer_id: number;
    answer_text: string;
};

type QuestionData = {
    question_id: number;
    question_text: string;
    visit_count: number;
    category_id: number;
    created_at: string;
    updated_at: string;
    answer?: AnswerData; // Make answer optional
};

const QuestionPage = () => {
    const params = useParams();
    const { id } = params;
    const [questions, setQuestions] = useState<QuestionData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetch(`/api/question/${id}`)
                .then(response => response.json())
                .then(data => setQuestions(data))
                .catch(error => console.error('Error fetching question data:', error))
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen text-3xl">
                <Spinner size="xl"/>
                <span className="ml-4 text-lg font-bold">Loading...</span>
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen">
                <span>No questions available for this category.</span>
            </div>
        );
    }

    const handleButtonClick = async (questionId: number, answerText: string) => {
        try {
             fetch(`/api/visit/${questionId}`, {
                method: 'PUT',
            });
            Swal.fire({
                title: 'Answer',
                text: answerText,
                confirmButtonText: 'Close',
                timer: 5000,
                timerProgressBar: true,
            });
        } catch (error) {
            console.error('Error incrementing visit count:', error);
        }
    };

    return (
        <div className="min-h-screen bg-[#F1EAFF] text-[#4a4a4a] font-sans font-bold">
            <main className="mt-32 p-5">
                <section>
                    <h2 className="text-2xl text-[#82659D] mb-5">What Info Are You Seeking For?</h2>
                    <div className="flex flex-wrap justify-center">
                        {questions.map((question) => (
                            <button
                                key={question.question_id}
                                className="bg-[#9e7fec] text-[#E6FFFD] font-bold rounded-lg p-4 m-2 transition hover:bg-[#E5D9F2] hover:text-[#82659D] hover:scale-110"
                                onClick={() => handleButtonClick(question.question_id, question.answer?.answer_text || 'No answer available')}
                            >
                                {question.question_text}
                            </button>
                        ))}
                    </div>
                </section>
            </main>
            <Link href="/user">
                <Button
                    color="blue"
                    className="fixed bottom-7 right-7 shadow-lg rounded-full p-1 flex items-center"
                >
                    back
                </Button>
            </Link>
        </div>
    );
};

export default QuestionPage;