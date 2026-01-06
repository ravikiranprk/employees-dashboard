"use client"

import { useState } from "react"
import type { Employee } from "@/lib/types"
import { Trash2, Edit, Printer } from "lucide-react"

interface EmployeeListProps {
    employees: Employee[]
    onEdit: (employee: Employee) => void
    onDelete: (id: string) => void
    onPrint: () => void
    onToggleActive: (id: string, active: boolean) => void
}

export function EmployeeList({ employees, onEdit, onDelete, onPrint, onToggleActive }: EmployeeListProps) {
    const [sortField, setSortField] = useState<"name" | "state" | "active">("name")

    const sorted = [...employees].sort((a, b) => {
        if (sortField === "name") return a.name.localeCompare(b.name)
        if (sortField === "state") return a.state.localeCompare(b.state)
        return (a.active ? 1 : 0) - (b.active ? 1 : 0)
    })

    if (employees.length === 0) {
        return (
            <div className="border border-slate-700 bg-slate-800 rounded-lg shadow-lg p-8">
                <div className="text-center text-slate-400">
                    <p className="text-lg">No employees found</p>
                    <p className="text-sm">Add your first employee to get started</p>
                </div>
            </div>
        )
    }

    return (
        <div className="border border-slate-700 bg-slate-800 rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-slate-700 flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Employee List</h2>
                <button
                    onClick={onPrint}
                    className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                    <Printer className="h-4 w-4" />
                    Print
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-slate-700">
                            <th className="px-4 py-3 text-left text-slate-300 font-semibold">Profile</th>
                            <th
                                className="px-4 py-3 text-left text-slate-300 font-semibold cursor-pointer hover:text-blue-400"
                                onClick={() => setSortField("name")}
                            >
                                Name ↕
                            </th>
                            <th className="px-4 py-3 text-left text-slate-300 font-semibold">Gender</th>
                            <th className="px-4 py-3 text-left text-slate-300 font-semibold">DOB</th>
                            <th
                                className="px-4 py-3 text-left text-slate-300 font-semibold cursor-pointer hover:text-blue-400"
                                onClick={() => setSortField("state")}
                            >
                                State ↕
                            </th>
                            <th className="px-4 py-3 text-left text-slate-300 font-semibold">Status</th>
                            <th className="px-4 py-3 text-left text-slate-300 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sorted.map((employee) => (
                            <tr key={employee.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
                                <td className="px-4 py-3">
                                    {employee.profileImage ? (
                                        <img
                                            src={employee.profileImage || "/placeholder.svg"}
                                            alt={employee.name}
                                            className="h-10 w-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                                            {employee.name.charAt(0)}
                                        </div>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-slate-200">{employee.name}</td>
                                <td className="px-4 py-3 text-slate-200">{employee.gender}</td>
                                <td className="px-4 py-3 text-slate-200">{employee.dateOfBirth}</td>
                                <td className="px-4 py-3 text-slate-200">{employee.state}</td>
                                <td className="px-4 py-3">
                                    <button
                                        onClick={() => onToggleActive(employee.id, !employee.active)}
                                        className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${employee.active
                                                ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                                                : "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                                            }`}
                                    >
                                        {employee.active ? "Active" : "Inactive"}
                                    </button>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => onEdit(employee)}
                                            className="inline-flex items-center gap-1 px-3 py-1 text-sm border border-slate-600 text-slate-300 hover:bg-slate-700 rounded transition-colors"
                                        >
                                            <Edit className="h-4 w-4" />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => onDelete(employee.id)}
                                            className="inline-flex items-center gap-1 px-3 py-1 text-sm border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}