import asyncHandler from 'express-async-handler';
import {prisma} from '../config/prismaConfig.js';

const createResidency = asyncHandler(async(req,res)=>{
 const {title,
     description, 
     price, 
     address, 
     city, 
     country, 
     image, 
     facilites, 
     userEmail, 
    }= req.body.data;

 console.log(req.body.data);

 try {

    const residency =await prisma.residency.create({
        data: {
            title,
            description,
            price, 
            address, 
            city, 
            country, 
            image, 
            facilites, 
            owner : {connect : {email: userEmail}},
        },
    }); 

    res.send({message: "Resiency created sucessfully",
    residency});
    
 } catch (err) {
    if(err.code === "P2002")
    {
        throw new Error("A residency with address alreay there");
    }
    throw new Error(err.message);
 }

});

const getAllResidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany({
    orderBy: {
      createdAt:  'asc',
    },
  });
  res.send(residencies);
});

const getResidency = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    try {
        const residency =await prisma.residency.findUnique({
            where: {id},
        });
        res.send(residency);        
    } catch (err) {
        throw new Error(err.message);        
    }
});

export {createResidency, getAllResidencies, getResidency};