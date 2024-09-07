export const getCurrency = (data) => {
    return Object.keys(data?.currencies || {})[0];
};

export const getCallingCode = (data) => {
    const preffix = data?.idd?.root?.replace("+", "");
    const suffix = data?.idd?.suffixes[0];
    return preffix + suffix;
};