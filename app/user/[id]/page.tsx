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
    answer: AnswerData;
};

/**
 * The `QuestionPage` component fetches and displays a list of questions based on the given category ID.
 *
 * This component uses the `useParams` hook from React Router to retrieve the category ID from the URL
 * and fetches the corresponding questions from the server. It handles the loading state while fetching,
 * and displays appropriate messages when there are no questions available or when questions are being loaded.
 *
 * Once the questions are fetched, it displays them in buttons. Clicking on a button displays the answer
 * to the question and increments the visit count for that question on the server.
 *
 * External Dependencies:
 * - `useParams` from `react-router-dom`
 * - `useState` and `useEffect` hooks from `react`
 * - `Spinner` component for loading indicator
 * - `Swal` for displaying alert messages
 * - `Link` component for navigation
 * - `Button` component for styling
 *
 * State Variables:
 * - `questions`: Array of question objects fetched from the server.
 * - `loading`: Boolean indicating whether the data is still being loaded.
 */
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
                <Button as={Link} href="/user"
                    color='light' pill
                    className="fixed bottom-7 right-7 p-1 flex items-center bg-[#9e7fec] text-white"
                >
                    back
                </Button>
        </div>
    );
};

export default QuestionPage;