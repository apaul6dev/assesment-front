import { HttpHeaders } from "@angular/common/http";

// url server
export const HOST = 'http://localhost:8000/api/v1';


export const HTTP_OPTIONS = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
};
