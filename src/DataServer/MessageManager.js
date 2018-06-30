import {
    postMessageURL,
    postCommentURL,
    allMessagesURL,
    allCommentsURL,
} from './URLConfig';

class MessageManager{
    async postMessage(title,content,image){
        try{
            const formData=new FormData();
            formData.append('accept_token',localStorage.acess_token);
            formData.append('title',title);
            formData.append('content',content);
            image.map((item,index)=>{
                return formData.append(`image${index}`,item.file);
            })

            const res=await fetch(postMessageURL,{
                method:'POST',
                body:formData
            });

            const result =await res.json();

            console.log(result);

            return result;
        }catch(error){
            return{
                success:false,
                eooroMessage:'网络错误'
            }
        }
    }

    async postComment(messageID,content){
        try{
            const comment={
                access_token:localStorage.access_token,
                messageID,
                content
            }

            const res=await fetch(postCommentURL,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(comment)
            });

            const result =await res.json();

            console.log(result);

            return result;
        }catch(error){
            return{
                success:false,
                eooroMessage:'网络错误'
            }
        }
    }

    async allMessages(){
        try{
            const message={
                access_token:localStorage.access_token
            }

            const res=await fetch(allMessagesURL,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Typr':'application/json',
                },
                body:JSON.stringify(message)
            })

            const result=await res.json();

            return result;
        }catch(error){
            return{
                success:false,
                errorMessage:'网络错误'
            }
        }
    }

    async allComments(messageID){
        try {
            const comment={
                access_token:localStorage.access_token,
                messageID,
            }
            const res=await fetch(allCommentsURL,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(comment)
            })

            const result= res.json();

            return result;
        } catch (error) {
            return{
                success:false,
                errorMessage:'网络错误'
            }
        }
    }
}
