const{
    addItem,
}=require('../../services/bill.service');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const {invoice} = require('../../helper/mailreply');
const jwtHelper = require('../../helper/jwt.helper');
const {  generateToken } = jwtHelper;
class thanksController {
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
        res.render('product/thanks');
    }
    add=async(req,res,next)=>{
      // console.log(req.body);
       await addItem(req.body);
       try {
        const { receiver,list,total } = req.body;
        console.table(receiver);
        console.table(list);
        ;
        
        const mailOptions = {
            from: 'mrtaivietbac@gmail.com',
            to: receiver.mail,
            subject: `Thank you for your purchase, ${receiver.name}!`, 
            html: `${invoice(receiver.name,list,total,receiver.address)}`, 
        };
        await this.transporter.sendMail(mailOptions);
     } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    } 
       const token = req.cookies.token;
if (token) {
    try {
        const decodedToken = jwt.verify(token, 'cnttvietnhatk17');
        const updatedProductIds = []; 
        const updatedToken = generateToken(decodedToken.userId, decodedToken.username, updatedProductIds);
        res.cookie('token', updatedToken);
    } catch (error) {
        console.error('JWT Verification Error:', error);
        return res.status(500).send('Internal Server Error');
    }
}

       return res.redirect('/shop/thanks');
      }
}

module.exports = new thanksController();