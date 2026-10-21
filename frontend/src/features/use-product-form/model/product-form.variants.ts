export const baseSelectClass = (text: string | object) => [
    'w-full border border-gray-300 rounded-sm outline-none px-5 py-5 text-sm bg-white appearance-none text-[#A3A3A3]',
    text ? 'text-black' : ''
]

export const skuClass =
    `uppercase border border-gray-300 rounded-sm outline-none px-6 py-5 
    text-sm bg-white transition duration-400 font-dm-sans`


export const productFormErrorClass = 'border-red-500'