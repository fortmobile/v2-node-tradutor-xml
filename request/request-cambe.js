const axios = require('axios');
const decompress = require('decompress');
const FormData = require('form-data');
const fs = require('fs');
const rimraf = require('rimraf')

async function postXML(new_xml_folder, zip_path){
    try{
        var data = new FormData();
        const old_xml_folder = (Number(new_xml_folder) + 1).toString();

        fs.mkdirSync(`./${old_xml_folder}`);

        await decompress(zip_path, `./${old_xml_folder}`);

        const unzip_files = fs.readdirSync(`./${old_xml_folder}`)

        for(i = 0; i < unzip_files.length; i++){
            data.append('file', fs.createReadStream(`./${old_xml_folder}/${unzip_files[i]}`));
        }
        data.append('folder_name', new_xml_folder)


        var config = {
            method: 'post',
            url: 'http://localhost:3200/traduzir-xml/cambe',
            data : data
        };

        response = await axios(config)
        console.log(response.data)

        rimraf.sync(`./${old_xml_folder}`)

        fs.writeFileSync('feedback.json', (JSON.stringify(response.data)))
    }
    catch(error){
        console.log(error)
    }
}

async function getXML(new_xml_folder){
    try {
        var config = {
            method: 'get',
            url: `http://localhost:3200/xml-files/cambe?xml_path=${new_xml_folder}`,
            responseType: "arraybuffer"
        }

        const response = await axios(config)
        fs.writeFileSync(`./${new_xml_folder}.zip`, response.data)


    } catch (error) {
        console.log(error)
    }
}


async function request(zip_path){
    try {
        const new_xml_folder = (new Date().getTime())


        await postXML(new_xml_folder, zip_path);

        await getXML(new_xml_folder)
        

    } catch (error) {
        console.log(error)
    }
}

request('./testes/Cambe/teste.zip')