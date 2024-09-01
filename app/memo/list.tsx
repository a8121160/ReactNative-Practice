import { View, StyleSheet } from "react-native"
import { router, useNavigation } from "expo-router"
import { useEffect } from "react"

import MemoListItem from "../../components/MemoListItem"
import CircleButton from "../../components/CircleButton"
import Icon from "../../components/Icon"
import LogOutButton from "../../components/LogOutButton"
import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { auth, db } from "../config"

const handlePress = (): void => {
    router.push("/memo/create")
}

const List = (): JSX.Element => {
    //↓reactHooksはコンポーネントの直下に置く

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
        const q = query(ref, orderBy("updateAt", "desc"))
        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.forEach((doc) => {
                console.log("memo", doc.data())
            })
        })
        return unsubscribe
    }, [])

    return (
        <View style={styles.container}>
            <View>
                <MemoListItem />
                <MemoListItem />
                <MemoListItem />
            </View>
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
