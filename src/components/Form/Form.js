import { useState } from 'react';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Input from '../Input';
import Button from '../Button';

import s from './Form.module.css';

export default function Form({onSubmit}) {
    const [value, setValue] = useState('');

    function handleInputChange(e) {
        const inputValue = e.currentTarget.value;
        setValue(inputValue);
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        if(value.trim() === '') {
            toast.warning('Вы ничего не ввели...');
            
            return
        }

        onSubmit(value);
        setValue('');
    }


    return (
        <form className={s.Form} id='form' onSubmit={handleSubmit}> 
            <Input className={s.Input} type='text' name='search' value={value} placeholder='Search images and photos' onChange={handleInputChange}/> 
            <Button className={s.Button} type='submit' children='Search' />
        </form>
    )
}

Form.propTypes = {
    onSubmit: PropTypes.func.isRequired,  
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.object,), PropTypes.element,])  
}