import type { Employee } from "./types"
import mockEmployees from "./mock-employees.json"

const STORAGE_KEY = "employees"

export function initializeEmployees() {
    if (typeof window === "undefined") return

    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockEmployees))
    }
}

export function getEmployees(): Employee[] {
    if (typeof window === "undefined") return []

    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
}

export function addEmployee(employee: Omit<Employee, "id" | "createdAt">): Employee {
    const employees = getEmployees()
    const newEmployee: Employee = {
        ...employee,
        id: `EMP${Date.now()}`,
        createdAt: new Date().toISOString().split("T")[0],
    }

    employees.push(newEmployee)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees))
    return newEmployee
}

export function updateEmployee(id: string, updates: Partial<Employee>): Employee | null {
    const employees = getEmployees()
    const index = employees.findIndex((e) => e.id === id)

    if (index === -1) return null

    employees[index] = { ...employees[index], ...updates }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employees))
    return employees[index]
}

export function deleteEmployee(id: string): boolean {
    const employees = getEmployees()
    const filtered = employees.filter((e) => e.id !== id)

    if (filtered.length === employees.length) return false

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
    return true
}

export function getAuthUser() {
    if (typeof window === "undefined") return null

    const stored = localStorage.getItem("auth_user")
    return stored ? JSON.parse(stored) : null
}

export function setAuthUser(user: any) {
    localStorage.setItem("auth_user", JSON.stringify(user))
}

export function logout() {
    localStorage.removeItem("auth_user")
}