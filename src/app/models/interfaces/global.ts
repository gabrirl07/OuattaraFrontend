
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


export interface GlobalStats {
    costumers: number,
    resellers: number,
    pending_visarequests: number,
    operations: number,
    agencies: number,
    visarequests: number,
    visas: number,
}


