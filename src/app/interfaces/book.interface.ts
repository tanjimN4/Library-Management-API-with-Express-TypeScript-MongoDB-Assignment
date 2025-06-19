export interface IBook {
    title: string;
    author: string;
    genre: 'Fiction' | 'Non-Fiction' | 'Science' | 'History' | 'Biography' | 'Fantasy';
    isbn: string;
    description?: string;
    copies: number;
    available?: boolean;
}