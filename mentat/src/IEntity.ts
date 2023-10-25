import {
    Field,
    Struct,
  } from 'o1js';
  
export interface IEntity {
    // how to enforce the MerkleMap index field?
    // create as an abstract class?
    // how to call the base class and pass the object to this class?
    // currently all IEntity classes have to implement and id filed by convention
    // id: Field;
    hash(): Field;
    toPlainObject(): any;
}

