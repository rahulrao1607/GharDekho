import express from 'express';
import {allFav, bookVisit, cancelBooking, createUser, getAllBokkings, toFav} from '../controller/userController.js'


const router = express.Router();

router.post("/register",createUser);
router.post("/bookVist/:id",bookVisit);
router.post("/allbookings",getAllBokkings);
router.post("/cancelBooking/:id",cancelBooking);
router.post("/toFav/:rid",toFav);
router.post("/allFav/",allFav);

export {router as userRoute};

