import React from 'react';

const FormTextArea = ({ label, name, defaultValue }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      <textarea
        className="textarea textarea-bordered"
        name={name}
        defaultValue={defaultValue}
        rows={4} // Optional: Set the number of visible rows
      />
    </div>
  );
};

export default FormTextArea;
