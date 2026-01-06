"use client"

import { useState, useEffect } from "react"
import type { Employee } from "@/lib/types"
import { getEmployees, addEmployee, updateEmployee, deleteEmployee } from "@/lib/storage"
import { DashboardHeader } from "./dashboard-header"
import { EmployeeForm } from "./employee-form"
import { EmployeeList } from "./employee-list"
import { AlertCircle, Plus } from "lucide-react"

interface DashboardPageProps {
    userEmail: string
    onLogout: () => void
}

export function DashboardPage({ userEmail, onLogout }: DashboardPageProps) {
    const [employees, setEmployees] = useState<Employee[]>([])
    const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([])
    const [showForm, setShowForm] = useState(false)
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [filterGender, setFilterGender] = useState<string>("")
    const [filterStatus, setFilterStatus] = useState<string>("")
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loaded = getEmployees()
        setEmployees(loaded)
        setIsLoading(false)
    }, [])

    useEffect(() => {
        let result = employees

        if (searchQuery) {
            result = result.filter((e) => e.name.toLowerCase().includes(searchQuery.toLowerCase()))
        }

        if (filterGender) {
            result = result.filter((e) => e.gender === filterGender)
        }

        if (filterStatus) {
            result = result.filter((e) => (filterStatus === "active" ? e.active : !e.active))
        }

        setFilteredEmployees(result)
    }, [employees, searchQuery, filterGender, filterStatus])

    const handleAddEmployee = (employeeData: Omit<Employee, "id" | "createdAt">) => {
        const newEmployee = addEmployee(employeeData)
        setEmployees([...employees, newEmployee])
        setShowForm(false)
    }

    const handleUpdateEmployee = (employeeData: Omit<Employee, "id" | "createdAt">) => {
        if (!editingEmployee) return
        const updated = updateEmployee(editingEmployee.id, employeeData)
        if (updated) {
            setEmployees(employees.map((e) => (e.id === updated.id ? updated : e)))
            setEditingEmployee(null)
            setShowForm(false)
        }
    }

    const handleDeleteEmployee = (id: string) => {
        if (deleteEmployee(id)) {
            setEmployees(employees.filter((e) => e.id !== id))
            setDeleteConfirm(null)
        }
    }

    const handleToggleActive = (id: string, active: boolean) => {
        const updated = updateEmployee(id, { active })
        if (updated) {
            setEmployees(employees.map((e) => (e.id === updated.id ? updated : e)))
        }
    }

    const handlePrint = () => {
        const printWindow = window.open("", "_blank")
        if (!printWindow) return

        const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Employee List</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            th { background-color: #f5f5f5; font-weight: bold; }
            h1 { text-align: center; }
            .summary { margin-bottom: 20px; }
          </style>
        </head>
        <body>
          <h1>Employee Management Report</h1>
          <div class="summary">
            <p><strong>Total Employees:</strong> ${filteredEmployees.length}</p>
            <p><strong>Active:</strong> ${filteredEmployees.filter((e) => e.active).length}</p>
            <p><strong>Inactive:</strong> ${filteredEmployees.filter((e) => !e.active).length}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>State</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredEmployees
                .map(
                    (e) => `
                <tr>
                  <td>${e.id}</td>
                  <td>${e.name}</td>
                  <td>${e.gender}</td>
                  <td>${e.dateOfBirth}</td>
                  <td>${e.state}</td>
                  <td>${e.active ? "Active" : "Inactive"}</td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `

        printWindow.document.write(html)
        printWindow.document.close()
        setTimeout(() => printWindow.print(), 250)
    }

    const activeCount = employees.filter((e) => e.active).length
    const inactiveCount = employees.filter((e) => !e.active).length

    if (isLoading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                <div className="text-white text-lg">Loading...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <DashboardHeader
                    totalEmployees={employees.length}
                    activeCount={activeCount}
                    inactiveCount={inactiveCount}
                    onLogout={onLogout}
                    userEmail={userEmail}
                />

                {showForm && (
                    <EmployeeForm
                        employee={editingEmployee || undefined}
                        onSubmit={editingEmployee ? handleUpdateEmployee : handleAddEmployee}
                        onCancel={() => {
                            setShowForm(false)
                            setEditingEmployee(null)
                        }}
                    />
                )}

                {!showForm && (
                    <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-end">
                        <div className="flex-1 space-y-2">
                            <label className="text-sm font-medium text-slate-300">Search by Name</label>
                            <input
                                type="text"
                                placeholder="Search employees..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white placeholder:text-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Filter by Gender</label>
                            <select
                                value={filterGender}
                                onChange={(e) => setFilterGender(e.target.value)}
                                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Genders</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Filter by Status</label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>

                        <button
                            onClick={() => {
                                setShowForm(true)
                                setEditingEmployee(null)
                            }}
                            className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors w-full sm:w-auto"
                        >
                            <Plus className="h-4 w-4" />
                            Add Employee
                        </button>
                    </div>
                )}

                {deleteConfirm && (
                    <div className="border border-red-500/30 bg-red-500/10 rounded-lg p-6">
                        <div className="flex items-start gap-4">
                            <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                            <div className="flex-1">
                                <p className="text-red-400 font-medium">Delete Employee</p>
                                <p className="text-sm text-red-400/80 mt-1">
                                    Are you sure you want to delete this employee? This action cannot be undone.
                                </p>
                                <div className="flex gap-3 mt-4">
                                    <button
                                        onClick={() => handleDeleteEmployee(deleteConfirm)}
                                        className="cursor-pointer px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => setDeleteConfirm(null)}
                                        className="px-4 py-2 border border-slate-600 text-slate-300 hover:bg-slate-700 rounded-md transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <EmployeeList
                    employees={filteredEmployees}
                    onEdit={(employee) => {
                        setEditingEmployee(employee)
                        setShowForm(true)
                    }}
                    onDelete={(id) => setDeleteConfirm(id)}
                    onPrint={handlePrint}
                    onToggleActive={handleToggleActive}
                />
            </div>
        </div>
    )
}