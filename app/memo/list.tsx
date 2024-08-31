import { View, Text, StyleSheet } from "react-native"
import { router } from "expo-router"

import Header from "../../components/Header"
import MemoListItem from "../../components/MemoListItem"
import CircleButton from "../../components/CircleButton"
import Icon from "../../components/Icon"


const handlePress = (): void => {
    router.push("/memo/create")
}

const Index = (): JSX.Element => {
    return (
        <View style={styles.container}>
            <Header />
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

export default Index
