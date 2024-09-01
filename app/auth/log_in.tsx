import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Link, router } from "expo-router";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config";

import Button from "../../components/Button";


//何も返さない
const handlePress = (email: string, password: string): void => {
    //ログイン
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential.user.uid)
            router.replace("/memo/list")
        })
        //errorというオブジェクトはどこで定義されてる？
        .catch((error) => {
            const { code, message } = error
            console.log(code, message)
            Alert.alert(message)
        })
}

const LogIn = (): JSX.Element => {
    //emailには""が入る
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <Text style={styles.title}>Log In</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="Email Address"
                    textContentType="emailAddress"
                />

                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                    autoCapitalize="none"
                    placeholder="Password"
                    secureTextEntry
                    textContentType="password"
                />
                <Button onPress={() => { handlePress(email, password) }} label="Submit" />
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Not registered?</Text>
                    <Link href="/auth/sign_up" asChild replace>
                        <TouchableOpacity>
                            <Text style={styles.footerLink}>Sign up here!</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f4f8"
    },
    inner: {
        paddingVertical: 24,
        paddingHorizontal: 27
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: "bold",
        marginBottom: 24
    },
    input: {
        borderWidth: 1,
        borderColor: "#DDDDDD",
        backgroundColor: "#ffffff",
        height: 48,
        padding: 8,
        fontSize: 16,
        marginBottom: 16
    },
    footer: {
        flexDirection: "row"
    },
    footerText: {
        fontSize: 14,
        lineHeight: 24,
        marginRight: 8,
        color: "#000000"
    },
    footerLink: {
        fontSize: 14,
        lineHeight: 24,
        color: "#467fD3"
    }

})

export default LogIn
