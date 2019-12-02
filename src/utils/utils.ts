export const getValueWithinRange = (
    value: number,
    minValue: number,
    maxValue: number,
) => {
    return Math.min(Math.max(value, minValue), maxValue);
};

export const sleep = (time: number): Promise<void> => {
    return new Promise<void>((resolve): void => {
        setTimeout(resolve, time);
    });
};

export const genrateRandomIntegerInRange = (
    startRange: number,
    endRange: number,
): number => {
    return Math.floor(Math.random() * (endRange - startRange + 1)) + startRange;
};
