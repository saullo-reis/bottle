import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { BiTrash, BiEdit } from 'react-icons/bi'
import { Modal, ModalOverlay, ButtonCancel, ButtonConfirm, TextArea, PostsStyle } from '../../../styles/stylesComponents.js'
import { toast, ToastContainer } from 'react-toastify'

export const PerfilPosts = () => {
    const [posts, setPosts] = useState([])
    const { name, id } = useParams()
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
    const [idPost, setIdPost] = useState(0)
    const user = JSON.parse(localStorage.getItem('user'))
    const [newContent, setNewContent ] = useState('')

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('http://localhost:3333/getPosts', {
                params: {
                    idUser: id
                }
            })
            setPosts(response.data)
        }
        fetchData()
    }, [isModalOpenDelete, isModalOpenEdit, name])

    const handleModalOpen = (id, mode) => {
        switch (mode) {
            case 'trash':
                setIdPost(id)
                setIsModalOpenDelete(true)
                return
            case 'edit':
                setIdPost(id)
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
            await axios.delete('http://localhost:3333/deletePost/' + idPost)
            toast.success('Post deletado')
            setIsModalOpenDelete(false)
        } catch (err) {
            console.error(err)
        }

    }
    async function handleEditPost(){
        try{
            await axios.put('http://localhost:3333/editPost/'+idPost, {
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
        <PostsStyle style={{ width: '60%' }}>
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
                                {element.name !== user.name && 
                                    <>
                                        <span className="ball"></span>
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