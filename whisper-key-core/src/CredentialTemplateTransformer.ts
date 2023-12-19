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

          
            fs.writeFile(target, contractReplaced, 'utf8', (err) => {
              if (err) {
                console.error(`Error writing target template: ${err.message}`);
                return;
              }
          
              console.log('Template updated successfully');
            });
          });
    }
}

CredentialTemplateTransformer.transform('./dist/src/CredentialProxy.js', './dist/src/CredentialTemplate.mustache');