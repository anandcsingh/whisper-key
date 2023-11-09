import React, { ChangeEvent, FormEvent, Component } from 'react';
import { CredentialMetadata, CredentialField } from '../../../../mentat/src/CredentialMetadata';

interface CredentialFormProps {
  credentialMetadata: CredentialMetadata;
}

interface CredentialFormState {
  formData: Record<string, string>;
}

class CredentialForm extends Component<CredentialFormProps, CredentialFormState> {
  constructor(props: CredentialFormProps) {
    super(props);
    this.state = {
      formData: {},
    };
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Process the form data, you can access it from this.state.formData
    console.log('Form Data:', this.state.formData);
    // TODO: Smooze method goes here
  };

  renderFormField(field: CredentialField) {
    const { name } = field;
    return (
      <div key={name}>
        <label htmlFor={name}>{name}</label>
        <input
          type={field.type}
          id={name}
          name={name}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }

  render() {
    const { fields } = this.props.credentialMetadata;

    return (
      <form onSubmit={this.handleSubmit}>
        {fields.map((field) => this.renderFormField(field))}
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default CredentialForm;
