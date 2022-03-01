export enum StrummingType {
    up,
    down,
    mutting,
    space
}

export const defaultStrumming = 
[StrummingType.down, StrummingType.down, StrummingType.space, 
    StrummingType.up, StrummingType.up, StrummingType.space,
    StrummingType.down, StrummingType.up
]