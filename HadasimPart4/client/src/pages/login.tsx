

import React, { useState, useEffect } from 'react';
import { getData, getDataById, postNewObject } from '../fetch';
import { Navigate, Route, Routes, useNavigate, useNavigation } from 'react-router';
import './login.css';

type Supplier = {
    company_name: string
    company_code: string
    phone_number: string
    supplier_name: string
};

type TempararyProduct = {
    product_id: number
    supplier_id: string
    product_name: string
    product_price: string
    minimum_items_for_order: string
}


const Login = () => {
    const navigate = useNavigate();


    const [isOpen, setIsOpen] = useState(false);

    const [supplier, setSupplier] = useState<Supplier>()
    const [supplierToPost, setSupplierToPost] = useState<Supplier>()
    const [supplierId, setSupplierId] = useState()

    const [company, setCompany] = useState("")
    const [password, setPassword] = useState("")
    const [suplierName, setsSuplierName] = useState("")
    const [phone, setPhone] = useState("")

    const [nameError, setNameError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const [goTorders, setGoToOrder] = useState(false)
    const [productArray, setProductArray] = useState<TempararyProduct[]>([{ product_id: 0, supplier_id: '', product_name: '', product_price: '', minimum_items_for_order: '' }])

    useEffect(() => {

        if (supplier?.company_name == company) {
            navigate(`/orders/${supplierId}`)
        }
        else if (supplierId !== undefined) {
            productArray.map((product) =>
                product.supplier_id = supplierId
            )
            postNewObject("products", productArray)
                .then(data => {
                    console.log(data)
                })
            navigate(`/orders/${supplierId}`)
        }
    }, [supplier, supplierId]);

    useEffect(
        () => {
            if (supplierToPost !== undefined)
                postNewObject("suppliers", supplierToPost)
                    .then(data => {
                        setSupplierId(data[0].supplier_id)
                    })
        }, [supplierToPost]);

    const validationCheck = () => {
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
        return true;
    }

    const onSubmit = () => {
        const ans = validationCheck();
        if (ans === true) {
            getDataById("suppliers", password)
                .then((data) => {
                    if (data.length == 0) {
                        alert('סיסמא לא נכונה')
                    }
                    else {
                        setSupplier({
                            // supplier_id: data[0]?.supplier_id,
                            company_name: data[0]?.company_name,
                            company_code: data[0]?.company_code,
                            phone_number: data[0]?.phone_number,
                            supplier_name: data[0]?.supplier_name
                        });
                        setSupplierId(data[0]?.supplier_id)
                    }
                })
        }

    }

    const postNewSupplier = () => {
        const ans = validationCheck();
        if (ans === true) {
            setSupplierToPost({
                company_name: company,
                company_code: password,
                phone_number: phone,
                supplier_name: suplierName
            })
        }
    }

    const onNewSupplier = () => {
        setIsOpen(true)
    }

    const onProduct = () => {
        setProductArray([...productArray, { product_id: 1, supplier_id: '', product_name: '', product_price: '', minimum_items_for_order: '' }])
    }

    const handleChange = (id: number, feild: keyof TempararyProduct, value: string) => {

        setProductArray((prevArray) =>
            prevArray.map((product) =>
                product.product_id === id ?
                    { ...product, [feild]: value }
                    : product
            )
        )

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
                    <input onClick={onSubmit}
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
                                <div key={val.product_id = i}>
                                    <input
                                        name='product_name'
                                        value={val.product_name}
                                        placeholder='הכנס שם מוצר'
                                        onChange={(ev) => handleChange(val.product_id, 'product_name', ev.target.value)}
                                        className={'product-box'}
                                    />
                                    <input
                                        name='product_price'
                                        value={val.product_price}
                                        placeholder='הכנס מחיר לפריט'
                                        onChange={(ev) => handleChange(val.product_id, 'product_price', ev.target.value)}
                                        className={'product-box'}

                                    />
                                    <input
                                        type='number'
                                        name='minimum_items_for_order'
                                        value={val.minimum_items_for_order}
                                        placeholder='הכנס כמות מינימלית לרכישה '
                                        onChange={(ev) => handleChange(val.product_id, 'minimum_items_for_order', ev.target.value)}
                                        className={'product-box'}

                                    />
                                    <button onClick={() => deleteProduct(i)} type="button" className='deleteButton'>מחק</button>
                                </div>

                            )
                        }

                        <button onClick={onProduct} type="button" className='backButton'>מוצר נוסף</button>

                    </div>
                    <input onClick={postNewSupplier}
                        className={"inputButton"}
                        type="button"
                        value={"אישור"}
                    />
                </form>
                {JSON.stringify(productArray)}
            </div>}

        </>
    );
}

export default Login;
