"use client";
import { useState, useEffect } from 'react';
import Link from "next/link";
import { Session } from "next-auth";
import {Spinner, Button, Card, Flowbite} from 'flowbite-react';

/**
 * The `Home` component represents the main page of the application.
 * It initializes and manages the state for the current session and top questions.
 * This component also provides a carousel to display the top questions, and buttons for navigating between them.
 *
 * @return The rendered JSX of the Home component.
 */
export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<{ question_id: number; question_text: string; answer: { answer_text: string } }[]>([]);
  const customTheme = {
    button: {
      color: {
        primary: 'bg-[#d3c8e8] hover:bg-[#e4dcf2]',
      },
    },
  };
  // Fetch the session and top 5 questions from /api/visit
  useEffect(() => {
    const fetchSessionAndData = async () => {
      try {
        // Fetch session
        const sessionResponse = await fetch('/api/session');
        const sessionData = await sessionResponse.json();
        setSession(sessionData.session);

        // Fetch top 5 questions from /api/visit
        const questionsResponse = await fetch('/api/visit');
        const questionsData = await questionsResponse.json();
        setQuestions(questionsData.slice(0, 5)); // Only take the top 5
      } catch (error) {
        console.error('Failed to fetch session or questions', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionAndData();
  }, []);

  // Set interval for carousel rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length);
    }, 5000); // Change message every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [questions.length]);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + questions.length) % questions.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  return (
      <Flowbite theme={{ theme: customTheme }}>
        <main className="bg-[#F1EAFF] p-6 flex flex-col items-center mt-[3%] z-40 relative min-h-screen">
          <h1 className="text-[#8366CD] text-6xl mb-4 font-montserrat font-extrabold mt-10">
            Welcome to ChatCPE
          </h1>
          <p className="text-[#ad94f7] text-2xl mb-8 font-montserrat font-semibold">
            A basic screening bot
          </p>

          <div className="flex space-x-4 z-50">
            <Button className="w-40 font-montserrat font-extrabold bg-[#8366CD]" as={Link} href={'/user'}>
             Enter
            </Button>

            <div className="relative z-50">
              {session ? (
                  <Button className="w-40 font-montserrat font-extrabold bg-green-100" color="green" as={Link} href={'/admin'}>
                    Dashboard
                  </Button>
              ) : (
                  <Button className="w-40 font-montserrat font-extrabold bg-[#8366CD]" as={Link} href={'/sign-in'}>
                   Sign-in
                  </Button>
              )}
              {!session && (
                  <p className="text-sm text-red-500 mt-2 absolute -bottom-6 left-8">
                    ** for staff only
                  </p>
              )}
            </div>
          </div>

          {/* Questions Carousel Section */}
          <div className="w-full max-w-xl mt-8 z-10">
            <h2 className="text-lg text-[#8366CD] font-bold text-center mb-4 mt-4">
              Here are some of our questions that we can answer
            </h2>

            {loading ? (
                <div className="flex justify-center">
                  <Spinner size="lg" />
                </div>
            ) : (
                <div className="relative h-24 overflow-hidden text-center text-2xl text-purple-700 font-semibold">
                  {questions.length > 0 && (
                      <div key={questions[currentIndex]?.question_id} className="absolute w-full">
                        <Card className="p-4 shadow-md rounded-lg bg-transparent border-0">
                          <p className="text-lg text-[#8366CD] font-bold">
                            {questions[currentIndex]?.question_text}
                          </p>
                          {/*<p className="text-gray-600 mt-4">*/}
                          {/*  <strong>Answer:</strong> {questions[currentIndex]?.answer.answer_text}*/}
                          {/*</p>*/}
                        </Card>
                      </div>
                  )}
                </div>
            )}

            {/* Carousel Navigation Buttons */}
            <div className="flex justify-center space-x-4 mt-4">
              <Button
                  onClick={handlePrevClick}
                  className="font-semibold w-24"
                  size="xs" color="primary"
                  disabled={loading || questions.length === 0}
              >
                &lt; Prev
              </Button>
              <Button
                  onClick={handleNextClick}
                  className="font-semibold w-24 bg-[#d3c8e8]"
                  size="xs" color="primary"
                  disabled={loading || questions.length === 0}
              >
                Next &gt;
              </Button>
            </div>
          </div>

          {/* Background circles */}
          <div className="absolute inset-0 z-0">
            <ul className="circles">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
        </main>
      <style jsx>{`
        @keyframes slideLeft {
          0% { transform: translateX(100%); opacity: 0; }
          10%, 90% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(-100%); opacity: 0; }
        }
       
      `}</style>
      </Flowbite>
  );
}