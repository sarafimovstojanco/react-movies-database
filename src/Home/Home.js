import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import FullTable from '../Table/FullTable';
import { useDispatch } from 'react-redux'
import { getMovies, getUser } from '../redux/actions'
import Warning from '../Spinner/Warning';
import ClippedDrawer from '../Navigation/Drawer';

const Home = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUser())
        dispatch(getMovies())
    }, [])

    return (
        <>
            <div style={{ padding: "3%" }}>
                <ClippedDrawer />
                <div style={{
                    marginTop: '3%',
                    marginBottom: '10%',
                    marginLeft: '13%',
                    position: ' absolute',
                    zIndex: '10',
                }}>
                    <Warning />
                </div>
                <div style={{
                    marginTop: '8%',
                    marginLeft: '15%',
                    paddingLeft: '4%'
                    }}>
                <FullTable />
                </div>
            </div>
        </>
    )
}
export default Home