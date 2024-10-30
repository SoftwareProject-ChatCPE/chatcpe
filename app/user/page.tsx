"use client";
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import {Spinner} from "flowbite-react";

type Category = {
  category_id: number;
  category_name: string;
  created_at: string;
  updated_at: string;
};

/**
 * SelectPage component fetches categories from the API and renders them as links.
 *
 * This component manages its own state using hooks:
 * - `categories`: an array of category objects retrieved from the API.
 * - `loading`: a boolean indicating whether the fetch request is in progress.
 *
 * The component uses a `useEffect` hook to fetch category data when the component is mounted.
 * It makes an asynchronous request to '/api/category/' and updates the state with the received data.
 * In case of an error, it logs the error to the console.
 *
 * While the data is being fetched, a loading spinner is displayed.
 * Once the data is fetched, the categories are display as clickable links.
 *
 * Each category link navigates to `/user/{category_id}`.
 * An additional link to the floor map is also provided.
 */
const SelectPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/category/');
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
        <div className="flex items-center justify-center h-screen text-3xl">
          <Spinner size="xl"/>
          <span className="ml-4 text-lg font-bold">Loading...</span>
        </div>
    );
  }

  return (
      <>
        <div className="min-h-screen bg-[#F1EAFF] text-[#4a4a4a] font-sans font-bold">
          <main className="mt-32 p-5">
            <section>
              <h2 className="text-2xl text-[#82659D] mb-5">What Info Are You Seeking For?</h2>
              <div className="flex flex-wrap justify-center">
                {categories.map((category) => (
                    <Link
                        key={category.category_id}
                        href={`/user/${category.category_id}`}
                        className="bg-[#9e7fec] text-white rounded-lg p-4 m-2 transition hover:bg-[#E5D9F2] hover:text-[#82659D] hover:scale-110"
                    >
                      {category.category_name}
                    </Link>
                ))}
                <Link href="/user/floormap" className="bg-[#9e7fec] text-white font-bold rounded-lg p-4 m-2 transition hover:bg-[#E5D9F2] hover:text-[#82659D] hover:scale-110">
                  Floor map
                </Link>
              </div>
            </section>
          </main>
        </div>
      </>
  );
}

export default SelectPage;