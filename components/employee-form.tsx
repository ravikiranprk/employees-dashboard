"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { Employee } from "@/lib/types"

interface EmployeeFormProps {
    employee?: Employee
    onSubmit: (employee: Omit<Employee, "id" | "createdAt">) => void
    onCancel: () => void
}

const STATES = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
]

export function EmployeeForm({ employee, onSubmit, onCancel }: EmployeeFormProps) {
    const [formData, setFormData] = useState({
        name: "",
        gender: "Male" as "Male" | "Female" | "Other",
        dateOfBirth: "",
        state: "",
        profileImage: "",
        active: true,
    })

    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [errors, setErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        if (employee) {
            setFormData({
                name: employee.name,
                gender: employee.gender,
                dateOfBirth: employee.dateOfBirth,
                state: employee.state,
                profileImage: employee.profileImage || "",
                active: employee.active,
            })
            setImagePreview(employee.profileImage || null)
        }
    }, [employee])

    const validateForm = () => {
        const newErrors: Record<string, string> = {}
        if (!formData.name.trim()) newErrors.name = "Name is required"
        if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required"
        if (!formData.state) newErrors.state = "State is required"
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (event) => {
                const imageUrl = event.target?.result as string
                setImagePreview(imageUrl)
                setFormData((prev) => ({ ...prev, profileImage: imageUrl }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return
        onSubmit({
            name: formData.name,
            gender: formData.gender,
            dateOfBirth: formData.dateOfBirth,
            state: formData.state,
            profileImage: formData.profileImage,
            active: formData.active,
        })
    }

    return (
        <div className="border border-slate-700 bg-slate-800 rounded-lg shadow-lg">
            <div className="p-6 border-b border-slate-700">
                <h2 className="text-xl font-bold text-white">{employee ? "Edit Employee" : "Add New Employee"}</h2>
            </div>

            <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Full Name *</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                                placeholder="Enter full name"
                                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white placeholder:text-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Gender</label>
                            <select
                                value={formData.gender}
                                onChange={(e) => setFormData((prev) => ({ ...prev, gender: e.target.value as any }))}
                                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Date of Birth *</label>
                            <input
                                type="date"
                                value={formData.dateOfBirth}
                                onChange={(e) => setFormData((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.dateOfBirth && <p className="text-xs text-red-400">{errors.dateOfBirth}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">State *</label>
                            <select
                                value={formData.state}
                                onChange={(e) => setFormData((prev) => ({ ...prev, state: e.target.value }))}
                                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select a state</option>
                                {STATES.map((state) => (
                                    <option key={state} value={state}>
                                        {state}
                                    </option>
                                ))}
                            </select>
                            {errors.state && <p className="text-xs text-red-400">{errors.state}</p>}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300">Profile Image</label>
                            <div className="flex gap-4">
                                {imagePreview && (
                                    <div className="h-24 w-24 rounded-lg overflow-hidden shrink-0">
                                        <img
                                            src={imagePreview || "/placeholder.svg"}
                                            alt="Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 text-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="active"
                                checked={formData.active}
                                onChange={(e) => setFormData((prev) => ({ ...prev, active: e.target.checked }))}
                                className="rounded border-slate-600 bg-slate-700"
                            />
                            <label htmlFor="active" className="text-sm font-medium text-slate-300">
                                Active Status
                            </label>
                        </div>
                    </div>

                    <div className="flex gap-3 justify-end">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="cursor-pointer px-4 py-2 border border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent rounded-md transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                        >
                            {employee ? "Update Employee" : "Add Employee"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}