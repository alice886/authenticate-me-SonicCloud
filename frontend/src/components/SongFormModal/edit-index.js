import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams, useHistory } from "react-router-dom";
import { Modal } from '../../context/Modal';
import { getOneSong, deleteOneSong, editOneSong } from '../../store/song';
import { getMyAlbums } from '../../store/album';

const EditSongModal = ({ targetSong }) => {

    const dispatch = useDispatch();
    const { songId } = useParams();
    const history = useHistory();
    const [title, setTitle] = useState(targetSong?.title);
    const [albumId, setAlbumId] = useState(targetSong?.albumId);
    const [description, setDescription] = useState(targetSong?.description);
    const [url, setUrl] = useState(targetSong?.url);
    const [previewImage, setPreviewImage] = useState(targetSong?.previewImage);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(getMyAlbums())
    }, [dispatch]);

    const myAlbums = useSelector(state => Object.values(state.album));

    const updateTitle = e => setTitle(e.target.value);
    const updateAlbum = e => setAlbumId(e.target.value);
    const updateDescription = e => setDescription(e.target.value);
    const updateUrl = e => setUrl(e.target.value);
    const updateImageUrl = e => setPreviewImage(e.target.value);

    useEffect(() => {
        dispatch(getOneSong(songId))
    }, [dispatch, title, description, url, previewImage]);

    console.log('target song is ---', targetSong)
    console.log('target song name is ---', targetSong?.title)
    console.log('target song img is ---', targetSong?.previewImage)


    const handleDelete = async (e) => {
        e.preventDefault();
        const payload = {
            id: songId
        }

        let deleteSong = await dispatch(deleteOneSong(payload))
        history.push(`/songs/mysongs`);
        // push to history first then reload
        // window.location.reload();
        if (deleteSong) {
            alert(`song is now deleted`)
        }
    }


    const albumSelected = async e => {
        e.preventDefault();
        setAlbumId(e.target.value);
    }

    const handleEdit = async e => {
        e.preventDefault();

        const payload = {
            ...targetSong,
            id: songId,
            title,
            albumId,
            description,
            url,
            previewImage
        };
        if (!title) alert('song title is required')
        if (!url) alert('song url is required')

        const closeModal = () => { setShowModal(false) }

        let editSong = await dispatch(editOneSong(payload));
        if (editSong) {
            closeModal();
            window.alert('song is now updated!')
        }
    }

    return (
        <>
            <button onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <form hidden={showModal} id='song-form'>
                        <label>Song Id: {targetSong.id}</label>
                        <label>Song name: {targetSong.title}</label>
                        <label>new title</label>
                        <input
                            type="text"
                            placeholder={targetSong.title}
                            min="2"
                            required
                            value={title}
                            onChange={updateTitle} />
                        <br></br>
                        <label>pick an album</label>
                        <select id="mydropdown" className="dropdown-content" onChange={albumSelected} >
                            <option value='' selected disabled hidden> choose an album</option>
                            {myAlbums && myAlbums.map(album => {

                                return <option key={album.id} value={album.id}>{album.name}</option>
                            })
                            }
                        </select>
                        <br></br>
                        <label>audio URL</label>
                        <input
                            type="text"
                            placeholder={targetSong.url}
                            min="2"
                            value={url}
                            onChange={updateUrl} />
                        <label>image URL</label>
                        <input
                            type="text"
                            placeholder={targetSong.previewImage}
                            value={previewImage}
                            onChange={updateImageUrl} />
                        <label>description:</label>
                        <input
                            type="text"
                            placeholder='edit description here'
                            min="2"
                            value={description}
                            onChange={updateDescription} />
                        <div className="button-container" id={targetSong.id}>
                            <button type='submit' onClick={handleEdit}>Update</button>
                            <button type='button' onClick={() => setShowModal(false)}>Cancel Edit</button>
                            <button type='button' onClick={handleDelete}>Delete Song</button>
                        </div>
                    </form>
                </Modal>
            )
            }
        </>
    )

}

export default EditSongModal;
