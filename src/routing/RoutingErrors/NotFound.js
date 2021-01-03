import {Link} from 'react-router-dom'

const Error = ()=>(
    <>
    <div className="container w-100 h-100 d-flex flex-column justify-content-center align-items-center">
        <span className="display-4">Uh-oh! Looks like someone's lost</span>
        <Link to="/" className="mt-4 btn btn-dark shadow-lg">Return Home</Link>
    </div>
    </>
)
export default Error