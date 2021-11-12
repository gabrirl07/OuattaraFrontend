
export interface Pagination {
    prev?: string,
    first: string,
    last: string,
    next?: string,
}

export interface HttpPaginateResponse {
    _links: any,
    items: any,
}


