import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../../../utils/api';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import '../../../../blocks/login.css';


function Login({onLogin, tooltip, setTooltip}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };
  

  return (
    <>
      <header>{/* Aquí se mantiene el Header que tienes en App.jsx */}</header>
      <main className='login'>
        <form onSubmit={handleSubmit} className="login__container">
          <h2 className="login__title">Iniciar Sesión</h2>
          <input
            className="login__input"
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
           className="login__input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login__button">Iniciar Sesión</button>
        </form>
        <p className="login__redirect">
          ¿No eres usuario? <Link to="/signup" style={{ color: 'lightblue' }}>Haz click aquí para registrarte</Link>
        </p>
      </main>
      {/* <footer>Aquí se mantiene el Footer que tienes en App.jsx</footer> */}
      <InfoTooltip
        isOpen={tooltip.open}
        isSuccess={tooltip.success}
        message={tooltip.message}
        onClose={() => setTooltip({ ...tooltip, open: false })}
      />
    </>
  );
}

export default Login;