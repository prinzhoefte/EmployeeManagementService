interface Human {
    lastName?: string,
    firstName?: string,
    street?: string,
    postcode?: string,
    city?: string,
    phone?: string
}

interface Skill {
    skillId: number;
    skill: string;
}

export interface Employee extends Human {
    skillSet?: Skill[]
}

export interface EmployeeUpdate extends Human {
    skillSet?: number[]
}