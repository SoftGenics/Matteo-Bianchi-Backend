const color = require('../models/color')

const Addcolor=async(req,res)=>{
    console.log('INFO -> Addcolor INFO API CALLED')

    const { colorname,colorcode} = req.body;

    try{

        const addcolor=await color.create({
            color_name:colorname,
            color_code:colorcode
        })
      return res.json(addcolor);

    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Error creating color and linking products' });
    }
}
module.exports={
    Addcolor
}