import React from 'react';
import { Form } from 'react-router-dom';
import FormInput from './Form/FormInput';
import FormSelect from './Form/FormSelect';
import { Link } from "react-router-dom";
import { useLoaderData } from 'react-router-dom';

const Filter = () => {
  const { params = {} } = useLoaderData(); // Default to an empty object if params is undefined
  const { name, category } = params; // Default to empty strings if name or category are undefined
  const categories = ["Buku", "Pensil", "Pulpen", "Map"];
  
  return (
    <form method='get' className='bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-3 grid-cols-2 items-center'>
      <FormInput
        Label="Search Product"
        type="search"
        name="name"
        defaultValue={name}
      />
      <FormSelect 
        label="Select Category" 
        name="category" 
        list={categories} 
        defaultValue={category}
      />
      <button type="submit" className='btn btn-primary'>
        SEARCH
      </button>
      <Link to="/products" className='btn btn-accent'>
        RESET
      </Link>
    </form>
  );
};

export default Filter;
