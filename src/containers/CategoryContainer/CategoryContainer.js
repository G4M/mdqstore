import React from 'react';

export default function Categorys() {

    const categorys = [
        {
            id: 1,
            name: "Malbec"
        }, {
            id: 2,
            name: "Chardonnay"
        }, {
            id: 3,
            name: "Pinot Noir"
        }, {
            id: 4,
            name: "Cabernet Franc"
        }, {
            id: 5,
            name: "Cabernet Sauvignon"
        }, {
            id: 6,
            name: "Tardio"
        }, {
            id: 7,
            name: "Rose"
        }, {
            id: 8,
            name: "Champagne"
        },
    ]

    return (
        <div className="container">
            <div className="row">
                {categorys.map((item, index) =>
                    <div key={index} className="col-3 mt-5 mb-5">
                        <h4>{item.name}</h4>
                    </div>)}
            </div>
        </div>
    );
}