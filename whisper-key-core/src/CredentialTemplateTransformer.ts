import * as fs from 'fs';
export class CredentialTemplateTransformer {

    static transform(source: string, target: string) {
        fs.readFile(source, 'utf8', (err, data) => {
            if (err) {
              console.error(`Error reading source template: ${err.message}`);
              return;
            }

            const entityReplaced = data.replace(/PassportEntity/g, '{{name}}Entity');
            const contractReplaced = entityReplaced.replace(/PassportContract/g, '{{name}}Contract');
            
            const fieldText = `{{#fields}}
            {{name}}: {{type}},
            {{/fields}}`;
            const fieldsReplaced = contractReplaced.replace(/(firstName: CircuitString,\s*lastName: CircuitString,\s*dateOfBirth: CircuitString,\s*expiryDate: CircuitString,\s*passportNumber: CircuitString,\s*nationality: CircuitString,)/g, fieldText);
            
            const toPlainObjectText = `{{#fields}}
            {{name}}: {{plainValue}},
            {{/fields}}`;
            const toPlainObjectReplaced = fieldsReplaced.replace(/(firstName: this\.firstName\.toString\(\),\s*lastName: this\.lastName\.toString\(\),\s*dateOfBirth: this\.dateOfBirth\.toString\(\),\s*expiryDate: this\.expiryDate\.toString\(\),\s*passportNumber: this\.passportNumber\.toString\(\),\s*nationality: this\.nationality\.toString\(\),)/g, toPlainObjectText);

            const fromPlainObjectText = `{{#fields}}
            {{name}}: {{provableValue}},
            {{/fields}}`;
            const fromPlainObjectReplaced = toPlainObjectReplaced.replace(/(firstName: CircuitString\.fromString\(obj\.firstName\),\s*lastName: CircuitString\.fromString\(obj\.lastName\),\s*dateOfBirth: CircuitString\.fromString\(obj\.dateOfBirth\),\s*expiryDate: CircuitString\.fromString\(obj\.expiryDate\),\s*passportNumber: CircuitString\.fromString\(obj\.passportNumber\),\s*nationality: CircuitString\.fromString\(obj\.nationality\),)/g, fromPlainObjectText);

            const hashText = `{{#fields}}
            .concat(this.{{name}}.toFields())
            {{/fields}}`;

            const hashReplaced = fromPlainObjectReplaced.replace(/(\.concat\(this\.firstName\.toFields\(\)\)\s*\.concat\(this\.lastName\.toFields\(\)\)\s*\.concat\(this\.dateOfBirth\.toFields\(\)\)\s*\.concat\(this\.expiryDate\.toFields\(\)\)\s*\.concat\(this\.dateOfBirth\.toFields\(\)\)\s*\.concat\(this\.passportNumber\.toFields\(\)\)\s*\.concat\(this\.nationality\.toFields\(\)\))/g, hashText);

            fs.writeFile(target, hashReplaced, 'utf8', (err) => {
              if (err) {
                console.error(`Error writing target template: ${err.message}`);
                return;
              }
          
              console.log('Template updated successfully');
            });
          });
    }
}

CredentialTemplateTransformer.transform('./dist/src/CredentialProxy.js', './dist/src/Pipeline/CredentialTemplate.mustache');