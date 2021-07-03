import produce from 'immer';

import { useState, useEffect, useReducer } from 'react';
import products from '../data';

function Products() {


    function productsReducer(state, action) {
        console.log("testing reducer..");
        switch (action.type) {
            case 'SORT':
                return { ...state, sortBy: action.payload }
            case 'TOGGLE_SIZE':
                console.log("filtering")
                return { ...state, showBySize: action.payload }
            default:
                return state;
        }

    }

    const [{ sortBy, showBySize }, dispatch] = useReducer(productsReducer, {
        sortBy: null,
        showBySize: "",
    })


    function getSortedData(products, sortBy) {

        if (sortBy === "HIGH_TO_LOW") {
            return products.sort((a, b) => b["price"] - a["price"]);
        }
        if (sortBy === "LOW_T0_HIGH") {
            console.log("Prices low to high")
            return products.sort((a, b) => a["price"] - b["price"]);
        }
        return products;
    }

    function getFilteredData(products, filter) {
        console.log("filter by size")
        console.log(products)
        if (filter === "") return products
        else return products.filter((item) => item.size === filter)

    }
    const sortedData = getSortedData(products, sortBy)

    const filteredData = getFilteredData(sortedData, showBySize)
    console.log("filtered data", filteredData)

    const finalData = filteredData
    console.log("Final Dtata", finalData)
    return (
        <div>
            <h1>Products</h1>
            <fieldset>
                <p className="filter-heading">Sort By</p>
                <label>
                    <input
                        type="radio"
                        name="sort"
                        onChange={() => dispatch({ type: "SORT", payload: "HIGH_TO_LOW" })}
                        checked={sortBy === "HIGH_TO_LOW"}
                    />
                    Price High to Low
                </label>
                <label>
                    <input
                        type="radio"
                        name="sort"
                        onChange={() => dispatch({ type: "SORT", payload: "LOW_T0_HIGH" })}
                        checked={sortBy === "LOW_T0_HIGH"}
                    />
                    Price Low to High
                </label>
            </fieldset>
            {/*  */}
            <fieldset>
                <label>
                    <h3>Sizes</h3>
                    <input
                        type="checkbox"
                        checked={showBySize}
                        onChange={() => dispatch({ type: "TOGGLE_SIZE", payload: "S" })}
                    />
                    S
                </label>

                <label>
                    <input
                        type="checkbox"
                        checked={showBySize}
                        onChange={() => dispatch({ type: "TOGGLE_SIZE", payload: "M" })}
                    />
                    M
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={showBySize}
                        onChange={() => dispatch({ type: "TOGGLE_SIZE", payload: "L" })}
                    />
                    L
                </label> <label>
                    <input
                        type="checkbox"
                        checked={showBySize}
                        onChange={() => dispatch({ type: "TOGGLE_SIZE", payload: "XL" })}
                    />
                    XL
                </label>
                <button onClick={() => dispatch({ type: "TOGGLE_SIZE", payload: "" })}>Clear Filters</button>
            </fieldset>



            <div style={{ display: "flex", flexWrap: "wrap", marginLeft: "10rem", marginRight: "10rem", flexDirection: "row", border: "1px solid red" }}>
                {
                    finalData.map(({ id, name, price, brand, idealFor, size }) => {
                        return (
                            <div className="card-content" >
                                <img src="https://picsum.photos/id/237/200/200" alt="" />
                                <h2>{name}</h2>
                                <p>{price}</p>
                                <p>{brand}</p>
                                <p>{idealFor}</p>
                                <p>{size}</p>
                                <button class="btn btn-primary">Add To Cart</button>

                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}

export default Products
