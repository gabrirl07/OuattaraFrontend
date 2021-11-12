
export interface Pagination {
    prev?: string,
    first: string,
    last: string,
    next?: string,
    self?: string,
}

export interface HttpPaginateResponse {
    _links: any,
    items: any,
}


