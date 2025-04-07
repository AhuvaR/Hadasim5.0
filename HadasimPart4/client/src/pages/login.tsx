

import React, { useState, useEffect } from 'react';
import { getData, getDataById } from '../fetch';
import { Navigate, Route, Routes } from 'react-router';
import './login.css';
import { Product } from '../models/productModel';

type Supplier = {
    supplier_id: number
    company_name: string
    company_code: string
    phone_number: string
    supplier_name: string
};
type TempararyProduct={
    product_id: string
    supplier_id :string
    product_name:string
    product_price :string
    minimum_items_for_order:string
}


const Login = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [supplier, setSupplier] = useState<Supplier>()

    const [company, setCompany] = useState("")
    const [password, setPassword] = useState("")
    const [suplierName, setsSuplierName] = useState("")
    const [phone, setPhone] = useState("")

    const [nameError, setNameError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const [goTorders, setGoToOrder] = useState(false)
    const [productArray, setProductArray] = useState<TempararyProduct[]>([{ product_id: '', supplier_id: '', product_name: '', product_price: '', minimum_items_for_order: '' }])
    if (goTorders) {
        return <Navigate to="/orders" />
    }


    const onButtonClick = () => {
        setNameError("")
        setPasswordError("")

        if ("" === company) {
            setNameError("אנא הכנס את שם החברה")
            return
        }

        if ("" === password) {
            setPasswordError("אנא הכנס סיסמא")
            return
        }
        if (password.length < 4) {
            setPasswordError("סיסמא צריכה להיות 4 תווים או יותר")
            return
        }
        getDataById("login", password)
            .then((data) => {
                if (data.length == 0) {
                    alert('סיסמא לא נכונה')
                }
                else {
                    setSupplier({
                        supplier_id: data[0]?.supplier_id,
                        company_name: data[0]?.company_name,
                        company_code: data[0]?.company_code,
                        phone_number: data[0]?.phone_number,
                        supplier_name: data[0]?.supplier_name
                    });
                    //setSupplier(JSON.parse(data));
                    console.log('data' + JSON.stringify(data))
                    // setSupplier(data[0])
                    console.log(supplier?.company_name)
                    console.log(company)
                }
            })

        if (supplier?.company_name == company) {
            console.log("got in!!" + supplier.company_name);
            setGoToOrder(true)
            return (<Navigate to="/orders" />)
        }


    }

    const onNewSupplier = () => {
        setIsOpen(true)
    }
    const onProduct = () => {
        setProductArray([...productArray, { product_id:'', supplier_id: '', product_name: '', product_price: '', minimum_items_for_order: ''}])
    }
    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let i:Number=index
        let name=ev.target.name
        let value =ev.target.value
        let changVal: TempararyProduct[] = [...productArray]
        changVal[index]  [name]=String(value) 
        setProductArray(changVal)

    }
    const deleteProduct = (i: number) => {
        const deleteProduct = [...productArray]
        deleteProduct.splice(i, 1)
        setProductArray(deleteProduct)
    }

    return (
        <>
            {!isOpen && <div className="login-box">
                <h2>כניסה</h2>
                <form>
                    <div className="user-box">
                        <input
                            value={company}
                            placeholder='הכנס שם חברה'
                            onChange={ev => setCompany(ev.target.value)}
                            className={"user-box"}

                        />

                        <label className='errorLabel'>{nameError}</label>
                    </div>
                    <div className="user-box">
                        <input
                            value={password}
                            placeholder='הכנס סיסמא'
                            onChange={ev => setPassword(ev.target.value)}
                            className={'user-box'}

                        />
                        <label className='errorLabel'>{passwordError}</label>
                    </div>
                    <input onClick={onButtonClick}
                        className={"inputButton"}
                        type="button"
                        value={"אישור"}
                    />
                </form>
                <h5 onClick={onNewSupplier} className="newSipplier">ספק חדש</h5>
            </div>}
            {isOpen && <div className="sighnUp-box">
                <div>
                    <button className="backButton" onClick={() => setIsOpen(false)}>חזרה לכניסה</button>
                    <h2>הכנס פרטים</h2></div>
                <form>
                    <div className="user-box">
                        <input
                            value={company}
                            placeholder='הכנס שם חברה'
                            onChange={ev => setCompany(ev.target.value)}
                            className={"user-box"}

                        />

                        <label className='errorLabel'>{nameError}</label>
                    </div>
                    <div className="user-box">
                        <input
                            value={phone}
                            placeholder='הכנס מס טלפון '
                            onChange={ev => setPhone(ev.target.value)}
                            className={"user-box"}

                        />

                        <label className='errorLabel'>{nameError}</label>
                    </div>
                    <div className="user-box">
                        <input
                            value={suplierName}
                            placeholder='הכנס שם נציג'
                            onChange={ev => setsSuplierName(ev.target.value)}
                            className={"user-box"}

                        />

                        <label className='errorLabel'>{nameError}</label>
                    </div>
                    <div className="user-box">
                        <input
                            value={password}
                            placeholder='הכנס סיסמא'
                            onChange={ev => setPassword(ev.target.value)}
                            className={'user-box'}

                        />
                        <label className='errorLabel'>{passwordError}</label>
                    </div>
                    <div className="user-box">
                        {
                            productArray.map((val, i) =>
                                <div>
                                    <input
                                        name='productName'
                                        value={val.product_name}
                                        placeholder='הכנס שם מוצר'
                                        onChange={(ev) => handleChange(ev, i)}
                                        className={'product-box'}

                                    />
                                    <input
                                        name='productPrice'
                                        value={val.product_price}
                                        placeholder='הכנס מחיר לפריט'
                                        onChange={(ev) => handleChange(ev, i)}
                                        className={'product-box'}

                                    />
                                    <input
                                        type='number'
                                        name='miniAmount'
                                        value={val.minimum_items_for_order}
                                        placeholder='הכנס כמות מינימלית לרכישה '
                                        onChange={(ev) => handleChange(ev, i)}
                                        className={'product-box'}

                                    />
                                    <button onClick={() => deleteProduct(i)} type="button" className='deleteButton'>מחק</button>
                                </div>

                            )
                        }

                        <button onClick={onProduct} type="button" className='backButton'>מוצר נוסף</button>

                    </div>
                    <input onClick={onButtonClick}
                        className={"inputButton"}
                        type="button"
                        value={"אישור"}
                    />
                </form>

            </div>}

        </>
    );
}

export default Login;
