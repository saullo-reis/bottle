import axios from "axios"

const follow = async (user, element) => {
    await axios.put('http://localhost:3333/follow/' + user.id, {
        id: element.id,
        email: element.email,
        photo: element.photo,
        name: element.name
    })
}
const followers = async(user, element) => {
    await axios.put('http://localhost:3333/followers/' + element.id, {
        id: user.id,
        email: user.email,
        photo: user.photo,
        name: user.name
    })
}

const notificationFollow = async(user, element) => {
    await axios.put('http://localhost:3333/notification/' + element.id, {
        name: user.name,
        photo: user.photo,
        text: "seguiu você!",
        visualized: false
    })
}

export { follow, followers, notificationFollow}