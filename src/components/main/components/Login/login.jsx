import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../../../utils/api';
import InfoTooltip from '../InfoTooltip/InfoTooltip';


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
      <main style={{ backgroundColor: 'black', height: '80vh', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Iniciar Sesión</button>
        </form>
        <p style={{ marginTop: '20px' }}>
          No eres usuario? <Link to="/signup" style={{ color: 'lightblue' }}>Haz click aquí para registrarte</Link>
        </p>
      </main>
      <footer>{/* Aquí se mantiene el Footer que tienes en App.jsx */}</footer>
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