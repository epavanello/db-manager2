export interface Table {
  id: number;
  name: string;
  description: string;
}

export interface Field {
  id: number;
  name: string;
  description: string;
  table_id: number;
  mandatory: boolean;
  type: 'string' | 'int' | 'date';
  default?: string;
}
