interface Attribute {
    attribute_name: string,
    rank_cost: number,
    details?: string,
    current_rank?: number,
    id: number
}

export type {Attribute as AttributeType}