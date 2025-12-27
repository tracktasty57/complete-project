const getBaseUrl = () => {
    const envUrl = process.env.NEXT_PUBLIC_API_URL;
    if (envUrl && !envUrl.includes("your-backend-url")) {
        return envUrl;
    }
    return "/api";
};

const API_BASE_URL = getBaseUrl();

export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('token');
    const headers: Record<string, string> = {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...(options.headers as Record<string, string>),
    };

    if (!(options.body instanceof FormData) && !headers['Content-Type']) {
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    let responseData;
    try {
        const text = await response.text();
        responseData = text ? JSON.parse(text) : {};
    } catch (e) {
        responseData = {};
    }

    if (!response.ok) {
        throw new Error(responseData.message || `API Error: ${response.status} ${response.statusText}`);
    }

    return responseData;
};
