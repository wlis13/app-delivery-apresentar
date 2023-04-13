import { useEffect, useState } from 'react';

function AdminForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [role, setRole] = useState('customer');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const validRegister = () => {
      const regex = /\S+@\S+\.\S+/i;
      const minCharPass = 5;
      const minCharName = 11;
      return (regex.test(email)
      && password.length > minCharPass && name.length > minCharName);
    };
    if (validRegister()) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password, name]);

  async function handleSubmit(event) {
    event.preventDefault();

    const endpoint = 'http://localhost:3001/admin/register';
    const response = await fetch(endpoint, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ name, email, password, role }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: JSON.parse(localStorage.getItem('user')).token,
      },
    });

    const loginResponse = await response.json();

    if (loginResponse.message) {
      setShowError(true);
    } else setShowError(false);
  }

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="name">
        Nome Completo:
        <input
          value={ name }
          type="text"
          data-testid="admin_manage__input-name"
          onChange={ (event) => setName(event.target.value) }
          id="name"
          name="name"
        />
      </label>
      <label htmlFor="email">
        E-Mail:
        <input
          value={ email }
          type="email"
          data-testid="admin_manage__input-email"
          onChange={ (event) => setEmail(event.target.value) }
          id="email"
          name="email"
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          value={ password }
          type="text"
          data-testid="admin_manage__input-password"
          onChange={ (event) => setPassword(event.target.value) }
          id="password"
          name="password"
        />
      </label>
      <button
        type="button"
        data-testid="admin_manage__button-register"
        value="register-button"
        onClick={ handleSubmit }
        disabled={ isDisabled }
      >
        Cadastrar
      </button>
      <select
        data-testid="admin_manage__select-role"
        value={ role }
        id="role"
        name="role"
        onChange={ (event) => setRole(event.target.value) }
      >
        <option value="seller">Vendedor</option>
        <option value="customer">Cliente</option>
      </select>
      {
        showError && (
          <p data-testid="admin_manage__element-invalid-register">
            Nome ou e-mail já cadastrado!
          </p>
        )
      }
    </form>
  );
}

export default AdminForm;
