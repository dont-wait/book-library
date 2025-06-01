import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { API_ENDPOINTS } from '../../api/endpoints';

interface Category {
  categoryId: number;
  categoryName: string;
}

const CategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.ADMIN.GET_ALL_CATEGORIES);
      setCategories(response.data.result || []);
      setLoading(false);
    } catch {
      setError('Failed to fetch categories');
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post(API_ENDPOINTS.ADMIN.ADD_CATEGORY, {
        categoryName: newCategoryName
      });
      setNewCategoryName('');
      setIsModalOpen(false);
      fetchCategories();
    } catch {
      setError('Failed to add category');
    }
  };

  const handleUpdate = async () => {
    if (!selectedCategory) return;
    try {
      await axios.put(API_ENDPOINTS.ADMIN.UPDATE_CATEGORY(selectedCategory.categoryId.toString()), {
        categoryName: newCategoryName
      });
      setNewCategoryName('');
      setIsModalOpen(false);
      fetchCategories();
    } catch {
      setError('Failed to update category');
    }
  };

  const handleDelete = async (categoryId: number) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(API_ENDPOINTS.ADMIN.DELETE_CATEGORY(categoryId.toString()));
        fetchCategories();
      } catch {
        setError('Failed to delete category');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Category Management</h2>
        <button
          onClick={() => {
            setSelectedCategory(null);
            setNewCategoryName('');
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Category
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.categoryId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.categoryId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.categoryName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedCategory(category);
                      setNewCategoryName(category.categoryName);
                      setIsModalOpen(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.categoryId)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                {selectedCategory ? 'Edit Category' : 'Add New Category'}
              </h3>
              <div className="mt-2">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Category Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={selectedCategory ? handleUpdate : handleAdd}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {selectedCategory ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement; 