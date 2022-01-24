import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiError } from "../error/apiError";

export interface PathParams {
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

export const post = async <TResponse>(path: string, body?: any, pathParams?: PathParams, headers?: Headers): Promise<TResponse> => {
    const url = getEndpointUrl(path, pathParams);

    const params: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true
    };

    if (headers) {
        Object.keys(headers).forEach(key => {
            (params.headers as Record<string, string>)[key] = headers[key]
        })
    }

    try {
        const response = await axios.post(url, body, params);
        return response.data;
    } catch (e: any) {
        if (e && e.response) {
            throw new ApiError(e.response.status, e.response.data);
        }
        throw e;
    }

};
