// API service for communicating with the backend
// This file will be expanded as the backend is developed

// API base URL - change this when deploying
// const API_BASE_URL = process.env.NODE_ENV === 'production'
//     ? 'https://api.yourwebsite.com'
//     : 'http://localhost:8000';
const API_BASE_URL = 'http://localhost:8000';
// Generic interface for API responses
interface ApiResponse<T> {
    data?: T;
    error?: string;
    success: boolean;
}

// Booking related types
export interface BookingRequest {
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    serviceId: string;
    scheduledDate: string;
    notes?: string;
}

export interface Booking extends BookingRequest {
    id: string;
    status: 'pending' | 'confirmed' | 'canceled';
    createdAt: string;
}

// Contact form types
export interface ContactRequest {
    name: string;
    email: string;
    phone?: string;
    serviceInterest?: string;
    message: string;
}

export interface Contact extends ContactRequest {
    id: string;
    status: 'new' | 'processing' | 'replied' | 'closed';
    createdAt: string;
}

// Service types
export interface Service {
    id: string;
    name: string;
    description: string;
    durationMinutes: number;
    price: number;
    isActive: boolean;
}

// Common fetch wrapper with error handling
async function fetchApi<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any
): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                // Add authentication headers when implemented
                // 'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: body ? JSON.stringify(body) : undefined
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: data.detail || 'An error occurred'
            };
        }

        return {
            success: true,
            data
        };
    } catch (error) {
        console.error('API request failed:', error);
        return {
            success: false,
            error: 'Network error. Please try again later.'
        };
    }
}

// API service object with methods for different endpoints
const apiService = {
    // Services
    async getServices(): Promise<ApiResponse<Service[]>> {
        return fetchApi<Service[]>('/api/services');
    },

    // Booking
    async checkAvailability(date: string, serviceId: string): Promise<ApiResponse<any>> {
        return fetchApi<any>(`/api/bookings/availability?date=${date}&service_id=${serviceId}`);
    },

    async createBooking(booking: BookingRequest): Promise<ApiResponse<Booking>> {
        return fetchApi<Booking>('/api/bookings', 'POST', booking);
    },

    // Contact
    async submitContactForm(contact: ContactRequest): Promise<ApiResponse<Contact>> {
        return fetchApi<Contact>('/api/contacts', 'POST', contact);
    }
};

export default apiService;