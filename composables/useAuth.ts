import {pb} from "~/pocketbase.config";

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
    const user = pb.authStore
    const router  = useRouter()

    const authenticationPageGuard = () => {
        user.isValid ? router.push('/') : null
    }

    const registerUser = async (formData: TUser) => {
       try {
           return await pb.collection('users').create(formData)
       }catch (e) {
           console.log(e);
       }
    }

    const authWithEmailPassword = async (email: string, password: string) => {
        try {
            return await pb.collection('users').authWithPassword(
                email,
                password,
            )
        }catch (e) {
            console.log(e);
        }
    }

    return {user, registerUser, authWithEmailPassword, authenticationPageGuard}
}

export default useAuth