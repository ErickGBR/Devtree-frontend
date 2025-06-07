/**
 * validate if a string is a valid URL
 * @param classes 
 * @returns {string}
 * @description This function takes an array of class names and returns a string of class names separated by spaces.
 * It filters out any falsy values (like empty strings or null) before joining them.
 */

export function classNames(...classes : string[]) {
    return classes.filter(Boolean).join(' ')
}

/**
 * validate if a string is a valid URL
 * @param url 
 * @returns {boolean}
 * @description This function checks if the provided string is a valid URL by attempting to create a new URL object.
 * If the URL is valid, it returns true; otherwise, it returns false.
 */
export function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}