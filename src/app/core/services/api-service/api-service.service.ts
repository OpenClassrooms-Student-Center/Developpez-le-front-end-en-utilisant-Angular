import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type RequestOptions = {
  headers?: HttpHeaders;
  body?: unknown;
  // Add more options if needed
};

/**
 * Service for making HTTP requests to an API.
 */
@Injectable({
  providedIn: 'root',
})
class ApiService {
  /**
   * The base URL for making HTTP requests to the API.
   * It is initialized to an empty string by default.
   */
  protected baseUrl: string = '';

  constructor(public http: HttpClient) {}

  /**
   * Constructs the complete URL by combining the base URL and the provided URL segment.
   *
   * @private
   * @param {string} urlSegment - The URL segment to be appended to the base URL.
   * @returns {string} The constructed URL.
   */
  private constructUrl(urlSegment: string): string {
    const isRelativeUrl: boolean = !this.baseUrl.startsWith('https://');
    if (isRelativeUrl) {
      return this.baseUrl;
    }

    const constructedUrl: URL = new URL(this.baseUrl);
    constructedUrl.pathname = urlSegment;

    return constructedUrl.href;
  }

  /**
   * Performs an HTTP GET request.
   *
   * @param {args} - An object containing urlSegment and options.
   * @returns An Observable with the response data.
   */
  protected fetchGet<T>(args: {
    urlSegment: string;
    options?: RequestOptions;
  }): Observable<T> {
    const { urlSegment, options } = args;
    const url: string = this.constructUrl(urlSegment);
    return this.http.get<T>(url, { ...options });
  }

  /**
   * Performs an HTTP POST request.
   *
   * @param {args} - An object containing urlSegment, body, and headers.
   * @returns An Observable with the response data.
   */
  protected fetchPost<T>(args: {
    urlSegment: string;
    body: unknown;
    headers?: HttpHeaders;
  }): Observable<T> {
    const { urlSegment, body, headers } = args;
    const url: string = this.constructUrl(urlSegment);

    const stringifiedBody: string = JSON.stringify(body);

    return this.http.post<T>(url, stringifiedBody, {
      headers,
    });
  }

  /**
   * Performs an HTTP PUT request.
   *
   * @param {args} - An object containing urlSegment, body, and headers.
   * @returns An Observable with the response data.
   */
  protected fetchPut<T>(args: {
    urlSegment: string;
    body: unknown;
    headers?: HttpHeaders;
  }): Observable<T> {
    const { urlSegment, body, headers } = args;
    const url: string = this.constructUrl(urlSegment);

    const stringifiedBody: string = JSON.stringify(body);

    return this.http.put<T>(url, stringifiedBody, {
      headers,
    });
  }

  /**
   * Performs an HTTP DELETE request.
   *
   * @param {args} - An object containing urlSegment and headers.
   * @returns An Observable with the response data.
   */
  protected fetchDelete<T>(args: {
    urlSegment: string;
    headers?: HttpHeaders;
  }): Observable<T> {
    const { urlSegment, headers } = args;
    const url: string = this.constructUrl(urlSegment);
    return this.http.delete<T>(url, { headers });
  }
}

export default ApiService;
