import { View, Text, Image, Button, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import logo from "../assets/lain.png"
import styles from './style';
import { initialWindowMetrics, SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useContext, useState } from 'react';
import { LOGIN } from '../query/users';
import { useMutation } from '@apollo/client';
import * as SecureStore from "expo-secure-store";
import { AuthContext } from '../contexts/auth';

export default function LoginPage() {
    const {setIsSignedIn} = useContext(AuthContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loginFn, { data, loading, error }] = useMutation(LOGIN)

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>
                    an error has occured, please try again
                </Text>
            </View>
        )
    }

    return (
            <SafeAreaView style={{ flex: 1, backgroundColor:"white"}}>

                <View
                style={{
                    backgroundColor: "white"
                }}
                >
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
                        style={styles.h1}
                    >
                        Log In to your account
                    </Text>
                    <TextInput
                        placeholder='username'
                        value={username}
                        style={styles.input}
                        onChangeText={setUsername}

                    />
                    <TextInput
                        placeholder='password'
                        value={password}
                        style={styles.input}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        onPress={async () => {
                            try {
                                // console.log(username, password, "THISSSSS");

                                const form = {
                                    username,
                                    password
                                }
                                const result = await loginFn({
                                    variables: {
                                        form
                                    }
                                })

                                await SecureStore.setItemAsync("access_token", result.data.login.access_token)
                                setIsSignedIn(true)

                            } catch (error) {
                                console.log(error);
                            }
                        }}
                        style={{
                            backgroundColor: "#06C654",
                            padding: 12,
                            marginHorizontal: 15,
                            borderRadius: 5,
                            marginTop: 10
                        }}
                    >
                        {loading?
                        (<Text
                            style={{
                                color: "white",
                                textAlign: "center",
                                fontWeight: "bold"
                            }}
                        >
                            Loggin in...
                        </Text>):(
                           <Text
                           style={{
                               color: "white",
                               textAlign: "center",
                               fontWeight: "bold"
                           }}
                       >
                           Log in
                       </Text> 
                        )
                        
                    }
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
    )
}

