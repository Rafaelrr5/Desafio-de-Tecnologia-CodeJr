import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { Link } from 'expo-router';
import { signIn, checkStoredUser, handleSuccessfulLogin } from '@/services/auth';
import { loginStyles } from '@/styles/login.styles';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    checkStoredUser();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    setError('');
    
    const response = await signIn(email, password);
    
    if (response.success && response.session) {
      await handleSuccessfulLogin(response.session);
    } else {
      setError(response.error || 'Erro ao fazer login');
    }
    
    setLoading(false);
  };

  return (
    <View style={loginStyles.container}>
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/3064/3064197.png',
        }}
        style={loginStyles.image}
      />
      <Text style={loginStyles.title}>Bem-vindo de volta!</Text>
      <Text style={loginStyles.subtitle}>Faça login para continuar</Text>

      <TextInput
        style={loginStyles.input}
        placeholder="Digite seu e-mail"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        editable={!loading}
      />

      <TextInput
        style={loginStyles.input}
        placeholder="Digite sua senha"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading}
      />

      <TouchableOpacity 
        style={[loginStyles.button, loading && loginStyles.buttonDisabled]} 
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={loginStyles.buttonText}>
          {loading ? 'Entrando...' : 'Entrar'}
        </Text>
      </TouchableOpacity>

      {error ? <Text style={loginStyles.errorText}>{error}</Text> : null}

      <Link href="/forgotpass" asChild>
        <TouchableOpacity>
          <Text style={loginStyles.forgotPasswordText}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/register" asChild>
        <TouchableOpacity>
          <Text style={loginStyles.registerText}>Não tem uma conta? Cadastre-se</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
