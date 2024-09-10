import { useState } from 'react';
import { View, Text, Image, Button, Pressable, TextInput, StyleSheet, StatusBar, FlatList, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { initialWindowMetrics, SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useMutation } from '@apollo/client';
import { ADD_POST, GET_POST } from '../query/posts';

export default function AddPost({navigation}) {
    const [content, setContent] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [tags, setTags] = useState("")

    const [addFn, {data, loading, error}] = useMutation(ADD_POST, {refetchQueries:[GET_POST]})

    return (
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "white",
                        height: "100%",
                        padding: 10
                    }}>

                    <View
                        style={{
                            backgroundColor: "white",
                            flex: 5
                        }}
                    >
                        <TextInput
                            placeholder={`What's new?`}
                             value={content}
                            style={{
                                backgroundColor: "white"
                            }}
                         onChangeText={setContent}
                        />
                    </View>

                    {/* input */}
                    <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{flex: 1}}
                    >
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 10,
                            justifyContent: "flex-end",
                            flex: 1
                        }}
                    >
                        <TextInput
                            placeholder={`Add Image URL`}
                            value={imgUrl}
                            style={{
                                backgroundColor: "#f2f2f2",
                                padding: 10,
                                borderRadius: "100%",
                                width: "100%"
                            }}
                        onChangeText={setImgUrl}
                        />
                        <TextInput
                            placeholder={`Add Tags`}
                            value={tags}
                            style={{
                                backgroundColor: "#f2f2f2",
                                padding: 10,
                                borderRadius: "100%",
                                width: "100%"
                            }}
                        onChangeText={setTags}
                        />
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#06C654",
                                padding: 12,
                                marginHorizontal: 15,
                                borderRadius: "100%",
                                width: "100%"
                            }}
                            onPress={async() => {
                                const form = {
                                    content,
                                    imgUrl,
                                    tags
                                }
                                const result = await addFn({
                                    variables: {
                                        form
                                    }
                                })
                                navigation.navigate("MainTab")
                            }}
                        >
                            <Text
                                style={{
                                    color: "white",
                                    textAlign: "center",
                                    fontWeight: "bold"
                                }}
                            >
                                Post
                            </Text>

                        </TouchableOpacity>
                    </View>

                    </KeyboardAvoidingView>

                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}