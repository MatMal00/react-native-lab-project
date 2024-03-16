import { ReactElement } from "react";
import Loader from "./Loader";
import { Text } from "./Themed";

interface ActionsHandlerProps<T> {
    isLoading: boolean;
    error?: string;
    children: (data: T) => ReactElement | ReactElement[];
    data?: T;
}

export const ActionsHandler = <T,>({
    isLoading,
    error,
    children,
    data,
}: ActionsHandlerProps<T>): ReactElement | null => {
    if (isLoading) return <Loader />;
    if (error) return <Text>{error}</Text>;
    if (!data) return <Text>No data to display</Text>;
    if (data) return <>{children(data)}</>;
    return null;
};
