export const shippingClasses = () => {
    const shippingMethodClass = (form: string | number | undefined, method: string, error: string) => [
        `flex justify-between items-center px-3 py-6 border border-gray-400 rounded-xl
        transition duration-400 bg-gray-50 hover:bg-white font-dm-sans`, form === method ? 'bg-white' : '',
        error ? 'border-red-500' : ''
    ];

    return {
        shippingMethodClass,
    }
}