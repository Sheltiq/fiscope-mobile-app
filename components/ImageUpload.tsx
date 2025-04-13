import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ImageUploadProps } from '@/types'
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { colors, radius } from '@/constants/theme';
import { scale, verticalScale } from '@/utils/styling';
import Typo from './Typo';
import { Image } from 'expo-image';
import { getFilePath } from '@/services/imageService';
import * as ImagePicker from 'expo-image-picker';


const ImageUpload = ({
    file = null,
    onSelect,
    onClear,
    containerStyle,
    imageStyle,
    placeholder = "",
}: ImageUploadProps) => {

    const pickImage = async ()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            // allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });

        if (!result.canceled) {
            onSelect(result.assets[0])
        }        
    };

    return (
        <View>
            {!file && (
                <TouchableOpacity
                    onPress={pickImage}
                    style={[styles.inputContainer, containerStyle && containerStyle]}
                >
                    <Feather name="upload" size={verticalScale(22)} color={colors.neutral300} />
                    {placeholder && <Typo size={15}>{placeholder}</Typo>}
                </TouchableOpacity>
            )}

            {file && (
                <View style={[styles.image, imageStyle && imageStyle]}>
                    <Image
                        style={{ flex: 1 }}
                        source={getFilePath(file)}
                        contentFit="cover"
                        transition={100}
                    />
                    <TouchableOpacity style={styles.deleteIcon} onPress={onClear}>
                        <Entypo name="cross" size={verticalScale(28)} color={colors.red}/>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default ImageUpload;

const styles = StyleSheet.create({
    image: {
        height: scale(150),
        width: scale(150),
        borderRadius: radius._15,
        borderCurve: "continuous",
        overflow: "hidden",
    },
    inputContainer: {
        height: verticalScale(54),
        backgroundColor: colors.neutral700,
        borderRadius: radius._15,
        flexDirection: "row",
        gap: 10,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.neutral500,
        borderStyle: "dashed",
    },
    deleteIcon: {
        position: "absolute",
        top: scale(6),
        right: scale(6),
    },
});