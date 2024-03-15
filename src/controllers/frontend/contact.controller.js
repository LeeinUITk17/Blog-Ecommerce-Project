const nodemailer = require("nodemailer");
const mailReplyContent = require('../../helper/mailreply');
const {
  addItem,
  getItems,
  deleteItem,
  getItemById,
  updateItem,
  getStatusCounts,
}=require('../../services/frontendContact.service');
class ContactController {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mrtaivietbac@gmail.com',
                pass: 'wxuh ffky dcfo edqh'
            }
        });
    }

    getAll = async (req, res, next) => {
        res.render('frontend/contact');
    }

    sendContactMail = async (req, res, next) => {
        try {
            const { Name, Email, Message } = req.body;
          await addItem(req.body);
            // Invoke the mailReplyContent function to get the actual content
            const replyContent = mailReplyContent();
            
            const mailOptions = {
                from: 'mrtaivietbac@gmail.com',
                to: Email,
                subject: `Thank you for your feedback, ${Name}!`, 
                html: `<p>Dear ${Name},</p><p>${replyContent}</p>`, 
            };
    
            await this.transporter.sendMail(mailOptions);
            res.redirect('/home');
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } 
    }
}

module.exports = new ContactController();
