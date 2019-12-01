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
