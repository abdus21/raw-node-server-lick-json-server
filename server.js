import http from 'http';
import dotenv from 'dotenv';
import { readFileSync, writeFileSync} from 'fs'
import  {findlastId}  from './utility/function.js';

// enverment setup
dotenv.config()
const PORT = process.env.SERVER_PORT;



// Data management
let student_json = readFileSync('./data/db.json')
let student_obj = JSON.parse(student_json) 

// server create

http.createServer((req,res) =>{

    if( req.url == '/api/student' && req.method == 'GET'){

        res.writeHead(200,{'Content-Type' : 'application/json'});
        res.end( student_json);
    }else if( req.url.match(/\/api\/student\/[0-9]{1,}/) && req.method == 'GET' ){
          let id = req.url.split('/')[3]

          if(student_obj.some(stu => stu.id == id)){

            res.writeHead(200,{'Content-Type' : 'application/json'});
            res.end( JSON.stringify(student_obj.find(data => data.id == id)) );
          }else{
            res.writeHead(200,{'Content-Type' : 'application/json'});
            res.end( JSON.stringify({
                massage : "student not found"
            }) );
          }
          
    } else if(req.url == '/api/student' && req.method == 'POST'){

        // POST data resive
        let data = ''
        req.on('data', (chunk)=>{
            data += chunk.toString()

        });

        req.on('end', ()=>{
            let {name,age,cell,location} = JSON.parse(data)

            student_obj.push({
                id : findlastId(student_obj),
                name : name,
                age : age,
                cell : cell,
                location : location
            })
            writeFileSync('./data/db.json',JSON.stringify(student_obj))
        })

        res.writeHead(200,{'Content-Type' : 'application/json'});
            res.end( JSON.stringify({
                massage : 'POSt method is okay'
            }) );
    }else if(req.url.match(/\/api\/student\/[0-9]{1,}/) && req.method == 'DELETE'){
        let id = req.url.split('/')[3]
       let data =  student_obj.filter(stu => stu.id != id);

       writeFileSync('./data/db.json', JSON.stringify(data));
        res.writeHead(200,{'Content-Type' : 'application/json'});
        res.end( JSON.stringify({
            massage : 'DELETE method is okay'
        }) );
    }else if(req.url.match(/\/api\/student\/[0-9]{1,}/) && req.method == 'PATCH'){
        let id = req.url.split('/')[3]


        if(student_obj.some(stu => stu.id == id)){
            let data = ''
            req.on('data' , (chunk) =>{

                    data += chunk.toString()
                
            });

            req.on('end', ()=>{
                let index =  student_obj.findIndex(stu => stu.id == id);
                let {name,age,location,cell} = JSON.parse(data);
                
                student_obj[index] ={
                    id : parseInt(id),
                    name : name,
                    age : age,
                    location : location,
                    cell : cell
                }
                writeFileSync('./data/db.json', JSON.stringify(student_obj));
            })

            res.writeHead(200,{'Content-Type' : 'application/json'});
            res.end(JSON.stringify(student_obj.find(data => data.id == id)))
        }else{

            res.writeHead(200,{'Content-Type' : 'application/json'});
            res.end( JSON.stringify({
                massage : 'id not found'
            }) );
        }

     } else{
        res.writeHead(200,{'Content-Type' : 'application/json'});
        res.end(JSON.stringify({
            error : "Invalid Rout"
        }));
    }
   
}).listen(PORT,()=>{
    console.log(`out server is runnig on port ${PORT}`);
})