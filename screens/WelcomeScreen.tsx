import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'


export default function WelcomeScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido</Text>

            <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={[styles.button, styles.loginButton]}>
                <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("Registro")}
                style={[styles.button, styles.registerButton]}>
                <Text style={styles.buttonText}>Crear cuenta</Text>
            </TouchableOpacity>


            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333',
        marginBottom: 48,
    },
    button: {
        width: '100%',
        height: 52,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    loginButton: {
        backgroundColor: '#007AFF', // Azul principal
    },
    registerButton: {
        backgroundColor: '#F0F0F0', // Gris claro
        borderWidth: 1,
        borderColor: '#DDD',
    },
    buttonText: {
        fontSize: 17,
        fontWeight: '600',
    },
    loginButtonText: {
        color: '#fff',
    },
    registerButtonText: {
        color: '#333',
    },
});