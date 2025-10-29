import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    university: '',
    password: '',
    confirmPassword: ''
  });

  const { fullName, email, university, password, confirmPassword } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
    } else {
      const newUser = {
        fullName,
        email,
        university,
        password
      }
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        const body = JSON.stringify(newUser);
        const res = await axios.post('http://localhost:5000/users/register', body, config);
        console.log(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    }
  };

  const handleGoogleRegister = () => {
    window.location.href = `http://localhost:5000/auth/google`;
  };

  return (
    <div>
      <h2>Create Account</h2>
      <form onSubmit={e => onSubmit(e)}>
        <div>
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={fullName}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="University/College"
            name="university"
            value={university}
            onChange={e => onChange(e)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            minLength="6"
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={e => onChange(e)}
            minLength="6"
            required
          />
        </div>
        <input type="submit" value="Register" />
      </form>
      <div className="or-separator" style={{ textAlign: 'center', margin: '20px 0', color: '#888' }}>OR</div>
      <div className="google-login" style={{ textAlign: 'center' }}>
        <button onClick={handleGoogleRegister} className="google-button" style={{ width: '100%', padding: '10px', fontSize: '16px', background: '#fff', color: '#444', border: '1px solid #ccc', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <img src="https://www.google.com/favicon.ico" alt="Google icon" style={{ width: '20px', height: '20px' }} />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
