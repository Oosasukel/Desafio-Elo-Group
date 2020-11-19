import React, { useContext, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import AuthContext from '../Contexts/authContext';

import '../styles/pages/login.css';

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [, setToken] = useContext(AuthContext);
  const [errors, setErrors] = useState<string[]>([]);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newErrors = [];

    const letrasMaiusculas = /[A-Z]/;
    const letrasMinusculas = /[a-z]/;
    const numeros = /[0-9]/;
    const caracteresEspeciais = /[!|@|#|$|%|^|&|*|(|)|-|_]/;

    if (user.trim() === '') {
      newErrors.push('Campo Usuário é obrigatório.');
    }
    if (password === '') {
      newErrors.push('Campo Password é obrigatório.');
    } else {
      if (password !== passwordConfirm) {
        newErrors.push('Password e Confirmação devem ser iguais.');
      }
      if (
        !letrasMaiusculas.test(password) &&
        !letrasMinusculas.test(password)
      ) {
        newErrors.push(
          'Password deve possuir pelo menos um caracter alfanumérico.'
        );
      }
      if (!caracteresEspeciais.test(password)) {
        newErrors.push(
          'Password deve possuir pelo menos um caracter especial.'
        );
      }
      if (!numeros.test(password)) {
        newErrors.push(
          'Password deve possuir pelo menos um caracter numérico.'
        );
      }
      if (password.length < 8) {
        newErrors.push('Password deve possuir pelo menos 8 caracteres.');
      }
    }

    setErrors(newErrors);

    if (newErrors.length === 0) {
      setToken(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBdXRob3IiOiJSb2RyaWdvIiwiWW91SXMiOiJDdXJpb3NvIDpEIn0.xqaWJmsbINRLtFVszfJ-p67imyyoQp8Ez4SOwM8xltk'
      );

      history.push('');
    }
  }

  return (
    <div id='login'>
      <div className='loginContainer'>
        <div className='imageContainer'>
          <img
            src='https://elogroup.com.br/wp-content/uploads/2020/09/logo-EloGroup-branco.png'
            alt='Elo Group'
          />
        </div>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor='user'>Usuário *</label>
          <input
            value={user}
            onInput={(event) => setUser(event.currentTarget.value)}
            type='text'
            id='user'
          />
          <label htmlFor='password'>Password *</label>
          <input
            value={password}
            onInput={(event) => setPassword(event.currentTarget.value)}
            type='password'
            id='password'
            placeholder='*******'
          />
          <label htmlFor='passwordConfirm'>Confirmação Password *</label>
          <input
            value={passwordConfirm}
            onInput={(event) => setPasswordConfirm(event.currentTarget.value)}
            type='password'
            id='passwordConfirm'
            placeholder='*******'
          />
          {errors.map((error) => {
            return (
              <span key={error} className='error'>
                {error}
              </span>
            );
          })}
          <button type='submit'>Registrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
