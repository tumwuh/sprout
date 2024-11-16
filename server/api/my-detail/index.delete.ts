export default defineEventHandler(async (event) => {
    const {sessionPassword} = useRuntimeConfig(event);
    const session = await useSession(event, {
        password: sessionPassword,
        name: 'my-detail'
    });
    await session.clear();
    return "ok";
})