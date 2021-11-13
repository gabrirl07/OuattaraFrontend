export interface ICustomer {
    id: string,
    firstname: string,
    lastname: string,
    middlename: string,
    phone_number: string,
    email: string,
    gender: string,
    marital_status: string,
    profession: string,
    birth_date: string,
    mother_name: string,
    father_name: string,
    husband_name: string,
    birth_country: string,
    present_nationality: string,
    religion: string,
    picture: {
        file: string
    },
    age: number,
    reseller: any,
    language: string
}
