export const getValueWithinRange = (
    value: number,
    minValue: number,
    maxValue: number,
) => {
    return Math.min(Math.max(value, minValue), maxValue);
};
