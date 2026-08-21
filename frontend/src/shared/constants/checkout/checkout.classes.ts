export const checkoutClasses = () => {
    const getSavedInfoClass = (isChosen: boolean) => [
        `flex flex-col mt-5 transition duration-400 bg-[#D9D9D9]/40
        hover:bg-gray-50 border border-gray-300 rounded-xl p-2`, isChosen ? 'bg-gray-50' : ''
    ];

    const checkoutVisibilityClass = (step: boolean) => [
        step ? 'hidden' : 'flex flex-col lg:flex-row lg:gap-50 xl:gap-100'
    ]

    return {
        getSavedInfoClass,
        checkoutVisibilityClass
    }
}