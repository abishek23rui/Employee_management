import { useEffect, useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
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
    console.log("Editing row:", row);
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

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80 },
    {
      field: "profileImage",
      headerName: "Profile",
      width: 90,
      sortable: false,
      renderCell: (params) => <Avatar src={params.value} alt="profile" />,
    },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "gender", headerName: "Gender", width: 120 },
    { field: "state", headerName: "State", flex: 1 },
    { field: "dob", headerName: "DOB", width: 140 },
    {
      field: "active",
      headerName: "Status",
      width: 140,
      sortable: false,
      renderCell: (params) => (
        <Switch
          checked={params.row.active}
          onChange={() => handleToggle(params.row.id)}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 170,
      sortable: false,
      renderCell: (params) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(params.row)}
            className="p-1 rounded hover:bg-gray-100"
          >
            <Edit className="w-5 h-5 text-blue-500" />
          </button>

          <button
            onClick={() => handleDelete(params.row.id)}
            className="p-1 rounded hover:bg-gray-100"
          >
            <Trash2 className="w-5 h-5 text-red-500" />
          </button>
        </div>
      ),
    },
  ];

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

        <div className="flex justify-end mb-3">
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
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <DataGrid
              rows={filteredRows}
              columns={columns}
              autoHeight
              pageSizeOptions={[5, 10]}
              initialState={{
                pagination: { paginationModel: { pageSize: 5 } },
              }}
              disableRowSelectionOnClick
            />
          </div>
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
