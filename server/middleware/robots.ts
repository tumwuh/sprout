export default defineEventHandler((event) => {
    const config = useRuntimeConfig()
    // Dynamically generate robots rules
    if (process.env.NODE_ENV === 'production') {
        setResponseHeader(event, 'X-Robots-Tag', 'index, follow')
    } else {
        setResponseHeader(event, 'X-Robots-Tag', 'noindex, nofollow')
    }
})