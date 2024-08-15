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

export interface Volunteer {
    volunteerID: number,
    volunteerFullName: string,
    dateFreeFrom: string,
    dateFreeTo: string,
    redCross: string
}

export interface Donor {
    jmbg: string,
    donorFullName: string,
    bloodType: string,
    placeName: string,
    isActive: boolean,
    lastDonationDate: string,
}

export interface Place {
    placeID: number,
    placeName: string
}

export interface Question {
    questionID: number,
    questionText: string
}

export interface QuestionnaireQuestion {
    questionID: number,
    answer: boolean
}

export interface Questionnaire {
    approved: boolean,
    questionnaireTitle: string,
    remark: string,
    answeredQuestions: QuestionnaireQuestion[]
}