import { useEffect, useState } from "react";
import { Avatar, Switch, Tooltip } from "@mui/material";
import { Edit, Trash2, Printer, Plus } from "lucide-react";
import AddEmployeeForm from "./add_employee";
import * as XLSX from "xlsx";

function EmployeeList() {
  const [openForm, setOpenForm] = useState(false);
  const [editRow, setEditRow] = useState<any>(null);
  const [search, setSearch] = useState("");

  const MAX_CELL_LENGTH = 32767;

  const safeValue = (value: any) => {
    if (value == null) return "";
    const str = String(value);
    return str.length > MAX_CELL_LENGTH
      ? str.slice(0, MAX_CELL_LENGTH - 3) + "..."
      : str;
  };

  useEffect(() => {
    if (!localStorage.getItem("employees")) {
      localStorage.setItem(
        "employees",
        JSON.stringify([
          {
            id: 1,
            name: "John Doe",
            profileImage: "https://i.pravatar.cc/100?img=1",
            gender: "Male",
            state: "Tamil Nadu",
            dob: "1994-05-12",
            active: true,
          },
          {
            id: 2,
            name: "Priya Sharma",
            profileImage: "https://i.pravatar.cc/100?img=2",
            gender: "Female",
            state: "Karnataka",
            dob: "1998-09-04",
            active: false,
          },
        ])
      );
    }
  }, []);

  const [rows, setRows] = useState(() => {
    const data = localStorage.getItem("employees");
    return data ? JSON.parse(data) : [];
  });

  const filteredRows = rows.filter((r: any) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const updateLocalStorage = (data: any) => {
    localStorage.setItem("employees", JSON.stringify(data));
    setRows(data);
  };

  const handleToggle = (id: number) =>
    updateLocalStorage(
      rows.map((r: any) => (r.id === id ? { ...r, active: !r.active } : r))
    );

  const handleAddEmployee = (employee: any) => {
    const newEmployee = {
      ...employee,
      id: rows.length ? rows[rows.length - 1].id + 1 : 1,
      active: true,
    };

    const updated = [...rows, newEmployee];
    updateLocalStorage(updated);
  };

  const handleUpdateEmployee = (employee: any) => {
    const updated = rows.map((r: any) => (r.id === employee.id ? employee : r));
    updateLocalStorage(updated);
  };

  const handleDelete = (id: number) =>
    updateLocalStorage(rows.filter((r: any) => r.id !== id));

  const handleEdit = (row: any) => {
    setEditRow(row);
    setOpenForm(true);
  };

  const handleExportExcel = () => {
    const safeRows = rows.map((emp: any) => {
      return Object.fromEntries(
        Object.entries(emp).map(([key, value]) => [key, safeValue(value)])
      );
    });

    const worksheet = XLSX.utils.json_to_sheet(safeRows);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
    XLSX.writeFile(workbook, "employees.xlsx");
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setEditRow(null); // Reset editRow when closing
  };

  return (
    <div className="p-4">
      <div className="bg-white rounded-xl shadow-sm border p-4">
        <h2 className="text-xl font-semibold mb-4">Employee List</h2>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name..."
          className="border rounded px-3 py-2 mr-3 w-64"
        />

        <div className="flex justify-end mt-3 mb-3">
          <Tooltip title="Create new employee">
            <button
              onClick={() => {
                setEditRow(null);
                setOpenForm(true);
              }}
              className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create
            </button>
          </Tooltip>

          <Tooltip title="Download Excel">
            <button
              onClick={handleExportExcel}
              className="px-3 py-2 border rounded flex items-center gap-2 hover:bg-gray-50 ml-3"
            >
              <Printer className="w-4 h-4" />
              Export
            </button>
          </Tooltip>
        </div>

        {/* 👇 horizontal scroll on mobile */}
        {/* Responsive Table/Card Layout */}
        <div className="border rounded-lg overflow-hidden">
          {/* Header - Hidden on mobile */}
          <div className="hidden md:grid md:grid-cols-12 bg-gray-50 border-b font-semibold text-sm">
            <div className="col-span-1 px-4 py-3">ID</div>
            <div className="col-span-3 px-4 py-3">Employee</div>
            <div className="col-span-2 px-4 py-3">Gender</div>
            <div className="col-span-2 px-4 py-3">State</div>
            <div className="col-span-2 px-4 py-3">DOB</div>
            <div className="col-span-1 px-4 py-3 text-center">Status</div>
            <div className="col-span-1 px-4 py-3 text-center">Actions</div>
          </div>

          {/* Rows */}
          {filteredRows.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              No employees found
            </div>
          ) : (
            filteredRows.map((row: any) => (
              <div
                key={row.id}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                {/* Desktop Layout */}
                <div className="hidden md:grid md:grid-cols-12 items-center py-3">
                  <div className="col-span-1 px-4">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                      {row.id}
                    </span>
                  </div>

                  <div className="col-span-3 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={row.profileImage}
                        sx={{ width: 36, height: 36 }}
                      />
                      <span className="font-medium">{row.name}</span>
                    </div>
                  </div>

                  <div className="col-span-2 px-4">{row.gender}</div>
                  <div className="col-span-2 px-4">{row.state}</div>
                  <div className="col-span-2 px-4">{row.dob}</div>

                  <div className="col-span-1 px-4 flex justify-center">
                    <Switch
                      checked={row.active}
                      onChange={() => handleToggle(row.id)}
                      size="small"
                    />
                  </div>

                  <div className="col-span-1 px-4 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(row)}
                      className="p-1 rounded hover:bg-blue-50"
                    >
                      <Edit className="w-4 h-4 text-blue-500" />
                    </button>
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="p-1 rounded hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>

                {/* Mobile Card Layout */}
                <div className="md:hidden p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={row.profileImage}
                        sx={{ width: 48, height: 48 }}
                      />
                      <div>
                        <div className="font-semibold text-base">
                          {row.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          ID: {row.id}
                        </div>
                      </div>
                    </div>
                    <Switch
                      checked={row.active}
                      onChange={() => handleToggle(row.id)}
                      size="small"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Gender:</span>
                      <span className="ml-2 font-medium">{row.gender}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">State:</span>
                      <span className="ml-2 font-medium">{row.state}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-500">DOB:</span>
                      <span className="ml-2 font-medium">{row.dob}</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t">
                    <button
                      onClick={() => handleEdit(row)}
                      className="flex-1 px-3 py-2 border rounded hover:bg-blue-50 flex items-center justify-center gap-2 text-blue-600"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="flex-1 px-3 py-2 border rounded hover:bg-red-50 flex items-center justify-center gap-2 text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {openForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <AddEmployeeForm
              onSubmitData={editRow ? handleUpdateEmployee : handleAddEmployee}
              onClose={handleCloseForm}
              initialValues={editRow}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
