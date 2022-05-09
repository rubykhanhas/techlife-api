export interface IQueryStringProducts {
  filter?: IFilterQuery;
  sort?: {
    [field: string]: string;
  };
  limit?: number;
  skip?: number;
}

export type IFilterQuery = {
  [field: string]:
    | RegExp
    | {
        [operator: string]: number;
      };
};
