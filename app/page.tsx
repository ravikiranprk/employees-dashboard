"use client"

import { useState, useEffect } from "react"
import { LoginPage } from "@/components/login-page"
import { DashboardPage } from "@/components/dashboard-page"
import { initializeEmployees, getAuthUser, logout } from "@/lib/storage"


export default function Home() {
    const [authUser, setAuthUser] = useState<any>(null)
    const [isChecking, setIsChecking] = useState(true)

    useEffect(() => {
        initializeEmployees()
        const user = getAuthUser()
        setAuthUser(user)
        setIsChecking(false)
    }, [])

    const handleLoginSuccess = () => {
        const user = getAuthUser()
        setAuthUser(user)
    }

    const handleLogout = () => {
        logout()
        setAuthUser(null)
    }

    if (isChecking) {
        return (
            <div className="min-h-screen bg-linear-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                <div className="text-white text-lg">Loading...</div>
            </div>
        )
    }

    if (!authUser) {
        return <LoginPage onLoginSuccess={handleLoginSuccess} />
    }

    return <DashboardPage userEmail={authUser.email} onLogout={handleLogout} />
}