import { View, TextInput, StyleSheet, } from "react-native"
// ↑ReactNativeのコアコンポーネント
import { router } from "expo-router"
import KeyboardAvoidingView from "../../components/KeyboardAvoidingView"
import CircleButton from "../../components/CircleButton"
import Icon from "../../components/Icon"
import { auth, db } from "../config"
import { Timestamp, addDoc, collection } from "firebase/firestore"
import { useState } from "react"


const handlePress = (bodyText: string): void => {
    if (auth.currentUser === null) { return }
    //authオブジェクトの中のcurrentUserオブジェクトにアクセスしている    
    const ref = collection(db, `users/${auth.currentUser.uid}/memos`)
    addDoc(ref, {
        bodyText,
        updateAt: Timestamp.fromDate(new Date())
    })
        .then((docRef) => {
            console.log("success", docRef.id)
            router.back()
        })
        .catch((error) => {
            console.log(error)
        })
    //async callbackの入れ子を避けるために使用する　今回はthenの内容がシンプルだから使用しない

    // await addDoc(collection(db, "memos"), {
    //     bodyText: "text 2"
    // }).catch((error) => {
    //     console.log(error)
    // })

}

const Create = (): JSX.Element => {
    const [bodyText, setBodyText] = useState("")
    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    multiline
                    style={styles.input}
                    value={bodyText}
                    //↓callback関数
                    onChangeText={(text) => { setBodyText(text) }}
                    autoFocus
                />
            </View>
            <CircleButton onPress={() => { handlePress(bodyText) }}>
                <Icon name="check" size={40} color="#ffffff" />
            </CircleButton>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    inputContainer: {
        paddingVertical: 32,
        paddingHorizontal: 27,
        flex: 1,
        backgroundColor: '#ffffff'
    },
    input: {
        flex: 1,
        textAlignVertical: "top",
        fontSize: 16,
        lineHeight: 24
    }
})

export default Create
