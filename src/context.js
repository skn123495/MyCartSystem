import React, { Component } from 'react'
import {storeProducts,detailProduct} from './data';
const ProductContext = React.createContext();
//Whenever we use a createContext we get two things first is 
//Provider is provide all the information for all are application 
//Consumer 

class ProductProvider extends Component {
    state={
        products:[],
        detailProduct:detailProduct,
        cart:[],
        modelOpen:false,
        modelProduct:detailProduct,
        cartSubTotal:0,
        cartTax:0,
        cartTotal:0,
    };
    componentDidMount(){
        this.setProducts(); 
    }
    setProducts =( ()=>{
        let tempProducts =[];
        storeProducts.forEach( (item)=>{
            const singleItem ={...item};
            tempProducts = [...tempProducts,singleItem];
        })
        this.setState( ()=>{
            return {products:tempProducts}
        } )
    } )

    getItem = (id) =>{
        const product = this.state.products.find( item => item.id === id );
        return product;
    }

    handleDetail = (id) =>{
        const product =this.getItem(id);
        this.setState( () =>{
            return {detailProduct:product};
        });
    };
    addToCart = (id) =>{
        // console.log(`hello from add to cart .id is  ${id}`)
        let tempProducts =[...this.state.products];
        const index = tempProducts.indexOf(this.getItem(id));
        const product = tempProducts[index];
        product.inCart =true;
        product.count = 1;
        const price = product.price;
        product.total = price;
        this.setState( ()=>{
            return {products:tempProducts,cart:[...this.state.cart,product]};
        }, () =>{
            this.addTotals();
            })
    };
    openModel = (id) =>{
        const product =this.getItem(id);
        this.setState(()=>{
            return {modelProduct:product,modelOpen:true}
        })
    }
    
    closeModel =()=>{
        this.setState( ()=>{
            return {modelOpen:false}
        })
    }

    increment = (id)=>{
        // console.log('This is Increment Method');
        let tempCart= [...this.state.cart];
        const selectedProduct =tempCart.find(item => item.id == id)
        const index =tempCart.indexOf(selectedProduct);
        const product =tempCart[index];
        product.count =product.count +1;
        product.total = product.count * product.price;

        this.setState( ()=>{
            return{
                cart:[...tempCart]
            }
        },()=>{this.addTotals()})
    }

    decrement = (id) =>{
        // console.log('This is decrement Method');
        let tempCart= [...this.state.cart];
        const selectedProduct =tempCart.find(item => item.id == id)
        const index =tempCart.indexOf(selectedProduct);
        const product =tempCart[index];

        product.count = product.count -1;
        if(product.count == 0){
            this.removeItem(id)
        }else{
            product.total = product.count * product.price;
            this.setState( ()=>{
                return{
                    cart:[...tempCart]
                }
            },() => 
                {
                    this.addTotals()
                }
            );}
    }

    removeItem =(id) =>{
        // console.log('This is Item Rmoved Method');
        let tempProducts =[...this.state.products];
        let tempCart =[...this.state.cart];
        tempCart =tempCart.filter(item => item.id !==id);
        const index = tempProducts.indexOf(this.getItem(id));
        let removedProduct =tempProducts[index];
        removedProduct.inCart =false;
        removedProduct.count = 0;
        removedProduct.total = 0;

        this.setState( ()=>{
            return{
                cart:[...tempCart],
                products:[...tempProducts]
            }
        },()=>{
            this.addTotals();
        } )
    }

    clearCart = ()=>{
        // console.log('Cart Was Cleared');
        this.setState( ()=>{
            return{
                cart:[]
            };
        },() =>{
            this.setProducts();
            this.addTotals();
        });

    }
    addTotals = () =>{
        let subTotal = 0;
        this.state.cart.map(item =>(subTotal += item.total));
        const tempTax =subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2));
        const total =subTotal + tax
        this.setState(()=>{
            return{
                cartSubTotal:subTotal,
                cartTax:tax,
                cartTotal:total,
            }
        })
    }
    // tester = ()=>{
    //     console.log('State Products :',this.state.products[0].inCart);
    //     console.log('Data Products :',storeProducts[0].inCart);

    //     const tempProducts =[...this.state.products];
    //     tempProducts[0].inCart =true
    // this.setState( ()=>{
    //     return {products:tempProducts}
    // },()=>{
    //     console.log('State Products :',this.state.products[0].inCart);
    //     console.log('Data Products :',storeProducts[0].inCart);

    // })

    // }

    render() {
        return (
           <ProductContext.Provider value={{
               ...this.state,
               handleDetail:this.handleDetail,
               addToCart:this.addToCart,
               openModel:this.openModel,
               closeModel:this.closeModel,
               increment:this.increment,
               decrement:this.decrement,
               removeItem:this.removeItem,
               clearCart:this.clearCart,
           }}>
            <button onClick={this.tester}>Test ME</button>
               {this.props.children}
           </ProductContext.Provider>
        )
    }
}

const ProductConsumer = ProductContext.Consumer;

export {ProductProvider , ProductConsumer};