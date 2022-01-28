import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiError } from "../error/apiError";

type HttpMethod = 'GET' | 'POST';

export interface PathParams {
    [key: string]: string
}

export interface QueryParams {
    [key: string]: string
}

export interface Headers {
    [key: string]: string
}

const getEndpointUrl = (path: string, pathParams?: PathParams) => {
    let url = process.env.REACT_APP_API_URL + path;
    if (pathParams) {
        Object.keys(pathParams).forEach(key => {
            url = url.replace(`{${key}}`, pathParams[key]);
        });
    }
    return url;
}

class ApiRequestBuilder<TResponse> {

    private pathParams?: PathParams;
    private queryParams?: QueryParams;
    private headers?: Headers;
    private body?: any;

    constructor(private method: HttpMethod, private path: string) {
    }

    public withPathParams(pathParams: PathParams): ApiRequestBuilder<TResponse> {
        this.pathParams = pathParams;
        return this;
    }

    public withQueryParams(queryParams: QueryParams): ApiRequestBuilder<TResponse> {
        this.queryParams = queryParams;
        return this;
    }

    public withHeaders(headers: Headers): ApiRequestBuilder<TResponse> {
        this.headers = headers;
        return this;
    }

    public withBody(body: any): ApiRequestBuilder<TResponse> {
        this.body = body;
        return this;
    }

    public async send(): Promise<TResponse> {
        const url = getEndpointUrl(this.path, this.pathParams);
        const params: AxiosRequestConfig = {
            method: this.method,
            url: url,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        };

        if (this.headers) {
            params.headers = {
                ...params.headers,
                ...this.headers
            };
        }

        if (this.queryParams) {
            params.params = this.queryParams;
        }

        if (this.body) {
            params.data = this.body;
        }

        try {
            const response = await axios(params);
            return response.data;
        } catch (e: any) {
            if (e && e.response) {
                throw new ApiError(e.response.status, e.response.data);
            }
            throw e;
        }
    }
}

export const buildApiRequest = <TResponse = void>(method: HttpMethod, path: string): ApiRequestBuilder<TResponse> => {
    return new ApiRequestBuilder<TResponse>(method, path);
}
