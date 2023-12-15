import { useLoaderData } from "react-router-dom"

export const usePageData = <T>() => {
    const data = useLoaderData() as T

    return data
}