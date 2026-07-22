import { SocialNetwork } from '../types';

export const AUTH_TOKEN_KEY = 'AUTH_TOKEN';

/**
 * Combines class names, filtering out falsy values
 * @param classes - Array of class name strings
 * @returns Joined class names string
 */
export function classNames(...classes : string[]) {
    return classes.filter(Boolean).join(' ')
}

/**
 * Validate if a string is a valid URL
 * @param url - The URL string to validate
 * @returns {boolean}
 */
export function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

/**
 * Safely parse a JSON string into a SocialNetwork array
 * @param json - The JSON string to parse
 * @returns Array of SocialNetwork objects, empty array on failure
 */
export function parseLinks(json: string): SocialNetwork[] {
    try {
        return JSON.parse(json);
    } catch {
        return [];
    }
}