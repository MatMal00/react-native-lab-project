import { Text, TextProps } from "@/components/Themed";
import { ReactNode } from "react";

interface ICardProps extends TextProps {
    children: ReactNode | ReactNode[];
}

const CardText = ({ children, ...props }: ICardProps) => {
    return (
        <Text darkColor="#fff" lightColor="#fff" {...props}>
            {children}
        </Text>
    );
};
export default CardText;
