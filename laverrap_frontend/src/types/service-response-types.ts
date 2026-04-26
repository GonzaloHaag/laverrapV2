export interface ServiceResponse<T> {
    ok: boolean;
    message: string;
    data: T;
}