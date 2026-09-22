export const paymentClasses = () => {
    const paymentMethodClass = (form: string, method: string, error: string) => [
        `flex justify-between items-center px-3 border border-gray-400 rounded-xl h-[80px] 
        transition duration-400 bg-gray-50 hover:bg-white`,
        form === method ? 'bg-white' : '',
        error ? 'border-red-500' : ''
    ];

    const cardNumberClass = (error: string) => [
        `border border-gray-300 rounded-xl outline-none px-4 py-4 text-xs transition duration-400
        font-dm-sans bg-gray-50 hover:bg-white appearance-none placeholder:text-sm`,
        error ? 'placeholder:text-red-500 border-red-500 placeholder:text-xs' : 'placeholder:text-gray-600'
    ];

    const expiryDateClass = (error: string) => [
        `border border-gray-300 rounded-xl w-full sm:w-75 md:w-91.25 lg:w-48.75 xl:w-61.25
        font-dm-sans outline-none px-4 py-4 text-xs transition duration-400 bg-gray-50 hover:bg-white`,
        error ? 'placeholder:text-red-500 border-red-500 placeholder:text-xs' : 'placeholder:text-gray-600'
    ];

    const cardCvvClass = (error: string) => [
        `border border-gray-300 rounded-xl w-full sm:w-75 md:w-91.25 lg:w-48.75 xl:w-61.25
        font-dm-sans outline-none px-4 py-4 text-xs transition duration-400 bg-gray-50 hover:bg-white placeholder:text-lg`,
        error ? 'placeholder:text-red-500 border-red-500 placeholder:text-xs' : 'placeholder:text-gray-600'
    ];


    return {
        cardNumberClass,
        expiryDateClass,
        cardCvvClass,

        paymentMethodClass,
    }
}