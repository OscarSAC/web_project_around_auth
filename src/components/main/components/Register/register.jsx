import { useState } from 'react';
import { Link } from 'react-router-dom';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import '../../../../blocks/register.css';

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
      <main className="register">
        <form onSubmit={handleSubmit} className="register__container">
          <h2 className="register__title">Regístrate</h2>
          <input
            className="register__input"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            className="register__input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button className="register__button" type="submit">Registrarse</button>
        </form>
        <p className="register__redirect">
          ¿Ya eres miembro? <Link to="/signin" style={{ color: 'lightblue' }}>Inicia sesión aquí</Link>
        </p>
        {/* <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
    <button onClick={() =>
      setTooltip({
        open: true,
        success: true,
        message: '¡Correcto! Ya estás registrado.'
      })
    }>
      Probar Popup Exitoso
    </button>

    <button onClick={() =>
      setTooltip({
        open: true,
        success: false,
        message: 'Uy, algo salió mal. Por favor, inténtalo de nuevo.'
      })
    }>
      Probar Popup Fallido
    </button>
  </div> */}
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