import React from 'react'
import loading from '../Snake.gif'

// changing Spinner.js file from class based component to function based component
// export default class Spinner extends Component {
const Spinner = () => {

    // render() {
    return (
        <div className='text-center'>
            <img className='my-3' src={loading} alt="Loading..." />
        </div>
    )
    // }
}
export default Spinner
