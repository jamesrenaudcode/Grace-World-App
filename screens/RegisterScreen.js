import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar } from "react-native";
import * as firebase from "firebase";
import { Ionicons } from 'react-native-vector-icons';
import UserPermissions from "./utilities/UserPermissions";
import * as ImagePicker from 'expo-image-picker'

export default class RegisterScreen extends React.Component {
    static navigationOptions = { 
        header: null 
    };

    state = {
        user: {
        name: "",
        email: "",
        password: "",
        avatar: null

        },
        
        errorMessage: null
    };

    handlePickAvatar = async () => {
        UserPermissions.getCameraPermissions()

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        })
        if (result.cancelled) {
            this.setState({user: { ...this.state.user, avatar: result.uri} });
        }
    };

    handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(userCredentials => {
                return userCredentials.user.updateProfile({
                    displayName: this.state.name
                });
            })
            .catch(error => this.setState({ errorMessage: error.message }));
    };

    render() {
        return (
            <View style={styles.container}>
                 <StatusBar barStyle="light-content"></StatusBar>

                 <Image 
                source={require("../assets/authHeader.png")} 
                style={{marginTop: -116, marginLeft: -50}}>

                </Image>

                <Image source={require("../assets/authFooter.png")} 
                style={{position: "absolute", bottom: -325, right: -225}}>

                </Image>
                <TouchableOpacity>
                <Ionicons name="ios-arrow-round-back" size={32} color="#FFF">

                </Ionicons>
                </TouchableOpacity>

                <View style={{position: "absolute", top: 64, alignItems: "center", width: "100%"}}>
                
                <TouchableOpacity style={styles.avatarPlaceholder} onPress={this.handlePickAvatar}>
                    <Image source={{uri: this.state.user.avatar}} styles={styles.avatar} />
                <Ionicons name="ios-add" size={40} color="#FFF" style={{marginTop: 6, marginLeft: 2}}></Ionicons>
                
                </TouchableOpacity>
                </View>

                <Text style={styles.greeting}>{`Hello!\nSign up to get started.`}</Text>

                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={name => this.setState({ name })}
                            value={this.state.name}
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email}
                        ></TextInput>
                    </View>

                    <View style={{ marginTop: 32 }}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                        ></TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign up</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ alignSelf: "center", marginTop: 32 }} 
                onPress={() => this.props.navigation.navigate("Login")}
                >
                    <Text style={{ color: "#414959", fontSize: 13 }}>
                        New to Grace Hub? <Text style={{ fontWeight: "500", color: "#E9446A" }}>Login</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"
    },
    errorMessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error: {
        color: "#E9446A",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#8A8F9E",
        fontSize: 10,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8A8F9E",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161F3D"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#21478C",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        backgroundColor: "#E1E2E6",
        borderRadius: 50,
        marginTop: 48,
        justifyContent: "center",
        alignItems: "center"
    },
    avatar: {
        position: "absolute",
        width: 100,
        height: 100,
        borderRadius: 50
    }
});
