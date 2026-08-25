import { computed } from "vue";
import { type User } from "@/entities/profile/model/user.types.ts";

export const profileClasses = () => {
    const profileTabsClass = () => [
        `border-b border-gray-300 py-6 px-6 cursor-pointer`
    ];

    const profileTabsSpanClass = () => [
        `flex items-center justify-between transition duration-400 hover:scale-105`
    ];

    const isProfileLoginClass = (user: User) => [
        `font-[Montserrat] flex justify-center my-items-center'`, user?.role === 'Buyer' ? 'p-35' : 'p-15'
    ];

    const profileSelectPhoneCodeClass = computed(() => [
        `text-xs outline-none bg-[#D9D9D9]/40 transition duration-400 border border-gray-300
        hover:bg-gray-50 rounded-md py-5 px-3`
    ]);

    const profilePhoneClass = (error: boolean) => [
        `w-full border border-gray-300 rounded-xl outline-none px-4 py-3 text-sm bg-[#D9D9D9]/40
        transition duration-400 hover:bg-gray-50 appearance-none`,
        error ? 'border border-red-500' : ''
    ];

    return {
        profileSelectPhoneCodeClass,
        profilePhoneClass,

        profileTabsClass,
        profileTabsSpanClass,
        isProfileLoginClass
    }
}