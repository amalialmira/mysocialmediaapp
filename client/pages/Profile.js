import { View, Text, Image, Button, Pressable, TextInput, StyleSheet, StatusBar, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useMutation, useQuery } from '@apollo/client';
import { FOLLOW_DATA } from '../query/follows';

export default function Profile() {
    const dummy = [
        {
            content: "hahahahaha",
            tags: ["#omg", "#sofunny"],
            imgUrl: "https://scontent.fcgk30-1.fna.fbcdn.net/v/t39.30808-6/451554282_122114640920368622_3166151435526422218_n.jpg?stp=cp6_dst-jpg&_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=ZmcRi1jCUwkQ7kNvgFzp5ON&_nc_ht=scontent.fcgk30-1.fna&oh=00_AYBIxHDYYr5NjFIo68VbWaVLyaodaw2jDsmI4t27YnDF0g&oe=66CDC1CA",
            createdAt: "2024-08-20T09:42:42.006Z"
        },
        {
            content: "hihihihi",
            tags: ["#omg", "#sofunny"],
            imgUrl: "https://scontent.fcgk30-1.fna.fbcdn.net/v/t39.30808-6/441935554_122113896776368622_386290728915806546_n.jpg?stp=dst-jpg_s1080x2048&_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=gvjmMT5Og_8Q7kNvgGtppfB&_nc_ht=scontent.fcgk30-1.fna&oh=00_AYDgUtt7RhaQbO_ohP5psdw-zZZB4pobDy53Vy8fl5v3zw&oe=66CDD647",
            createdAt: "2024-08-20T09:42:42.006Z"
        },
        {
            content: "hohohoho",
            tags: ["#omg", "#sofunny"],
            imgUrl: "https://scontent.fcgk30-1.fna.fbcdn.net/v/t39.30808-6/450320604_122112644948368622_6948154734097402187_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=WVVtKk_noJ0Q7kNvgEaCKbf&_nc_ht=scontent.fcgk30-1.fna&oh=00_AYA0AGNTkwxn3W1elOtZdItkUfRJPJUH1nyKjpPkWNdKng&oe=66CDE106",
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

    let { data, loading, error } = useQuery(FOLLOW_DATA)

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size={'large'} />
            </View>
        )
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>
                    ERROR NIIIH NINUNINUNINU
                </Text>
            </View>
        )
    }
    // console.log(data, "<<<<<DATA PROFILE");

    // console.log(data.followData.followings, "DI PROFILEEE");

    return (
        <ScrollView
            style={{
                backgroundColor: "white"
            }}
        >
            {/* Profile */}
            <View
                style={{
                    gap: 2,
                    marginVertical: 10

                }}
            >
                <Image
                    source={{
                        uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    }}
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: "contain",
                        borderRadius: 50,
                        alignSelf: 'center',
                        marginVertical: 10
                    }}
                />
                <Text
                    style={{
                        textAlign: "center",
                        color: "gray"
                    }}
                >
                    @{data.followData.user.username}
                </Text>
                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 18,
                        fontWeight: "bold"

                    }}
                >
                    {data.followData.user.name}
                </Text>
            </View>

            {/* following followers post */}
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: 'center',
                    gap: 15,
                    marginVertical: 10
                }}
            >
                {/* posts */}
                {/* <View>
                    <Text
                        style={{
                            textAlign: "center"
                        }} */}
                {/* > */}
                {/* {data.length} */}
                {/* </Text>
                    <Text
                        style={{
                            textAlign: "center"
                        }}
                    >
                        posts
                    </Text>
                </View> */}

                {/* following */}
                <View>
                    <Text
                        style={{
                            textAlign: "center"
                        }}
                    >
                        {data.followData.followings.length}
                    </Text>
                    <Text
                        style={{
                            textAlign: "center"
                        }}
                    >
                        followings
                    </Text>
                </View>

                {/* follower */}
                <View>
                    <Text
                        style={{
                            textAlign: "center"
                        }}
                    >
                        {data.followData.followers.length}
                    </Text>
                    <Text
                        style={{
                            textAlign: "center"
                        }}
                    >
                        followers
                    </Text>
                </View>

            </View >

    
        <View
        style={{
            padding:10
        }}
        >
            <Text
            style={{
                fontWeight:"bold"
            }}
            >
                Follower list:
            </Text>
            <FlatList
                data={data.followData.followers}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View 
                    style={{
                        marginVertical:5,
                        display: "flex",
                        flexDirection: "row",
                        gap: 5
                    }}
                    >
                        <Image
                            source={{ uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }}
                            style={{
                                height: 30,
                                width:30,
                                borderRadius: 50
                            }}
                        />
                        <Text
                        style={{
                            alignSelf:"center"
                        }}
                        >{item.username}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text>No followers</Text>}
            />
        </View>

        <View
        style={{
            padding:10
        }}
        >
            <Text
            style={{
                fontWeight:"bold"
            }}
            >
                Following list:
            </Text>
            <FlatList
                data={data.followData.followings}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View 
                    style={{
                        marginVertical:5,
                        display: "flex",
                        flexDirection: "row",
                        gap: 5
                    }}
                    >
                        <Image
                            source={{ uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }}
                            style={{
                                height: 30,
                                width:30,
                                borderRadius: 50
                            }}
                        />
                        <Text
                        style={{
                            alignSelf:"center"
                        }}
                        >{item.username}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text>No followers</Text>}
            />
        </View>


            



        </ScrollView >
    )
}