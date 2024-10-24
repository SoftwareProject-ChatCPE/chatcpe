'use client';
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Spinner, Textarea } from 'flowbite-react';
import Swal from 'sweetalert2';
import Link from 'next/link';

type Category = {
    category_id: number;
    category_name: string;
    created_at: string;
    updated_at: string;
    _count: {
        questions: number;
    };
};

const CategoryManagement = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCategory, setNewCategory] = useState<string>('');
    const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
    const [editCategoryName, setEditCategoryName] = useState<string>('');

    // Fetch categories from the API
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/category');
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Open Add Modal: Clear inputs before opening
    const handleOpenAddModal = () => {
        setNewCategory(''); // Clear the category name for new entry
        setEditCategoryId(null); // Clear the editing ID
        setEditCategoryName(''); // Clear the editing category name
        setIsModalOpen(true); // Open the modal
    };

    // Open Edit Modal: Populate the fields with the category info
    const handleOpenEditModal = (category: Category) => {
        setEditCategoryId(category.category_id); // Set the ID to be edited
        setEditCategoryName(category.category_name); // Populate the field with the category name
        setIsModalOpen(true); // Open the modal
    };

    // Add new category
    const handleAddCategory = async () => {
        try {
            const response = await fetch('/api/category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ category_name: newCategory }),
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Category added successfully',
                    timer: 1000,
                });
                fetchCategories();
                setNewCategory('');
                setIsModalOpen(false);
            } else {
                const errorData = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: errorData.error || 'Failed to add category',
                    timer: 1000,
                });
            }
        } catch (error) {
            Swal.fire('Error', 'Something went wrong', 'error');
        }
    };

    // Edit category
    const handleEditCategory = async () => {
        if (editCategoryId === null) return;
        try {
            const response = await fetch(`/api/category/${editCategoryId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ category_name: editCategoryName }),
            });

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Category updated successfully',
                    timer: 1000,
                });
                fetchCategories();
                setEditCategoryId(null);
                setEditCategoryName('');
                setIsModalOpen(false);
            } else {
                const errorData = await response.json();
                Swal.fire({
                    icon: 'error',
                    title: errorData.error || 'Failed to update category',
                    timer: 1000,
                });
            }
        } catch (error) {
            Swal.fire('Error', 'Something went wrong', 'error');
        }
    };

    // Delete category
    const handleDeleteCategory = async (categoryId: number) => {
        try {
            const response = await fetch(`/api/category/${categoryId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                Swal.fire('Success', 'Category deleted successfully', 'success');
                fetchCategories();
            } else {
                const errorData = await response.json();
                Swal.fire('Error', errorData.error || 'Failed to delete category', 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Something went wrong', 'error');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 relative mt-16">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-[#8366CD]">Manage Categories</h1>
                <Button onClick={handleOpenAddModal} color="purple">
                    Add Category
                </Button>
            </div>

            <Table hoverable className="bg-white shadow-md rounded-lg">
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>Category Name</Table.HeadCell>
                    <Table.HeadCell>Number of Questions</Table.HeadCell>
                    <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {loading ? (
                        <tr>
                            <td colSpan={4} className="text-center p-4">
                                <Spinner size="xl" />
                                <span className="ml-4 text-lg font-bold">Loading...</span>
                            </td>
                        </tr>
                    ) : (
                        categories.map((category) => (
                            <Table.Row key={category.category_id} className="bg-white">
                                <Table.Cell>{category.category_id}</Table.Cell>
                                <Table.Cell className="whitespace-normal break-words max-w-xs">
                                    {category.category_name}
                                </Table.Cell>
                                <Table.Cell>{category._count.questions}</Table.Cell>
                                <Table.Cell>
                                    <div className="flex space-x-2">
                                        <Link
                                            href={`/admin/${category.category_id}`}
                                            className="text-white bg-[#9e7fec] hover:bg-[#E5D9F2] hover:text-[#82659D] font-bold rounded-lg px-3 py-1 transition"
                                        >
                                            Manage Questions
                                        </Link>
                                        <Button
                                            onClick={() => handleOpenEditModal(category)}
                                            color="warning"
                                            size="xs"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => handleDeleteCategory(category.category_id)}
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

            {/* Add/Edit Category Modal */}
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Modal.Header>{editCategoryId ? 'Edit Category' : 'Add Category'}</Modal.Header>
                <Modal.Body>
                    {/* Category Label and Textarea */}
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                    <Textarea
                        value={editCategoryId ? editCategoryName : newCategory}
                        onChange={(e) => {
                            if (editCategoryId) {
                                setEditCategoryName(e.target.value);
                            } else {
                                setNewCategory(e.target.value);
                            }
                        }}
                        placeholder="Enter category name"
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={editCategoryId ? handleEditCategory : handleAddCategory}
                        color="purple"
                    >
                        {editCategoryId ? 'Update Category' : 'Add Category'}
                    </Button>
                    <Button color="gray" onClick={() => setIsModalOpen(false)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CategoryManagement;