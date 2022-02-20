import  Article  from "../models/article.js"

export async function getArticle (req, res, next) {
    let article
    try {
        article = await Article.findById(req.params.id)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    res.article = article
    next()
}

export const createArticle = (req, res, next) => {
    const article =  Article({
      title: req.body.title,
      content: req.body.content,
      imageUrl: req.body.imageUrl,
      userId: req.body.userId
    });
    article.save().then(
      () => {
        res.status(201).json({
          article: 'Article saved successfully!'
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


export const getOneArticle =(req, res, next) => {
    Article.findOne({
        _id: req.params.id
    }).populate('comments').exec .then(
        (article) => {
                res.status(200).json(article)
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};


export const modifyArticle = async (req, res, next) => {
    if(!req.body.title) res.article.title = req.body.title
    if(!req.body.content) res.article.content = req.body.content
    if(!req.body.imageUrl) res.article.imageUrl = req.body.imageUrl
    try {
        const updatedArticle = await res.article.save()
        res.status(201).json(updatedArticle)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
   
};


export const deleteArticle = (req, res, next) =>{
    Article.findOne({ _id: req.params.id }).then(
        (article) => {
            if (!article){
               return res.status(404).json({
                    error: new Error('No such article')
                });
            }
            Article.deleteOne({_id: req.params.id}).then(
                () => {
                    res.status(200).json({
                        article: 'Deleted'
                    });
                }
            ).catch(
                (error) => {
                   res.status(401).json({
                       error: error
                   });
                }
            );
        }
    );
    
};


export const getAllArticles= (req, res, next) => {
    Article.find().then(
        (articles) => {
            res.status(200).json(articles);
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




