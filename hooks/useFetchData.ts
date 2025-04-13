import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, query, QueryConstraint } from 'firebase/firestore'
import { firestore } from '@/config/firebase';

//Хук для получения данных из Firestore с поддержкой реального времени
const useFetchData = <T>(
    collectionName: string,
    constraints: QueryConstraint[] = []
) => {
    // Состояние для хранения полученных данных
    const [data, setData] = useState<T[]>([]);
    // Состояние загрузки
    const [loading, setLoading] = useState(true);
    // Состояние для хранения ошибки
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Проверка наличия названия коллекции
        if (!collectionName) return;
        // Получаем ссылку на коллекцию
        const collectionRef = collection(firestore, collectionName);
        // Создаем запрос с примененными ограничениями
        const q = query(collectionRef, ...constraints);

        // Создаем подписку на обновления данных в реальном времени и получаем функцию отписки
        const unsub = onSnapshot(q, (snapshot) => {
            // Преобразуем полученные документы в массив объектов
            const fetchedData = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            }) as T[];
            // Обновляем состояние с данными
            setData(fetchedData);
            setLoading(false);
        }, (err) => {
            // Обработка ошибок
            console.log('Ошибка при получении данных: ', err);
            setError(err.message);
            setLoading(false);
        });
        // Отписываемся от слушателя при размонтировании компонента
        return () => unsub();
    }, [])
    // Возвращаем объект с данными, состоянием загрузки и ошибкой
    return { data, loading, error };
};

export default useFetchData;

const styles = StyleSheet.create({});