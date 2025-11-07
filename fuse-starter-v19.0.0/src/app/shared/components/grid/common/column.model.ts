export type TemplateType = 'custom' | 'id' | 'translate' | 'date'
export type ColumnFilterType = 'text' | 'select' | 'boolean' | 'date'

export interface ColumnFilterOption {
  label: string
  value: any
}

export interface IColumn {
  field: string
  header?: string
  headerFunction?: () => string
  template?: TemplateType
  width?: string
  is_filter?: boolean
  filterType?: ColumnFilterType
  filterOptions?: ColumnFilterOption[]
  filterPlaceholder?: string
}

export class Column implements IColumn {
  constructor(
    public field: string,
    public header?: string,
    public headerFunction?: () => string,
    public template?: TemplateType,
    public width?: string,
    public is_filter?: boolean,
    public filterType?: ColumnFilterType,
    public filterOptions?: ColumnFilterOption[],
    public filterPlaceholder?: string,
  ) {}
}

export function createColumn({
  field,
  header,
  headerFunction,
  template,
  width,
  is_filter,
  filterType,
  filterOptions,
  filterPlaceholder,
}: IColumn): Column {
  return new Column(
    field,
    header,
    headerFunction,
    template,
    width,
    is_filter,
    filterType,
    filterOptions,
    filterPlaceholder,
  )
}
