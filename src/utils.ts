export const calculateDiscount = (price: number, percentage: number) => {
    return (price -= price * (percentage / 100));
};
