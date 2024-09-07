import { View, StyleSheet, FlatList } from "react-native"
import { router, useNavigation } from "expo-router"
import { useEffect, useState } from "react"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { auth, db } from "../config"
import { type Memo } from "../../types/memo"

import MemoListItem from "../../components/MemoListItem"
import CircleButton from "../../components/CircleButton"
import Icon from "../../components/Icon"
import LogOutButton from "../../components/LogOutButton"



const handlePress = (): void => {
    router.push("/memo/create")
}

const List = (): JSX.Element => {
    //↓reactHooksはコンポーネントの直下に置く
    const [memos, setMemos] = useState<Memo[]>([])
    const navigation = useNavigation()
    useEffect(() => {
        navigation.setOptions({
            //headerをカスタマイズしてる
            headerRight: () => {
                return <LogOutButton />
            }
        })
    }, [])
    //navigationというオブジェクト

    useEffect(() => {
        if (auth.currentUser === null) { return }
        const ref = collection(db, `users/${auth.currentUser.uid}/memos`)
        const q = query(ref, orderBy("updatedAt", "desc"))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const remoteMemos: Memo[] = []
            //memoのそれぞれのデータにアクセス
            snapshot.forEach((doc) => {
                const { bodyText, updatedAt } = doc.data()
                remoteMemos.push({
                    id: doc.id,
                    bodyText,
                    updatedAt
                })
            })
            setMemos(remoteMemos)
        })
        return unsubscribe
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                data={memos}
                renderItem={({ item }) => <MemoListItem memo={item} />}
            />
            <CircleButton onPress={handlePress}>
                <Icon name="plus" size={40} color="#ffffff" />
            </CircleButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, //画面いっぱいに要素を広げる
        backgroundColor: '#ffffff'
    }
})

export default List
