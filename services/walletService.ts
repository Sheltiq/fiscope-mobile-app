import { ResponseType, WalletType } from "@/types";
import { uploadFileToCloudinary } from "./imageService";
import { firestore } from "@/config/firebase";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";

// Сервис для создания или обновления кошелька
export const createOrUpdateWallet = async (
    walletData: Partial<WalletType>
): Promise <ResponseType> =>{
    try{
        // Создаем копию данных кошелька для дальнейших модификаций
        let walletToSave = {...walletData}

        // Обработка изображения, если оно предоставлено
        if(walletData.image){
            // Загружаем изображение в Cloudinary
            const imageUploadRes = await uploadFileToCloudinary(walletData.image, "wallets");
            if (!imageUploadRes.success) {
                return { success: false, msg: imageUploadRes.msg || "Ошибка в загрузке изображения кошелька" };
            }
            // Заменяем данные изображения на полученную ссылку из Cloudinary
            walletToSave.image = imageUploadRes.data;
        }

        // Если создается новый кошелек (нет id), инициализируем начальные значения
        if(!walletData?.id){
            walletToSave.amount = 0;
            walletToSave.totalIncome = 0;
            walletToSave.totalExpenses = 0;
            walletToSave.created = new Date();
        }

        // Определяем ссылку на документ в Firestore
        // Если есть id - обновляем существующий, иначе создаем новый
        const walletRef = walletData?.id ? doc(firestore, "wallets", walletData?.id):
        doc(collection(firestore, "wallets"));
        // Сохраняем данные в Firestore с возможностью слияния
        await setDoc(walletRef, walletToSave, {merge: true})
        // Возвращаем успешный результат с обновленными данными
        return {success: true, data: { ...walletToSave, id: walletRef.id }};

    }catch(error:any){
        console.log('ошибка при создании или обновении кошелька: ', error);
        return {success: false, msg: error.message};
    }
};

//Сервис для удаления кошелька
export const deleteWallet = async (walletId: string): Promise<ResponseType> =>{
    try{
        // Получаем ссылку на документ кошелька
        const walletRef = doc(firestore, "wallets", walletId);
        // Удаляем документ из Firestore
        await deleteDoc(walletRef);

        return {success: true, msg: "Кошелек успешно удален"}

    }catch(err:any){
        console.log("ошибка при удалении кошелька: ", err);
        return {success: false, msg: err.message}
    }
};