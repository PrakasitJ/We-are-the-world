import { useState } from "react";
import { TextInput, View, Text, TextInputProps } from "react-native";

export const FieldTextInput = ({ SetTextCallBack, showMax=true, ...rest }: { SetTextCallBack?: React.Dispatch<React.SetStateAction<string>>, showMax?: boolean } & TextInputProps) => {
    const maximumLength = rest.maxLength
    
    const [text, setText] = useState<string>("");
    
    const handleChangeText = (newText: string) => {
        setText(newText);
        SetTextCallBack?.(newText);
    };

    return (
        <View className="h-full flex-1">
            <TextInput
                className="bg-backgroud opacity-50 flex-1 py-8 px-4 rounded-xl text-white font-regular"
                {...rest}
                multiline
                value={text}
                onChangeText={handleChangeText}
                placeholderTextColor="black"
            />
            {showMax && <Text className="absolute right-4 top-3 text-black opacity-30">{text.length}/{maximumLength}</Text>}
        </View>
    );
};