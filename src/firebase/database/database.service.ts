
import { ref, get, set, runTransaction } from "firebase/database";
import { database } from "../config";

export const getData = async (path: string) => {
    try {
        const headerRef = ref(database, path);
        const snapshot = await get(headerRef);
        return snapshot.val();
    } catch (error) {
        console.error('Error getting data:', error);
        throw error;
    }
};

export const setData = async (path: string, value: any) => {
    try {
        const headerRef = ref(database, path);
        const snapshot = await set(headerRef, value);
        return snapshot;
    } catch (error) {
        console.error('Error setting data:', error);
        throw error;
    }
};

export const transaction = async (path: string, callback: (value: number) => number) => {
    try {
        const headerRef = ref(database, path);
        const snapshot = await runTransaction(headerRef, callback);
        return snapshot;
    } catch (error) {
        console.error('Error setting data:', error);
        throw error;
    }
};

