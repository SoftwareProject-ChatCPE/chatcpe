"use client";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Card, Spinner } from "flowbite-react";
import Swal from 'sweetalert2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Question = {
    question_id: number;
    question_text: string;
    visit_count: number;
    category: {
        category_name: string;
    };
};

/**
 * displays statistics for the most visited questions.
 * It fetches data from an API endpoint and renders
 * a bar chart along with a list of questions and their visit counts.
 *
 * State:
 * - questions: An array of questions fetched from the API.
 * - loading: A boolean indicating if data is currently being loaded.
 * - error: A string to store error messages for display in the UI.
 *
 * Effects:
 * - Fetches visit data from the API endpoint '/api/visit' when the component
 *   is mounted. Handles errors and updates loading state accordingly.
 *
 * Methods:
 * - handleShowFullQuestion: Displays a full question text in a modal.
 *
 * UI Components:
 * - A loading spinner displayed while data is being fetched.
 * - An error message displayed if there is an error during data fetching.
 * - A bar chart displays the top 5 most visited questions using react-chartjs-2.
 * - A list of all questions along with their visit counts, truncated if necessary.
 *
 * Note: Inline utility functions handle data mapping and truncating long
 * question texts for better display.
 */
const Page: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // Track API errors

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/visit');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();

                if (!Array.isArray(data)) {
                    throw new Error('Invalid data structure: Expected an array of questions');
                }

                setQuestions(data); // Directly set the array of questions
            } catch (error) {
                console.error("Error fetching visit data:", error);
                setError((error as Error).message); // Set error message for UI
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleShowFullQuestion = (question_text: string) => {
        Swal.fire({
            title: 'Full Question',
            text: question_text,
            icon: 'info',
            confirmButtonText: 'Close',
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spinner size="xl" />
                <span className="ml-4 text-lg font-bold">Loading...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-600 text-lg">{error}</p>
            </div>
        );
    }


    const topQuestions = questions.slice(0, 5);  // Top 5 questions for the chart
    const questionLabels = topQuestions.map((q) => q.question_text);  // Top 5 questions only
    const visitCounts = topQuestions.map((q) => q.visit_count);  // Top 5 visit counts

    const data = {
        labels: questionLabels,
        datasets: [
            {
                label: "Visit Count",
                data: visitCounts,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Top 5 Most Visited Questions",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    /**
     * The maximum allowed length for a given string or input it is use for cutting the long text into "..." .
     *
     * @constant {number}
     */
    const MAX_LENGTH = 60;

    return (
        <>
            <div className="min-h-screen bg-[#F1EAFF] text-[#4a4a4a] font-sans font-bold">
                <main className="mt-16 p-5">
                    <section>
                        <h1 className="text-2xl text-[#82659D] mb-5">Statistics</h1>
                        {/* Flex container for the graph and text statistics */}
                        <div className="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0 md:space-x-6">
                            {/* Graph on the left side */}
                            <Card
                                className="flex-1 bg-white p-4 rounded-lg shadow-lg h-96"> {/* Set height explicitly */}
                                <Bar data={data} options={options}/>
                            </Card>

                            {/* Text statistics on the right side */}
                            <Card className="flex-1 bg-white p-4 rounded-lg shadow-lg h-96">
                                <h2 className="text-xl font-bold mb-2">Most to Least Visited Questions</h2>
                                <div className="overflow-y-auto max-h-full">
                                    <ul className="list-none pl-0 space-y-2">
                                        {questions.map((question) => {
                                            const truncatedQuestionText = question.question_text.length > MAX_LENGTH
                                                ? question.question_text.slice(0, MAX_LENGTH) + '...'
                                                : question.question_text;

                                            return (
                                                <li key={question.question_id} className="flex justify-between items-center">
                                                    <div
                                                        className="cursor-pointer max-w-xs truncate"
                                                        onClick={() => handleShowFullQuestion(question.question_text)}
                                                    >
                                                        <span className="font-semibold">{truncatedQuestionText}</span>
                                                    </div>
                                                    <div className="text-gray-500">{question.visit_count} visits</div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </Card>
                        </div>

                        <div className="mt-5 text-sm text-[#82659D]">
                            Last updated: {new Date().toLocaleString()}
                            <br/>
                            Refresh to update the statistics.
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};

export default Page;