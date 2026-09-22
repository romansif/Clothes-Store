import { computed } from "vue";

export const informationClasses = () => {
    const postalCodeClass = (error: string) => [
        `w-full bg-gray-50 border border-gray-400 transition duration-400 hover:bg-white
        rounded-xl outline-none px-4 py-3 text-xs font-dm-sans`,
        error ? `placeholder:text-red-500 border-red-500` : ``
    ];

    const informationSelectPhoneCodeClass = computed(() => [
        `text-xs outline-none bg-gray-50 border border-gray-400 font-dm-sans transition duration-400 
        hover:bg-white rounded-xl px-2 py-3`
    ])

    const informationPhoneClass = (error: string) => [
        `bg-gray-50 border border-gray-400 transition duration-400 hover:bg-white 
        font-dm-sans rounded-xl outline-none px-4 py-3 text-xs w-full`,
        error ? `placeholder:text-red-500 border-red-500` : ``
    ];


    return {
        informationSelectPhoneCodeClass,
        postalCodeClass,
        informationPhoneClass,
    }
}