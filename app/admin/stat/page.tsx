"use client";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Question = {
    question_id: number;
    question_text: string;
    visit_count: number;
};

const StatPage: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/visit');
                const data = await response.json();
                // Sort questions by visit_count in descending order
                const sortedQuestions = data.questions.sort((a: Question, b: Question) => b.visit_count - a.visit_count);
                setQuestions(sortedQuestions.slice(0, 5));
            } catch (error) {
                console.error("Error fetching visit data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen text-3xl">
                <span className="text-lg font-bold">Loading...</span>
            </div>
        );
    }

    const questionLabels = questions.map((q) => q.question_text);
    const visitCounts = questions.map((q) => q.visit_count);

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
    };

    return (
        <>
            <div className="min-h-screen bg-[#F1EAFF] text-[#4a4a4a] font-sans font-bold">
                <main className="mt-32 p-5">
                    <section>
                        <h1 className="text-2xl text-[#82659D] mb-5">Statistics</h1>
                        {/* Flex container for the graph and text statistics */}
                        <div className="flex justify-between space-x-10">
                            {/* Graph on the left side */}
                            <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
                                <Bar data={data} options={options} />
                            </div>

                            {/* Text statistics on the right side */}
                            <div className="flex-1 bg-white p-6 rounded-lg shadow-lg">
                                <h2 className="text-xl font-bold mb-4">Most to Least Visited Questions</h2>
                                <ul className="list-disc pl-5">
                                    {questions.map((question) => (
                                        <li key={question.question_id} className="mb-2">
                                            <span className="font-semibold">{question.question_text}</span>: {question.visit_count} visits
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="mt-5 text-sm text-[#82659D]">
                            Last updated: {new Date().toLocaleString()}
                            <br />
                            refresh to update the statistics
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};

export default StatPage;