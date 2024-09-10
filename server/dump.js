{/* list post */}
<View>
<FlatList
    data={data}
    keyExtractor={(item, index) => index}
    renderItem={(props) => {
        return (
            <View
                style={{
                    backgroundColor: "white",
                    margin: 10
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
                            uri: "http://via.placeholder.com/300"
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
                        film_jww
                    </Text>

                </View>
            
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

                <Text
                    style={{
                        marginTop: 10,
                    }}
                >
                    {props.item.content}
                </Text>
                <Text
                    style={{
                        marginTop: 5,
                    }}
                >
                    {props.item.tags}
                </Text>

                {/* like&comment */}
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 8
                    }}
                >
                    <Pressable>
                        <Ionicons name="happy-outline" size={25} />
                    </Pressable>

                    <Text style={{ marginLeft: 3 }} >100</Text>

                    <Pressable>
                        <Ionicons name="chatbubble-ellipses-outline" size={25} style={{ marginLeft: 10 }} />
                    </Pressable>
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
        )
    }}
/>

</View>