import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import { styles } from '@/styles/ForgotPassword.styles';

const ForgotPasswordScreen = ({ }) => {
  const [email, setEmail] = useState('');

  const handlePasswordReset = () => {
    // Lógica para enviar instruções de redefinição de senha
    console.log('E-mail para redefinição de senha enviado para:', email);
    alert('Se o e-mail estiver cadastrado, você receberá instruções para redefinir a senha.');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/3064/3064197.png',
        }}
        style={styles.image}
      />
      <Text style={styles.title}>Esqueceu sua senha?</Text>
      <Text style={styles.subtitle}>
        Insira seu e-mail cadastrado e enviaremos instruções para redefinir sua senha.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>

      <Link href="/(tabs)/Login" asChild>
        <TouchableOpacity>
          <Text style={styles.backToLoginText}>Voltar para o login</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default ForgotPasswordScreen;
