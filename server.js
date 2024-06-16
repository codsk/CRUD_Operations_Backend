let express=require('express');
let mongoose=require('mongoose');
let Product=require('./models/products')
let app=express();

app.use(express.json());//middle ware we can able to json data
app.use(express.urlencoded({extended:false})); //middle ware we can able to send form-encoded data

app.get('/',(req,res)=>{
  res.send("hello")
})

app.post('/api/products/create',async (req,res)=>{
  try{
      const product = await Product.create(req.body)  //create the collectins
      res.status(200).json(product);
  }catch(error){
    res.status(500).json({message:error.message})
  }
  // console.log(req.body)
  // res.send(req.body) //in post method it wont replicate in webpage
})

app.get('/api/products/findAll', async (req,res)=>{
  try{
    const products = await Product.find({});
    res.status(200).json(products)
  }catch(error){
    res.send(500).json({message:error.message})
  }
})

app.get('/api/product/getById/:id', async (req,res)=>{
  try{
    const {id}=req.params;
    const productsAll= await Product.findById(id);
    res.status(200).json(productsAll);
  }catch(error){
    res.send(500).json({message:error.message})
  }
})

// update a product
app.put('/api/product/update/:id',async (req,res)=>{
  try{
     const {id}=req.params;
     const product=await Product.findByIdAndUpdate(id,req.body)
     if (!product){
      return res.status(404).json({message:"product not found"})
     }
     const updateProduct=await Product.findById(id);
     res.status(200).json(updateProduct);
  }catch(error){
    res.send(500).json({message:error.message})
  }
})

// delete a product
app.delete('/api/product/delete/:id',async (req,res)=>{
  try{
    const {id}=req.params;
    const product=await Product.findByIdAndDelete(id);
    if (!product){
      res.status(404).json({message:"product not found"})
    }
    res.send(200).json({message:"product delete successfully"});
  }catch(error){
    res.send(500).json({message:error.message})
  }
})





mongoose.connect("mongodb://127.0.0.1:27017/curd")
.then(()=>{
  console.log("connected to database")
  app.listen(7000,()=>{
    console.log("server is running at 7000...")
  })
})
.catch(()=>{
  console.log("connection failed")
})



