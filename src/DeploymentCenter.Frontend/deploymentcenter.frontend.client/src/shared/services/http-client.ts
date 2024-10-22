import axios from "axios";

export class HttpClient {
  private headers: Record<string, string>;

  constructor(private apiUrl: string, private authBase64: string | null) {
    if (this.authBase64 === null) {
      this.headers = {};
    } else {
      this.headers = {
        "Auth": this.authBase64,
      };
    }
  }

  public async get<T>(endpoint: string): Promise<T> {
    const response = await axios.get(`${this.apiUrl}${endpoint}`, {
      headers: this.headers,
    });
    return response.data;
  }

  public async post<TBody, TResponse>(
    endpoint: string,
    data: TBody
  ): Promise<TResponse> {
    const response =  await axios.post(`${this.apiUrl}${endpoint}`, data, {
      headers: this.headers,
    });
    return response.data;
  }
}
