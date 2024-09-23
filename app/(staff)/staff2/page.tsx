"use client";
import React, { useState } from "react";
import Link from "next/link";
import CircleFollowMouse from "../../components/CircleFollowMouse";
import Navbar from "../../components/navbar";

interface Question {
  id: number;
  text: string;
}

const QuestionManager: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestionText, setNewQuestionText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  const addQuestion = () => {
    if (newQuestionText.trim()) {
      const newQuestion: Question = {
        id: Date.now(), // Using timestamp as unique ID
        text: newQuestionText,
      };
      setQuestions([...questions, newQuestion]);
      setNewQuestionText("");
    }
  };

  const deleteQuestion = (id: number) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };

  const editQuestion = (id: number, text: string) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEditedQuestion = () => {
    setQuestions(
      questions.map((question) =>
        question.id === editingId
          ? { ...question, text: editingText }
          : question
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  return (
    <>
    <Navbar />
    <CircleFollowMouse />
      <div className="min-h-screen bg-[#F1EAFF] text-[#4a4a4a] font-sans font-bold">
        <main className="mt-32 p-5">
          <section>
            <h1 className="text-2xl text-[#82659D] mb-5">Question Manager</h1>

            <div>
              <input
                type="text"
                placeholder="Enter a new question"
                value={newQuestionText}
                onChange={(e) => setNewQuestionText(e.target.value)}
              />
              <button onClick={addQuestion} className="bg-[#9e7fec] text-[#E6FFFD] font-bold rounded-lg p-4 m-2 transition hover:bg-[#E5D9F2] hover:text-[#82659D] hover:scale-110">Add Question</button>
            </div>

            <ul>
              {questions.map((question) => (
                <li key={question.id}>
                  {editingId === question.id ? (
                    <div>
                      <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                      />
                      <button onClick={saveEditedQuestion} className="bg-[#9e7fec] text-[#E6FFFD] font-bold rounded-lg p-4 m-2 transition hover:bg-[#E5D9F2] hover:text-[#82659D] hover:scale-110">Save</button>
                    </div>
                  ) : (
                    <div>
                      {question.text}
                      <button onClick={() => deleteQuestion(question.id)} className="bg-[#9e7fec] text-[#E6FFFD] font-bold rounded-lg p-4 m-2 transition hover:bg-[#E5D9F2] hover:text-[#82659D] hover:scale-110">
                        Delete
                      </button>
                      <button
                        onClick={() => editQuestion(question.id, question.text)} className="bg-[#9e7fec] text-[#E6FFFD] font-bold rounded-lg p-4 m-2 transition hover:bg-[#E5D9F2] hover:text-[#82659D] hover:scale-110"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </>
  );
};

export default QuestionManager;
