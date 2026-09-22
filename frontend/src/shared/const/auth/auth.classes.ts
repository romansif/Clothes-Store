export const authClasses = () => {
    const getSignUpPasswordClass = (hasError: string) => [
        'absolute w-7.5 top-1/4 left-58 sm:left-50', hasError ? 'top-1/6' : ''
    ];

    const selectPhoneCodeClass = () => [
        `text-sm outline-none bg-[#D9D9D9]/40 transition duration-400 border border-gray-300
        font-dm-sans hover:bg-gray-50 rounded-md py-5 px-3 appearance-none`
    ];

    const signInRoleClass = (error: string) => [
        `flex items-center gap-3 bg-[#D9D9D9]/40 outline-none px-6 py-4 rounded-sm border border-gray-300
        transition duration-400 hover:bg-gray-50 placeholder:text-xl w-full cursor-pointer`,
        error ? 'border border-red-500' : ''
    ];

    return {
        signInRoleClass,

        getSignUpPasswordClass,

        selectPhoneCodeClass
    }
}