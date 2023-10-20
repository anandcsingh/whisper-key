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

export class  extends Struct({
  // dynamically generate the fields and their types
  // simple types for now
}) {
  hash(): Field {
    return Poseidon.hash(
      this.publicKey
        .toFields()
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
    credential: ,
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
