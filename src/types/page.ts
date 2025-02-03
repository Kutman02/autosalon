export type SearchParams = { [key: string]: string | string[] | undefined };

export type PageProps<T extends Record<string, any> = {}> = {
  params: T;
  searchParams: SearchParams;
}; 