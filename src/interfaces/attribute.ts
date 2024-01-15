interface Attribute {
    attribute_name: string,
    rank_cost: number,
    details?: string,
    current_rank?: number
}

export type {Attribute as AttributeType}