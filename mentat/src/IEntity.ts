import {
    Field,
    Struct,
  } from 'o1js';
  
export interface IEntity {
    hash(): Field;
}

