import express, { Request, Response } from 'express';
const fileUpload = require('express-fileupload');
const fs = require('fs');
const rimraf = require('rimraf');
import { zip } from 'zip-a-folder';
const path = require('path')

import { traduzirXmlLondrina } from './functions/Londrina/traduzir-xml'
import { traduzirXmlCuritiba } from './functions/Curitiba/traduzir-xml'
import { traduzirXmlCambe } from './functions/Cambe/traduzir-xml'
import { traduzirXmlApucarana_SantoAntonio } from './functions/Apucarana_SantoAntonio/traduzir-xml';
import { traduzirXmlRolandia } from './functions/Rolandia/traduzir-xml';

interface MulterRequest extends Request {
    files: any;
}
const app = express()
const port = 3200

app.use(express.json())
app.use(fileUpload({}))


app.post('/traduzir-xml/londrina', async(req: Request, res: Response) => {
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

        var resposta = await traduzirXmlLondrina(xml_file_path, xml_file_name, new_xml_folder);

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

            var resposta = await traduzirXmlLondrina(xml_file_path, xml_file_name, new_xml_folder);
            
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


app.post('/traduzir-xml/curitiba', async(req: Request, res: Response) => {
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

        var resposta = await traduzirXmlCuritiba(xml_file_path, new_xml_folder);

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

            var resposta = await traduzirXmlCuritiba(xml_file_path, new_xml_folder);
            
            var obj = {
                [xml_file_name]: resposta.message
            }

            status_tradutor.push(obj);

        }
    }
    rimraf.sync(`./${old_xml_folder}`);
    res.send(status_tradutor)

})

app.get('/xml-files/curitiba', async (req: Request, res: Response) => {
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


app.post('/traduzir-xml/cambe', async (req: Request, res: Response) => {
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

        var resposta = await traduzirXmlCambe(xml_file_path, xml_file_name, new_xml_folder);

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

            var resposta = await traduzirXmlCambe(xml_file_path, xml_file_name, new_xml_folder);
            
            var obj = {
                [xml_file_name]: resposta.message
            }

            status_tradutor.push(obj);

        }
    }
    rimraf.sync(`./${old_xml_folder}`);
    res.send(status_tradutor)

})

app.get('/xml-files/cambe', async(req: Request, res: Response) => {
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


app.post('/traduzir-xml/apucarana', async(req: Request, res: Response) => {
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

        var resposta = await traduzirXmlApucarana_SantoAntonio(xml_file_path, xml_file_name, new_xml_folder);

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

            var resposta = await traduzirXmlApucarana_SantoAntonio(xml_file_path, xml_file_name, new_xml_folder);
            
            var obj = {
                [xml_file_name]: resposta.message
            }

            status_tradutor.push(obj);

        }
    }
    rimraf.sync(`./${old_xml_folder}`);
    res.send(status_tradutor)

})

app.get('/xml-files/apucarana', async (req: Request, res: Response) => {
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


app.post('/traduzir-xml/santo-antonio-da-platina', async(req: Request, res: Response) => {
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

        var resposta = await traduzirXmlApucarana_SantoAntonio(xml_file_path, xml_file_name, new_xml_folder);

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

            var resposta = await traduzirXmlApucarana_SantoAntonio(xml_file_path, xml_file_name, new_xml_folder);
            
            var obj = {
                [xml_file_name]: resposta.message
            }

            status_tradutor.push(obj);

        }
    }
    rimraf.sync(`./${old_xml_folder}`);
    res.send(status_tradutor)

})

app.get('/xml-files/santo-antonio-da-platina', async (req: Request, res: Response) => {
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


app.post('/traduzir-xml/rolandia', async(req: Request, res: Response) => {
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

        var resposta = await traduzirXmlRolandia(xml_file_path, xml_file_name, new_xml_folder);

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

            var resposta = await traduzirXmlRolandia(xml_file_path, xml_file_name, new_xml_folder);
            
            var obj = {
                [xml_file_name]: resposta.message
            }

            status_tradutor.push(obj);

        }
    }
    rimraf.sync(`./${old_xml_folder}`);
    res.send(status_tradutor)

})

app.get('/xml-files/rolandia', async (req: Request, res: Response) => {
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