export default defineEventHandler( async (event) => {
    const body = await readBody(event);
    const {sessionPassword} = useRuntimeConfig(event);
    const session =  await useSession(event, {
        password: sessionPassword,
        name: 'my-detail'
    });
    await session.update({
        user: body
    })
    return "ok"
})