export interface DataFetchState<T> {
  data: T;
  loading: boolean;
  error?: any;
}
