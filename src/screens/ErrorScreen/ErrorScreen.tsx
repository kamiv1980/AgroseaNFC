import {SafeAreaView, StyleSheet, View, Text} from "react-native";

export const ErrorScreen = ({text}) => {
    return (
        <SafeAreaView style={styles.container}>
          <View>
            <Text style={styles.text}>{text}</Text>
          </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 32,
        color:'#a41002',
        marginLeft: 10,
        marginRight: 10,
    },
})
