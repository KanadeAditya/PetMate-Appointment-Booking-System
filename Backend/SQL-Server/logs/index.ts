import logger from 'pino'
import dayjs from 'dayjs'

import PinoPretty from 'pino-pretty'



const log = logger({
    // prettyPrint: true,
    transport: {
        target: 'pino-pretty'
    },
    base:{
        pid:false
    },
    timestamp: ()=>`, "Time" : "${dayjs().format()}"`
})

export default log