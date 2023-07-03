import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


// changing class based component to functional component
const News = (props) => {
    // export class News extends Component {

    // static defaultProps = {
    //     country: 'in',
    //     pageSize: 5,
    //     category: 'general'
    // }
    // static propTypes = {
    //     country: PropTypes.string,
    //     pageSize: PropTypes.number,
    //     category: PropTypes.string,
    // }

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResult, setTotalResult] = useState(0)

    const capitalFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         articles: [],
    //         loading: true,
    //         page: 1,
    //         totalResult: 0
    //     }
    //     document.title = `ReviewNews- ${this.capitalFirstLetter(props.category)}`
    // }

    useEffect(() => {
        document.title = `ReviewNews- ${capitalFirstLetter(props.category)}`
        updateNews();
        // eslint-disable-next-line
    }, [])
    // async updateNews() {
    const updateNews = async () => {
        // props.setProgress(10); // same for all props,, (just remove the this)
        props.setProgress(10);
        // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page}&pageSize=${props.pageSize}`;
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        // this.setState({ loading: true });
        setLoading(true);
        let data = await fetch(url);
        let parseData = await data.json()
        // this.setState({
        //     articles: parseData.articles,
        //     totalResult: parseData.totalResult,
        //     loading: false
        // })
        setArticles(parseData.articles)
        setTotalResult(parseData.totalResult)
        setLoading(false)

        console.log(parseData);
        props.setProgress(100);
    }


    // async componentDidMount() {
    //     this.updateNews()
    // }

    // handlePrevClick = async () => {
    //     console.log("previous");
    //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=55af9f6cf37c4ad488067a21cd889b96&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
    //     this.setState({ loading: true });
    //     let data = await fetch(url);
    //     let parseData = await data.json();
    //     console.log(parseData);
    //     this.setState({
    //         page: this.state.page - 1,
    //         articles: parseData.articles,
    //         loading: false
    //     })
    //     this.setState({ page: this.state.page - 1 });
    //     this.updateNews();
    // }

    // this function is not in work
    // handleNextClick = async () => {
    //     console.log("next");
    //     if (!(this.state.page + 1 > Math.ceil(this.state.totalResult / props.pageSize))) {
    //         let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=55af9f6cf37c4ad488067a21cd889b96&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
    //         this.setState({ loading: true });
    //         let data = await fetch(url);
    //         let parseData = await data.json();
    //         console.log(parseData);
    //         this.setState({
    //             page: this.state.page + 1,
    //             articles: parseData.articles,
    //             loading: false
    //         })
    //     }
    //     this.setState({ page: this.state.page + 1 });
    //     this.updateNews();
    // }


    const fetchMoreData = async () => {
        // this.setState({ page: this.state.page + 1 });
        updateNews()
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parseData = await data.json()
        // this.setState({
        //     articles: this.state.articles.concat(parseData.articles),
        //     totalResult: parseData.totalResult
        // })
        setArticles(articles.concat(parseData.articles));
        setTotalResult(parseData.totalResult)

    };
    // render() {
    return (
        <>
            <h1 className="text-center" style={{ marginTop: '70px' }}>
                ReviewNews- top {capitalFirstLetter(props.category)} headlines
            </h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResult}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {/* {!this.state.loading && this.state.articles.map((element) => { */}
                        {/* {this.state.articles.map((element) => { */}
                        {articles.map((element) => {
                            return (
                                <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title.substring(0, 45) : ""} descreption={element.description ? element.description.substring(0, 80) : ""}
                                        imageUrl={element.urlToImage ? element.urlToImage : "https://media.zenfs.com/en/insidermonkey.com/b6ba93149d84b9ac9614f4716a23f30c"} newsUrl={element.url}
                                        author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </InfiniteScroll >
            {/* the button div is not in used state, as i started to do on the infinite-scrollbar in this react project */}
            {/* < div className="container d-flex justify-content-between" >
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-success" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResult / props.pageSize)} type="button" className="btn btn-success" onClick={this.handleNextClick}>Next &rarr; </button>
                </div > */}
        </>
    )
    // }
}

News.defaultProps = {
    country: 'in',
    pageSize: 5,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}
export default News
