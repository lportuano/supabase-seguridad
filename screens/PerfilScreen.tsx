import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function PerfilScreen() {

    const user = {
        name: 'Ana García',
        age: 28,
        email: 'ana.garcia@example.com',
    };

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

            <TouchableOpacity style={styles.logoutButton} >
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
