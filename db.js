const mongoose=require('mongoose');
const mongoURI = 'mongodb+srv://aromal21ubc122:VaXgUlvm5GFWAxUY@ac-cwb6ygz.icdrjtj.mongodb.net/gofood?retryWrites=true&w=majority';
//const mongoURI = 'mongodb://aromal21ubc122:VaXgUlvm5GFWAxUY@ac-cwb6ygz-shard-00-00.icdrjtj.mongodb.net:27017,ac-cwb6ygz-shard-00-01.icdrjtj.mongodb.net:27017,ac-cwb6ygz-shard-00-02.icdrjtj.mongodb.net:27017/gofoodssl=true&replicaSet=atlas-137lfg-shard-0&authSource=admin&retryWrites=true&w=majority';


const mongoDB =async() =>{
    // mongoose.connect(mongoURI,()=>{
    //     console.log("connected");
    // });

    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async() => {
    console.log('Connected to MongoDB');
    const fetched_data=await mongoose.connection.db.collection("food_item")
    fetched_data.find({}).toArray(function(err,data){
        if(err)console.log(err);
        else console.log();
    })
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  })
}

module.exports = mongoDB;


