import React, { useState } from 'react';
import { Card, CardImg, Form, FormGroup, Input, Dropdown, DropdownToggle, DropdownMenu, Label, Button} from 'reactstrap';
import axios from 'axios';
import * as yup from 'yup'

const OrderForm = () => {
    const [dropdownOpen, setDropdownOpen] =useState(false);
    const [formData, setFormData] = useState({
        name: "",
        size: "Pizza Size",
        sauce: "",
        pepperoni: false,
        beef: false,
        sausage: false,
        spicyitaliansausage: false,
        blackolives: false,
        special: ''
    });

    const schema = yup.object().shape({
        name: yup.string().required().min(2),
        size: yup.string().required(),
        sauce: yup.string().required()
    });

    const submit = () => {
        schema.validate(formData).then(() => {
            axios.post('https://reqres.in/api/users', formData).then( (res) => {
            console.log('This is your posted data', res.data)
            })
        }) 
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }
    const handleToppings = (e) => {
        setFormData({...formData, [e.target.value] : e.target.checked})
    }   
    const toggle = () => setDropdownOpen((prevState)=> !prevState)
    return (
        <div>
            <Card color='info'>
                <h2 style={{color: 'white', margin: '0 auto'}}>
                    Create Your Own Pizza!
                </h2>
            
            </Card>
            <Form data-cy="submit" onSubmit={(e) => {
                e.preventDefault()
                submit()
                console.log(formData)
            }} style={{ margin: '5%'}}>
                <FormGroup>
                    <legend>Name</legend>
                    <Input type='name' name='name' value={formData.name} data-cy='name' onChange={handleChange}></Input>
                </FormGroup>
                <FormGroup>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>
                        {formData.size}
                    </DropdownToggle>
                    <DropdownMenu>
                        <div onClick={() => {
                            toggle();
                            setFormData({...formData, size: 'Small'})
                        }}>Small</div>
                        <div onClick={() => {
                            toggle();
                            setFormData({...formData, size: 'Medium'})
                        }}>Medium</div>
                        <div onClick={() => {
                            toggle();
                            setFormData({...formData, size: 'Large'})
                        }}>Large</div>
                        <div onClick={() => {
                            toggle();
                            setFormData({...formData, size: 'X-Large'})
                        }}>X-Large</div>
                        <div onClick={() => {
                            toggle();
                            setFormData({...formData, size: 'XX'})
                        }}>XX-Large</div>
                    </DropdownMenu>
                    </Dropdown>
                </FormGroup>
                <FormGroup tag='fieldset'>
                    <legend>Sauce</legend>
                <FormGroup check>
                    <Label check>
                        <Input type='radio' name='sauce' value='original red' onChange={handleChange}/>
                            Original Red
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type='radio' name='sauce' value='Garlic Ranch' onChange={handleChange}/>
                            Garlic Ranch
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type='radio' name='sauce' value='BBQ Sauce' onChange={handleChange}/>
                            BBQ Sauce
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type='radio' name='sauce' value='Spinach Alfredo' onChange={handleChange}/>
                            Spinach Alfredo
                    </Label>
                </FormGroup>
                </FormGroup>


                <FormGroup tag='fieldset'>
                    <legend>Toppings</legend>
                <FormGroup check>
                    <Label check>
                        <Input type='checkbox' name='toppings' data-cy='checkbox1' value='pepperoni' checked={formData.pepperoni} onChange={handleToppings} />
                            Pepperoni
                    </Label>
                </FormGroup>

                <FormGroup check>
                    <Label check>
                        <Input type='checkbox' name='toppings' data-cy='checkbox2' value='beef' checked={formData.beef} onChange={handleToppings}/>
                            Beef
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type='checkbox' name='toppings' value='sausage' data-cy='checkbox3' checked={formData.sausage} onChange={handleToppings} />
                            Sausage
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type='checkbox' name='toppings' value='spicyitaliansausage' data-cy='checkbox4' checked={formData.spicyitaliansausage} onChange={handleToppings}/>
                            Spicy Italian Sausage
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type='checkbox' name='toppings' value='blackolives' data-cy='checkbox5' checked={formData.blackolives} onChange={handleToppings}/>
                            Black Olives
                    </Label>
                </FormGroup>
                </FormGroup>
                <FormGroup>
                    <legend>Special Instructions</legend>
                    <Input type="textarea" name='special' value={formData.special} onChange={handleChange}/>
                </FormGroup>
                <Button>Submit</Button>
            </Form>
        </div>

    );
};

export default OrderForm;