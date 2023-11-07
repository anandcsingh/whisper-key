import React, { Component } from "react";
import { CredentialMetadata, CredentialField } from "./CredentialMetadata";

interface CredentialFormProps {
  credentialMetadata: CredentialMetadata;
}

class CredentialForm extends Component<CredentialFormProps> {
  renderFormField(field: CredentialField) {
    const { name, type } = field;
    if (type === "string") {
      return (
        <div key={name}>
          <label htmlFor={name}>{name}</label>
          <input type="text" id={name} name={name} />
        </div>
      );
    } else if (type === "int") {
      return (
        <div key={name}>
          <label htmlFor={name}>{name}</label>
          <input type="number" id={name} name={name} />
        </div>
      );
    }
    // Add more field type cases as needed
    return null;
  }

  render() {
    const { fields } = this.props.credentialMetadata;

    return (
      <form>
        {fields.map((field) => this.renderFormField(field))}
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default CredentialForm;
