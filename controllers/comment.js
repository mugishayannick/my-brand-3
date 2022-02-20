import comment from "../models/comment.js";


export async function commentArticle (req, res) {
    const comm = comment({
        author: 'yannick',
        comment: req.body.comment,
       
      });
      comm.save(result).then(
        () => {
            post.findById(re.params.id, (err,post) => {
                if(err){
                    console.log(err);
                }else {
                    
                    post.comment.push(result);
                    post.save();
                    console.log('=======comments=======');
                    console.log(post.comments);
                }
            })
          res.status(201).json({
            article: 'comment added successfully!'
          });
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
    }