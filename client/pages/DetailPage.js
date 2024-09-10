import { View, Text, Image, Button, Pressable, TextInput, StyleSheet, StatusBar, FlatList, ScrollView, ActivityIndicator, TouchableOpacity, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { POST_BYID, ADD_COMMENT, GET_POST, LIKE } from '../query/posts';
import { useMutation, useQuery } from '@apollo/client';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';

export default function Detail() {
    const route = useRoute();
    const { postId } = route.params;

    console.log(postId);

    const { data, loading, error } = useQuery(POST_BYID, {
        variables: { postId }
    })
    const [likeFn, { loadingLike, errorLike }] = useMutation(LIKE, { refetchQueries: [POST_BYID] })

    const [comment, setComment] = useState("")
    const [commentFn, { dataComment, loadingComment, errorComment }] = useMutation(ADD_COMMENT, { refetchQueries: [GET_POST] })

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size={'large'} />
            </View>
        )
    }
    // console.log(error, "INI ERROR NYA");

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>
                    ERROR NIIIH NINUNINUNINU DI PostDetail
                </Text>
            </View>
        )
    }


    let dummy = {
        content: "hahahahaha",
        tags: ["#omg", "#sofunny"],
        imgUrl: "https://scontent.fcgk30-1.fna.fbcdn.net/v/t39.30808-6/451554282_122114640920368622_3166151435526422218_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=ZmcRi1jCUwkQ7kNvgFzp5ON&_nc_ht=scontent.fcgk30-1.fna&oh=00_AYBIxHDYYr5NjFIo68VbWaVLyaodaw2jDsmI4t27YnDF0g&oe=66CDC1CA",
        createdAt: "2024-08-20T09:42:42.006Z"
    }

    let dummy_comments = [
        {
            content: "hahahahahahahaha",
            username: "hoshi",
            createdAt: "2024-08-21T08:49:41.855Z"
        },
        {
            content: "apanya yg lucu sih",
            username: "kwan",
            createdAt: "2024-08-21T08:49:41.855Z"
        }
    ]

    return (

        <View
            style={{
                backgroundColor: "white",
                padding: 10,
                flex: 1
            }}
        >
            {/* bagian 1 */}
            <View
                style={{
                    flex: 4
                }}
            >
                {/* user */}
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 10
                    }}
                >
                    <Image
                        source={{
                            uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        }}
                        style={{
                            width: 30,
                            height: 30,
                            resizeMode: "contain",
                            borderRadius: "100%"
                        }}
                    />
                    <Text
                        style={{
                            marginLeft: 10,
                        }}
                    >
                        {data.postById.author.username}
                    </Text>

                </View>

                {data.postById.imgUrl && (
                    <Image
                        source={{
                            uri: data.postById.imgUrl
                        }}
                        style={{
                            width: "100%",
                            height: 210,
                            resizeMode: "contain"
                        }}
                    />
                )}


                <Text
                    style={{
                        marginTop: 10,
                    }}
                >
                    {data.postById.content}
                </Text>
                <Text
                    style={{
                        marginTop: 5,
                    }}
                >
                    {data.postById.tags}
                </Text>

                {/* tgl post */}
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 5,
                        gap: 3
                    }}
                >
                    <Ionicons name="time-outline" color={"gray"} />
                    <Text
                        style={{
                            color: "gray",
                            fontSize: "10"
                        }}
                    >
                        {data.postById.createdAt}
                    </Text>
                </View>


                {/* like&comment */}
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 8
                    }}
                >
                    <Text>
                        {data.postById.likes ? data.postById.likes.length : 0}
                    </Text>
                    <TouchableOpacity
                        onPress={async () => {
                            try {
                                const result = await likeFn({
                                    variables: {
                                        postId: data.postById._id
                                    }
                                })
                                return

                            } catch (error) {
                                console.log(error, "ERROR LIKE DETAIL");
                            }
                        }}
                    >
                        <Text > Likes</Text>

                    </TouchableOpacity>
                </View>

                <Text
                    style={{
                        marginVertical: 5,
                    }}
                >
                    Comments
                </Text>
            </View>

            {/* bagian 2 */}
            <View
                style={{
                    flex: 3
                }}
            >

                {/* Comments */}
                <FlatList
                    data={data.postById.comments}
                    keyExtractor={(item, index) => index}
                    renderItem={(props) => {
                        return (
                            <>
                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",

                                    }}
                                >
                                    <Image
                                        source={{
                                            uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                        }}
                                        style={{
                                            width: 30,
                                            height: 30,
                                            resizeMode: "contain",
                                            borderRadius: "100%"
                                        }}
                                    />
                                    <Text
                                        style={{
                                            marginLeft: 10,
                                        }}
                                    >
                                        {props.item.username}
                                    </Text>

                                </View>
                                <View
                                    style={{
                                        backgroundColor: "#F2F2F2",
                                        marginBottom: 10,
                                        marginLeft: 30,
                                        padding: 5,
                                        borderRadius: 10
                                    }}
                                >

                                    <Text
                                        style={{
                                            paddingTop: 10,
                                            paddingLeft: 5
                                        }}
                                    >
                                        {props.item.content}
                                    </Text>

                                    <View
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginVertical: 5,
                                            gap: 3,
                                            justifyContent: "flex-end"

                                        }}
                                    >
                                        <Ionicons name="time-outline" color={"gray"} />
                                        <Text
                                            style={{
                                                color: "gray",
                                                fontSize: "10"
                                            }}
                                        >
                                            {props.item.createdAt}
                                        </Text>
                                    </View>

                                </View>
                            </>
                        )
                    }}
                />
            </View>


            {/* input comment */}
            <KeyboardAvoidingView
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    justifyContent: "flex-end",
                    flex: 1
                }}
            >
                <Image
                    source={{
                        uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }}
                    style={{
                        width: 30,
                        height: 30,
                        resizeMode: "cover",
                        borderRadius: "100%",
                        flex: 1
                    }}
                />
                <TextInput
                    placeholder={`Say something`}
                    value={comment}
                    style={{
                        backgroundColor: "#f2f2f2",
                        padding: 10,
                        borderRadius: "100%",
                        width: "100%",
                        flex: 10
                    }}
                    onChangeText={setComment}
                />
                <TouchableOpacity
                    onPress={async () => {
                        try {
                            const form = {
                                content: comment
                            }
                            const result = await commentFn({
                                variables: {
                                    postId: data.postById._id,
                                    comment: form
                                }
                            })
                            setComment("")
                        } catch (error) {
                            console.log(error, "error add comment<<<<");
                        }
                    }}
                >
                    <Ionicons name="arrow-up" size={25} />
                </TouchableOpacity>
            </KeyboardAvoidingView>

        </View>
    )
}