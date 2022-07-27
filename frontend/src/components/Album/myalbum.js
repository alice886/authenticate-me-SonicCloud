import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams, useHistory } from "react-router-dom";
import { getMyAlbums } from '../../store/album'
import CreateAlbumForm from "./CreateAlbumForm";
import { deleteOneAlbum, editOneAlbum } from '../../store/album';

function MyAlbums() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [hideEditform, setHideEditForm] = useState('true')

    const updateName = e => setName(e.target.value);
    const updatePreviewImage = e => setPreviewImage(e.target.value);
    // const currentUser = useSelector(state => state.session.user);

    const myAlbums = useSelector(state => Object.values(state.album))

    useEffect(() => {
        dispatch(getMyAlbums())
    }, [dispatch])

    const [showForm, setShowForm] = useState(false);

    const handleDelete = async (e) => {
        e.preventDefault();
        const payload = {
            id: e.target.id
        }
        console.log(payload)
        dispatch(deleteOneAlbum(payload))
        // history.push('/api/albums/myalbums')
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const payload = {
            id: e.target.id,
            name,
            previewImage
        };

        let editAlbum = await dispatch(editOneAlbum(payload));
        if (editAlbum) {
            history.push(`/albums/myalbums}`);
        }
    }

    const handleCancelClick = e => {
        e.preventDefault();
    };

    return (
        <div className="album-container"> ...... my albums on SonicCloud ......
            <div>
                {myAlbums && myAlbums.map((album) => {
                    return <div className="eachalbum" id={album.id}>
                        <NavLink to={`/albums/${album.id}`}>{album.name}</NavLink>
                    </div>
                })}
            </div>
            <CreateAlbumForm display={() => setHideEditForm(false)} />
        </div>
    )
}

export default MyAlbums;