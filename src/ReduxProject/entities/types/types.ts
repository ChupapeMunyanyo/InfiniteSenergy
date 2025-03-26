export interface User {
    id: number,
    name: string
}

export interface UserState {
    entities:User[],
    isLoading: 'pending' | 'fulfilled' | 'rejected'
}