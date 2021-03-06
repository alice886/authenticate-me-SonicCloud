import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addNewAlbum, getMyAlbums } from '../../store/album';


const CreateAlbumModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [errors, setErrors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const myAlbums = useSelector(state => Object.values(state.album));

    const updateName = e => setName(e.target.value);
    const updatePreviewImage = e => setPreviewImage(e.target.value);

    useEffect(() => {
        dispatch(getMyAlbums())
    }, [dispatch])

    // const handleCloseModal = async e => {
    //     e.preventDefault();
    //     setShowModal()
    // }


    const handleSubmitNewAlbum = async e => {
        e.preventDefault();

        const payload = {
            name,
            previewImage
        };

        // if (name || previewImage) {
        //     setErrors([]);
        //     return dispatch(addNewAlbum({ name, previewImage }))
        //         .catch(async (res) => {
        //             const data = await res.json();
        //             if (data && data.errors) setErrors(data.errors);
        //         });
        // }

        setErrors([]);
        dispatch(addNewAlbum(payload))
            .then((res) => {
                history.push(`/albums/${res.id}`);
                window.alert(`new album ♪  ${res.name}  ♪ is created!`);
            })
            .catch(
                async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors)
                    };
                }
            );


        // let createNewAlbum = await dispatch(addNewAlbum(payload));
        // if (createNewAlbum) {
        //     history.push(`/albums/${createNewAlbum.id}`);
        //     window.alert(`new album ♪  ${createNewAlbum.name}  ♪ is created!`);
        // }

        // https://i.pinimg.com/originals/24/63/b9/2463b906bc43583f0c86681bb166782b.jpg
    }

    return (
        <>
            <button className='create-new-button' onClick={() => setShowModal(true)}>Create New Album</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <form id='new-album-form' hidden={showModal}>
                        <label> - Create New Album - </label>
                        <ul>
                            {errors.map((error, idx) => {
                                if (error !== 'Invalid value') {
                                    return <li key={idx}>{error}</li>
                                }
                            }
                            )}
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
                        <div className="button-container">
                            <button type='submit' onClick={handleSubmitNewAlbum}>Create new Album</button>
                            <button type='button' onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </form>
                </Modal>
            )
            }
        </>
    )

}

export default CreateAlbumModal;
