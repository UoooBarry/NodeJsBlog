const request = require('axios').default;

const uri = 'http://localhost:5000/api';
const session_helper = require('../helpers/session_helper');

exports.login = async (name,password) => {
    let message = 'uncheck';
    const headers = {
        'Content-Type': 'application/json'
    }

    await request.post(uri + '/login', {
        name: name,
        password: password
    }, {'headers' : headers,})
        .then( (response) => {
            if(response.status !== "403"){
                message = response.data.message;
                if(message == 'success'){
                    session_helper.log_in(response.data.name, response.data.token);
                }
            } 
        })
        .catch( (err) => {
            console.log (err);
        });
    
    return message;
}

exports.post = async (title, content) => {
    var message;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'node ' + session_helper.current_user()
    }
    await request.post(uri + '/articles/post',{
        title: title,
        content: content
    }
    ,{'headers': headers})
    .then( (response) => {
        if(response.status !== '403'){
            message = response.data.message;
        }
    })
    .catch(err => console.log(err));

    return message;
}
