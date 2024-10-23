// app/user/page.tsx

"use client";
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import UserNavbar from '@/app/components/UserNavbar';

type Category = {
  category_id: number;
  category_name: string;
  created_at: string;
  updated_at: string;
};

const Selectpage = () => {
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
        <div className="flex items-center justify-center h-screen">
          <span className="visually-hidden">Loading...</span>
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
                        className="bg-[#9e7fec] text-[#E6FFFD] font-bold rounded-lg p-4 m-2 transition hover:bg-[#E5D9F2] hover:text-[#82659D] hover:scale-110"
                    >
                      {category.category_name}
                    </Link>
                ))}
                <Link href="/user/floormap" className="bg-[#9e7fec] text-[#E6FFFD] font-bold rounded-lg p-4 m-2 transition hover:bg-[#E5D9F2] hover:text-[#82659D] hover:scale-110">
                  Floor map
                </Link>
              </div>
            </section>
          </main>
        </div>
      </>
  );
}

export default Selectpage;