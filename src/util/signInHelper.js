import { getUser } from './auth';
import { readStorage, StorageTypes, createStorage, eraseStorage } from './storageHelper';

const getSessionValues = () => {
    const userId = readStorage(StorageTypes.ID_TOKEN_STORAGE);
    if (!userId) {
        return {
            username: "",
            idToken: "",
            accessToken: "",
        };
    } else {
        return {
            username: readStorage(StorageTypes.USERNAME_STORAGE) || '',
            idToken: readStorage(StorageTypes.ID_TOKEN_STORAGE) || '',
            accessToken: readStorage(StorageTypes.ACCESS_TOKEN_STORAGE) || '',
        };
    }
};

const createSignInSession = (username, idToken, accessToken, days) => {
    createStorage(StorageTypes.USERNAME_STORAGE, username, days);
    createStorage(StorageTypes.ID_TOKEN_STORAGE, idToken, days);
    createStorage(StorageTypes.ACCESS_TOKEN_STORAGE, accessToken, days);
};

const isSignedIn = async () => {
    try {
        const user = await getUser();
        if (user !== null) {
            return user.idToken === readStorage(StorageTypes.ID_TOKEN_STORAGE)
        } else {
            return false
        }
    } catch (error) {
        console.error("Error:", error);
        return false
    }
};


const cleanupOnSignOut = () => {
    eraseStorage(StorageTypes.USERNAME_STORAGE);
    eraseStorage(StorageTypes.ID_TOKEN_STORAGE);
    eraseStorage(StorageTypes.ACCESS_TOKEN_STORAGE);
};

export { getSessionValues, createSignInSession, isSignedIn, cleanupOnSignOut }
