
import axios from 'axios'
import { useEffect, useState } from 'react'

import styles from './Home.module.css'


// For Components
import { Spinner } from '../../Components/Spinner/Spinner'

import { Link } from 'react-router-dom'


// For Icons
import { MdDelete, MdEdit, MdOutlinePreview } from "react-icons/md";


const Home = () => {

    const [books, SetBooks] = useState([])
    const [Loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        axios.get('http://localhost:5555/Books/').then((res) => {
            SetBooks(res.data.data)
            // console.log(res.data.data)
            setLoading(false)
        }).catch((error) => {
            console.log(error)
            setLoading(false)
        })

    }, [])



    return (
        <>
            {
                Loading ? <Spinner />
                    :
                    (
                        <div className={styles.Home}>

                            <Link to={"/Add"}>
                                <h6>Add New Book</h6>
                            </Link>

                            <div className={styles.HomeRow}>
                                {
                                    books.map((Item: any) => (
                                        <div className={styles.HomeBox} key={Item._id}>

                                            <img src={Item.BookImgUrl} alt={Item.BookTitle} />
                                            <div className={styles.HomeBoxContent}>
                                                <h6>Book Author : {Item.BookAuthor}</h6>
                                                <h5>Book Title: {Item.BookTitle}</h5>
                                                <p>{Item.BookIntro}</p>
                                            </div>

                                            <div className={styles.HomeBoxContent_Icons}>

                                                <Link to={`/Delete/${Item._id}`}>
                                                    <MdDelete />
                                                </Link>
                                                <Link to={`/Edit/${Item._id}`}>
                                                    <MdEdit />
                                                </Link>
                                                <Link to={`/View/${Item._id}`}>
                                                    <MdOutlinePreview />
                                                </Link>


                                            </div>


                                        </div>
                                    ))
                                }

                            </div>
                        </div>
                    )
            }
        </>
    )
}

export default Home