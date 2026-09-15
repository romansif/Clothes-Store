export const baseSelectClass = (form: any, error: boolean) => [
    'w-full border border-gray-300 rounded-sm outline-none px-5 py-5 text-sm bg-white appearance-none text-[#A3A3A3]',
    form ? 'text-black' : '', error ? 'border-red-500' : ''
]

export const skuClass = (error: boolean) => [
    `uppercase border border-gray-300 rounded-sm outline-none px-6 py-5 text-sm bg-white
    transition duration-400 font-dm-sans`, error ? 'border-red-500' : ''
]