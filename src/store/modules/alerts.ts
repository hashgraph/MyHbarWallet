export interface NewAlert {
    message: string;
    level: string;
}

export interface Alert extends NewAlert {
    id: number;
}

export interface State {
    queue: Alert[];
}
