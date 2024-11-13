import { useLocalSearchParams } from 'expo-router';

import { Text } from 'react-native';

export default function Page() {
    const { idUser } = useLocalSearchParams();

    return <Text>User: {idUser}</Text>;
}
