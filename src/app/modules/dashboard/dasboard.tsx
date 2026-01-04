import { useEffect, useState } from "react";

function Dashboard() {
  const [employees, setEmployees] = useState([]);

  // Load employees from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("employees");

    if (stored) {
      setEmployees(JSON.parse(stored));
    }
  }, []);

  const total = employees.length;
  const active = employees.filter((e: any) => e.active).length;
  const inactive = employees.filter((e: any) => !e.active).length;

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl shadow bg-white">
          <h3 className="text-gray-500 text-sm">Total Employees</h3>
          <p className="text-3xl font-bold mt-2">{total}</p>
        </div>

        <div className="p-5 rounded-2xl shadow bg-green-50">
          <h3 className="text-gray-600 text-sm">Active</h3>
          <p className="text-3xl font-bold mt-2 text-green-700">{active}</p>
        </div>

        <div className="p-5 rounded-2xl shadow bg-red-50">
          <h3 className="text-gray-600 text-sm">Inactive</h3>
          <p className="text-3xl font-bold mt-2 text-red-700">{inactive}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
