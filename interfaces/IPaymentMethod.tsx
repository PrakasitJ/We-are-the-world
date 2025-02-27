import { Href } from "expo-router";
import { ImageProps } from "react-native";

export interface IPaymentMethod {
    id: number;
    name: string;
    image: ImageProps;
    imageSize: {
        width: number,
        height: number
    }
    path?: Href;
    isActive: boolean;
    item?: IBankItem[];
}

export interface IBankItem {
    id: number;
    name: string;
    image: ImageProps;
    imageSize: {
        width: number,
        height: number
    }
    path?: Href;
    isActive: boolean;
}