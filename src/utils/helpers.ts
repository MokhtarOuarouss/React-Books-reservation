import { Book } from "../models/Book";
import { User } from "../models/User";


export const validateUserForm = (user: User): string[] => {
    const validationErrors: string[] = [];

    if (!user.userName.trim()) {
        validationErrors.push('Name is required');
    }

    if (!user.email.trim()) {
        validationErrors.push('Email is required');

    } else if (!isValidEmail(user.email.trim())) {
        validationErrors.push('Invalid email format');

    } 

    return validationErrors;
}

const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


export const validateBookForm = (book: Book): string[] => {
    const validationErrors: string[] = [];

    if (!book.title.trim()) {
        validationErrors.push('title is required');
    }

    if (!book.owner?.userName.trim()) {
        validationErrors.push('owner is required');

    } 
    
    

    return validationErrors;
}

