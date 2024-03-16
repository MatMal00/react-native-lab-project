import { Text, TextProps } from "@/components/Themed";
import { ReactNode } from "react";

interface ICardProps extends TextProps {
    children: ReactNode | ReactNode[];
}

const CardText = ({ children, ...props }: ICardProps) => {
    return (
        <Text darkColor="#fff" lightColor="#000" {...props}>
            {children}
        </Text>
    );
};
export default CardText;
