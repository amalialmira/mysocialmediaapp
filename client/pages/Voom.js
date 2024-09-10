import { View, Text, Image, Button, Pressable, TextInput, StyleSheet, StatusBar, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { GET_POST, LIKE } from '../query/posts';
import { useMutation, useQuery } from '@apollo/client';
import { initialWindowMetrics, SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function Voom({navigation}) {
    const dummy = [
        {
            content: "hahahahaha",
            tags: ["#omg", "#sofunny"],
            imgUrl: "https://images.pexels.com/photos/1529076/pexels-photo-1529076.jpeg?h=750&w=700&dpr=2&auto=compress",
            createdAt: "2024-08-20T09:42:42.006Z"
        },
        {
            content: "hihihihi",
            tags: ["#omg", "#sofunny"],
            imgUrl: "https://images.pexels.com/photos/17273369/pexels-photo-17273369/free-photo-of-house-in-countryside.jpeg?auto=compress&cs=tinysrgb&w=1200",
            createdAt: "2024-08-20T09:42:42.006Z"
        },
        {
            content: "hohohoho",
            tags: ["#omg", "#sofunny"],
            imgUrl: "https://images.pexels.com/photos/6070394/pexels-photo-6070394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            createdAt: "2024-08-20T09:42:42.006Z"
        },
        {
            content: "hehehehe",
            tags: ["#omg", "#sofunny"],
            imgUrl: "https://images.pexels.com/photos/1604206/pexels-photo-1604206.jpeg?auto=compress&cs=tinysrgb&w=1200",
            createdAt: "2024-08-20T09:42:42.006Z"
        },
        {
            content: "hehehehe",
            tags: ["#omg", "#sofunny"],
            imgUrl: "https://images.pexels.com/photos/19274575/pexels-photo-19274575/free-photo-of-red-navigational-buoy-in-sea.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            createdAt: "2024-08-20T09:42:42.006Z"
        },
    ]
    // const [liked, setLiked] = useState(false)

    const { data, loading, error } = useQuery(GET_POST)
    const [likeFn, {loadingLike, errorLike}] = useMutation(LIKE, {refetchQueries: [GET_POST]})
    // console.log(data.posts);

    if (loading){
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems:"center"}}>
                <ActivityIndicator size={'large'}/>
            </View>
        )
    }

    if (error){
        return(
            <View style={{flex: 1, justifyContent: "center", alignItems:"center"}}>
                <Text>
                    ERROR NIIIH NINUNINUNINU
                </Text>
            </View>
        )
    }

    if (loadingLike){
        return(
            <View style={{flex: 1, justifyContent: "center", alignItems:"center"}}>
                <Text>
                    LOADING LIKEEEEEEEEEE
                </Text>
            </View>
        )
    }

    if (errorLike){
        return(
            <View style={{flex: 1, justifyContent: "center", alignItems:"center"}}>
                <Text>
                    ERROR LIKE dari atas
                </Text>
            </View>
        )
    }

    return (
            <SafeAreaView style={{flex:1, backgroundColor:"white"}}>
        <View >
            <View
                style={{
                    backgroundColor: "#FFFFFF",
                    padding: 10,
                    display: "flex",
                    flexDirection:"row",
                    justifyContent:'space-between'
                }}
            >
                <Text
                    style={{
                        fontWeight: "800",
                        fontSize: 30
                    }}
                >
                    LAIN VOOM
                </Text>
                <TouchableOpacity
                style={{
                    alignSelf:"center",
                }}
                onPress={() => {
                    navigation.navigate("AddPost")
                }}
                >
                <Ionicons name="add" size={25}/>
                </TouchableOpacity>
            </View>
            <View>
                <FlatList
                    data={data.posts}
                    keyExtractor={(item, index) => index}
                    renderItem={(props) => {
                        return (
                        <Pressable
                        onPress={() => {
                            navigation.navigate("Detail", { postId: props.item._id })
                        }}
                        >
                            <View
                                style={{
                                    backgroundColor: "white",
                                    padding:10 
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
                                            borderRadius: 25
                                        }}
                                    />
                                    <Text
                                        style={{
                                            marginLeft: 10,
                                        }}
                                    >
                                        {props.item.author.username}
                                    </Text>

                                </View>
                                {props.item.imgUrl && (
                                    <Image
                                        source={{
                                            uri: props.item.imgUrl
                                        }}
                                        style={{
                                            width: "100%",
                                            height: 300,
                                            resizeMode: "cover"
                                        }}
                                    />
                                )}

                                {props.item.content && (
                                <Text
                                    style={{
                                        marginTop: 10,
                                    }}
                                >
                                    {props.item.content}
                                </Text>
                                )}

                                {props.item.tags && (
                                <Text
                                    style={{
                                        marginTop: 5,
                                    }}
                                >
                                    {props.item.tags}
                                </Text>
                                )}

                                {/* like&comment */}
                                <View
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        marginTop: 8
                                    }}
                                >
                                    <TouchableOpacity 
                                    onPress={async () => {
                                        try {
                                            console.log("APAAPAAAANN");
                                            console.log(props.item._id);
                                            const result = await likeFn({
                                                variables: {
                                                    postId: props.item._id
                                                }
                                            })
                                            console.log(result);
                                            // setLiked(true)
                                            return
                                            
                                        } catch (error) {
                                            console.log(error, "ERROR LIKE");
                                        }
                                    }}
                                    >
                                        {/* <Ionicons name={liked === true ? "happy" : "happy-outline"} size={25} />  */}
                                        <Ionicons name="happy-outline" size={25} /> 
                                        
                                    </TouchableOpacity>

                                    <Text style={{ marginLeft: 3 }} >{props.item.likes===null?0:props.item.likes.length}</Text>

                                    <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("Detail", { postId: props.item._id })
                                    }}
                                    >
                                        <Ionicons name="chatbubble-ellipses-outline" size={25} style={{ marginLeft: 10 }} />
                                    </TouchableOpacity>
                                </View>
                                <View
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginTop: 5,
                                    gap: 3
                                }}
                                >
                                <Ionicons name="time-outline" color={"gray"}/>
                                <Text
                                style={{
                                    color: "gray",
                                    fontSize: 10
                                }}
                                >
                                    {props.item.createdAt}
                                </Text>
                                </View>

                            </View>
                            </Pressable>
                        )
                    }}
                />

            </View>
      
        </View>
        </SafeAreaView>
    )
}
