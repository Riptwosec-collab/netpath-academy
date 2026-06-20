export type AdminStatItem = {
  label: string;
  value: number | string;
  color: string;
  icon: string; // SVG path
};

export type TableColumn<T> = {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
};

export type AdminFormState = {
  loading: boolean;
  error:   string;
  success: boolean;
};
