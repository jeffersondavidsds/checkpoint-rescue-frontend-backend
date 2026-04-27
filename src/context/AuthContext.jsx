import { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../services/api';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há um token armazenado
    const token = localStorage.getItem('token');
    const usuarioArmazenado = localStorage.getItem('usuario');

    if (token && usuarioArmazenado) {
      setUsuario(JSON.parse(usuarioArmazenado));
    }

    setLoading(false);
  }, []);

  const login = async (email, senha) => {
    try {
      const response = await auth.login({ email, senha });
      const { token, usuario } = response.data.dados;

      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      setUsuario(usuario);

      return { sucesso: true };
    } catch (error) {
      return {
        sucesso: false,
        mensagem: error.response?.data?.mensagem || 'Erro ao fazer login'
      };
    }
  };

  const registro = async (dados) => {
    try {
      const response = await auth.registro(dados);
      const { token, usuario } = response.data.dados;

      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      setUsuario(usuario);

      return { sucesso: true };
    } catch (error) {
      return {
        sucesso: false,
        mensagem: error.response?.data?.mensagem || 'Erro ao registrar'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    setUsuario(null);
    window.location.href = '/';
  };

  const isAuthenticated = () => {
    return !!usuario;
  };

  const isTipoUsuario = (tipo) => {
    return usuario?.tipo_usuario === tipo;
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        loading,
        login,
        registro,
        logout,
        isAuthenticated,
        isTipoUsuario
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
