import 'express'

declare module 'express' {
    type TypedResponse<T> = Omit<Response, "json"> & { json: (data: T) => Response };

    export interface Response
        extends TypedResponse<{
            success: boolean;
            data?: any;
            error?: string;
        }> {}
}
