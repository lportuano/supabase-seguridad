import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from '../supabase/config';

//Biometria
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';


export default function LoginScreen({ navigation }: any) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    revisaBiometria()
  }, [])


  async function login() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (data.session != null) {
      navigation.navigate("Perfil")

      //2.- Guardar el acces Token en login
      loginExitoso(data.session?.access_token)

    } else {
      Alert.alert("ERROR")
    }

  }

  //Login por biometria
  async function biometria() {
    const authResultado = await LocalAuthentication.authenticateAsync({
      promptMessage: "Inicia con biometria"
    })
    if (authResultado.success) {
      console.log("Login exitoso");
      navigation.navigate("Perfil")
    }
  }

  //1.- verificar si la sesion esta activa
  async function loginExitoso(accesToken: any) {
    await SecureStore.setItemAsync("token", accesToken)
    navigation.navigate("Perfil")
  }

  //3.- verificar si el token es valido
  async function revisaBiometria(){
    const token = await SecureStore.getItemAsync("token")

    if( !token ){
      return false
    }

    biometria()

  }

  //recuperar usuario
  async function recuperarUsuario() {
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    Alert.alert("Solicitud enviada", error?.message || "Revisa tu correo");
  }



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#999"
      />

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => login()}>
        <Text style={styles.loginButtonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
        <Text style={styles.registerLink}>¿No tienes cuenta? Crear una</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => recuperarUsuario()}>
        <Text style={styles.registerLink}>¿Olvidaste tu contraseña?</Text>
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
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333',
    marginBottom: 36,
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
  loginButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 8,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  registerLink: {
    marginTop: 24,
    color: '#007AFF',
    fontSize: 15,
    fontWeight: '500',
  },
});

