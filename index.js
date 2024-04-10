import express from "express"
import bodyParser from "body-parser"
import pg from "pg"
import axios from "axios"

const app=express();
const port=3000;

const db=new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"news gdsc",
    password:"aryan5567",
    port:5432
  });
  db.connect();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.render("index.ejs")
})

app.get("/category/:type",async(req,res)=>{
    const type=req.params.type;
    console.log(type)
    const result = await db.query("SELECT * FROM story WHERE category=$1",[type]);
    for(i=0;i<result.rows.length;i++)
    {
        console.log(result.rows[i].content)
        console.log(result.rows[i].author)
    }
    //  res.render("category.ejs",{content:stories})
})
var comment=[],author=[]
var i
app.get("/comments/:story_id",async(req,res)=>{
    const id=req.params.story_id;
    console.log(id)
    const res1=await db.query("SELECT * FROM comments WHERE story_id=$1",[id]);
    const res2=await db.query("SELECT * FROM comments WHERE story_id=$1",[id]);
    for(i=0;i<res1.rows.length;i++)
    {
        console.log(res1.rows[i].content);
        console.log(res2.rows[i].author);
    }
    //res.render("comments.ejs",{comment:comment,author:author})
})

app.get("/users/:username",async(req,res)=>{
    const username=req.params.username;
    const profile=await db.query("SELECT * FROM users WHERE username=$1",[username]);
    console.log(profile.rows[0].submissions+" "+profile.rows[0].points)
    const res3=await db.query("SELECT * FROM comments WHERE author=$1",[username]);
    for(i=0;i<res3.rows.length;i++)
    {
        console.log(res3.rows[i].content);
    }
    //res.render("profile.ejs",{username:username,submissions:submissions,comments:comments,points:points})
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

