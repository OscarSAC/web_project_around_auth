import { useState } from 'react';
import { Link } from 'react-router-dom';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function Register({onRegister, tooltip, setTooltip}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí luego implementaremos la lógica de registro
    onRegister(email, password);
  };

  return (
    <>
      <header>{/* Header aquí */}</header>
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
          <button type="submit">Registrarse</button>
        </form>
        <p style={{ marginTop: '20px' }}>
          Ya eres usuario? <Link to="/signin" style={{ color: 'lightblue' }}>Haz click aquí para iniciar sesión</Link>
        </p>
      </main>
      <footer>{/* Footer aquí */}</footer>
       <InfoTooltip
        isOpen={tooltip.open}
        isSuccess={tooltip.success}
        message={tooltip.message}
        onClose={() => setTooltip({ ...tooltip, open: false })}
      />
    </>
  );
}

export default Register;