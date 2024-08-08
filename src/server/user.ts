export type Username = {
    title: string,
    first: string,
    last: string
}

export type Location = {
    street: {
        number: number,
        name: string,
    },
    city: string,
    state: string,
    postcode: number,
    coordinates: {
        latitude: string,
        longtitude: string
    },
    timezone: {
        offset: string,
        description: string
    }
}

export type UserAuth = {
    uuid: string,
    username: string,
    password: string,
    salt: string,
    md5: string,
    sha1: string,
    sha256: string
}

export type User = {
    gender: string,
    name: Username,
    location: Location,
    email: string,
    login: UserAuth,
    dob: {
        date: string,
        age: number
    },
    phone: string,
    cell: string,
    id: {
        name: string | null,
        value: string | null
    },
    picture: {
        large: string,
        medium: string,
        thumbnail: string,
    },
    nat: string
}

export type FetchResult = {
    results: User[],
    info: {
        seed: string,
        results: number,
        page: number,
        version: string
    }
}

export async function fetchUsers(page: number, result: number) {
    try {
        const res = await fetch(`https://randomuser.me/api/?page=${page}&results=${result}&inc=picture,name,login`);        
        if (res.status >= 300 || res.status < 200) throw new Error("An error occurred while fetching user");
        
        return res.json() as Promise<FetchResult>;
    } catch (error) {
        return null   
    }
}
