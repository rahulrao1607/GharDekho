import asyncHandler from 'express-async-handler';
import { prisma } from '../config/prismaConfig.js';


const createUser = asyncHandler(async(req,res)=>{

    console.log("createing user ");
    let {email} =req.body;
    const userExists =await prisma.user.findUnique({where: {email: email} });
    if(!userExists)
    {
        const user =await prisma.user.create({data: req.body});
        res.send({
            message: "user registed sucessfully ",
            user: user,
        });
    }else{
        res.status(201).send({message: "User already registered"});
    }


});

const bookVisit =asyncHandler(async(req,res)=>{
    const {email,date}=req.body;
    const {id}=req.params;

    try {
        const alreadyBooked =await prisma.user.findUnique({
            where: {email},
            select: {bookedVisits: true}
        });

        if(alreadyBooked.bookedVisits.some((visit)=> visit.id === id))
        {
            res.status(400).json({message: "this residency is already booke by you eariler"});
        }
        else{
            await prisma.user.update({
                where: {email: email},
                data:{
                    bookedVisits: {push: {id, date}}
                }
            });
            res.send("your visit is booked sucessfully");
        }
        
    } catch (err) {
        throw new Error(err.message);
        
    }

});

const getAllBokkings=asyncHandler(async(req,res)=>{

    const {email}=req.body;

    try {
        const booking =await prisma.user.findUnique({
            where: {email},
            select: {bookedVisits: true}
        });
        res.status(200).send(booking);        
    } catch (err) {
        throw new Error(err.message);        
    }
});

//function to cancel the booking

const cancelBooking =asyncHandler(async(req,res)=>{
    const {email} =req.body;
    const {id} =req.params;
    try {
        const user =await prisma.user.findUnique({
            where: {email: email},
            select: {bookedVisits: true}
        });
        const index= user.bookedVisits.findIndex((visit)=> visit.id === id)
        if(index==-1)
        {
            res.status(404).json({message: "booking not found"});
        }else{
            user.bookedVisits.splice(index,1);
            await prisma.user.update({
                where: {email},
                data: {
                    bookedVisits: user.bookedVisits
                }
            });

            res.send("booking cancelle sucessfully");
        }        
    } catch (err) {
        throw new Error(err.message);        
    }
});

// add property in fav

const toFav =asyncHandler(async(req,res)=>{
    const {email} =  req.body;
    const {rid}=req.params;

    try {
        const user =await prisma.user.findUnique({
            where: {email}
        });
        if(user.favResidenciesID.includes(rid)){
            const updateUser = await prisma.user.update({
                where: {email}, 
                data:{
                    favResidenciesID:{
                        set: user.favResidenciesID.filter((id)=> id !== rid)
                    }
                }
            });
            res.send({message:"removed from favourties", user: updateUser});
        }else{
            const updateUser = await prisma.user.update({
                where: {email}, 
                data:{
                    favResidenciesID:{
                        push: rid
                    }
                }
            });
            res.send({message:"added to favourties", user: updateUser});       
        }        
    } catch (err) {
        throw new Error(err.message);        
    }

});

//list of all favourites

const allFav = asyncHandler(async(req,res)=>{
    const {email} =req.body;
    try {
        const favRead = await prisma.user.findUnique({
            where: {email},
            select : {favResidenciesID: true},
        });
        res.status(200).send(favRead);        
    } catch (err) {
        throw new Error(err.message);        
    }

});


export {createUser, bookVisit, getAllBokkings, cancelBooking, toFav, allFav};
