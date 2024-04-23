import styles from './Add.module.css'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'



// For Components
import { useSnackbar } from 'notistack'
import BackButton from '../../Components/BackButton/BackButton'
import { Spinner } from '../../Components/Spinner/Spinner'
import axios from 'axios'

const Add = () => {



    const [BookTitle, setBookTitle] = useState('')
    const [BookAuthor, setBookAuthor] = useState('')
    const [BookIntro, setBookIntro] = useState('')
    const [BookDesc, setBookDesc] = useState('')
    const [BookImgUrl, setBookImgUrl] = useState('')
    const [BookPrice, setBookPrice] = useState('')
    const [BookPublishYear, setBookPublishYear] = useState('')
    const [Loading, setLoading] = useState(false)
    const Navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()


    const SaveBook = () => {
        const data = {
            BookTitle,
            BookAuthor,
            BookIntro,
            BookDesc,
            BookImgUrl,
            BookPrice,
            BookPublishYear
        }


        setLoading(true)
        axios.post('http://localhost:5555/books', data).then(() => {
            setLoading(false)
            enqueueSnackbar("Book Created Successfully", { variant: "success" })
            Navigate("/")
        }).catch((err) => {
            setLoading(false)
            console.log(err)
            enqueueSnackbar("Something Went Wrong", { variant: "error" })
            // Diff Error Checking
            if (err.response) {
                console.log("Res Data", err.response.data);
                console.log("Res Status", err.response.status);
                console.log("Res Headers", err.response.headers);
            } else if (err.request) {
                console.log("No Res Received", err.request)
            } else {
                console.log("Error", err.message)
            }


        })

    }

    return (
        <>
            <BackButton />

            <div className={styles.UpdateBook}>
                <div className={styles.UpdatedBook_Row}>



                    <h6>Save New Book  Now</h6>

                    {
                        Loading ? <Spinner /> : (
                            <div className={styles.UpdateBook_Box}>


                                <input type="text" placeholder="Book Title" value={BookTitle} onChange={(e) => { setBookTitle(e.target.value) }} />

                                <input type="text" placeholder="Book Author" value={BookAuthor} onChange={(e) => { setBookAuthor(e.target.value) }} />

                                <input type="text" placeholder="Book Img URL" value={BookImgUrl} onChange={(e) => { setBookImgUrl(e.target.value) }} />

                                <input type="number" placeholder="Book Price" value={BookPrice} onChange={(e) => { setBookPrice(e.target.value) }} />

                                <input type="number" placeholder="Book Publish Year" value={BookPublishYear} onChange={(e) => { setBookPublishYear(e.target.value) }} />

                                <textarea value={BookIntro} placeholder="Book Intro" onChange={(e) => { setBookIntro(e.target.value) }} name="" id="" cols={30} rows={10}></textarea>

                                <textarea value={BookDesc} placeholder="Book Desc" onChange={(e) => { setBookDesc(e.target.value) }} name="" id="" cols={30} rows={10}></textarea>


                                <button onClick={SaveBook} className={styles.Btn}>Save book Now</button>




                            </div>
                        )
                    }

                </div>
            </div>

        </>
    )
}

export default Add