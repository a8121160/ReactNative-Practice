import { Stack } from "expo-router"
import { GestureHandlerRootView } from "react-native-gesture-handler"

const Layout = (): JSX.Element => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack screenOptions={{
                headerStyle: {
                    backgroundColor: "#467FD3",
                },
                headerTintColor: "#ffffff",
                headerTitle: "Memo App",
                headerBackTitle: "Back",
                headerTitleStyle: {
                    fontSize: 22,
                    fontWeight: "bold"
                }
            }} />
        </GestureHandlerRootView>
    )
}

export default Layout