import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BiTrash, BiEdit } from 'react-icons/bi'
import './styles.sass'

export const PerfilPosts = () => {
    const [posts, setPosts] = useState([])
    const { name } = useParams()
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [id, setId] = useState(0)
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('http://localhost:3333/getPosts', {
                params: {
                    name: name
                }
            })
            setPosts(response.data)
        }
        fetchData()
    }, [])

    const handleModalOpen = (id, mode) => {
        switch (mode) {
            case 'trash':
                setId(id)
                setIsModalOpenDelete(true)
                return
            case 'edit':
                setId(id)
                setIsModalOpenEdit(true)
                return
        }
    };

    const handleModalClose = () => {
        setIsModalOpenDelete(false)
        setIsModalOpenEdit(false)
    };

    return (
        <ul style={{ margin: '50px', width: '60%' }}>
            <h1 style={{ textAlign: 'center' }}>Posts de {name}</h1>
            {
                posts.map((element, index) => {
                    return (
                        <li className="posts-post" key={index}>
                            <div className='posts-post-container' style={{ position: 'relative' }}>
                                {element.name === user.name &&
                                    <>
                                        <BiTrash  onClick={() => handleModalOpen(element.id, 'trash')} />
                                        {
                                            isModalOpenDelete &&
                                            <div className="modal-delete" >
                                                <p>Você tem certeza que quer deletar?</p>
                                                <button>Confirmar</button>
                                                <button onClick={handleModalClose}>Cancelar</button>
                                            </div>
                                        }

                                        <BiEdit onClick={() => handleModalOpen(element.id, 'edit')} />
                                        {
                                            isModalOpenEdit && 
                                            <div className="modal-delete">
                                                Você tem certeza que quer deletar?
                                            </div>
                                        }

                                    </>
                                }
                            </div>
                            <p className="posts-post-content">{element.content}</p>
                        </li>
                    )
                })
            }
        </ul>
    )
}