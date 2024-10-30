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

/**
 * Component for managing categories including adding, editing, and deleting categories.
 *
 * The component handles the following functionalities:
 * - Fetch categories from the API and display them in a table.
 * - Open modals for adding a new category or editing an existing category.
 * - Perform CRUD operations (Create, Read, Update, Delete) on categories via API.
 *
 * State Variables:
 * - `categories`: An array to store the list of fetched categories.
 * - `loading`: A boolean to indicate if the categories are being loaded.
 * - `isModalOpen`: A boolean to control the visibility of the add/edit modal.
 * - `newCategory`: A string to store the name of a new category being added.
 * - `editCategoryId`: A nullable number to store the ID of the category being edited.
 * - `editCategoryName`: A string to store the name of the category being edited.
 *
 * API Endpoints:
 * - Fetch categories: GET `/api/category`
 * - Add a category: POST `/api/category`
 * - Edit a category: PUT `/api/category/{id}`
 * - Delete a category: DELETE `/api/category/{id}`
 */
const CategoryManagement = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCategory, setNewCategory] = useState<string>('');
    const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
    const [editCategoryName, setEditCategoryName] = useState<string>('');


    /**
     * Asynchronously fetches categories from the API and updates the state.
     *
     * This function performs the following steps:
     * 1. Sets the loading state to true.
     * 2. Attempts to fetch category data from the specified API endpoint.
     * 3. Parses the response data as JSON and updates the categories state with the fetched data.
     * 4. Logs an error message to the console if the fetch operation fails.
     * 5. Resets the loading state to false once the fetch operation completes, regardless of success or failure.
     *
     * @throws Will log an error message to the console if the fetch operation fails.
     */
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


    /**
     * Handles the closing of the add/edit modal.
     * Clears the input fields and closes the modal.
     */
    const handleOpenAddModal = () => {
        setNewCategory(''); // Clear the category name for new entry
        setEditCategoryId(null); // Clear the editing ID
        setEditCategoryName(''); // Clear the editing category name
        setIsModalOpen(true); // Open the modal
    };


    /**
     * Handles the opening of the edit modal for a category.
     *
     * @param {Category} category - The category object containing details to be edited.
     * @param {string} category.category_id - The ID of the category to be edited.
     * @param {string} category.category_name - The name of the category to be edited.
     */
    const handleOpenEditModal = (category: Category) => {
        setEditCategoryId(category.category_id); // Set the ID to be edited
        setEditCategoryName(category.category_name); // Populate the field with the category name
        setIsModalOpen(true); // Open the modal
    };


    /**
     * Asynchronously handles the addition of a new category.
     * Sends a POST request to the server to add the category.
     *
     * If the request is successful, displays a success message,
     * fetches the updated list of categories, clears the input field,
     * and closes the modal.
     *
     * If the request fails, displays an error message based on the server's response.
     * Handles any errors that occur during the fetch operation and displays an appropriate error message.
     */
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


    /**
     * Asynchronously handles the editing of a category.
     *
     * This function performs the following steps:
     * 1. Checks if `editCategoryId` is not null. If null, the function returns early.
     * 2. Sends a PUT request to update the category with the ID `editCategoryId`.
     * 3. If the response is successful, it shows a success message, fetches the updated list of categories,
     *    and resets relevant state variables.
     * 4. If the response is not successful, it shows an error message with details from the response.
     * 5. Catches any errors that occur during the fetch and shows a generic error message.
     *
     * @async
     * @function handleEditCategory
     * @returns {Promise<void>} A Promise that resolves when the category editing process is complete.
     */
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


    /**
     * Deletes a category with the given ID by sending a DELETE request to the server.
     *
     * @param {number} categoryId - The ID of the category to be deleted.
     * @returns {Promise<void>} - A promise that resolves when the category deletion is complete.
     * @throws Will display an error alert if the deletion fails or if an error occurs during the request.
     */
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