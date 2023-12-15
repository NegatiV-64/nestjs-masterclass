export const createUrlParams = (
    params: URLSearchParams,
    newParams: Record<string, unknown>
): URLSearchParams => {
    const newSearchParams = new URLSearchParams(params.toString())

    for (const [key, value] of Object.entries(newParams)) {
        if (value === null || value === undefined || value === '') {
            newSearchParams.delete(key)
        } else if (Array.isArray(value)) {
            newSearchParams.set(key, value.join(','))
        } else if (typeof value === 'object') {
            continue
        } else {
            newSearchParams.set(key, value.toString())
        }
    }

    return newSearchParams
}