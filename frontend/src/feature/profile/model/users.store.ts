import { ref } from 'vue'

export interface User {
    id: string,
    role: string,
    name: string,
    surName: string,
    companyName: string,
    privatePhone: string,
    publicPhone: string,
    email: string,
    password: string,
    avatarUrl: string,
    created_at: string,
    refreshTokens: object,
    userId: string
}

const users = ref<User[]>([])
const user = ref<User>({} as User)

const countries = [
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

const selectedCountryCode = ref('UZ');

export const usersStore = () => {
    return {
        users,
        user,

        countries,

        selectedCountryCode,
    }
}