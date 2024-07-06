export interface TableRow {
    [key: string]: string | number[]; 
  }
  
export interface TableProps {
    headings: string[];
    data: TableRow[];
    month: string;
  }