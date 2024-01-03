export interface Skill {
    skillId: number;
    skill: string;
}

export interface Employee {
    id?: number,
    lastName?: string,
    firstName?: string,
    street?: string,
    postcode?: string,
    city?: string,
    phone?: string,
    skillSet?: Skill[]
}

export interface EmployeeUpdate {
    lastName?: string,
    firstName?: string,
    street?: string,
    postcode?: string,
    city?: string,
    phone?: string,
    skillSet?: number[]
}