
import { SortDirections, sortDirections } from "../enums/SortDirections.enum"
import { QueryParamsType } from "../types/queryParams"





export  const PaginationQueryParams = (queryParams:QueryParamsType ):QueryParamsType => {
      return{
      pageNumber: queryParams.pageNumber ? +queryParams.pageNumber : 1,
      pageSize: queryParams.pageSize !== undefined ? +queryParams.pageSize : 10,
      sortBy: queryParams.sortBy ? queryParams.sortBy : 'createdAt',
      sortDirection: sortDirections.includes(queryParams.sortDirection as SortDirections) ? queryParams.sortDirection as SortDirections  : 'desc',
      searchNameTerm: queryParams.searchNameTerm
   }
}
