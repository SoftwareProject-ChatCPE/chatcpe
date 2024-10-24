'use client';
import React, { useState, useEffect } from 'react';
import {Table, Button, Modal, Spinner, Textarea} from 'flowbite-react';
import Swal from 'sweetalert2';
import {useParams} from 'next/navigation';
import Link from "next/link";


type Answer = {
    answer_id: number;
    answer_text: string;
};

type Question = {
    question_id: number;
    question_text: string;
    visit_count: number;
    category_id: number;
    created_at: string;
    updated_at: string;
    answer: Answer;
};

const QuestionManagement = () => {
    const params = useParams(); // Use useParams to get the dynamic category ID
    const { category_id } = params; // Get the category ID from params
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newQuestion, setNewQuestion] = useState<string>('');
    const [newAnswer, setNewAnswer] = useState<string>('');
    const [editQuestionId, setEditQuestionId] = useState<number | null>(null);
    const [editQuestionText, setEditQuestionText] = useState<string>('');
    const [editAnswerText, setEditAnswerText] = useState<string>('');



    // Fetch all questions for the specific category
    const fetchQuestions = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/question/${category_id}`); // Use the category_id in the API call
            const data = await response.json();
            setQuestions(Array.isArray(data) ? data : []); // Ensure that data is an array
        } catch (error) {
            console.error('Failed to fetch questions:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (category_id) {
            fetchQuestions();
        }
    }, [category_id]);

    // Open the modal for adding a new question
    const handleOpenAddModal = () => {
        // Clear the form fields
        setEditQuestionId(null);
        setNewQuestion('');
        setNewAnswer('');
        setEditQuestionText('');
        setEditAnswerText('');
        setIsModalOpen(true); // Open the modal
    };

    // Open the modal for editing a question
    const handleOpenEditModal = (question: Question) => {
        // Populate the form fields with the selected question's data
        setEditQuestionId(question.question_id);
        setEditQuestionText(question.question_text);
        setEditAnswerText(question.answer?.answer_text || '');
        setIsModalOpen(true); // Open the modal
    };

    // Add new question and answer
    const handleAddQuestion = async () => {
        if (!newQuestion || !newAnswer) {
            Swal.fire('Error', 'Both question text and answer text are required', 'error');
            return;
        }
        try {
            const response = await fetch('/api/question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question_text: newQuestion,
                    visit_count: 0,
                    category_id: Number(category_id), // Convert category_id to number
                    answer_text: newAnswer,
                }),
            });

            if (response.ok) {
                Swal.fire({
                    title: 'Success',
                    text: 'Question added successfully',
                    icon: 'success',
                    timer: 1000,
                    timerProgressBar: true,
                });
                fetchQuestions();
                setNewQuestion('');
                setNewAnswer('');
                setIsModalOpen(false); // Close the modal
            } else {
                const errorData = await response.json();
                Swal.fire('Error', errorData.error || 'Failed to add question', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Something went wrong', 'error');
        }
    };

    // Edit question text
    const handleEditQuestion = async () => {
        if (!editQuestionText || !editAnswerText) {
            Swal.fire('Error', 'Both question text and answer text are required', 'error');
            return;
        }

        try {
            const response = await fetch(`/api/question/${editQuestionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question_text: editQuestionText,
                    answer_text: editAnswerText,
                }),
            });

            if (response.ok) {
                Swal.fire('Success', 'Question and answer updated successfully', 'success');
                fetchQuestions();
                setIsModalOpen(false); // Close the modal
            } else {
                const errorData = await response.json();
                Swal.fire('Error', errorData.error || 'Failed to update question and answer', 'error');
            }
        } catch (error) {
            console.error('Error updating question and answer:', error);
            Swal.fire('Error', 'Something went wrong', 'error');
        }
    };

    // Delete question and its related answer
    const handleDeleteQuestion = async (questionId: number) => {
        try {
            const response = await fetch(`/api/question/${questionId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                Swal.fire('Success', 'Question deleted successfully', 'success');
                fetchQuestions();
            } else {
                const errorData = await response.json();
                Swal.fire('Error', errorData.error || 'Failed to delete question', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Something went wrong', 'error');
        }
    };



    return (
        <div className="min-h-screen bg-gray-100 p-8 relative mt-16">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-[#8366CD]">Manage Questions and Answers</h1>
                <Button onClick={handleOpenAddModal} color="purple">
                    Add Question
                </Button>
            </div>

            <Table hoverable className="bg-white shadow-md rounded-lg">
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>Question</Table.HeadCell>
                    <Table.HeadCell>Answer</Table.HeadCell>
                    <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {loading ? (
                        <tr>
                            <td colSpan={4} className="text-center p-4">
                                <Spinner size="xl"/>
                                <span className="ml-4 text-lg font-bold">Loading...</span>
                            </td>
                        </tr>
                    ) : questions.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="text-center p-4">No questions available for this category.</td>
                        </tr>
                    ) : (
                        questions.map((question) => (
                            <Table.Row key={question.question_id} className="bg-white">
                                <Table.Cell>{question.question_id}</Table.Cell>
                                <Table.Cell className="whitespace-normal break-words max-w-xs">
                                    {question.question_text}
                                </Table.Cell>
                                <Table.Cell className="whitespace-normal break-words max-w-xs">
                                    {question.answer?.answer_text || 'No answer'}
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="flex space-x-2">
                                        <Button
                                            onClick={() => handleOpenEditModal(question)}
                                            color="warning"
                                            size="xs"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => handleDeleteQuestion(question.question_id)}
                                            color="failure"
                                            size="xs"
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    )}
                </Table.Body>
            </Table>
            <Button as={Link} href="/admin/category"
                    color='light' pill
                    className="fixed bottom-7 right-7 p-1 flex items-center bg-[#9e7fec] text-white"
            >
                back
            </Button>
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Modal.Header>{editQuestionId ? 'Edit Question' : 'Add Question'}</Modal.Header>
                <Modal.Body>
                    {/* Question Label and Textarea */}
                    <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                    <Textarea
                        value={editQuestionId ? editQuestionText : newQuestion}
                        onChange={(e) => {
                            if (editQuestionId) {
                                setEditQuestionText(e.target.value);
                            } else {
                                setNewQuestion(e.target.value);
                            }
                        }}
                        placeholder="Enter your question"
                        rows={3} // Adjust rows if needed
                        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    />

                    {/* Answer Label and Textarea */}
                    <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
                    <Textarea
                        value={editQuestionId ? editAnswerText : newAnswer}
                        onChange={(e) => {
                            if (editQuestionId) {
                                setEditAnswerText(e.target.value);
                            } else {
                                setNewAnswer(e.target.value);
                            }
                        }}
                        placeholder="Enter your answer"
                        rows={3} // Adjust rows if needed
                        className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={editQuestionId ? handleEditQuestion : handleAddQuestion}
                        color="purple"
                    >
                        {editQuestionId ? 'Update Question' : 'Add Question'}
                    </Button>
                    <Button color="gray" onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
          
        </div>
    );
};

export default QuestionManagement;