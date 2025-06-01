import { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { API_ENDPOINTS } from '../../api/endpoints';

interface Author {
  authorId: number;
  authorName: string;
}

const AuthorManagement = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAuthorName, setNewAuthorName] = useState('');

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.ADMIN.GET_ALL_AUTHORS);
      setAuthors(response.data.result || []);
      setLoading(false);
    } catch {
      setError('Failed to fetch authors');
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post(API_ENDPOINTS.ADMIN.ADD_AUTHOR, {
        authorName: newAuthorName
      });
      setNewAuthorName('');
      setIsModalOpen(false);
      fetchAuthors();
    } catch {
      setError('Failed to add author');
    }
  };

  const handleUpdate = async () => {
    if (!selectedAuthor) return;
    try {
      await axios.put(API_ENDPOINTS.ADMIN.UPDATE_AUTHOR(selectedAuthor.authorId.toString()), {
        authorName: newAuthorName
      });
      setNewAuthorName('');
      setIsModalOpen(false);
      fetchAuthors();
    } catch {
      setError('Failed to update author');
    }
  };

  const handleDelete = async (authorId: number) => {
    if (window.confirm('Are you sure you want to delete this author?')) {
      try {
        await axios.delete(API_ENDPOINTS.ADMIN.DELETE_AUTHOR(authorId.toString()));
        fetchAuthors();
      } catch {
        setError('Failed to delete author');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Author Management</h2>
        <button
          onClick={() => {
            setSelectedAuthor(null);
            setNewAuthorName('');
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Author
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
            {authors.map((author) => (
              <tr key={author.authorId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{author.authorId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{author.authorName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedAuthor(author);
                      setNewAuthorName(author.authorName);
                      setIsModalOpen(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(author.authorId)}
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

      {/* Add/Edit Author Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                {selectedAuthor ? 'Edit Author' : 'Add New Author'}
              </h3>
              <div className="mt-2">
                <input
                  type="text"
                  value={newAuthorName}
                  onChange={(e) => setNewAuthorName(e.target.value)}
                  placeholder="Author Name"
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
                  onClick={selectedAuthor ? handleUpdate : handleAdd}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {selectedAuthor ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorManagement; 