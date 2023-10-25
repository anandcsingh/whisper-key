import {
    Bool,
    Circuit,
    CircuitString,
    Field,
    MerkleMap,
    MerkleMapWitness,
    Poseidon,
    PublicKey,
    SmartContract,
    State,
    Struct,
    method,
    state,
  } from 'o1js';
import { IEntity } from '../IEntity';
  
  export class LicenseEntity extends Struct({
    id: Field,
    publicKey: PublicKey,
    firstName: CircuitString,
    lastName: CircuitString,
    licenceNumber: CircuitString,
    createdDate: CircuitString,
    expiryDate: CircuitString,
    class: CircuitString,
  }) implements IEntity  {

    toPlainObject() {
      return {
        id: Number(this.id.toBigInt()),
        publicKey: this.publicKey.toBase58(),
        firstName: this.firstName.toString(),
        lastName: this.lastName.toString(),
        licenceNumber: this.licenceNumber.toString(),
        createdDate: this.createdDate.toString(),
        expiryDate: this.expiryDate.toString(),
        class: this.class.toString(),
      };
    }

    hash(): Field {
      return Poseidon.hash(
        this.publicKey
          .toFields()
          .concat(this.firstName.toFields())
          .concat(this.lastName.toFields())
          .concat(this.licenceNumber.toFields())
          .concat(this.createdDate.toFields())
          .concat(this.expiryDate.toFields())
          .concat(this.class.toFields())
      );
    }


  }
  