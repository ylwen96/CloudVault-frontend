/* eslint-disable no-unused-vars */
export const defaultStorageExpirationDate = 1 / 24;

export const StorageTypes = {
    ID_TOKEN_STORAGE: 'fragments_ID_TOKEN_STORAGE',
    USERNAME_STORAGE: 'fragments_USERNAME_STORAGE',
    ACCESS_TOKEN_STORAGE: 'fragments_ACCESS_TOKEN_STORAGE',
}

export const readStorage = (name) => {
    if (!name) return '';
    if (typeof localStorage !== 'undefined') {
        let val = localStorage.getItem(name)?.split('; expires=');

        if (!val || val.length !== 2 || Date.parse(val[1]) <= Date.now()) return '';
        return val[0];
    } else {
        return '';
    }
};

export const createStorage = (name, data, days) => {
    let expires = '';
    const dayInMs = 24 * 60 * 60 * 1000;

    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * dayInMs);
        expires = '; expires=' + date.toUTCString();
    }

    if (typeof localStorage !== 'undefined') {
        localStorage.setItem(name, data + expires + '; path=/');
    }
};

export const eraseStorage = (name) => {
    localStorage.removeItem(name)
};
