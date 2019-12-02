export const getValueWithinRange = (
    value: number,
    minValue: number,
    maxValue: number,
): number => {
    return Math.min(Math.max(value, minValue), maxValue);
};

export const sleep = (time: number): Promise<void> => {
    return new Promise<void>((resolve): void => {
        setTimeout(resolve, time);
    });
};

export const generateRandomIntegerInRange = (
    startRange: number,
    endRange: number,
): number => {
    return Math.floor(Math.random() * (endRange - startRange + 1)) + startRange;
};
