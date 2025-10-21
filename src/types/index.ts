export interface Question {
    id: string;
    answer_1: string;
    answer_2: string;
    answer_3: string;
    name?: string;
    status: 'pending' | 'active' | 'answered';
    inserted_at?: string;
}

export interface DatabaseQuestion {
    id: string;
    answer_1: string;
    answer_2: string;
    answer_3: string;
    name?: string;
    status: string;
    inserted_at?: string;
}