import PocketBase from 'pocketbase';
import type {TUser} from "~/composables/useAuth";

export default defineNuxtPlugin(async () => {
    const {baseApiUrl} = useRuntimeConfig().public;
    const userStore = useUserStore();
    const pb = new PocketBase(baseApiUrl as string);
    const userDetail = await $fetch('/api/my-detail')
        .then(res => res === 'null' ? null : res)
        .catch(() => null);


    const removeUser = () => $fetch('/api/my-detail', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(() => userStore.setUser(null))
    if (userDetail) {
        // load the stores data from the cookie value
        pb.authStore.save(userDetail?.token, userDetail?.model);
        userStore.setUser(userDetail?.model);
    }

    // send back the default 'pb_auth' cookie to the client with the latest stores state
    pb.authStore.onChange(() => {
        if (pb.authStore.token && pb.authStore.model) {
            fetch('/api/my-detail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: pb.authStore.token,
                    model: pb.authStore.model
                })
            })
            userStore.setUser(pb.authStore.model as TUser);
        } else {
            removeUser()
        }
    });

    try {
        // get an up-to-date auth stores state by verifying and refreshing the loaded auth model (if any)
        pb.authStore.isValid && await pb.collection('users').authRefresh();
    } catch (_) {
        // clear the auth stores on failed refresh
        pb.authStore.clear();
        await removeUser()
    }

    return {
        provide: {pb}
    }
});