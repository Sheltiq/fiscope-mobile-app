import { CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from "@/constants";
import { ResponseType } from "@/types";
import axios from "axios";

// URL для загрузки изображений в Cloudinary
const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export const uploadFileToCloudinary = async (
    file: { uri?: string } | string,
    folderName: string
): Promise<ResponseType> => {
    try {
        if(!file) return {success: true, data: null};
        // Если передана строка (URL), возвращаем её как есть
        if (typeof file == 'string') {
            return { success: true, data: file };
        }

        // Если есть файл с URI, загружаем его в Cloudinary
        if (file && file.uri) {
            // Создаем объект FormData для отправки файла
            const formData = new FormData();
            formData.append("file", {
                uri: file?.uri,
                type: "image/jpeg",
                name: file?.uri?.split("/").pop() || "file.jpg",
            } as any);

            // Добавляем параметры для загрузки в Cloudinary
            formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
            formData.append("folder", folderName);

            // Отправляем запрос на загрузку файла
            const response = await axios.post(CLOUDINARY_API_URL, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return { success: true, data: response?.data?.secure_url };
        }

        return { success: true };
    } catch (error: any) {
        console.log('ошибка загрузки файла: ', error);
        return { success: false, msg: error.message || "Не удалось загрузить файл" }
    }
};

export const getProfileImage = (file: any) => {
    if (file && typeof file == "string") return file;
    if (file && typeof file == "object") return file.uri;

    return require("../assets/images/defaultUser.jpg");
};

export const getFilePath = (file: any) => {
    if (file && typeof file == "string") return file;
    if (file && typeof file == "object") return file.uri;

    return null;
};