import axios from 'axios'

const AI_API_BASE_URL = ''

class AIController {

    // add the api calls
    // TODO (@Get mapping) for getting the images from cloud
    // TODO: REST calls for verifying answer with the ML model

    getImages(number) {
        return axios.get("http://127.0.0.1:8000/api/ctimages/" + number).then(response => {
            console.log(response.data)
            return response.data
        });
    }

}

export default new AIController();