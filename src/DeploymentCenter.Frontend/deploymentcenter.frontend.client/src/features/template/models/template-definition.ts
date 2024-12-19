interface TemplateVariable {
  name: string;
  displayName: string;
  defaultValue: string;
}

export interface TemplateFormDetails {
  name: string;
  variables: TemplateVariable[];
}