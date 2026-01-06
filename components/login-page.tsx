"use client"

import type React from "react"
import { useState } from "react"
import { setAuthUser } from "@/lib/storage"

export function LoginPage({ onLoginSuccess }: { onLoginSuccess: () => void }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        if (!email || !password) {
            setError("Please fill in all fields")
            setIsLoading(false)
            return
        }

        if (!email.includes("@")) {
            setError("Please enter a valid email")
            setIsLoading(false)
            return
        }

        // Simulate authentication delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Mock authentication - accept any valid email/password
        setAuthUser({
            id: "user_" + Date.now(),
            email: email,
        })

        onLoginSuccess()
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 to-slate-800 p-4">
            <div className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-6">
                <div className="space-y-1 mb-6">
                    <h2 className="text-2xl font-bold text-white">Employee Management</h2>
                    <p className="text-slate-400 text-sm">Sign in to access your dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white placeholder:text-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 text-white placeholder:text-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-md text-red-400 text-sm">{error}</div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-md font-medium transition-colors"
                    >
                        {isLoading ? "Signing in..." : "Sign In"}
                    </button>

                    <p className="text-xs text-slate-400 text-center">Demo: Use any email and password combination</p>
                </form>
            </div>
        </div>
    )
}