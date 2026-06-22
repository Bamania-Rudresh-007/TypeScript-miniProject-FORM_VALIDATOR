var Role;
(function (Role) {
    Role["Admin"] = "ADMIN";
    Role["Member"] = "MEMBER";
    Role["Guest"] = "GUEST";
})(Role || (Role = {}));
class Database {
    records = [];
    insert(item) {
        const exists = this.records.find((r) => r.id === item.id);
        if (exists) {
            return [false, null, `Record with id ${item.id} already exists.`];
        }
        this.records.push(item);
        return [true, item, "Record inserted successfully."];
    }
    findById(id) {
        const record = this.records.find((r) => r.id === id);
        if (!record) {
            return [false, null, `Record with id ${id} not found.`];
        }
        return [true, record, "Record found."];
    }
    update(id, changes) {
        const index = this.records.findIndex((r) => r.id === id);
        if (index === -1) {
            return [false, null, `Record with id ${id} not found.`];
        }
        this.records[index] = { ...this.records[index], ...changes };
        return [true, this.records[index], "Record updated successfully."];
    }
    delete(id) {
        const index = this.records.findIndex((r) => r.id === id);
        if (index === -1) {
            return [false, null, `Record with id ${id} not found.`];
        }
        this.records.splice(index, 1);
        return [true, true, "Record deleted successfully."];
    }
    getAll() {
        return this.records;
    }
}
const userDb = new Database();
const productDb = new Database();
// Insert
const [ok, user, msg] = userDb.insert({ id: 1, name: "Raj", email: "raj@email.com", role: Role.Admin });
console.log(msg);
// Find
const [found, foundUser, findMsg] = userDb.findById(1);
if (found && foundUser) {
    console.log("Found:", foundUser.name);
}
// Update
const [updated, updatedUser, updateMsg] = userDb.update(1, { name: "Rajesh" });
console.log(updateMsg);
// Delete
const [deleted, , deleteMsg] = userDb.delete(1);
console.log(deleteMsg);
// Products work the exact same way
productDb.insert({ id: 1, name: "Laptop", price: 999, category: "Electronics" });
console.log(productDb.getAll());
export {};
//# sourceMappingURL=index.js.map