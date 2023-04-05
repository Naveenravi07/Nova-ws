import { connect } from 'mongoose'
import config from '../config'

function connectDb() {
    connect(config.db_url, { retryWrites: true }).then((res) => {
        console.log('connected to database');
    })
}
export default connectDb