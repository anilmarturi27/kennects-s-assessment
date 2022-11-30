const express=require('express')
const mongoose=require('mongoose')
const Registeruser=require('./model')
const middleware=require('./middleware')
const bodyparser=require("body-parser")
const jwt = require('jsonwebtoken')
const cors = require('cors')
const app =express()

// app.use(express.json())
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(cors({origin :"*"}))

mongoose.connect("mongodb+srv://anilk:anilk@cluster0.c9fobl3.mongodb.net/?retryWrites=true&w=majority").then(console.log("db connected..."))
app.post('/register',async(req,res)=>{
    try{
        const{username,email,phno,password,confirmpassword}=req.body
        let exist= await Registeruser.findOne({email})
        if(exist){
            return res.send('user already registered')
        }
        if(password !== confirmpassword){
            return res.send('passwords are in correct')
        }
        let newuser= new Registeruser({
            username,email,phno,password,confirmpassword
        })
        await newuser.save()
        return res.send('user registered successfully')

    }
    catch(err){
        console.log(err)
    }
})

app.post('/login',async (req,res)=>{
    try{
        const{email,password}=req.body
        let exist=await Registeruser.findOne({email})
        if(!exist){
            return res.send("user not registered")
        }
        if(exist.password !== password){
            return res.send("inncorrect passwords")
        }

        let payload={
            anil :{
                id: exist.id
            }
        }
        jwt.sign(payload,"loginkey",{expiresIn:3600},(err,token)=>{
            if(err) throw err
            return res.json({token})
        })

    }
    catch(err){
        console.log(err)
    }
})

app.get('/myprofile',middleware,async(req,res)=>{
    try{
        let exist = await Registeruser.findById(req.anil.id)
        if(!exist){
            return res.send("user not found")
        }
        res.json(exist)
    }
    catch(err){
        console.log(err)
    }


})

app.listen(5000,()=>{
    console.log("server running...")
})
