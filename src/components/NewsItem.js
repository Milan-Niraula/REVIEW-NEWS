import React from 'react'

// changing this to class based component to function based component
// export class NewsItem extends Component {
// render() {
const NewsItem = (props) => {
    let { title, descreption, imageUrl, newsUrl, author, date } = props;
    return (
        <div className='my-3'>
            <div className="card" >

                <img src={imageUrl} className="card-img-top" alt="..." style={{ maxWidth: '500px', maxHeight: '300px' }} />

                <div className="card-body" >
                    <h5 className="card-title"> {title}... </h5>
                    <p className="card-text">{descreption}...</p>
                    <p className='card-text'><small className='text-muted'>By: {!author ? "unknown" : author} on {new Date(date).toGMTString()} </small></p>
                    <a rel="noreferrer" href={newsUrl} className="btn btn-sm btn-dark" target='_blank'>Read More</a>
                </div>

            </div>
        </div >
    )
    // }
}
export default NewsItem
