import {
    Field,
    MerkleMap,
    MerkleMapWitness,
    PublicKey,
    SmartContract,
    State,
    method,
    state,
    Permissions,
    VerificationKey,
    CircuitString,
    provablePure,
    Bool,
    Struct,
    Poseidon,
    Circuit,
  } from 'o1js';
  
  export class GenericModel extends Struct({
    // dynamically generate the fields and their types
    // simle types for now

    id: Field,
    publicKey: PublicKey,
    firstName: CircuitString,
    lastName: CircuitString,
    rank: CircuitString,
    verified: Bool,
    instructor: PublicKey,
    createdDate: CircuitString,
    modifiedDate: CircuitString,
    discipline: CircuitString,
  }) {
    hash(): Field {
      return Poseidon.hash(
        this.publicKey
          .toFields()
          .concat(this.firstName.toFields())
          .concat(this.lastName.toFields())
          .concat(this.rank.toFields())
          .concat(this.verified.toFields())
          .concat(this.instructor.toFields())
          .concat(this.createdDate.toFields())
          .concat(this.modifiedDate.toFields())
          .concat(this.discipline.toFields())
      );
    } 
}
  export class GenericContract extends SmartContract {
    @state(Field) mapRoot = State<Field>();

    init() {
      super.init();
      this.mapRoot.set(Field(new MerkleMap().getRoot()));
    }
  
    @method setMapRoot(newRoot: Field) {
        // only owners should do this
      this.mapRoot.getAndAssertEquals();
      this.mapRoot.set(newRoot);
    }

    @method issueCredential(
        owner: PublicKey,
        credential: GenericModel,
        witness: MerkleMapWitness,
        currentRoot: Field
    ) {
      this.mapRoot.getAndAssertEquals();
      this.mapRoot.assertEquals(currentRoot);
      this.sender.assertEquals(credential.issuer);
      credential.owner = owner;
      const [newRoot, _] = witness.computeRootAndKey(credential.hash());
      this.mapRoot.set(newRoot);
    }
  }