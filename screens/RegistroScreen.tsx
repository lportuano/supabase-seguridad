import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../supabase/config'

export default function RegistroScreen({ navigation }: any) {

    const [correo, setcorreo] = useState("")
    const [contrasenia, setcontrasenia] = useState("")
    const [nombre, setnombre] = useState("")

    async function registro() {
        const { data, error } = await supabase.auth.signUp({
            email: correo,
            password: contrasenia,
        })

        if (data.user != null) {
            
            guardarUsuario(data.user.id)
            navigation.navigate("Login")
        } else {
            alert("ERROR")
        }
    }

    async function guardarUsuario(uid: String) {
        const { error } = await supabase
            .from('jugadores')
            .insert
            ({
                id: uid,
                name: nombre,
                email: correo,
            })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crear cuenta</Text>

            <TextInput
                placeholder="Nombre"
                autoCapitalize="none"
                style={styles.input}
                onChangeText={(texto) => setnombre(texto)}
            />

            <TextInput
                placeholder="Correo electrónico"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                onChangeText={(texto) => setcorreo(texto)}
            />

            <TextInput
                placeholder="Contraseña"
                autoCapitalize="none"
                style={styles.input}
                onChangeText={(texto) => setcontrasenia(texto)}
            />




            <TouchableOpacity
                style={styles.button}
                onPress={() => registro()}
            >
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>

        </View>
    )
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
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 32,
        color: '#333',
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        backgroundColor: '#fff',
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    eyeButton: {
        position: 'absolute',
        right: 12,
    },
});

