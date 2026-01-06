"use client"

import { LogOut, Users, CheckCircle2, XCircle } from "lucide-react"

interface DashboardHeaderProps {
    totalEmployees: number
    activeCount: number
    inactiveCount: number
    onLogout: () => void
    userEmail?: string
}

export function DashboardHeader({
    totalEmployees,
    activeCount,
    inactiveCount,
    onLogout,
    userEmail,
}: DashboardHeaderProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Employee Management</h1>
                <div className="flex items-center gap-4">
                    {userEmail && <span className="text-sm text-slate-400">{userEmail}</span>}
                    <button
                        onClick={onLogout}
                        className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 text-sm border border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent rounded-md transition-colors"
                    >
                        <LogOut className="h-4 w-4" />
                        Logout
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Total Employees Card */}
                <div className="border border-slate-700 bg-slate-800/50 rounded-lg p-4">
                    <div className="pb-2">
                        <p className="text-sm font-medium text-slate-400 flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Total Employees
                        </p>
                    </div>
                    <p className="text-2xl font-bold text-white">{totalEmployees}</p>
                </div>

                {/* Active Count Card */}
                <div className="border border-slate-700 bg-slate-800/50 rounded-lg p-4">
                    <div className="pb-2">
                        <p className="cursor-pointer text-sm font-medium text-green-400 flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4" />
                            Active
                        </p>
                    </div>
                    <p className="text-2xl font-bold text-green-400">{activeCount}</p>
                </div>

                {/* Inactive Count Card */}
                <div className="border border-slate-700 bg-slate-800/50 rounded-lg p-4">
                    <div className="pb-2">
                        <p className="cursor-pointer text-sm font-medium text-red-400 flex items-center gap-2">
                            <XCircle className="h-4 w-4" />
                            Inactive
                        </p>
                    </div>
                    <p className="text-2xl font-bold text-red-400">{inactiveCount}</p>
                </div>
            </div>
        </div>
    )
}