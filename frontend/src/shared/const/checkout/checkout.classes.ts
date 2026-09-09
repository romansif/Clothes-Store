export const checkoutClasses = () => {
    const getSavedInfoClass = (isChosen: boolean) => [
        `flex flex-col mt-5 transition duration-400 bg-gray-50
        hover:bg-white border border-gray-400 rounded-xl p-2`,
        isChosen ? 'bg-white' : ''
    ];

    const checkoutClass = () => [
        'flex flex-col lg:flex-row lg:gap-50 xl:gap-100'
    ]

    return {
        getSavedInfoClass,
        checkoutClass
    }
}