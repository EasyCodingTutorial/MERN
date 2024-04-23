import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useSnackbar } from "notistack"

// for Components
import BackButton from "../../Components/BackButton/BackButton"
import axios from "axios"


import styles from './Edit.module.css'
import { Spinner } from "../../Components/Spinner/Spinner"

const Edit = () => {

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
    const { id } = useParams()


    useEffect(() => {

        setLoading(true)
        axios.get(`http://localhost:5555/books/${id}`).then((res) => {
            setBookTitle(res.data.BookTitle)
            setBookAuthor(res.data.BookAuthor)
            setBookIntro(res.data.BookIntro)
            setBookDesc(res.data.BookDesc)
            setBookImgUrl(res.data.BookImgUrl)
            setBookPrice(res.data.BookPrice)
            setBookPublishYear(res.data.BookPublishYear)
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
            enqueueSnackbar("Something Went Wrong", { variant: "error" })
            console.log(error)
        })

    }, [])


    const UpdateBook = () => {
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
        axios.put(`http://localhost:5555/books/${id}`, data).then(() => {
            setLoading(false)
            enqueueSnackbar("Book Updated Successfully", { variant: "success" })
            Navigate("/")
        }).catch((error) => {
            setLoading(false)
            enqueueSnackbar("Something Went Wrong", { variant: "error" })
            console.log(error)

            // Diff Error Checking
            if (error.response) {
                console.log("Res Data", error.response.data);
                console.log("Res Status", error.response.status);
                console.log("Res Headers", error.response.headers);
            } else if (error.request) {
                console.log("No Res Received", error.request)
            } else {
                console.log("Error", error.message)
            }

        })

    }


    return (
        <>
            <BackButton />

            <div className={styles.UpdateBook}>
                <div className={styles.UpdatedBook_Row}>

                    <h6>Updated Book  Now</h6>

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


                                <button onClick={UpdateBook} className={styles.Btn}>Update book Now</button>



                            </div>
                        )
                    }

                </div>
            </div>




        </>
    )
}

export default Edit