import {Pagination} from '../interfaces/global';

export class Paginations {

    private links: Pagination;
    public perPage: number;

    constructor(links: any, perPage: number = 10) {
        this.links = links;
        this.perPage = perPage;
    }

    extractFromUrl(url: any) {
        return new URLSearchParams(url);
    }

    get nextPage() {
        return this.extractFromUrl(this.links.next).get('page');
    }

    get hasNextPage() {
        return !!this.links.next;
    }

    get hasPrevPage() {
        return !!this.links.prev;
    }

    get prevPage() {
        return this.extractFromUrl(this.links.prev).get('page');
    }

    get currentPage() {
        return Number(this.extractFromUrl(this.links.self).get('page'));
    }

    get total() {
        return Number(this.extractFromUrl(this.links.last).get('page')) * this.perPage;
    }

// const urlSearchParams = new URLSearchParams(window.location.search);
// const params = Object.fromEntries(urlSearchParams.entries());

}