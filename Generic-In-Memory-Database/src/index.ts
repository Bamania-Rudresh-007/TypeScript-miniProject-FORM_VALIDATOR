enum Role {
    Admin = "ADMIN",
    Member = "MEMBER",
    Guest = "GUEST"
}

interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
}

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
}

type QueryResult<T> = [boolean, T | null, string];

class Database<T extends { id: number }> {
    private records: T[] = [];

    insert(item: T): QueryResult<T> {
        const exists = this.records.find((r) => r.id === item.id);
        if (exists) {
            return [false, null, `Record with id ${item.id} already exists.`];
        }
        this.records.push(item);
        return [true, item, "Record inserted successfully."];
    }
    findById(id: number): QueryResult<T> {
        const record = this.records.find((r) => r.id === id);
        if (!record) {
            return [false, null, `Record with id ${id} not found.`];
        }
        return [true, record, "Record found."];
    }

    update(id: number, changes: Partial<T>): QueryResult<T> {
        const index = this.records.findIndex((r) => r.id === id);
        if (index === -1) {
            return [false, null, `Record with id ${id} not found.`];
        }
        this.records[index] = { ...this.records[index], ...changes } as T;
        return [true, this.records[index], "Record updated successfully."];
    }

    delete(id: number): QueryResult<boolean> {
        const index = this.records.findIndex((r) => r.id === id);
        if (index === -1) {
            return [false, null, `Record with id ${id} not found.`];
        }
        this.records.splice(index, 1);
        return [true, true, "Record deleted successfully."];
    }

    getAll(): T[] {
        return this.records;
    }
}

const userDb = new Database<User>();
const productDb = new Database<Product>();

// Insert
const [ok, user, msg] = userDb.insert({ id: 1, name: "Rudresh", email: "bamaniarudresh.com", role: Role.Admin });
console.log(msg);

// check edgeCases also
const [ok1, user1, mess1] = userDb.insert({id: 1, name: "Dharmik", email: "dharmiksolanki@gmail.com", role: Role.Member});
console.log(mess1);

// Find
const [found, foundUser, findMsg] = userDb.findById(1);
if (found && foundUser) {
    console.log("Found:", foundUser.name);
}

// Update
const [updated, updatedUser, updateMsg] = userDb.update(1, { name: "RD" });
console.log(updateMsg);

// Delete
const [deleted, , deleteMsg] = userDb.delete(1);
console.log(deleteMsg);

// Products work the exact same way
productDb.insert({ id: 1, name: "Laptop", price: 999, category: "Electronics" });
console.log(productDb.getAll());

productDb.update(1, { price: 899 });
console.log(productDb.getAll());

productDb.delete(1);
console.log(productDb.getAll());