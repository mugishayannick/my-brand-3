import chai from "chai";
import chaiHttp from "chai-http";
import  app  from "../app.js";


//assertion style

chai.should();

chai.use(chaiHttp);
const userReg = {
     "firstName": "yannick",
     "lastName": "mugi",
     "email": "yannick@gmail.com",
     "password": "yan123",
     "confirmPassword": "yan123"
}

describe("test API", () => {
  /**
   * test the get api
   */

  describe("GET /api/post", () => {
    it("It should GET all the posts", (done) => {
      chai.request(app)
        .get("/api/post")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          done();
        });
    });

    it("It should not GET all the posts", (done) => {
      chai
        .request(app)
        .get("/api/pos")
        .end((err, response) => {
          response.should.have.status(404);

          done();
        });
    });
  });
  /**
   * Test the post new route
   */

  describe("SEND /api/post", () => {
    it("It should create new post", (done) => {

      chai
        .request(app)
        .post("/api/post")
        .set({
            Authorization: `Bearer ${process.env.TEMP_TOKEN}`,
        })
        .send({
          title: "why",
          content: "jdshfh",
          imageUrl: "kdsc.pg",
          userId: "djend_23",
        })
        .end((err, response) => {
          response.should.have.status(201);
          // response.body.should.be.a('object');
          // response.body.length.should.be.equal(3);
              done();
        });
      
    });
    it("It should signup a user", (done) => {
        chai
          .request(app)
          .post("/api/auth/signup")
          .send(userReg)
          .end((err, response) => {
            response.should.have.status(201);
            response.body.should.be.a('object');
            console.log(userReg)
            done();
          });
        
      });
  });
});

 /**
  * test a login api
  */

describe("LOGIN /api/auth/login", () => {
  it("It should login a user", (done) => {
    chai
      .request(app)
      .post("/api/auth/login")
      // .set({
      //     Authorization: `Bearer ${process.env.TEMP_TOKEN}`,
      // })
      .send({
        email: "ama@gmail.com",
        password: "yan123",
      })
      .end((err, response) => {
        response.should.have.status(200);
        response.should.have.property("token");
        token = response.body.token;
      });
    done();
  });
});

/**
 * test get API message
 */
describe("/GET api/message", () => {
  it(" should get messages ", (done) => {
    chai
      .request(app)
      .get("/api/message")
      // .set('Authorization', 'JWT ' + token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
      });
    done();
  });
  it(" should not get messages ", (done) => {
    chai
      .request(app)
      .get("/api/messag")
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
      });
    done();
  });
});
/**
 * test An API post message */

describe("POST /api/message", () => {
  it(" should POST a message", (done) => {
    let message = {
      name: "yan",
      email: "ker@gmail.com",
      message: "This is a message"
    };

    chai
      .request(app)
      .post("/api/message")
      .send(message)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
      });
    done();
  });
  it(" should not POST a message", (done) => {
    let message = {
      name: "yan",
      email: "am@gmail.com",
      message: "This is a message",
    };

    chai
      .request(app)
      .post("/api/messag")
      .send(message)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a("object");
      });
    done();
  });
});

describe("DELETE /api/message", () => {
    it(" should Delete a message", (done) => {
      let message = {
        name: "yan",
        email: "yan@gmail.com",
        message: "This is a message",
      };
  
      chai
        .request(app)
        .delete("/api/message")
        .send(message)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          
        });
        done();
    });
    it(" should not Delete a message", (done) => {
      let message = {
        name: "yannick",
        email: "yan@gmail.com",
        message: "dfkijviifv",
      };
  
      chai
        .request(app)
        .delete("/api/messag")
        .send(message)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
        });
      done();
    });
  });

  describe("DELETE /api/post/id", () => {
    it(" should Delete a post by id", (done) => {
      let post = {
        title: "why",
        content: "jdshfh",
        image: "kdsc.pg",
        userId: "dfkijviifv"
      };
  
      chai
        .request(app)
        .delete("/api/post/id")
        .set({
            Authorization: `Bearer ${process.env.TEMP_TOKEN}`,
          })
        .send(post)
        
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          
        });
        done();
    });
    it(" should not Delete a post by id", (done) => {
      let pos = {
        title: "why",
        content: "jdshfh",
        image: "kdsc.pg",
        userId: "dfkijviifv"
      };
  
      chai
        .request(app)
        .delete("/api/pos/id")
        .send(pos)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
        });
      done();
    });
  });
  describe("Patch /api/post/id", () => {
    it(" should update a post by id", (done) => {
      let post = {
        title: "why",
        content: "jdshfh",
        image: "kdsc.pg",
        userId: "dfkijviifv"
      };
  
      chai
        .request(app)
        .delete("/api/post/id")
        .set({
            Authorization: `Bearer ${process.env.TEMP_TOKEN}`,
          })
        .send(post)
        
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          
        });
        done();
    });
    
})
