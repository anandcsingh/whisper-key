export class CredentialDefinition {
    ClassName: string;
    fields: CredentialField[];
    constructor(
        ClassName: string,
        fields: CredentialField[],
    ) {
        this.ClassName = ClassName;
        this.fields = fields;
    }
}

export class CredentialField {
    title: string;
    type: string;
    constructor(
        title: string,
        type: string,
    ) {
        this.title = title;
        this.type = type;
    }
}

