import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Title } from "react-native-paper";
import LottieView from "lottie-react-native";
const ModalView = ({ children, title, onSubmit, cancelable, visible = false, onDismiss, submitText = "Open & Save" }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onDismiss={onDismiss}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>

                    <Title style={styles.modalText}>{title}</Title>
                    <LottieView source={require('./banner.json')} autoPlay loop onError={console.error} style={{height:60,width:60}} />
                    </View>
                    <View>
                        {children}
                    </View>
                    <View style={{ alignSelf: 'flex-end', alignItems: 'center',flexDirection: 'row', }}>
                        {cancelable && (<TouchableOpacity
                            style={{ ...styles.button, backgroundColor: 'white' }}
                            onPress={onDismiss}>
                            <Text style={[styles.textStyle, { color: '#f44' }]}>Cancel</Text>
                        </TouchableOpacity>)}
                        {onSubmit && (<TouchableOpacity
                            style={styles.button}
                            onPress={onSubmit}>
                            <Text style={styles.textStyle} >{submitText}</Text>
                        </TouchableOpacity>)}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        // marginHorizontal: 20,
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    modalView: {
        margin: 30,
        backgroundColor: "white",
        borderRadius: 15,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 1,
        paddingHorizontal: 20,
        marginTop: 20,
        backgroundColor: 'green',
        marginLeft: 10
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 8,
        color:'black',
    }
});

export default ModalView