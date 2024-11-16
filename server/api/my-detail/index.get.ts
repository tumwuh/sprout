export default defineEventHandler(async (event) => {
    const {sessionPassword} = useRuntimeConfig(event);
    const session = await useSession(event, {
        password: sessionPassword,
        name: 'my-detail'
    });
    return session?.data?.user ?? 'null';
})