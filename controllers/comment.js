import comment from "../models/comment.js";

export async function commentArticle (req, res) {
    const comm = comment({
        author: req.body.author,
        comment: req.body.comment,
       
      });
      comm.save().then(
        () => {
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