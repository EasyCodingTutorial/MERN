import { useEffect, useState } from 'react'
import styles from './View.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'


// For Components
import { Spinner } from '../../Components/Spinner/Spinner'
import BackButton from '../../Components/BackButton/BackButton'


type BookType = {
    BookImgUrl: string,
    BookTitle: string,
    BookAuthor: string,
    BookIntro: string,
    BookDesc: string,
    BookPrice: number,
    BookPublishYear: number,
}

const View = () => {

    const [Book, setBook] = useState<BookType>({} as BookType)
    const [Loading, SetLoading] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        SetLoading(true)
        axios.get(`http://localhost:5555/books/${id}`).then((res) => {
            setBook(res.data)
            // console.log(res.data)
            SetLoading(false)
        }).catch((error) => {
            console.log(error)
            SetLoading(false)
        })
    }, [])


    return (
        <>

            {
                Loading ? <Spinner /> : (
                    <>
                        <BackButton />


                        <div className={styles.ViewBook}>


                            <div className={styles.ViewBook_Row}>

                                <div className={styles.ViewBook_Box}>
                                    <img src={Book.BookImgUrl} alt={Book.BookTitle} />

                                    <div className={styles.ViewBook_Box_Content}>

                                        <h5>Book Author: {Book.BookAuthor}</h5>
                                        <h6>{Book.BookTitle}</h6>

                                        <div>
                                            <p className={styles.Price}>Book Price: {Book.BookPrice}</p>
                                            <p className={styles.PublishYear}>Publish In {Book.BookPublishYear}</p>
                                        </div>

                                        <p className={styles.BookIntro}>{Book.BookIntro}</p>




                                        <p className={styles.BookDesc}>{Book.BookDesc}</p>






                                    </div>

                                </div>

                            </div>

                        </div>
                    </>
                )
            }

        </>
    )
}

export default View