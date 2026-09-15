import path from "path";
import fs from "fs";

const DB_PATH = path.join(import.meta.dirname, "../data/users.json");

export function readUsers() {
    const users = fs.readFileSync(DB_PATH, 'utf8').trim();

    // console.log(users);

    if (!users) {
        return [];
    }

    return JSON.parse(users);
}


export function writeUsers(users) {

    // console.log(users);

     fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));

}
export function findByEmail(email) {
    return readUsers().find((u) => u.email === email) || null;
}

export function findById(id) {
    return readUsers().find((u) => u.id === id) || null;
}