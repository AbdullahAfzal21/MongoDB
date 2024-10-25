const mongoose = require("mongoose");


async function Connection() {
    try {
        await mongoose.connect("mongodb://localhost:27017/First", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Yes, it is connected");
    } catch (arr) {
        console.log("It's not connecting", arr);
    }
}
Connection();


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    password: String
});

const User = mongoose.model("User", UserSchema);

//  Create  user
User.create({ name: "Ali", password: "ali12" })
    .then(result => console.log("User created:", result))
    .catch(err => console.error("Error creating user:", err));

// Read all users
User.find({})
    .then(users => console.log("All Users:", users))
    .catch(err => console.error("Error fetching users:", err));

// user by name
User.findOne({ name: "Ali" })
    .then(user => {
        if (user) {
            console.log("User found:", user);
        } else {
            console.log("No user found with the name Ali");
        }
    })
    .catch(err => console.error("Error fetching user:", err));

//  Update user password
User.updateOne({ name: "Ali" }, { password: "newpassword123" })
    .then(result => {
        if (result.modifiedCount > 0) {
            console.log("User password updated for: Ali");
        } else {
            console.log("No user found with the name Ali to update");
        }
    })
    .catch(err => console.error("Error updating user:", err));

//  Replace user document
User.replaceOne({ name: "Hassan" }, { name: "Hassan", password: "newpassword" })
    .then(result => {
        if (result.modifiedCount > 0) {
            console.log("User document replaced for: Hassan");
        } else {
            console.log("No user found with the name Hassan to replace");
        }
    })
    .catch(errr => console.error("Error replacing user:", errr));

//  Delete users by name
User.deleteMany({ name: "Hassan" })
    .then(result => {
        console.log(`${result.deletedCount} user(s) deleted with the name "Hassan"`);
        mongoose.connection.close(); // Connection close after operation
    })
    .catch(err => console.error("Error deleting user:", err));
