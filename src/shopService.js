let users= new Map();
let courses= new Map();


export function validatePassword(user, password){
    console.log("Validating password:", user, password);
    const userGotten= users.get(user);
    return userGotten.password === password;
}

export function validateEmail(email){
    return users.has(email);
}

export function addUser(email, userInfo){
    console.log("Adding user:", email, userInfo);
    users.set(email, userInfo);
}

export function addCourse(course){
    console.log("Adding course:", course);
    courses.set(course, []);
}

export function addUserToCourse(course, student){
    console.log("Adding student:", student, "to course:", course);
    courses.get(course).push(student);
}

export function getUser(user){
    console.log("Getting user:", user);
    return users.get(user);
}