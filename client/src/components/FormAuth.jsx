import React from 'react';
import { Form, Link } from 'react-router-dom';
import FormInput from './Form/FormInput';

const FormAuth = ({ isRegister }) => {
  return (
    <div className="h-screen grid place-items-center">
      <Form method="POST" className="card w-96 p-8 bg-base-300 shadow-lg flex flex-col gap-y-4">
        <h4 className="text-center text-3xl font-bold">{isRegister ? 'Register' : 'Login'}</h4>

        {/* Conditional rendering of the email input for registration */}
        {isRegister && (
          <FormInput type="name" name="name" label="username" />
          )}
        {/* Password Input */}
          <FormInput type="email" name="email" label="Email" />
          <FormInput type="password" name="password" label="Password" />
        {/* Submit Button */}
        <div className="mt-4">
          <button className="btn btn-primary btn-block" type="submit">
            {isRegister ? 'Register' : 'Login'}
          </button>
        </div>

        {/* Toggle between login and register links */}
        {isRegister ? (
          <p className="text-center">
            Sudah ada akun?
            <Link to="/login" className="ml-2 link link-hover link-accent capitalize">
              Login
            </Link>
          </p>
        ) : (
          <p className="text-center">
            Belum ada akun?
            <Link to="/register" className="ml-2 link link-hover link-accent capitalize">
              Register
            </Link>
          </p>
        )}
      </Form>
    </div>
  );
};

export default FormAuth;
