
export interface Pagination {
    total_page: number,
    self: number,
    previous?: number,
    items_count: number,
    next?: 2,
}

export interface HttpPaginateResponse {
    total_page: number,
    self: number,
    items_count: number,
    _links: any,
    items: any,
}


