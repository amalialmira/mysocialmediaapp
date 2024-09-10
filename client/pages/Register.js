import { View, Text, Image, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import logo from "../assets/lain.png"
import styles from './style';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { REGIST } from '../query/users';
import { useMutation } from '@apollo/client';

export default function Register({navigation}) {
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [resgistFn, { data, loading, error }] = useMutation(REGIST)

    return (
        <View
        style={{
            backgroundColor:"white",
            flex: 1
        }}
        >
            <Text
                style={
                    [styles.h1, {marginTop: 100}]
                }
            >
                Register
            </Text>
            <Text
                style={{ 
                    textAlign: "center",
                    marginTop: 10,
                    marginBottom: 30,
                    color: "gray",
                    marginHorizontal: 12
                 }}
            >
                By entering data and tapping the arrow button to continue, you agree to LAIN's Terms and Conditions of Use
            </Text>
            <TextInput
                placeholder='name'
                value={name}
                style={styles.input}
                onChangeText={setName}
            />
            <TextInput
                placeholder='username'
                value={username}
                style={styles.input}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder='email'
                value={email}
                style={styles.input}
                onChangeText={setEmail}
            />
            <TextInput
                placeholder='password'
                value={password}
                style={styles.input}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            <TouchableOpacity
                style={{
                    backgroundColor: "#06C654",
                    padding: 12,
                    marginHorizontal: 15,
                    borderRadius: 25,
                    marginTop: 40,
                    width:50,
                    height:50,
                    alignSelf: "flex-end"
                }}
                onPress={async () => {
                    try {
                        // console.log(username, password, "THISSSSS");

                        const form = {
                            name,
                            username,
                            email,
                            password
                        }
                        const result = await resgistFn({
                            variables: {
                                form
                            }
                        })

                        navigation.navigate("Login")

                    } catch (error) {
                        console.log(error);
                    }
                }}
            >
                <Ionicons name="arrow-forward-outline" size={25} color="white"></Ionicons>
            </TouchableOpacity>
        </View>
    )
}

