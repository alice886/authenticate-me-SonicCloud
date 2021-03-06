import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, Route, useParams, useHistory } from "react-router-dom";
import { getMyAlbums } from '../../store/album'
import CreateAlbumModal from '../AlbumFormModal/index'

function MyAlbums() {
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    const myAlbums = useSelector(state => Object.values(state.album));

    useEffect(() => {
        dispatch(getMyAlbums())
    }, [dispatch])

    return (
        <>
            <CreateAlbumModal />
            <div className="all-song-container">
                {myAlbums && myAlbums.map((album) => {
                    if (album?.userId === sessionUser?.id) {
                        return <div className="eachsong" id={album.id}>
                            <img src={album.previewImage} width='150' ></img>
                            <br></br>
                            <h4>album name:</h4>
                            <NavLink to={`/albums/${album.id}`}>{album.name}</NavLink>
                        </div>
                    }
                })}

            </div>
        </>
    )
}

export default MyAlbums;
