import chai from "chai";
import chaiHttp from "chai-http";
// import { resource, response } from '../app.js';
import { app as server } from "../app.js";

//assertion style
chai.should();

chai.use(chaiHttp);

describe("test API", () => {
  /**
   * test the get api
   */

  describe("GET /api/post", () => {
    it("It should GET all the posts", (done) => {
      chai
        .request(server)
        .get("/api/post")
        // .set({
        //     Authorization: `Bearer ${process.env.TEMP_TOKEN}`,
        // })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          // response.body.length.should.be.equal(3);
          done();
        });
    });

    it("It should not GET all the posts", (done) => {
      chai
        .request(server)
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
        .request(server)
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
          .request(server)
          .post("/api/auth/signup")
          // .set({
          //     Authorization: `Bearer ${process.env.TEMP_TOKEN}`,
          // })
          .send({
            firstName: "yannick",
            lastName: "mugisha",  
            email: "axo@gmail.com",
            password: "yan123",
            confirmPassword: "yan123"
          })
          .end((err, response) => {
            response.should.have.status(201);
            // response.body.should.be.a('object');
            
          });
        done();
      });
  });
});

 /**
  * test a login api
  */

describe("LOGIN /api/auth/login", () => {
  it("It should login a user", (done) => {
    chai
      .request(server)
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
      .request(server)
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
      .request(server)
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
      .request(server)
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
      .request(server)
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
        .request(server)
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
        .request(server)
        .delete("/api/messag")
        .send(message)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
        });
      done();
    });
  });

  describe("DELETE /api/post", () => {
    // it(" should Delete a post", (done) => {
    //   let post = {
    //     title: "why",
    //     content: "jdshfh",
    //     image: "kdsc.pg",
    //     userId: "dfkijviifv"
    //   };
  
    //   chai
    //     .request(server)
    //     .delete("/api/post")
    //     .set({
    //         Authorization: `Bearer ${process.env.TEMP_TOKEN}`,
    //       })
    //     // .send(post)
        
    //     .end((err, res) => {
    //       res.should.have.status(201);
    //       res.body.should.be.a("object");
          
    //     });
    //     done();
    // });
    it(" should not Delete a post", (done) => {
      let pos = {
        title: "why",
        content: "jdshfh",
        image: "kdsc.pg",
        userId: "dfkijviifv"
      };
  
      chai
        .request(server)
        .delete("/api/pos")
        .send(pos)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
        });
      done();
    });
  });

