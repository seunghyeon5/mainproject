import mongoose from 'mongoose';

const url = "mongodb+srv://test:sparta@cluster0.l2ux3.mongodb.net/FIRST_HTTPS_PRAC?retryWrites=true&w=majority";


const connect = (): void => {
  mongoose
    .connect(url, {    
      ignoreUndefined: true,    
  }          
   ).catch((err) => {
      console.log(err);
    });
};



mongoose.connection.on("error", (err): void => {
  console.log("mongoDB connection error", err);
});

export { connect };