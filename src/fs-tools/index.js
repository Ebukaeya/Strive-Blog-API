import fs from "fs-extra"
const {createReadStream} = fs
import {join} from "path"

 

export const readStream = ()=>{
    const jsonPath = join(process.cwd(),"src/services/authors/authors.json")
    const readstream = createReadStream(jsonPath)


    return readstream
}




