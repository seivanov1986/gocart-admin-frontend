import { HOST } from '../const'
import { getToken } from '../authorization/auth'
import { sha256 } from 'js-sha256';
import FileListManager from '../library/file_list'

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

class FileManager {
    files = []
    progress = false
    offset = 0
    limit = 1024 * 1024
    total = 0
    uid = null
    name = ""
    parent_id = 0

    GetState() {
        return {
            offset: this.offset,
            limit: this.limit,
            total: this.total,
            uid: this.uid,
            name: this.name,
            parent_id: this.parent_id,
        }
    }

    AddFile(file) {
        this.files.push(file)
        if (this.progress == false) {
            this.Upload()
        }
    }

    Upload() {
        this.progress = true

        const file = this.GetCurrentFile()
        if (file == null) {
            this.progress = false
            return
        }

        this.uid = file.uid
        this.total = file.size;
        this.parent_id = file.idParent;
        this.ReadNextChunk(true)
    }

    GetCurrentFile() {
        if (this.files.length == 0) {
            return null
        }
        return this.files[0]
    }

    SetProgress() {
        let percent = this.offset / (this.total/100)
        let uid = this.uid

        let setFileList = FileListManager.getFunc()
        setFileList((prevFileList) => {
            let list = []

            for (let i = 0; i < prevFileList.length; i++) {
                let block = prevFileList[i]

                if (block.uid == uid) {
                    block.percent = percent
                }

                list.push(block)
            }

            return list
        })
    }

    Done() {
        let uid = this.uid

        let setFileList = FileListManager.getFunc()
        setFileList((prevFileList) => {
            let list = []

            for (let i = 0; i < prevFileList.length; i++) {
                let block = {...prevFileList[i]}

                if (block.uid == uid) {
                    block.status = 'done'
                }

                list.push(block)
            }

            return list
        })

        let update = FileListManager.getUpdateFunc()
        update()

        this.progress = false
        this.offset = 0
        this.uid = null
        this.idParent = 0
        this.total = 0
        this.files.shift()
        this.Upload()
    }

    ReadNextChunk(firstChunk) {
        if (FileListManager.hasDeleted(this.uid)) {
            this.Done()
        }

        this.SetProgress()
        console.log(this.offset, this.limit + this.offset, this.total)

        const file = this.GetCurrentFile()
        if (file == null) {
            this.Done()
            return
        }

        if (this.offset > this.total) {
            this.Done()
            return
        }

        if (!firstChunk) {
            this.offset += this.limit
        }

        const fileReader = new FileReader();
        fileReader.onload = this.OnLoad;        
        fileReader.onerror = this.OnLoadError;
        fileReader.fileName = file.name;
        this.name = file.name
        fileReader.readAsArrayBuffer(
            file.slice(this.offset, this.limit + this.offset)
        )
    }

    OnLoadError(e) {
        let setFileList = FileListManager.getFunc()
        setFileList((prevFileList) => {
            let list = []

            for (let i = 0; i < prevFileList.length; i++) {
                let block = prevFileList[i]

                if (block.uid === this.uid) {
                    block.status = 'error'
                }

                list.push(block)
            }

            return list
        })

        this.progress = false
        this.offset = 0
        this.files.shift()
        this.Upload()
    }

    SetUpdate() {

    }

    OnLoad(event) {
        let state = fileManager.GetState()

        let beforeTime = new Date().getTime();
        fetch("http://localhost:8000/admin/image/upload", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': getToken(),
                'X-Total': state.total,
                'X-Offset': state.offset,
                'X-Uid': state.uid,
                'X-Name': btoa(state.name),
                'X-Parent-ID': state.parent_id
            },
            body: event.target.result
        }).then((response) => {
            if (response.status !== 200) {
                fileManager.Done()
                return
            }

            let afterTime = new Date().getTime();
            let timeOut = 1000 - (afterTime - beforeTime)
            if (timeOut < 0) {
                timeOut = 0
            }
            setTimeout(() => {
                fileManager.ReadNextChunk(false)
            }, timeOut);
        });
    }
}

const fileManager = new(FileManager)

const UploadFile = (props, setFileList, idParent) => {
    if (props.file.type != "image/jpeg") {
        setFileList((prevFileList) => [...prevFileList, {
            uid: props.file.uid,
            name: props.file.name,
            status: 'error',
        }])  

        return
    }

    if (props.file.size > 1024 * 1024 * 100) {
        setFileList((prevFileList) => [...prevFileList, {
            uid: props.file.uid,
            name: props.file.name,
            status: 'error',
        }])  

        return
    }

    props.file.idParent = idParent
    fileManager.AddFile(props.file)

    setFileList((prevFileList) => [...prevFileList, {
        uid: props.file.uid,
        name: props.file.name,
        status: 'uploading',
        percent: 0,
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

function parseFile(file, callback) {
    var fileSize   = file.size;
    var chunkSize  = 64 * 1024; // bytes
    var offset     = 0;
    var self       = this; // we need a reference to the current object
    var chunkReaderBlock = null;

    var readEventHandler = function(evt) {
        if (evt.target.error == null) {
            offset += evt.target.result.length;
            callback(evt.target.result); // callback for handling read chunk
        } else {
            console.log("Read error: " + evt.target.error);
            return;
        }
        if (offset >= fileSize) {
            console.log("Done reading file");
            return;
        }

        // of to the next chunk
        chunkReaderBlock(offset, chunkSize, file);
    }

    chunkReaderBlock = function(_offset, length, _file) {
        var r = new FileReader();
        var blob = _file.slice(_offset, length + _offset);
        r.onload = readEventHandler;
        r.readAsText(blob);
    }

    // now let's start the read with the first block
    chunkReaderBlock(offset, chunkSize, file);
}

// https://stackoverflow.com/questions/14438187/javascript-filereader-parsing-long-file-in-chunks

export default UploadFile;