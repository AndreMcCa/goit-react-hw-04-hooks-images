import PropTypes from 'prop-types';

import Form from '../Form/Form';
import s from './Searchbar.module.css';

export default function Searchbar({onSubmit}) {
    
    return (
        <header className={s.Header}>
            <Form onSubmit={onSubmit}/>
        </header>
    )
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func,    
}