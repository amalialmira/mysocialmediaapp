import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/auth";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import Register from "./pages/Register";
import LoginPage from "./pages/LoginPage";
import Detail from "./pages/DetailPage";
import Voom from "./pages/Voom";
import StartPage from "./pages/startPage";
import Profile from "./pages/Profile";
import AddPost from "./pages/AddPost";
import SearchPage from "./pages/SearchPage";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTab() {
    const { setIsSignedIn } = useContext(AuthContext);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerRight: () => {
                    if (route.name !== "Search") {
                        return (
                            <View>
                                <TouchableOpacity
                                    onPress={async () => {
                                        await SecureStore.deleteItemAsync("access_token");
                                        setIsSignedIn(false);
                                    }}
                                    style={{
                                        backgroundColor: "red",
                                        marginEnd: 5,
                                        borderRadius: 10,
                                    }}
                                >
                                    <Text
                                        style={{
                                            padding: 10,
                                            color: "white",
                                            fontWeight: "600",
                                        }}
                                    >
                                        Logout
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }
                    return null;
                },
            })}
        >
            <Tab.Screen
                options={{
                    tabBarIcon: (props) => {
                        return (
                            <Ionicons
                                name={props.focused ? "send" : "send-outline"}
                                size={props.size}
                                color={props.color}
                            />
                        );
                    },
                    headerShown: false,
                }}
                name="Voom"
                component={Voom}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: (props) => {
                        return (
                            <Ionicons
                                name={props.focused ? "search" : "search-outline"}
                                size={props.size}
                                color={props.color}
                            />
                        );
                    },
                }}
                name="Search"
                component={SearchPage}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: (props) => {
                        return (
                            <Ionicons
                                name={props.focused ? "person" : "person-outline"}
                                size={props.size}
                                color={props.color}
                            />
                        );
                    },
                }}
                name="Profile"
                component={Profile}
            />
        </Tab.Navigator>
    );
}

export default function Navigation() {
    const { setIsSignedIn } = useContext(AuthContext);
    const { isSignedIn } = useContext(AuthContext);

    useEffect(() => {
        SecureStore.getItemAsync("access_token").then((r) => {
            console.log(r, "<<< token");
            if (r) {
                setIsSignedIn(true);
            }
        });
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isSignedIn ? (
                    <>
                        {/* MainTab */}
                        <Stack.Screen
                            name="MainTab"
                            component={MainTab}
                            options={{
                                headerShown: false,
                            }}
                        />
                        {/* PostDetail */}
                        <Stack.Screen name="Voom" component={Voom}/>
                        <Stack.Screen name="AddPost" component={AddPost}/>
                        <Stack.Screen name="Detail" component={Detail}/>
                    </>
                ) : (
                    <>
                        <Stack.Screen name="StartPage" component={StartPage} options={{headerShown:false}} />
                        <Stack.Screen name="Login" component={LoginPage} />
                        <Stack.Screen name="Register" component={Register} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}