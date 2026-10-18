type AdminPermissions = 'ban' | 'giveAdmin' | 'mute' | 'kick';

interface IUser {
    name: string;
    age: number;
    phoneNumber?: number;
}

interface IAdmin extends IUser {
    adminLevel: number; // Уровень доступа
    access: AdminPermissions[]; // Список прав
}

// Переменные и массивы данных

let uploadStatus: 'loading' | 'success' | 'error';
uploadStatus = 'loading';

let textFormat: 'uppercase' | 'lowercase' | 'capitalize';
textFormat = 'uppercase';

let user: IUser = {
    name: 'Vlad',
    age: 15,
};

let admin: IAdmin = {
    name: 'admin',
    age: 19,
    adminLevel: 1,
    access: ['mute'],
};

const users: IUser[] = [
    {
        name: 'Emir',
        age: 15,
        phoneNumber: 171177,
    },
    {
        name: 'Gleb',
        age: 23,
        phoneNumber: 171177,
    },
    {
        name: 'Egor',
        age: 17,
    },
    {
        name: 'Bob',
        age: 65,
        phoneNumber: 171177,
    },
];

const admins: IAdmin[] = [
    {
        name: 'Shawn',
        age: 20,
        adminLevel: 3,
        access: ['ban', 'giveAdmin', 'mute', 'kick'],
    },
    {
        name: 'Alex',
        age: 23,
        phoneNumber: 171177,
        adminLevel: 2,
        access: ['ban', 'mute', 'kick'],
    },
    {
        name: 'Ronaldo',
        age: 17,
        adminLevel: 1,
        access: ['mute', 'kick'],
    },
];

// Функции

const sum = (a: number, b: number): number => {
    return a + b;
};

function sendMessage(text: string, format: typeof textFormat): string {
    if (format == 'uppercase') {
        return text.toUpperCase();
    } else if (format === 'lowercase') {
        return text.toLowerCase();
    } else {
        return text[0].toUpperCase() + text.slice(1);
    }
}

function getStringAndChar(text: string, deleteSymbol: string) {
    return text.replace(deleteSymbol, '');
}

const getIUsersWithPhoneNum = users.filter((Iuser) => Iuser.phoneNumber);
const getIUsersAdults = users.filter((Iuser) => Iuser.age >= 18);
const getAdminsAboveLevel2 = admins.filter((admin) => admin.adminLevel >= 2);

// Вводы

console.log(getAdminsAboveLevel2);
console.log(sum(1, 2));
console.log(user);
console.log(admin);
console.log(sendMessage('Hi bro', 'capitalize'));
console.log(getStringAndChar('gmasterg', 'g'));
console.log(getIUsersWithPhoneNum);
console.log(getIUsersAdults);