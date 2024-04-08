import { getProfile } from '../helpers';

export const UseFetchProfile = (user, setUser) => {

    getProfile(user)
        .then(data => {
            setUser({
                status: user.status,
                data: data.data,
                type: user.type
            });
        });
}
