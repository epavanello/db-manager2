export interface Table {
  id: number
  name: string
  description: string
}

export interface Field {
  id: number
  name: string
  description: string
  table_id: number
  key: boolean
  mandatory: boolean
  type: 'string' | 'int' | 'date'
  length: number
  default?: string
}

export interface List {
  id: number
  description: string
  table_id: number
}

export interface ListField {
  id: number
  // Indica che il campo va usato come filtro per la lista (è quindi un parametro della lista)
  filter: boolean
  list_id: number
  field_id: number
}
