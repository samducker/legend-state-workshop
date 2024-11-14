import { Todos } from '@/components/Todos';
import { generateId } from '@/core/generateId';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useObservable, use$ } from '@legendapp/state/react';

export default function HomeScreen() {
    const { getItem, setItem } = useAsyncStorage('my_id');
    const id$ = useObservable<string | null>(null);
    const id = use$(id$);

    useMemo(() => {
        getItem().then((id) => {
            if (!id) {
                const newId = generateId();
                id$.set(newId);
                setItem(newId);
                return;
            }

            id$.set(id);
        });
    }, []);

    console.log('6 - Home screen');

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>{id && <Todos idUser={id} />}</ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        paddingHorizontal: 16,
    },
});
