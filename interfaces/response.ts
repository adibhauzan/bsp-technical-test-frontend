export interface IResponse<T> {
    code: number;
    status: string;
    message: string;
    data: T;
}

export interface IFindAllResponse<T> {
    code: number;
    status: string;
    message: string;
    data: {
        items: T[]; 
        meta: {
            search: string;
            sortBy: string;
            sortDirection: string;
        };
        pageInfo: {
            page: number;
            limit: number;
            totalRecords: number;
            totalPages: number;
        };
        [key: string]:
            | T[]
            | {
                  search: string;
                  sortBy: string;
                  sortDirection: string;
              }
            | {
                  page: number;
                  limit: number;
                  totalRecords: number;
                  totalPages: number;
              }; // Properti dinamis tetap mendukung meta dan pageInfo
    };
}
