import { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../../api/endpoints";

interface Return {
  returnId: number;
  borrowId: number;
  returnDate: string;
  condition: string;
  notes?: string;
  borrow: {
    user: {
      username: string;
      fullName: string;
    };
    book: {
      bookName: string;
      isbn: string;
    };
    borrowDate: string;
    dueDate: string;
  };
}

const Returns = () => {
  const [returns, setReturns] = useState<Return[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReturns = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.ADMIN.GET_ALL_RETURNS);
        setReturns(response.data.result || []);
      } catch (error) {
        setError("Failed to fetch returns");
      } finally {
        setLoading(false);
      }
    };

    fetchReturns();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Returns</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Book
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Borrow Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Return Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Condition
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Notes
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {returns.map((return_) => (
              <tr key={return_.returnId}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {return_.borrow.user.fullName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {return_.borrow.user.username}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {return_.borrow.book.bookName}
                  </div>
                  <div className="text-sm text-gray-500">
                    ISBN: {return_.borrow.book.isbn}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {return_.borrow.borrowDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {return_.borrow.dueDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {return_.returnDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      return_.condition === "GOOD"
                        ? "bg-green-100 text-green-800"
                        : return_.condition === "DAMAGED"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {return_.condition}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {return_.notes || "No notes"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Returns; 