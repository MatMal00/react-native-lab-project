import { useAuth } from "@/libs";
import { useRouter, useSegments } from "expo-router";
import { ReactNode, useEffect } from "react";

interface RouteProtectorProps {
    children: ReactNode;
}

const RouteProtector = ({ children }: RouteProtectorProps) => {
    const segments = useSegments();
    const router = useRouter();
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        const inAuthGroup = segments[0] === "(auth)";

        if (!isLoggedIn && inAuthGroup) router.replace("/login");
    }, [isLoggedIn, segments, router]);

    return children;
};

export default RouteProtector;
