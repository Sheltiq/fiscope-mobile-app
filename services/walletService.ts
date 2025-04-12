import { ResponseType, WalletType } from "@/types";
import { uploadFileToCloudinary } from "./imageService";
import { firestore } from "@/config/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

export const createOrUpdateWallet = async (
    walletData: Partial<WalletType>
): Promise <ResponseType> =>{
    try{
        let walletToSave = {...walletData}

        if(walletData.image){
            // Загружаем изображение в Cloudinary
            const imageUploadRes = await uploadFileToCloudinary(walletData.image, "wallets");
            if (!imageUploadRes.success) {
                return { success: false, msg: imageUploadRes.msg || "Ошибка в загрузке изображения кошелька" };
            }
            // Заменяем данные изображения на полученную ссылку из Cloudinary
            walletToSave.image = imageUploadRes.data;
        }

        if(!walletData?.id){
            walletToSave.amount = 0;
            walletToSave.totalIncome = 0;
            walletToSave.totalExpenses = 0;
            walletToSave.created = new Date();
        }

        const walletRef = walletData?.id ? doc(firestore, "wallets", walletData?.id):
        doc(collection(firestore, "wallets"));

        await setDoc(walletRef, walletToSave, {merge: true})

        return {success: true, data: { ...walletToSave, id: walletRef.id }};

    }catch(error:any){
        console.log('ошибка при создании или обновении кошелька: ', error);
        return {success: false, msg: error.message};
    }
};