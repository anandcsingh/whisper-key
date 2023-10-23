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
  