export interface Employee {
    id: string
    name: string
    gender: "Male" | "Female" | "Other"
    dateOfBirth: string
    state: string
    profileImage?: string
    active: boolean
    createdAt: string
}

export interface AuthUser {
    id: string
    email: string
}