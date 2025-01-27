let users= new Map();


export function validateUser(userInfo){
    return users.has(userInfo.userName);
}

export function validatePassword(user, password){
    return users.get(user)===password;
}

export function addUser(userInfo){
    users.set(userInfo.userName, userInfo.password);
}