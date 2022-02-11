import Message from "../models/message.js";



export const createMessage = (req, res, next) => {
    const message = new Message({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    });
    message.save().then(
      () => {
        res.status(201).json({
          message: 'message sent successfully'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

  
  export const getAllMessage = (req, res, next) => {
    Message.find().then(
        (messages) => {
            res.status(200).json(messages);
        }
    ).catch(
        (error) => {
            console.log(error);
            res.status(400).json({
                error: error
            });
        }
    );
   
    };

    export const getOneMessage = (req, res, next) => {
      const id = req.params.id
      Message.findById(id).then(
          (message) => {
            if(!message){
              res.status(400).json({
                // error: error,
                message: "Message not found"
               
            });
            }
            res.status(200).json(message);
          }
           
        
      ).catch(
          (error) => {
              console.log(error);
              res.status(400).json({
                  error: error
              });
          }
      );
     
      };    
   
