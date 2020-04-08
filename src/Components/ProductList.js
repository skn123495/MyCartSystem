import React, { Component } from 'react';
import Product from "./Product";
import Title from './Title';
// import {storeProducts} from '../data';this is to
import {ProductConsumer} from '../context';
export default class ProductList extends Component {
    // state={
    //     products:storeProducts
    // } now we dont not need it because we dont do consol.log
    render() {
        return (
            <React.Fragment>
                <div className="py-5">
                    <div className="container">
                        <Title  name="our" title="products"/>
                        <div className="row">
                            <ProductConsumer>
                                {(value) => {
                                    return  value.products.map( (product)=>{
                                        return <Product key={product.id} product={product} />;
                                    })
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                </div>
            </React.Fragment> 
        )
    }
}
