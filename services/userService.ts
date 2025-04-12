import { firestore } from "@/config/firebase";
import { ResponseType, UserDataType } from "@/types";
import { doc, updateDoc } from "firebase/firestore";
import { uploadFileToCloudinary } from "./imageService";

export const updateUser = async (
    uid: string,
    updatedData: UserDataType
): Promise<ResponseType> => {
    try {
        // Если в обновленных данных есть новое изображение
        if (updatedData.image && updatedData?.image?.uri) {
            // Загружаем изображение в Cloudinary
            const imageUploadRes = await uploadFileToCloudinary(updatedData.image, "users");
            if (!imageUploadRes.success) {
                return { success: false, msg: imageUploadRes.msg || "Ошибка в загрузке изображения" };
            }
            // Заменяем данные изображения на полученную ссылку из Cloudinary
            updatedData.image = imageUploadRes.data;
        }
        // Получаем ссылку на документ пользователя в Firestore
        const userRef = doc(firestore, "users", uid);
        // Обновляем документ пользователя новыми данными
        await updateDoc(userRef, updatedData);

        return { success: true, msg: "успешное обновление" };
    }
    catch (error: any) {
        console.log("ошибка в редактировании пользователя", error);
        return { success: false, msg: error?.message };
    }
};