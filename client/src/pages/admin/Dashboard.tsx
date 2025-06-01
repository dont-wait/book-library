import { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../../api/endpoints";

interface DashboardStats {
  totalBooks: number;
  totalUsers: number;
  totalBorrows: number;
  totalReturns: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalBooks: 0,
    totalUsers: 0,
    totalBorrows: 0,
    totalReturns: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.DASHBOARD.STATS);
        setStats(response.data.result);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-500 text-sm font-medium">Total Books</h2>
          <p className="text-3xl font-bold text-gray-900">{stats.totalBooks}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-500 text-sm font-medium">Total Users</h2>
          <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-500 text-sm font-medium">Total Borrows</h2>
          <p className="text-3xl font-bold text-gray-900">{stats.totalBorrows}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-500 text-sm font-medium">Total Returns</h2>
          <p className="text-3xl font-bold text-gray-900">{stats.totalReturns}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 