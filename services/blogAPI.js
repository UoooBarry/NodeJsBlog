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
    await request.post(uri + '/articles/post',{
        title: title,
        content: content
    }
    ,{'headers': get_header()})
    .then( (response) => {
        if(response.status !== '403'){
            message = response.data.message;
        }
    })
    .catch(err => console.log(err));

    return message;
}

exports.get_articles = async () => {
    let result;
    await request.get(uri + '/articles')
                    .then( res => {
                        result = res.data.articles;
                    })
                    .catch( err=> console.log(err));
    return result;
}

exports.get_article = async (id) => {
    let result;
    await request.get(uri + '/articles/' + id)
                    .then( res => {
                        result = res.data.article;
                    })
                    .catch(err => console.log(err));
    return result;
}

exports.del_article = async (id) => {
    let result;
    await request.delete(uri + '/articles/' + id, {'headers': get_header()})
                    .then( res => {
                        result = res.data.message;
                    })
                    .catch(err => console.log(err));
    return result;
}

exports.register = async (name, gender, contact, password) => {
    let result;
    const headers = {
        'Content-Type': 'application/json'
    }
    await request.post(uri + '/users/create', {
        name: name,
        gender: gender,
        contact: contact,
        password: password
    },{'headers': headers})
        .then(res => {
            result = res.data.message;
        })
        .catch(err => console.log('register data err ' + err));
    return result;
}

exports.get_user = async(name) => {
    let result;
    await request.get(uri + '/users/' + name)
                    .then(res => {
                        result = res.data.name;
                    })
                    .catch(err => console.log('get user err ' + err));
    return result;
}

exports.update_content = async(id, content) => {
    let result;
    await request.patch(uri + '/articles/' + id, {
        content: content
    },{'headers': get_header()})
        .then(res => {
            result = res.data.message
        })
        .catch(err => console.log('patch err ' + err));
    return result;
}

function get_header(){
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'node ' + session_helper.current_user()
    }
    return headers;
}