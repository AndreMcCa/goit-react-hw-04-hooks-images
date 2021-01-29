import PropTypes from 'prop-types';

export default function ImageGalleryItem({item}) {
    const {id, webformatURL, largeImageURL} = item;

    return (
        <li key={id} className="ImageGalleryItem" >
            <img className="ImageGalleryItem-image" src={webformatURL} alt=""  width='100%' data-largeimg={largeImageURL}/>
        </li>
    )
}

ImageGalleryItem.propTypes = {
    item: PropTypes.object.isRequired,
}

