import router from '@/app/router/index.ts'

export const BASE_URL = `http://localhost:3000/api`;


export class ApiError extends Error {
    response?: {
        data: any
    };
    constructor(error: any, message: string) {
        super(message);
        this.name = 'ApiError';
        this.response = error?.errors || error?.response;
    }
}

export const handler = async <T = any>(
    endpoints: string, options: RequestInit = {}, retry = false
): Promise<T | null> => {
    options.credentials = 'include'

    const headers: Record<string, string> = {
        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
        ...(options.headers as Record<string, string>)
    }

    if (!(options.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
    }

    const fetchOptions: RequestInit = {
        ...options,
        headers,
        credentials: 'include',
    }

    const res = await fetch(`${BASE_URL}${endpoints}`, fetchOptions)
    if(res.status === 401 && !retry){
        try{
            const refreshRes = await fetch(`${BASE_URL}/refresh`, {
                method: 'POST',
                credentials: 'include'
            })
            if(!refreshRes.ok){
                new Error('Сессия истекла, авторизуйтесь заново');
            }

            const data = await refreshRes.json();
            localStorage.setItem('accessToken', data.accessToken);

            return handler(endpoints, options, true);

        }catch(err){
            console.log('Не удалось востановить ссесию');
            localStorage.clear();

            await router.replace({ name: '/auth/LoginPage' })
            throw err;
        }
    }
    if(!res.ok){
        const errorData = await res.json().catch(() => ({}));
        const errorMessage = errorData.message || `Ошибка: ${res.status}`

        throw new ApiError(errorData, errorMessage);
    }
    return res.json();
}