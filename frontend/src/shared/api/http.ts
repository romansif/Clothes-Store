import router from '@/app/router/index'

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

    const res = await fetch(`${import.meta.env.VITE_BASE_API}${endpoints}`, fetchOptions)
    if(res.status === 401 && !retry){
        try{
            const refreshRes = await fetch(`${import.meta.env.VITE_BASE_API}/refresh`, {
                method: 'POST',
                credentials: 'include'
            })
            if(!refreshRes.ok){
                await router.replace({ name: 'signIn' })

                new Error('Session expired, please log in again.');
            }

            const data = await refreshRes.json();

            localStorage.setItem('accessToken', data.accessToken);

            return handler(endpoints, options, true);

        }catch(err){
            console.log(`Failed to restore the session:`, err);
            localStorage.clear();

            await router.replace({ name: 'signIn' })
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