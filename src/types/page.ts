export type SearchParams = { [key: string]: string | string[] | undefined };

export type PageProps<T = {}> = {
  params: T;
  searchParams: SearchParams;
}; 