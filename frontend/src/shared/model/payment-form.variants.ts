export const paymentMethodClass = (form: string, method: string, error: string) => [
    `flex justify-between items-center px-3 border border-gray-400 rounded-xl h-[80px] 
    transition duration-400 bg-gray-50 hover:bg-white`,
    form === method ? 'bg-white' : '',
    error ? 'border-red-500' : ''
];

export const baseCardInputClass =
    `border border-gray-300 rounded-xl w-full sm:w-75 md:w-91.25 lg:w-48.75 xl:w-61.25
    font-dm-sans outline-none px-4 py-4 text-xs transition duration-400 bg-gray-50 hover:bg-white`

export const cardNumberClass = `${baseCardInputClass} placeholder:text-sm`

export const expiryDateClass = baseCardInputClass

export const cardCvvClass = `${baseCardInputClass} placeholder:text-lg`

export const paymentCardErrorClass = 'border-red-500 placeholder:text-red-500 placeholder:text-xs'


