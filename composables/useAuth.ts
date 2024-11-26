import {useNuxtApp} from '#app';

export type TUser = {
    id?: string;
    collectionId: string;
    collectionName: string;
    username: string;
    verified: boolean;
    emailVisibility: boolean;
    email: string;
    created: Date;
    updated: Date;
    name: string;
    avatar?: string;
    role: 'admin' | 'team' | 'organizer';
}

const useAuth = () => {
    const {$pb} = useNuxtApp()
    const user = $pb.authStore
    const router = useRouter()


    const authenticationPageGuard = () => {
        user.isValid ? router.push('/') : null
    }

    const registerUser = async (formData: TUser) => {
        try {
            return await $pb.collection('users').create(formData)
        } catch (e) {
            console.log(e);
        }
    }

    const authWithEmailPassword = async (email: string, password: string) => {
        try {
            return await $pb.collection('users').authWithPassword(
                email,
                password,
            )
        } catch (e) {
            console.log(e);
            return null
        }
    }

    const logOut = async () => {
       user.clear()
       await router.replace('/login')
       await  $fetch('/api/my-detail', {
            method: 'DELETE'
       })
    }

    return {user, registerUser, authWithEmailPassword, authenticationPageGuard, logOut}
}

export default useAuth