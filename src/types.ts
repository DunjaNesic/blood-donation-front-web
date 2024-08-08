import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

export interface Options {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    context?: HttpContext;
    observe?: 'body';
    params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType: 'json';
    withCredentials?: boolean;
    transferCache?: {
        includeHeaders?: string[];
    } | boolean;
}

export interface TransfusionAction {
        actionID: number,
        actionName: string,
        actionDate: string,
        actionTimeFromTo: string,
        exactLocation: string,
        placeName: string    
}

export interface PaginationParams {
    [param: string]: string | number | boolean | ReadonlyArray<string | number  | boolean>;
    pageNumber: number,
    pageSize: number
}

export interface User {
    userID: number,
    accessToken: string,
    refreshToken: string
}

export interface Official {
    officialID: number,
    officialFullName: string,
    userID: number
}