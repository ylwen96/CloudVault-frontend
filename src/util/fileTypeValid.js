export const isSupportedType = (value) => {
    const type = new RegExp('^text/*');
    if (type.test(value) || value === 'application/json' || value === 'image/png' || value === 'image/jpeg' || value === 'image/webp' || value === 'image/gif') {
        return true;
    } else {
        return false;
    }
}