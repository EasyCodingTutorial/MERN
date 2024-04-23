import { useState } from 'react'
import styles from './Delete.module.css'

import { useNavigate, useParams } from 'react-router-dom'

import { useSnackbar } from 'notistack'
import axios from 'axios'
import { Spinner } from '../../Components/Spinner/Spinner'

const Delete = () => {

    const [Loading, setLoading] = useState(false)
    const Navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()
    const { id } = useParams()


    // Logic To Delete The Book
    const DeleteBook = () => {
        setLoading(true)
        axios.delete(`http://localhost:5555/Books/${id}`).then(() => {
            setLoading(false)
            enqueueSnackbar(`Book Deleted Successfully Id is ${id}`, { variant: 'info' })
            Navigate("/")
        }).catch((error) => {
            setLoading(false)
            enqueueSnackbar("Something Went Wrong", { variant: "error" })


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

            {
                Loading ? <Spinner /> : (
                    <div className={styles.Delete}>
                        <h6>Wants To Delete The Book ? <br /> <span>
                            Id : ${id}</span></h6>
                        <button className={styles.Btn} onClick={DeleteBook}>Delete Book</button>

                    </div>

                )
            }

        </>
    )
}

export default Delete