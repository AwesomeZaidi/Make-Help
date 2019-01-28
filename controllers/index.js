const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
const Event = require('../models/event');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// read into mongoose methods.
router.get('/', (req,res) => {
    res.render('enter')
});

router.get('/bio', (req,res) => {
    res.render("bio");
});

router.get('/photos', (req,res) => {
    res.render("photos");
});

router.get('/events', (req,res) => {
    Event.find().then((events) => {
        if (events.length > 4) {
            eventsTooLong = true;
        } else {
            eventsTooLong = false;
        }
        res.render("events", {events, eventsTooLong} );
    }).catch(err => {
        console.log(err);
    });
});

router.get('/contact', (req,res) => {
    res.render("contact");
});

router.post('/contact', (req,res) => {
    // setup email data with unicode symbols
    const name = req.body.name +" " + req.body.surname;
    const email = req.body.email;
    const phone = req.body.phone;
    const message = req.body.message;

    // using SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    const msg = {
    to: 'client@email.com',
    from: `"${name} 👻" <${email}>`,
    subject: 'Site Contact Form ✔',
    text: message,
    html: `<p>${message}</p>
        <p><u>Contact Number: ${phone}</u></p>`,
    };
    sgMail.send(msg);
    console.log("sent msg: ", msg);
    
    successMsg = "Thanks for contacting Client. I'll get back to you soon!"
    res.render('contact', {successMsg})
});

// SUBREDDIT
// router.get("/n/:subreddit", function(req, res) {
// Post.find({ subreddit: req.params.subreddit })
//     .then(posts => {
//     res.render("posts_show.hbs", { posts });
//     })
//     .catch(err => {
//     console.log(err);
//     });
// });

// router.get('/posts/new', (req,res) => {
//     res.render('posts_new');
// });

// router.post('/posts/new', (req,res) => {
//     const post = new Post(req.body);
//     post.save((err, post) => {
//         res.redirect(`/`);
//     })
// });



module.exports = router;