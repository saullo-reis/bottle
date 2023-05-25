import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BiTrash, BiEdit } from 'react-icons/bi'
import { Modal, ModalOverlay, ButtonCancel, ButtonConfirm, TextArea, PostsStyle } from '../../../styles/stylesComponents.js'
import { toast, ToastContainer } from 'react-toastify'

export const PerfilPosts = () => {
    const [posts, setPosts] = useState([])
    const { name } = useParams()
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [id, setId] = useState(0)
    const user = JSON.parse(localStorage.getItem('user'))
    const [newContent, setNewContent ] = useState('')

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
    }, [isModalOpenDelete, isModalOpenEdit])

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

    async function handleDelete() {
        try {
            await axios.delete('http://localhost:3333/deletePost/' + id)
            toast.success('Post deletado')
            setIsModalOpenDelete(false)
        } catch (err) {
            console.error(err)
        }

    }
    async function handleEditPost(){
        try{
            await axios.put('http://localhost:3333/editPost/'+id, {
                content: newContent
            })
            toast.success('Post editado com sucesso')
            setNewContent('')
            setIsModalOpenEdit(false)
        }catch(err){
            console.log(err)
        }
    }


    return (
        <PostsStyle style={{ margin: '50px', width: '60%' }}>
            <ToastContainer position="bottom-left" />
            {
                isModalOpenDelete &&
                <ModalOverlay>
                    <Modal>
                        <p>Você tem certeza que quer deletar esse post?</p>
                        <div>
                            <ButtonConfirm type={'button'} onClick={() => handleDelete()} value='Confirmar'></ButtonConfirm>
                            <ButtonCancel type={'button'} onClick={handleModalClose} value='Cancelar'></ButtonCancel>
                        </div>
                    </Modal>
                </ModalOverlay>
            }
            {
                isModalOpenEdit &&
                <ModalOverlay>
                    <Modal>
                        <TextArea style={{width: '80%'}} placeholder="Escreva aqui" value={newContent} onChange={(e) => setNewContent(e.target.value)}></TextArea>
                        <div>
                            <ButtonConfirm type={'button'} onClick={() => handleEditPost()} value='Confirmar'></ButtonConfirm>
                            <ButtonCancel type={'button'} onClick={handleModalClose} value='Cancelar'></ButtonCancel>
                        </div>
                    </Modal>
                </ModalOverlay>
            }
            <h1 style={{ textAlign: 'center' }}>Posts de {name}</h1>
            {
                posts.map((element, index) => {
                    return (
                        <li className="posts-post" key={index}>
                            <div className='posts-post-container'>
                                {element.name === user.name &&
                                    <>
                                        <BiTrash onClick={() => handleModalOpen(element.id, 'trash')} />
                                        <BiEdit onClick={() => handleModalOpen(element.id, 'edit')} />
                                    </>
                                }
                            </div>
                            <p className="posts-post-content">{element.content}</p>
                        </li>
                    )
                })
            }
        </PostsStyle>
    )
}