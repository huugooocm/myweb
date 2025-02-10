let users= new Map();
let courses= new Map();


export function validatePassword(user, password) {
    console.log("Validating password for user:", user);
    if (!users.has(user)) {
        console.error("User not found");
        return false;
    }

    const storedPassword = users.get(user).password;

    if (password === storedPassword) {
        console.log("Password validated successfully");
        return true;
    } else {
        console.error("Incorrect password");
        return false;
    }
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