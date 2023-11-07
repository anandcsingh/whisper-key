import React from "react";
import logo from "./logo.svg";
import "./App.css";
import CredentialForm from "./GenerateForm";
import { CredentialMetadata, CredentialField } from "./CredentialMetadata";

function App() {
  const credentialMetadata = new CredentialMetadata(
    "1",
    "Sample Credential",
    "A sample credential form",
    "1.0",
    new Date(),
    "John Doe",
    [
      new CredentialField("Username", "Enter your username", "string"),
      new CredentialField("Email", "Enter your email", "string"),
      new CredentialField("Age", "Enter your age", "int"),
      new CredentialField("Password", "Enter your password", "string"),
      // Add more fields as needed
    ]
  );

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
      <div>
        <CredentialForm
          credentialMetadata={credentialMetadata}
        ></CredentialForm>
      </div>
    </div>
  );
}

export default App;
