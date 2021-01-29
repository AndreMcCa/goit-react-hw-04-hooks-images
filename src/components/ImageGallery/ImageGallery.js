import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import { IoMdClose } from "react-icons/io"
import { AiOutlineArrowUp } from 'react-icons/ai';
import 'react-toastify/dist/ReactToastify.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import ImageGalleryItem from "../ImageGalleryItem";
import Modal from '../Modal/Modal';
import Button from '../Button';

import fetchArticles from '../../services/servicesApi';
import s from "./ImageGallery.module.css";
 
const STATUS = {
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected',
}

export default function ImageGallery({searchQuery}) {
    const [response, setResponse] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [currentSearch, setCurrentSearch] = useState('');
    const [status, setStatus] = useState(STATUS.IDLE);
    const [largeImageURL, setLargeImageURL] = useState('');

    useEffect(() => {
        if (status === STATUS.REJECTED) {
            toast.error(`${error}`);
            setStatus(STATUS.IDLE);
        }
    }, [error, status]);

    useEffect(() => {
        setCurrentSearch(searchQuery);
        setResponse([]);
        setPage(1);
    }, [searchQuery]);

    useEffect(() => {

        if (currentSearch === '') {
            return
        }

        performerFetch(currentSearch, page);

    }, [page, currentSearch]);

    function performerFetch(searchQuery, page) {

        setStatus(STATUS.PENDING)

        setTimeout(() => {
            fetchArticles(searchQuery, page).then(r => {
                setResponse([...response, ...r]);
                setStatus(STATUS.RESOLVED);
            })
            .catch(errorMsg => {
                setError(errorMsg);
                setStatus(STATUS.REJECTED);
            });
        }, 500)
        
    }

    function onLoadMore() {
        setPage(page + 1);
    }

    function onShowLargeImgModal(e) {
        if (e.target.nodeName !== 'IMG') {
            return
        }
        
        const largeImage = e.target.getAttribute('data-largeimg');
        setLargeImageURL(largeImage);
    }

    function onCloseModal() {
        setLargeImageURL(''); 
    }

    return (
        <div>
             <ul className={s.ImageGallery} onClick={onShowLargeImgModal}>
             
                 {status !== STATUS.IDLE && 

                 <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2}}>
                     <Masonry gutter='30px'>
                         {response.map(item => <ImageGalleryItem item={item}/>)}
                     </Masonry> 
                 </ResponsiveMasonry>                  
                 }

            </ul>
            
            {status === STATUS.RESOLVED &&  
             <>
                 <div className={s.LoarMoreBox}>
                     <Button className={s.LoadMore} type='button' children="Load More" onClick={onLoadMore}/>  
                 </div>          
                 <a href="#form" className={s.ToBeginning }><AiOutlineArrowUp size={'30px'} color={'#ffffff'} /></a>
             </>     
            }

            {status === STATUS.PENDING && 
                 <Modal>
                     <Loader className={s.Loader} type="Hearts" color="#00BFFF" height={80} width={80} />
                 </Modal>
            }

            {largeImageURL !== '' && 
                 <Modal onClose={onCloseModal}>
                     <img src={largeImageURL}></img>
                     <Button className={s.CloseModal} type='button' onClick={onCloseModal} children={<IoMdClose size={'30px'} color={'#ffffff'}/>}/>
                 </Modal>
            }
        </div>
    )
}

ImageGallery.propTypes = {
    searchQuery: PropTypes.string.isRequired,
}
