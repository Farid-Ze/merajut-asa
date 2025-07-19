// Utility functions aligned with Merajut ASA requirements
// Performance, accessibility, and security focused utilities

import { format, parseISO, isValid, differenceInDays, addDays } from 'date-fns';
import { id } from 'date-fns/locale';
import validator from 'validator';
import CryptoJS from 'crypto-js';

// Currency and money formatting utilities
export interface MoneyFormatOptions {
  currency?: string;
  locale?: string;
  showCurrency?: boolean;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export const formatMoney = (
  amount: number, 
  options: MoneyFormatOptions = {}
): string => {
  const {
    currency = 'IDR',
    locale = 'id-ID',
    showCurrency = true,
    minimumFractionDigits = 0,
    maximumFractionDigits = 0
  } = options;

  try {
    return new Intl.NumberFormat(locale, {
      style: showCurrency ? 'currency' : 'decimal',
      currency,
      minimumFractionDigits,
      maximumFractionDigits
    }).format(amount);
  } catch (error) {
    // Fallback for unsupported locales/currencies
    const formattedNumber = amount.toLocaleString(locale, {
      minimumFractionDigits,
      maximumFractionDigits
    });
    return showCurrency ? `${currency} ${formattedNumber}` : formattedNumber;
  }
};

export const parseMoney = (value: string): number => {
  // Remove currency symbols and non-numeric characters except decimal point
  const cleaned = value.replace(/[^\d.,]/g, '');
  // Handle Indonesian number format (comma as decimal separator)
  const normalized = cleaned.replace(',', '.');
  const parsed = parseFloat(normalized);
  return isNaN(parsed) ? 0 : parsed;
};

// Date and time utilities with Indonesian locale support
export const formatDate = (
  date: Date | string,
  formatString: string = 'dd MMMM yyyy'
): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '';
    return format(dateObj, formatString, { locale: id });
  } catch (error) {
    return '';
  }
};

export const formatRelativeTime = (date: Date | string): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '';
    
    const now = new Date();
    const diffDays = differenceInDays(now, dateObj);
    
    if (diffDays === 0) return 'Hari ini';
    if (diffDays === 1) return 'Kemarin';
    if (diffDays < 7) return `${diffDays} hari lalu`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu lalu`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} bulan lalu`;
    return `${Math.floor(diffDays / 365)} tahun lalu`;
  } catch (error) {
    return '';
  }
};

// Campaign progress and percentage utilities
export const calculateProgress = (current: number, target: number): number => {
  if (target <= 0) return 0;
  const progress = (current / target) * 100;
  return Math.min(Math.round(progress * 100) / 100, 100); // Round to 2 decimal places, max 100%
};

export const calculateDaysRemaining = (endDate: Date | string): number => {
  try {
    const end = typeof endDate === 'string' ? parseISO(endDate) : endDate;
    if (!isValid(end)) return 0;
    
    const today = new Date();
    const remaining = differenceInDays(end, today);
    return Math.max(0, remaining);
  } catch (error) {
    return 0;
  }
};

// URL and slug utilities for SEO-friendly URLs
export const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    // Replace Indonesian characters
    .replace(/[àáäâ]/g, 'a')
    .replace(/[èéëê]/g, 'e')
    .replace(/[ìíïî]/g, 'i')
    .replace(/[òóöô]/g, 'o')
    .replace(/[ùúüû]/g, 'u')
    .replace(/[ñ]/g, 'n')
    .replace(/[ç]/g, 'c')
    // Remove special characters and replace with hyphens
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

export const validateSlug = (slug: string): boolean => {
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugPattern.test(slug) && slug.length >= 3 && slug.length <= 100;
};

// Validation utilities aligned with Indonesian standards
export const validateIndonesianPhone = (phone: string): boolean => {
  // Indonesian phone number formats: +62, 62, 08
  const cleanPhone = phone.replace(/\s|-/g, '');
  const patterns = [
    /^\+628\d{8,11}$/, // +628xxxxxxxx
    /^628\d{8,11}$/, // 628xxxxxxxx
    /^08\d{8,11}$/ // 08xxxxxxxx
  ];
  return patterns.some(pattern => pattern.test(cleanPhone));
};

export const formatIndonesianPhone = (phone: string): string => {
  const cleanPhone = phone.replace(/\s|-/g, '');
  
  // Convert to +62 format
  if (cleanPhone.startsWith('08')) {
    return `+62${cleanPhone.substring(1)}`;
  } else if (cleanPhone.startsWith('628')) {
    return `+${cleanPhone}`;
  } else if (cleanPhone.startsWith('+628')) {
    return cleanPhone;
  }
  
  return phone; // Return original if format not recognized
};

export const validateEmail = (email: string): boolean => {
  return validator.isEmail(email) && email.length <= 254;
};

export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password harus minimal 8 karakter');
  }
  if (password.length > 128) {
    errors.push('Password maksimal 128 karakter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password harus mengandung huruf kecil');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password harus mengandung huruf besar');
  }
  if (!/\d/.test(password)) {
    errors.push('Password harus mengandung angka');
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password harus mengandung karakter khusus');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Security utilities for data protection
export const hashSensitiveData = (data: string, salt: string = 'merajut-asa'): string => {
  return CryptoJS.SHA256(data + salt).toString();
};

export const generateSecureId = (length: number = 16): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const sanitizeString = (input: string): string => {
  return validator.escape(input.trim());
};

// Performance utilities for budget monitoring
export const measurePerformance = <T>(
  operation: () => T | Promise<T>,
  label: string
): Promise<{ result: T; duration: number }> => {
  return new Promise(async (resolve, reject) => {
    const startTime = performance.now();
    try {
      const result = await operation();
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Log performance if it exceeds budget
      if (duration > 200) { // 200ms API response budget
        console.warn(`Performance budget exceeded for ${label}: ${duration.toFixed(2)}ms`);
      }
      
      resolve({ result, duration });
    } catch (error) {
      reject(error);
    }
  });
};

// Accessibility utilities
export const generateAriaLabel = (
  baseText: string, 
  additionalInfo?: Record<string, any>
): string => {
  let ariaLabel = baseText;
  
  if (additionalInfo) {
    const infoStrings = Object.entries(additionalInfo)
      .filter(([_, value]) => value !== null && value !== undefined)
      .map(([key, value]) => `${key}: ${value}`);
    
    if (infoStrings.length > 0) {
      ariaLabel += `, ${infoStrings.join(', ')}`;
    }
  }
  
  return ariaLabel;
};

export const truncateText = (
  text: string, 
  maxLength: number,
  addEllipsis: boolean = true
): string => {
  if (text.length <= maxLength) return text;
  
  const truncated = text.substring(0, maxLength);
  return addEllipsis ? `${truncated}...` : truncated;
};

// Image optimization utilities for performance
export const generateImageSizes = (baseWidth: number): number[] => {
  const sizes = [baseWidth];
  
  // Generate responsive sizes following performance best practices
  const multipliers = [0.5, 0.75, 1.25, 1.5, 2];
  multipliers.forEach(multiplier => {
    const size = Math.round(baseWidth * multiplier);
    if (size <= 3840 && !sizes.includes(size)) { // Max 4K width
      sizes.push(size);
    }
  });
  
  return sizes.sort((a, b) => a - b);
};

export const optimizeImageUrl = (
  baseUrl: string,
  width: number,
  quality: number = 80,
  format: 'webp' | 'jpeg' | 'png' = 'webp'
): string => {
  // This would integrate with your CDN/image optimization service
  const params = new URLSearchParams({
    w: width.toString(),
    q: quality.toString(),
    f: format
  });
  
  return `${baseUrl}?${params.toString()}`;
};

// Error handling utilities
export const createApiError = (
  code: string,
  message: string,
  statusCode: number = 400,
  details?: Record<string, any>
): Error & { code: string; statusCode: number; details?: Record<string, any> } => {
  const error = new Error(message) as any;
  error.code = code;
  error.statusCode = statusCode;
  error.details = details;
  return error;
};

// Rate limiting utilities for security
export const createRateLimitKey = (
  identifier: string,
  action: string,
  timeWindow: string = '1h'
): string => {
  return `ratelimit:${action}:${identifier}:${timeWindow}`;
};

// Export main utilities - additional utility files can be added later
// export * from './validation';
// export * from './formatting';
// export * from './performance';
// export * from './security';
