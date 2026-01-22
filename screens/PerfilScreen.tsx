import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../supabase/config';

import * as SecureStore from 'expo-secure-store';

export default function PerfilScreen({ navigation }: any) {

    const [user, setuser] = useState({} as usuario)

    type usuario = {
        name: String,
        email: String,
        age: number
    }

    useEffect(() => {
        traerSesion()
    }, [])

    //trae la sesion activa
    async function traerSesion() {
        const { data, error } = await supabase.auth.getSession()
        //console.log(data);
        if (data.session != null) {
            traerUsuario(data.session.user.id)
        }
    }

    //lea tabla del usuario
    async function traerUsuario(uid: any) {
        const { data, error } = await supabase
            .from('jugadores')
            .select()
            .eq("id", uid)

        if (data != null) {
            setuser(data[0])
        }

        //console.log(data[0]);

    }

    async function cerrarSesion() {
        const { error } = await supabase.auth.signOut()
        await SecureStore.deleteItemAsync("token")

        navigation.navigate("Welcome");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mi perfil</Text>

            <View style={styles.card}>
                <View style={styles.row}>
                    <Text style={styles.label}>Nombre:</Text>
                    <Text style={styles.value}>{user.name}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Edad:</Text>
                    <Text style={styles.value}>{user.age} años</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Correo:</Text>
                    <Text style={styles.value}>{user.email}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => cerrarSesion()}>
                <Text style={styles.logoutText}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 24,
        paddingTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#333',
        marginBottom: 24,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    label: {
        fontWeight: '600',
        color: '#555',
        width: 80, // ancho fijo para alinear
    },
    value: {
        flex: 1,
        color: '#333',
        fontSize: 16,
    },
    logoutButton: {
        marginTop: 24,
        paddingVertical: 10,
        alignItems: 'center',
    },
    logoutText: {
        color: '#FF3B30', // Rojo suave de iOS para acciones destructivas
        fontSize: 16,
        fontWeight: '600',
    },
});
