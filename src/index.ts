import express, { Request, Response } from 'express';
const fileUpload = require('express-fileupload');
const fs = require('fs');
const rimraf = require('rimraf');
import { zip } from 'zip-a-folder';
const path = require('path')

import { traduzirXML } from './functions/Londrina/traduzir-xml'

interface MulterRequest extends Request {
    files: any;
}
const app = express()
const port = 3200

app.use(express.json())
app.use(fileUpload({}))


app.post('/traduzir-xml/londrina', async(req: Request, res: Response, ) => {
    var status_tradutor = [];
    const documentFile = (req as MulterRequest).files

    const new_xml_folder = ((req as MulterRequest).body.folder_name).toString();
    const old_xml_folder = (Number(new_xml_folder) + 1).toString();
    fs.mkdirSync(new_xml_folder)
    fs.mkdirSync(old_xml_folder)

    if ((req as MulterRequest).files.file.length == undefined){
        var xml_buffer = (req as MulterRequest).files.file.data;

        var xml_file_name = (req as MulterRequest).files.file.name as string;;

        var xml_file_path = `${old_xml_folder}/${xml_file_name}`

        await fs.writeFileSync(xml_file_path, xml_buffer);

        var resposta = await traduzirXML(xml_file_path, xml_file_name, new_xml_folder);

        var obj = {
            [xml_file_name]: resposta.message
        }

        status_tradutor.push(obj);

    }
    else {
        for(let p = 0; p < (req as MulterRequest).files.file.length; p++){
            var xml_buffer = (req as MulterRequest).files.file[p].data;

            var xml_file_name = (req as MulterRequest).files.file[p].name as string;

            var xml_file_path = `${old_xml_folder}/${xml_file_name}`

            await fs.writeFileSync(xml_file_path, xml_buffer);

            var resposta = await traduzirXML(xml_file_path, xml_file_name, new_xml_folder);
            
            var obj = {
                [xml_file_name]: resposta.message
            }

            status_tradutor.push(obj);

        }
    }
    rimraf.sync(`./${old_xml_folder}`);
    res.send(status_tradutor)

})


app.get('/xml-files/londrina', async (req: Request, res: Response) => {
     try{
        const folder_name = req.query.xml_path;

        await zip(`./${folder_name}`, `${folder_name}.zip`);
          
        var options = {
            root: path.join(__dirname)
        };
            
        var fileName = `${folder_name}.zip`;
        res.sendFile(fileName, options, function(){
            fs.unlinkSync(`${folder_name}.zip`)
        });

        rimraf.sync(`./${folder_name}`);


  }
    catch(error){
          res.send(error)
  }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })