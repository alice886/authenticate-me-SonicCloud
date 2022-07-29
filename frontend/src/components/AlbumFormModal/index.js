import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addNewAlbum } from '../../store/album';


const CreateAlbumModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [errors, setErrors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [hideEditform, setHideEditForm] = useState(true);

    const updateName = e => setName(e.target.value);
    const updatePreviewImage = e => setPreviewImage(e.target.value);

    const handleSubmitNewAlbum = async e => {
        e.preventDefault();

        const payload = {
            name,
            previewImage
        };


        if (name || previewImage) {
            setErrors([]);
            return dispatch(addNewAlbum({ name, previewImage }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }

        let createNewAlbum = await dispatch(addNewAlbum(payload));
        history.push(`/albums/myalbums/`);
        if (createNewAlbum) {
            alert('new album created!');
        }
    }

    return (
        <>
            <button onClick={() => setShowModal(true)}>Create New Album</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    {/* <CreateAlbumForm /> */}
                    <form className='new-album-form' hidden={hideEditform}>
                        Create a New Album:
                        <ul>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                        <input
                            type="text"
                            placeholder="name"
                            min="2"
                            required
                            value={name}
                            onChange={updateName} />
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={previewImage}
                            onChange={updatePreviewImage} />
                        <button type='submit'>Create new Album</button>
                        <button type='button' onClick={() => setShowModal(false)}>Cancel</button>
                    </form>
                </Modal>
            )
            }
        </>
    )

}

export default CreateAlbumModal;
