// src/services/storageService.ts
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    deleteObject,
    StorageReference
} from 'firebase/storage';
import { storage } from '../firebase';

// טיפוס להחזרת מידע על תמונה
export interface StorageImage {
    url: string;
    fullPath: string;
    name: string;
    category?: string;
}

/**
 * פונקציה להעלאת תמונה ל-Firebase Storage
 * @param file קובץ התמונה להעלאה
 * @param category קטגוריה/תיקייה אליה תועלה התמונה
 * @param customFilename שם מותאם אישית (אופציונלי)
 * @returns הבטחה עם כתובת URL להורדת התמונה
 */
export const uploadImage = async (
    file: File,
    category: string = 'gallery',
    customFilename?: string
): Promise<StorageImage> => {
    try {
        // יצירת שם קובץ ייחודי עם חותמת זמן אם לא סופק שם מותאם אישית
        const timestamp = new Date().getTime();
        const filename = customFilename || `${timestamp}_${file.name}`;

        // יצירת הפניה למיקום בתוך ה-Storage
        const storageRef = ref(storage, `${category}/${filename}`);

        // העלאת הקובץ
        const snapshot = await uploadBytes(storageRef, file);
        console.log('Image uploaded successfully:', snapshot.metadata.name);

        // קבלת ה-URL להורדה
        const downloadURL = await getDownloadURL(snapshot.ref);

        return {
            url: downloadURL,
            fullPath: snapshot.metadata.fullPath,
            name: snapshot.metadata.name,
            category
        };
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

/**
 * פונקציה לקבלת רשימת כל התמונות בתיקייה
 * @param category קטגוריה/תיקייה ממנה לשלוף תמונות
 * @returns הבטחה עם מערך של אובייקטי תמונה
 */
export const getImagesFromCategory = async (category: string = 'gallery'): Promise<StorageImage[]> => {
    try {
        const folderRef = ref(storage, category);
        const result = await listAll(folderRef);

        // יצירת מערך של הבטחות עבור כל תמונה
        const imagesPromises = result.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return {
                url,
                fullPath: itemRef.fullPath,
                name: itemRef.name,
                category
            };
        });

        // המתנה עד שכל ההבטחות תסתיימנה
        return Promise.all(imagesPromises);
    } catch (error) {
        console.error(`Error getting images from category ${category}:`, error);
        // במקרה של שגיאה, להחזיר מערך ריק
        return [];
    }
};

/**
 * פונקציה לקבלת כל התמונות מכל הקטגוריות
 * @param categories מערך של שמות קטגוריות
 * @returns הבטחה עם מערך של אובייקטי תמונה מכל הקטגוריות
 */
export const getAllImages = async (categories: string[]): Promise<StorageImage[]> => {
    try {
        // יצירת מערך של הבטחות עבור כל קטגוריה
        const categoryPromises = categories.map(category =>
            getImagesFromCategory(category).then(images =>
                // הוספת מידע על הקטגוריה לכל תמונה
                images.map(image => ({ ...image, category }))
            )
        );

        // המתנה עד שכל ההבטחות מכל הקטגוריות תסתיימנה ושטוח המערך
        const allImagesArrays = await Promise.all(categoryPromises);
        return allImagesArrays.flat();
    } catch (error) {
        console.error('Error getting all images:', error);
        return [];
    }
};

/**
 * פונקציה למחיקת תמונה
 * @param imagePath הנתיב המלא של התמונה
 */
export const deleteImage = async (imagePath: string): Promise<void> => {
    try {
        const imageRef = ref(storage, imagePath);
        await deleteObject(imageRef);
        console.log('Image deleted successfully:', imagePath);
    } catch (error) {
        console.error('Error deleting image:', error);
        throw error;
    }
};

/**
 * פונקציה להמרת URL של תמונה לאובייקט הפניה
 * @param url כתובת URL של תמונה
 * @returns הפניה לתמונה ב-Storage
 */
export const getRefFromURL = (url: string): StorageReference | null => {
    try {
        // החילוץ של הנתיב מתוך ה-URL
        const baseUrl = `https://firebasestorage.googleapis.com/v0/b/${import.meta.env.VITE_FIREBASE_STORAGE_BUCKET}/o/`;
        if (url.startsWith(baseUrl)) {
            const pathEncoded = url.substring(baseUrl.length).split('?')[0];
            const path = decodeURIComponent(pathEncoded);
            return ref(storage, path);
        }
        return null;
    } catch (error) {
        console.error('Error getting ref from URL:', error);
        return null;
    }
};

// ייצוא של כל הפונקציות כאובייקט שירות
const storageService = {
    uploadImage,
    getImagesFromCategory,
    getAllImages,
    deleteImage,
    getRefFromURL
};

export default storageService;