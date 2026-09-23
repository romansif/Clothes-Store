import { computed } from "vue";

export const profileClasses = () => {
    const profileSelectPhoneCodeClass = computed(() => [
        `text-xs outline-none bg-[#D9D9D9]/40 transition duration-400 border border-gray-300
        hover:bg-gray-50 rounded-md py-5 px-3 font-dm-sans`
    ]);

    const profilePhoneClass = (error: string) => [
        `w-full border border-gray-300 rounded-xl outline-none px-4 py-3 text-sm bg-[#D9D9D9]/40
        transition duration-400 hover:bg-gray-50 appearance-none font-dm-sans`,
        error ? 'border border-red-500' : ''
    ];

    return {
        profileSelectPhoneCodeClass,
        profilePhoneClass,
    }
}