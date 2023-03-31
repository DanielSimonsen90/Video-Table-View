export const ensureSlash = (url: string) => (url.startsWith("/") ? url : `/${url}`);

export function request<Data>(url: string, options: RequestInit = { method: 'GET' }): Promise<Data> {
    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                console.log(url, data);
                resolve(data);
            })
            .catch(reason => {
                console.error(url, reason);
                reject(reason);
            });
    })
}