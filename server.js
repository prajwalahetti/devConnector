const express=require('express');
const app=express();
const connectDB=require('./config/db');

connectDB();
app.get('/',(req,res)=>{
    res.send('API running');
});

// define routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/posts',require('./routes/api/posts'));
app.use('/api/profiles',require('./routes/api/profiles'));

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server started at ${PORT}`);
})