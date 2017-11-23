const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/nodeappdatabase', {
    useMongoClient: true
});

const userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    created_at: Date,
    updated_at: Date
});


userSchema.methods.manify = function(next) {
    this.name = this.name + '-boy';

    return next(null, this.name);
};

userSchema.pre('save', function(next) {
    const currentDate = new Date();

    this.updated_at = currentDate;

    if(!this.created_at) {
        this.created_at = currentDate;
    }
    next();
});

const User = mongoose.model('User', userSchema);

// const query = User.find({name:  /man/});
// // const query = User.findOneAndUpdate({name: /Benny/}, {username: "benny-the-hero"});

// const promise = query.exec();

// promise.then((records)=> {
//     console.log('====================================');
//     console.log(`Actual database records are:${records}`);
//     console.log('====================================');
// });
// promise.catch(reason => {
//     console.log(`Something went wrong: ${reason}`);
    
// });


const updateUserPassword = (name, newPassword) => {
    User.find({username: name})
        .then((user) => {
            if (!user) {
                console.log("no mathes result");
            }
            else {
                console.log(`Old password is ${user.password}`);
                console.log(`Name : ${user.name}`);
                user.password = newPassword;
                console.log(`New password is ${user.password}`);
                return user.save( (err) => {
                    if (err) throw err;
    
                    console.log(`User ${user.name} was succesful updated!`);
                    
                })
            }
        })
        .catch((error) => {
            
            console.log('ups!! ' + error);
            
        })
} 

updateUserPassword(/enny/,'qwertyk');




// promise.then((records)=> {
//     console.log('====================================');
//     console.log(`Actual database records are:${records}`);
//     console.log('====================================');
// });
// promise.catch(reason => {
//     console.log(`Something went wrong: ${reason}`);
    
// });


// User.find({} , (err, res) => {
//     if (err) throw err;
//     console.log('====================================');
//     console.log(`Actual database records are ${res}`);
//     console.log('====================================');
// });




// const kenny = new User({
//     name: 'Kenny',
//     username: 'Kenny_the_boy',
//     password: 'password'
// });

// kenny.manify(function(err, name){
//     if (err) throw err;
//     console.log(`Your name is: ${name}`);
// });

// kenny.save((err) => {
//     if(err) throw err;
//     console.log(`User ${kenny.name} saved!`);
// });

// const benny = new User({
//     name: 'Benny',
//     username: 'Benny_the_boy',
//     password: 'password'
// });

// benny.manify(function(err, name) {
//     if (err) throw err;
//     console.log(`Your name is: ${benny.name}`);
// });

// benny.save(function(err) {
//     if (err) throw err;

//     console.log(`User ${benny.name} saved!`);
// });

// const mark = new User({
//     name: 'Mark',
//     username: 'Mark_the_boy',
//     password: 'password'
// });

// mark.manify(function(err, name) {
//     if (err) throw err;
//     console.log(`Your name is: ${mark.name}`);
// });

// mark.save(function(err) {
//     if (err) throw err;

//     console.log(`User ${mark.name} saved!`);
// });




