import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context";
import logo from "../assets/lain.png"
import { View, Text, Image, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import Navigation from "../Navigation";

export default function StartPage({ navigation }) {

    return (

            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <View style={{ flex: 1, height: "100%", backgroundColor: 'white' }}>
                    <View style={{ flex: 1 }}>
                        <Image
                            source={logo}
                            style={{
                                width: 120,
                                height: 120,
                                alignSelf: "center",
                                marginTop: 100
                            }}
                        />
                        <Text
                            style={{
                                textAlign: "center",
                                fontSize: 20,
                                marginTop: 30,
                                fontWeight: "bold"
                            }}
                        >
                            Welcome to LAIN
                        </Text>
                        <Text
                            style={{
                                textAlign: "center",
                                marginTop: 10,
                                color: "gray"
                            }}
                        >
                            Free messaging, voice and video calls, and more!
                        </Text>
                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: "flex-end"
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Login")
                            }}
                            style={{
                                backgroundColor: "#06C654",
                                padding: 12,
                                marginLeft: 10,
                                marginRight: 10,
                                borderRadius: 5
                            }}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    textAlign: "center",
                                    fontWeight: "bold"
                                }}
                            >
                                Log in
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Register")
                            }}
                            style={{
                                backgroundColor: "white",
                                padding: 12,
                                margin: 10,
                                borderColor: "#D9D9D9",
                                borderWidth: 1,
                                borderRadius: 5,

                            }}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontWeight: "bold"
                                }}
                            >
                                Sign Up
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </SafeAreaView>
    );
}

