export interface Question {
    id: string;
    question: string;
    name?: string;
    status: 'pending' | 'active' | 'answered';
    inserted_at?: string;
}

export interface DatabaseQuestion {
    id: string;
    question: string;
    name?: string;
    status: string;
    inserted_at?: string;
}