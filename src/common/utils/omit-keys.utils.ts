export function omitKeys<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    const result = { ...obj };
    keys.forEach((key) => {
        delete result[key];
    });
    return result;
}
