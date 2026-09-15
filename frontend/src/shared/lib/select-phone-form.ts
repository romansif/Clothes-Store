import { ref } from "vue";

export const countries = [
    {
        code: 'UZ',
        name: 'UZ (+998)',
        dialCode: '+998',
        mask: '+{998} (00) 000-00-00',
        placeholder: '+000 (00) 000-00-00'
    },
    {
        code: 'KZ',
        name: 'KZ (+7)',
        dialCode: '+7',
        mask: '+{7} (000) 000-00-00',
        placeholder: '+0 (000) 000-00-00'
    },
    {
        code: 'RU',
        name: 'RU (+7)',
        dialCode: '+7',
        mask: '+{7} (000) 000-00-00',
        placeholder: '+0 (000) 000-00-00'
    },
    {
        code: 'US',
        name: 'US (+1)',
        dialCode: '+1',
        mask: '+{1} (000) 000-0000',
        placeholder: '+0 (00) 000-0000'
    },
]

export const selectedCountryCode = ref('UZ');