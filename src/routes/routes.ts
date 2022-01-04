// require the express module
import express, { json } from "express";
import ShoppingCart from "../models/shoppingCart";
// create a new Router object
const cart = express.Router();

const array:ShoppingCart[] = [ //JSON array of all cart items
    {
        id: 1,
        product: "Tacos",
        price: 5,
        quantity: 3
    },
    {
        id: 2,
        product: "Fried Rice",
        price: 10,
        quantity: 4
    },
    {
        id: 3,
        product: "Fairlife Protein Shakes",
        price: 3,
        quantity: 10 
    },
    {
        id: 4,
        product: "Oatly Fat Free",
        price: 55,
        quantity: 2
    }
]




//cart.get("/", (req , res) =>{
   // res.json(array) //Returns an array of all cart items
//})

cart.get("/", (req, res) =>{
    let maxPrice = parseInt(req.query.maxPrice as string) //request.?.priceWePut(50) as string
    let prefix = (req.query.prefix as string)
    let pageSize = parseInt(req.query.pageSize as string)

    if(maxPrice){
     let filterPrice: ShoppingCart[] =  array.filter((item)=> item.price <= maxPrice); 
     res.json(filterPrice);

    } else if(prefix){ //only include products that start with the given string in response array
     let filterPrefix:ShoppingCart[] =  array.filter((item) => 
     item.product.toLowerCase().startsWith(prefix));
    res.json(filterPrefix);

    } else if(pageSize){ // only includes the number of items requested
        let filterPageSize: ShoppingCart[] = array.filter((item,index)=> 
        index <= pageSize - 1);
        res.json(filterPageSize);
    } 
    
    else{
        res.json(array);
    }
 
});

cart.get("/:id", (req, res) => {
    array.filter((item) => {
     if (item.id === parseInt(req.params.id)) {
      res.json(item);
      res.status(200);
     } else {
      res.status(404);
      res.send("ID Not Found");
     }
    });
   });
    // for(let i = 0; i<array.length; i++){
    //     if(array[i].id === parseInt(req.params.id)){
    //         res.json(array[i].product);
    //         res.status(200);
            
    //     }
    //     else{
    //         res.json("ID Not Found")
    //         res.status(404);
    //     }
    // }
let nextID: number = 5; 
cart.post("/", (req,res)=>{ //Give data a part of the body, ID is determined
    let newItem:ShoppingCart = req.body;
    newItem.id = nextID;
    nextID++;
    array.push(newItem); 
    res.status(201);
    res.json(array);
})

cart.put("/:id", (req,res)=>{
    array.forEach((item) =>{
        if(item.id === parseInt(req.params.id)){
            item.price = 1000;
            res.json(array)
            res.status(200);
        }
    })
})

cart.delete("/:id", (req,res) =>{
    let itemIndex:number = array.findIndex((item) =>{
        item.id === parseInt(req.params.id);
    })
    array.splice(itemIndex, 1);
    res.status(204);
    res.json(array);
})



export default cart;