export const filterClasses = () => {
    const selectedSizeClass = (style: string, isActive: boolean) => [
        style, 'w-10 transition duration-400 hover:scale-120 cursor-pointer',
        isActive ? 'scale-120' : ''
    ];

    const selectedFilterClass = (isActive: boolean) => [
        'w-5.75 h-h-5.75 transition duration-400 hover:scale-120 cursor-pointer',
        isActive ? 'scale-120' : ''
    ];

    const selectedCategoryClass = (isActive: boolean) => [
        `cursor-pointer border-2 sm:px-2 sm:py-1 md:px-5 text-lg transition duration-400 
        hover:border-black hover:text-black hover:scale-105`,
        isActive ? ' border-black scale-105' : 'text-[#A3A3A3] border-[#A3A3A3]'
    ];

    const selectedCollectionsClass = (isActive: boolean) => [
        `cursor-pointer border-2 px-8 py-1 text-lg transition duration-400 
        hover:border-black hover:text-black hover:scale-105`,
        isActive ? ' border-black scale-105' : 'text-[#A3A3A3] border-[#A3A3A3]'
    ];

    const selectedSidebarCategoryClass = (isActive: boolean) => [
        `py-1 cursor-pointer border-2 transition duration-400 hover:border-black hover:text-black hover:scale-105`,
        isActive ? ' border-black scale-105' : 'text-[#A3A3A3] border-[#A3A3A3]'
    ];

    return {
        selectedSizeClass,
        selectedFilterClass,
        selectedCategoryClass,
        selectedCollectionsClass,
        selectedSidebarCategoryClass,
    }
}