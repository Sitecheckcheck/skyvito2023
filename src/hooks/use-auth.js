import {useSelector} from 'react-redux'

export function useAuth() {
    const {email, name, access_token, refresh_token} = useSelector(state => state.user);

    return {
        isAllowed : !!email,
        email,
        name,
        access_token,
        refresh_token,
    }
}