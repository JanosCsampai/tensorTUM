import axios from 'axios'

const USER_API_BASE_URL = ''

class LoginController {

    putUser(username, password) {
        return (
            axios.put(USER_API_BASE_URL + "/" + username + "&and&" + password)
                .then(response => {
                    return response.data;
                })
        );
    }


}

export default new LoginController();