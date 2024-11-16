export default defineEventHandler(async (event) => {
    const {sessionPassword} = useRuntimeConfig(event);
    const {baseApiUrl} = useRuntimeConfig(event).public;
    return {
        sessionPassword,
        baseApiUrl: baseApiUrl,
    };
})