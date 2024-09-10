import { View, Text, Image, Button, Pressable, TextInput, StyleSheet, StatusBar, FlatList, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { SEARCH_USER } from '../query/users';
import { FOLLOW, FOLLOW_DATA } from '../query/follows';

export default function SearchPage() {
    const [searchFn, { data, loading, error }] = useLazyQuery(SEARCH_USER)
    const [followFn, {loadingFollow, errorFollow}] = useMutation(FOLLOW, {refetchQueries:[FOLLOW_DATA]})
    const [keywords, setKeywords] = useState("")

    console.log(data);

    return (
        <View
            style={{
                backgroundColor: "white",
                height: "100%",
                padding: 10,
                flex: 1
            }}
        >
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5
                }}
            >
                <TextInput
                    placeholder={`Search by name / username`}
                    value={keywords}
                    style={{
                        backgroundColor: "#f2f2f2",
                        padding: 10,
                        borderRadius: "100%",
                        width: "100%",
                        flex: 10
                    }}
                    onChangeText={setKeywords}
                />
                <TouchableOpacity
                    onPress={async () => {
                        try {
                            const result = await searchFn({
                                variables: {
                                    keywords
                                }
                            })
                        } catch (error) {
                            console.log(error, "error add search<<<<");
                        }
                    }}
                >
                    <Ionicons name="search-outline" size={25} />

                </TouchableOpacity>
            </View>

            {loading && <Text
                style={{
                    color: "gray",
                    textAlign: "center",
                    textAlignVertical: "center",
                    flex: 1
                }}
            >Loading...</Text>}
        
            {error && <Text
            style={{
                color: "gray",
                textAlign: "center",
                textAlignVertical: "center",
                flex: 1
            }}
            >Error: {error.message}</Text>}

            {data?.searchUser.length===0 && 

                <Text
                style={{
                    color: "gray",
                    textAlign: "center",
                    textAlignVertical: "center",
                    marginVertical:250
                }}
                >user not found, please try another name/username</Text>
      
            }

            {data && (
                <FlatList
                    data={data.searchUser}
                    keyExtractor={(item, index) => index}
                    renderItem={(props) => {
                        return (
                            <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        padding:10,
                                        justifyContent:"space-between"
                                    }}
                                >
                                    <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center"
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

                                    <View>
                                    <TouchableOpacity
                                    onPress={async () => {
                                        try {
                                            const result = await followFn({
                                                variables: {
                                                    followId: props.item._id
                                                }
                                            })
                                        } catch (error) {
                                            console.log(error, "error follow<<<<");
                                        }
                                    }}

                                    style={{
                                        backgroundColor:"#06C654",
                                        padding:8,
                                        borderRadius: 8
                                    }}
                                    >
                                        <Text
                                        style={{
                                            color:"white"
                                        }}
                                        >
                                            Follow
                                        </Text>
                                    </TouchableOpacity>

                                    </View>


                                </View>
                        )
                    }}
                />
            )}
        </View>
    )
}