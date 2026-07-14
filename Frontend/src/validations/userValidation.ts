import {z} from "zod";

export  const userValidation = z.object({
    firstName:z.string().trim().min(3,{message:"First Name must be at least 3 characters long"}),
    lastName:z.string().trim().min(3,{message:"Last Name must be at least 3 characters long"}),
    email:z.string().email({message:"Invalid Email Address"}),
    experience: z.number().min(0,{message:"Experience must be a positive number"}),
    technology:z.string().trim().min(1,{message:"Technology is required"}),
    photo:z.instanceof(File,{message:"Photo is required"}),
    cv:z.instanceof(File,{message:"CV is required"})
})
