const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.use(express.static(publicDirectoryPath))

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Home Page',
        name:'Sayantan'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name: 'Sayantan',
        title:'About Page'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        name: 'Rijh',
        title:'Help Page'
    })
})

app.get('/weather',(req,res)=>{

    const location = req.query.location
    if(!location){
        return res.send({
            error:'Please provide a location'
        })
    }

    geocode(location,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        } 
        forecast(latitude,longitude,(error,{currentTemp,currentFeels})=>{
            if(error){
                return res.send({error}) 
            }
            res.send({
                location,
                currentFeels,
                currentTemp
            })
        })
        
    })
 })
    
app.get('/help/*',(req,res)=>{
    res.render('error',{
        name:'Sayantan',
        title:'Error Page',
        message:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        name:'Sayantan',
        title:'Error Page',
        message:'Page not found'
    })
})
app.listen(3000,()=>{
    console.log("server up and running at port 3000");
})