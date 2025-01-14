import {Route,Routes} from 'react-router-dom'
const routes=()=>{

    return(
        <>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
            </Routes>
        </>
    )
}