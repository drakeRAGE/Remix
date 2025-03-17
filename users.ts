export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
}

export const users: User[] = [
    { id: "1", name: "Alice", email: "alice@example.com", password: "secret" },
    { id: "2", name: "Bob", email: "bob@example.com", password: "secret" },
    { id: "3", name: "Sarah Johnson", email: "sarah.j@company.net", password: "P@ssw0rd123" },
    { id: "4", name: "Michael Chen", email: "mchen@businessmail.com", password: "Secur3P@ss!" },
    { id: "5", name: "Emma Rodriguez", email: "emma.rodriguez@gmail.com", password: "EmR0d2023#" },
    { id: "6", name: "James Wilson", email: "jwilson@corporate.org", password: "W1ls0nJ@mes" },
    { id: "7", name: "Sophia Patel", email: "sophia.p@techfirm.io", password: "SP@tel2023!" },
    { id: "8", name: "Lucas Thompson", email: "lucas.t@devteam.net", password: "Th0mps0n#22" },
    { id: "9", name: "Isabella Kim", email: "bella.kim@design.co", password: "K1mB3lla!" },
    { id: "10", name: "David Martinez", email: "d.martinez@agency.com", password: "M@rt1nez23" },
    { id: "11", name: "Olivia Brown", email: "olivia.b@studio.net", password: "Br0wnOl1v!" },
    { id: "12", name: "Ethan Wright", email: "wright.e@systems.org", password: "Wr1ght2023#" }
];

// To add user to the database
export const addUser = (user: User) => {
    // Check for existing user
    const existingUser = findUserByEmailPassword(user.email, user.password);

    if (existingUser === undefined) {
        users.push(user);
    }
};

// To find user 
// Fix the missing return statements
export const findUser = (id: String) => {
    return users.find((u) => u.id === id);
};

export const findUserByEmailPassword = (email: String, password: String) => {
    return users.find((u) => u.email === email && u.password === password);
};

// To delete user from database
export const deleteUser = (id: String) => {
    const index = users.findIndex((u) => u.id === id);
    if (index !== -1) {
        users.splice(index, 1);
    }
};