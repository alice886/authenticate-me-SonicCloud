import { csrfFetch } from './csrf';
const LOAD = 'comments/LOAD'

// const load = (list) => ({
//     type: load,
//     list
// })

// export const getUserDetail = () => async dispatch {
//     const res = await csrfFetch(`/api`)
// if (res.ok) {
//     const list = await res.json();
//     dispatch(load(list))
// }
// }

const initialState = {};

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const currentUserDetail = {}
            return currentUserDetail;
        default:
            return state;
    }
}
export default commentReducer;
