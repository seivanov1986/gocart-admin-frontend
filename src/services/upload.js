import { HOST } from '../const'
import { getToken } from '../authorization/auth'
import { sha256 } from 'js-sha256';

const maxThreads = 6
const sizeChank = 1024 * 10

function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

const Manager = {
    work: true,
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    async delivery(uuid, filename, chunkNum, totalChunks, bytes, filesumm) {
        for (let t = 0; t < 3; t++) {
            if (this.work === false) {
                return
            }

			const decoder = new TextDecoder();
			const strBytes = decoder.decode(bytes);
            let token = getToken()

            const response = await fetch(HOST + '/admin/upload', {
                method: 'POST',
                headers: {
                    "X-Project-Uuid": uuid,
                    "X-Project-Name":filename,
                    "X-Project-Chunk-Num":chunkNum,
					"X-Project-Total-Chunks":totalChunks,
                    "X-Project-Sha256-File-Checksum":filesumm,
                    "X-Project-Sha256-Chunk-Checksum":sha256(strBytes),
                    'Content-type': 'application/json',
                    'Authorization': token
                },
                body: bytes,
             
            });
            if (response.status === 200) {
                return
            }
            await this.sleep(5000);
        }
        this.work = false
    }
};

let queue = []
const fileOnload = function (event) {
    let arrayBuffer = event.target.result
    let filename = event.target.fileName
    let chunkCounter = Math.floor(arrayBuffer.byteLength / sizeChank)
    let filesumm = sha256(arrayBuffer)
    let uuid = uuidv4()
    for (let i = 0; i < chunkCounter; i++) {
        let start = i * sizeChank
        let end = start + sizeChank
        let data = {}
        data.uuid = uuid
        data.chunkNum = i
        data.filename = filename
        data.totalChunks = chunkCounter
        data.filesumm = filesumm
        data.buf = arrayBuffer.slice(start, end)
        queue.push(data)
    }
    runDelivery()
}

let runDelivery = function () {
    let manager = Manager
    for (let i = 0; i < maxThreads; i++) {
        createWorker(manager)
    }
}

let createWorker = async function (manager) {
    for (;;) {
        var job = queue.shift()
        if (job === undefined) {
            break
        }
        await manager.delivery(job.uuid,job.filename, job.chunkNum, 
            job.totalChunks, job.buf, job.filesumm).then(r => true)
    }
}

const UploadFile = (props, setFileList) => {
    const fileReader = new FileReader();
    fileReader.onload = fileOnload
    fileReader.fileName = props.file.name
    fileReader.readAsArrayBuffer(props.file)

    setFileList((prevFileList) => [...prevFileList, {
        //uid: Date.now() + Math.random(),
        uid: props.file.uid,
        name: props.file.name,
        status: 'uploading',
        percent: 33,
    }])      
}

const uploadFunc = (url, body, progress) => {
    return new Promise((resolve, reject) => {

        let token = getToken()

        var oReq = new XMLHttpRequest();    
        oReq.addEventListener("progress", progress);
        oReq.open('POST', HOST + url);
        oReq.setRequestHeader('Content-type', 'application/json');
        oReq.setRequestHeader('Authorization', token);        
        oReq.send(body);
        oReq.onreadystatechange = function() {
            if (oReq.readyState == XMLHttpRequest.DONE) {
                resolve(JSON.parse(oReq.responseText));
            }
        }

    });
}

export default UploadFile;