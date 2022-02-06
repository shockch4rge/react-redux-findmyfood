export type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};

export type Nullish<T> = T | null
