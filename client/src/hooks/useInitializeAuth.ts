import { handleClearPendingSession, handleSetPendingSession, handleSetSessionStore, handleSetUserStore } from "@/app/store/features/sessionSlice.store";
import { ENDPOINTS } from "@/core/api/endpoint";
import api from "@/core/api/privateHttpClient";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useInitializeAuth() {
    const dispatch = useDispatch();

    useEffect(() => {
        const initialize = async () => {
            console.log("Refresh runing...");
            dispatch(handleSetPendingSession());
            
            try {
                const { data } = await api.post(ENDPOINTS.AUTH.REFRESH);

                const me = await api.get(ENDPOINTS.AUTH.ME, {
                    headers: {
                        Authorization: `Bearer ${data.accessToken}`,
                    },
                });
                console.log("Me", me.data.user);
                console.log("Token", data);


                dispatch(handleSetSessionStore({
                    user: me.data.user, token: data.accessToken
                }));
            } catch(error: any) {
                // console.error("Error during refresh token:", error);
            }finally {
                dispatch(handleClearPendingSession());
            }
        };

        initialize();
    }, [dispatch]);
}