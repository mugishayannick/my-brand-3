process.env.NODE_ENV='test'
import user from '../models/user.js';
import article from '../models/article.js'
import message from '../models/message.js'
//Cleaning The Database Before And After Each Test
before((done) => {
    user.deleteMany({}, function(err) {})
    article.deleteMany({}, function(err) {})
    message.deleteMany({}, function(err) {})
    done()
})
after((done) => {
    user.deleteMany({}, function(err) {})
    article.deleteMany({}, function(err) {})
    message.deleteMany({}, function(err) {})
    done()
})