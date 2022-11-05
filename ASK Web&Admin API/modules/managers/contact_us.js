'use strict';

let BadRequestError = require('../errors/badRequestError'),
    ContactUSModel = require('../models/contact_us'),
    ContactUSSeoModel = require('../models/contact_us_seo'),
    ObjectId = require('mongoose').Types.ObjectId,
    MailHelper = require('../helpers/sendmail');

let addContactUsSeo = async (body) => {
    let updateData = {};
    let optionalFiled = ["seotitle", "seodescription", "seokeyword"];
    optionalFiled.forEach(x => {
        if (body[x]) {
            updateData[x] = body[x];
        }
    });

    let isAvailable = await ContactUSSeoModel
        .findOne()
        .select({ _id: 1 })
        .lean()
        .exec();
    if (!isAvailable) {
        await ContactUSSeoModel(updateData).save();
    } else {
        await ContactUSSeoModel
            .updateOne({ _id: ObjectId(isAvailable._id) }, { $set: updateData })
            .exec();
    }
    return true;
}
let getContactUsSeo = async (body) => {
    let initialData = await ContactUSSeoModel.findOne().collation({ 'locale': 'en' }).select().lean().exec()
    return initialData;
}

let addContactUs = async (req) => {
    let body = req.body;
    if (!body.name) {
        throw new BadRequestError('Name can not empty');
    }
    if (!body.email) {
        throw new BadRequestError('Email can not empty');
    }
    if (!body.city) {
        throw new BadRequestError('City can not empty');
    }
    if (!body.state) {
        throw new BadRequestError('State can not empty');
    }
    if (!body.phone) {
        throw new BadRequestError('Phone can not empty');
    }
    if (!body.message) {
        throw new BadRequestError('Message can not empty');
    }

    let contactUsData = {
        name: body.name,
        email: body.email,
        phone: body.phone,
        city: body.city,
        state: body.state,
        message: body.message,

    }

    let contactAdded = await ContactUSModel(contactUsData).save();
    if (contactAdded) {
        let to = "info@allsouthflooring.com,jess.pickman@allsouthflooring.com"
        //let to = "sagarss191@gmail.com"
        let subject = "Contact Us Form Filled"
        let htmlData = `<br>Name: ${body.name},<br>Email: ${body.email},
        <br>Phone: ${body.phone},
        <br>City: ${body.city},
        <br>State: ${body.state},
        <br>Message: ${body.message}`
        let info = await MailHelper.sendMail(to, subject, htmlData);
        console.log(info)
    }
    return contactAdded;
}
let orderForm = async (req) => {
    let body = req.body;
    let htmlData = "";
    htmlData = '<html>	<body>';
    htmlData += '<table>';
    htmlData += '<tr>';
    htmlData += '<td>Rep: ';
    htmlData += '</td>';
    htmlData += '<td>';
    htmlData += body.rep;
    htmlData += '</td>';
    htmlData += '</tr>';

    htmlData += '<tr>';
    htmlData += '<td>Customer: ';
    htmlData += '</td>';
    htmlData += '<td>';
    htmlData += body.customer;
    htmlData += '</td>';
    htmlData += '</tr>';
    htmlData += '<tr>';
    htmlData += '<td>Location: ';
    htmlData += '</td>';
    htmlData += '<td>';
    htmlData += body.location;
    htmlData += '</td>';
    htmlData += '</tr>';
    htmlData += '<tr>';
    htmlData += '<td>PO: ';
    htmlData += '</td>';
    htmlData += '<td>';
    htmlData += body.po;
    htmlData += '</td>';
    htmlData += '</tr>';

    body.products.forEach(element => {
        htmlData += '<tr>';
        htmlData += '<td>Product Description: ';
        htmlData += '</td>';
        htmlData += '<td>';
        htmlData += element.pdescription;
        htmlData += '</td>';
        htmlData += '</tr>';
        htmlData += '<tr>';
        htmlData += '<td>Color: ';
        htmlData += '</td>';
        htmlData += '<td>';
        htmlData += element.color;
        htmlData += '</td>';
        htmlData += '</tr>';
        htmlData += '<tr>';
        htmlData += '<td>Item Code: ';
        htmlData += '</td>';
        htmlData += '<td>';
        htmlData += element.itemcode;
        htmlData += '</td>';
        htmlData += '</tr>';
        htmlData += '<tr>';
        htmlData += '<td>UOM: ';
        htmlData += '</td>';
        htmlData += '<td>';
        htmlData += element.uom;
        htmlData += '</td>';
        htmlData += '</tr>';
        htmlData += '<tr>';
        htmlData += '<td>Quantity: ';
        htmlData += '</td>';
        htmlData += '<td>';
        htmlData += element.quantity;
        htmlData += '</td>';
        htmlData += '</tr>';
        htmlData += '<tr>';
        htmlData += '<td>Price: ';
        htmlData += '</td>';
        htmlData += '<td>';
        htmlData += element.price;
        htmlData += '</td>';
        htmlData += '</tr>';
        htmlData += '<tr>';
        htmlData += '<td>Delivered: ';
        htmlData += '</td>';
        htmlData += '<td>';
        htmlData += element.delivered ? "Yes" : "No";
        htmlData += '</td>';
        htmlData += '</tr>';

    });


    htmlData += '<tr>';
    htmlData += '<td>Shipping Details: ';
    htmlData += '</td>';
    htmlData += '<td>';
    htmlData += body.shipping;
    htmlData += '</td>';

    htmlData += '<tr>';
    htmlData += '<td>Additional Details: ';
    htmlData += '</td>';
    htmlData += '<td>';
    htmlData += body.additional;
    htmlData += '</td>';

    htmlData += '</table>';
    htmlData += '</body></html>';
    let cc = body.rep.toLowerCase().split(" ").join(".") + "@allsouthflooring.com";
    // cc="sagar@jtechappz.com";
    // body.sendto = "sagarss191@gmail.com"
    let info = await MailHelper.sendMail(body.sendto, "Order Form Filled", htmlData, cc);
    return true
    //let info = await MailHelper.sendMail("sagarss191@gmail.com", "Order Form Filled", htmlData,cc);
    //console.log(info)
}
let CreditApplicationForm = async (req) => {
    let body = JSON.parse(req.body.body);
    //console.log(body.company)
    let htmlData = "";
    htmlData = '<html>	<body>';
    htmlData += '<h1>Company Information</h1>';
    htmlData += '<table border="1">';
    htmlData += '<tr>';
    htmlData += '<td>Legal Company Name:';
    htmlData += '</td>';
    htmlData += '<td>';
    htmlData += body.company.legalcompany;
    htmlData += '</td>';
    htmlData += '</tr>';
    htmlData += '<tr>';
    htmlData += '<td>DBA:';
    htmlData += '</td>';
    htmlData += '<td>';
    htmlData += body.company.dba;
    htmlData += '</td>';
    htmlData += '</tr>';
    htmlData += '<tr>';
    htmlData += '<td>Company Type:';
    htmlData += '</td>';
    htmlData += '<td>';
    htmlData += body.company.companytype;
    htmlData += '</td>';
    htmlData += '</tr>';
    htmlData += '<tr>';
    htmlData += '<td>Inception Date:';
    htmlData += '</td>';
    htmlData += '<td>';
    htmlData += body.company.inceptiondate;
    htmlData += '</td>';
    htmlData += '</tr>';
    htmlData += '<tr>';
    htmlData += '<td>Shipping Address:';
    htmlData += '</td>';
    htmlData += '<td>';
    htmlData += body.company.shipping;
    htmlData += '</td>';
    htmlData += '</tr>';
    htmlData += '<tr>';
    htmlData += '<td>Billing Address:';
    htmlData += '</td>';
    htmlData += '<td>';
    htmlData += body.company.billingaddress;
    htmlData += '</td>';
    htmlData += '</tr>';
    htmlData += '<tr>';
    htmlData += '<td>Tax ID:';
    htmlData += '</td>';
    htmlData += '<td>';
    htmlData += body.company.taxid;
    htmlData += '</td>';
    htmlData += '</tr>';
    htmlData += '<tr>';
    htmlData += '<td>Sales Tax Exempt:';
    htmlData += '</td>';
    htmlData += '<td>';
    htmlData += body.company.isVisible ? "Yes" : "No";
    htmlData += '</td>';
    htmlData += '</tr>';
    htmlData += '<tr>';
    htmlData += '<td>Name:';
    htmlData += '</td>';
    htmlData += '<td>';
    htmlData += body.company.name;
    htmlData += '</td>';
    htmlData += '</tr>';
    htmlData += '<tr>';
    htmlData += '<td>Title:';
    htmlData += '</td>';
    htmlData += '<td>';
    htmlData += body.company.title;
    htmlData += '</td>';
    htmlData += '</tr>';
    htmlData += '<tr>';
    htmlData += '<td>Contact Information:';
    htmlData += '</td>';
    htmlData += '<td>';
    htmlData += body.company.contactinfo;
    htmlData += '</td>';
    htmlData += '</tr>';
    htmlData += '</table>';
    htmlData += '</body></html>';


    htmlData += '<h1>Credit Information</h1>';
    htmlData += '<table border="1">';
    htmlData += '<tr>';
    htmlData += '<td>Are you requesting Credit Terms:';
    htmlData += '</td>';
    htmlData += '<td>';
    htmlData += body.credit.radioselected ? "Yes" : "No";
    htmlData += '</td>';
    htmlData += '</tr>';

    body.credit.creditinfo.forEach(element => {
        htmlData += '<tr>';
        htmlData += '<td>Company Name: ';
        htmlData += '</td>';
        htmlData += '<td>';
        htmlData += element.companyname;
        htmlData += '</td>';
        htmlData += '</tr>';
        htmlData += '<tr>';
        htmlData += '<td>Contact Name: ';
        htmlData += '</td>';
        htmlData += '<td>';
        htmlData += element.contactname;
        htmlData += '</td>';
        htmlData += '</tr>';
        htmlData += '<tr>';
        htmlData += '<td>Email: ';
        htmlData += '</td>';
        htmlData += '<td>';
        htmlData += element.email;
        htmlData += '</td>';
        htmlData += '</tr>';
        htmlData += '<tr>';
        htmlData += '<td>Phone: ';
        htmlData += '</td>';
        htmlData += '<td>';
        htmlData += element.phone;
        htmlData += '</td>';
        htmlData += '</tr>';
    });
    htmlData += '</table>';
    htmlData += '</body></html>';


    htmlData += '<h1>Contact Preferences</h1>';

    htmlData += '<h3>Accounting Contact</h3>';
    htmlData += '<table border="1">';
    htmlData += '<tr>';
    htmlData += '<td>Name';
    htmlData += '</td>';
    htmlData += '<td>';
    htmlData += body.preference.accname;
    htmlData += '</td>';
    htmlData += '</tr>';
    htmlData += '<tr>';
    htmlData += '<td>Email';
    htmlData += '</td>';
    htmlData += '<td>';
    htmlData += body.preference.accemail;
    htmlData += '</td>';
    htmlData += '</tr>';
    htmlData += '<tr>';
    htmlData += '<td>Phone';
    htmlData += '</td>';
    htmlData += '<td>';
    htmlData += body.preference.accphone;
    htmlData += '</td>';
    htmlData += '</tr>';
    htmlData += '</table>';
    htmlData += '</body></html>';

    htmlData += '<h3>Shipping Contact</h3>';
    htmlData += '<table border="1">';
    htmlData += '<tr>';
    htmlData += '<td>Name';
    htmlData += '</td>';
    htmlData += '<td>';
    htmlData += body.preference.shippingname;
    htmlData += '</td>';
    htmlData += '</tr>';
    htmlData += '<tr>';
    htmlData += '<td>Email';
    htmlData += '</td>';
    htmlData += '<td>';
    htmlData += body.preference.shippingemail;
    htmlData += '</td>';
    htmlData += '</tr>';
    htmlData += '<tr>';
    htmlData += '<td>Phone';
    htmlData += '</td>';
    htmlData += '<td>';
    htmlData += body.preference.shippingphone;
    htmlData += '</td>';
    htmlData += '</tr>';
    htmlData += '</table>';
    htmlData += '</body></html>';

    htmlData += '<h3>Signature/Printed Name & Title</h3>';
    htmlData += '<table border="1">';
    htmlData += '<tr>';
    htmlData += '<td>Name';
    htmlData += '</td>';
    htmlData += '<td>';
    htmlData += body.preference.printedname;
    htmlData += '</td>';
    htmlData += '</tr>';
    htmlData += '<tr>';
    htmlData += '<td>Email';
    htmlData += '</td>';
    htmlData += '<td>';
    htmlData += body.preference.title;
    htmlData += '</td>';
    htmlData += '</tr>';
    htmlData += '</table>';
    htmlData += '</body></html>';
    //let cc=["jess.pickman@allsouthflooring.com"];    
    let info = await MailHelper.sendMail("jenny.flores@allsouthflooring.com", "Credit Application Form Filled", htmlData, [], req.files.slider_image);

    return true

}

let getContectUs = async (body) => {
    let limit = body.limit ? body.limit : 20,
        offset = body.page ? ((body.page - 1) * limit) : 0,
        findData = {};
    let allCategory = await ContactUSModel
        .find(findData)
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })
        .skip(offset)
        .limit(limit)
        .select()
        .lean()
        .exec()

    let totalRecords = await ContactUSModel.countDocuments();

    let _result = { total_count: 0 };
    _result.slides = allCategory;
    _result.total_count = totalRecords;
    return _result;
}
let deleteContactUs = async (id) => {
    return await ContactUSModel
        .deleteOne({ _id: ObjectId(id) })
        .lean()
        .exec();
}
let ClaimApplicationForm = async (req) => {
    let body = JSON.parse(req.body.body);
    //console.log(body.company)
    let htmlData = "";
    htmlData = '<html>	<body>';
    if (body.type == "freight") {
        htmlData += '<h1>Form: Freight</h1>';
        htmlData += '<table border="1">';
        htmlData += '<tr>';
        htmlData += '<td>Rep:';
        htmlData += '</td>';
        htmlData += '<td>';
        htmlData += body.data.freightformrep;
        htmlData += '</td>';
        htmlData += '</tr>';
        htmlData += '<tr>';
        htmlData += '<td>ASF Invoice#:';
        htmlData += '</td>';
        htmlData += '<td>';
        htmlData += body.data.freightformasfinvoice;
        htmlData += '</td>';
        htmlData += '</tr>';
        htmlData += '<tr>';
        htmlData += '<td>Carrier:';
        htmlData += '</td>';
        htmlData += '<td>';
        htmlData += body.data.freightformcarrier;
        htmlData += '</td>';
        htmlData += '</tr>';
        htmlData += '<tr>';
        htmlData += '<td>Tracking#:';
        htmlData += '</td>';
        htmlData += '<td>';
        htmlData += body.data.freightformtrackingno;
        htmlData += '</td>';
        htmlData += '</tr>';
        htmlData += '<tr>';
        htmlData += '<td>Total Claim:';
        htmlData += '</td>';
        htmlData += '<td>';
        htmlData += body.data.freightformtotalclaim;
        htmlData += '</td>';
        htmlData += '</tr>';
        htmlData += '<tr>';
        htmlData += '<td>Requested credit amount:';
        htmlData += '</td>';
        htmlData += '<td>';
        htmlData += body.data.freightformrequestedcreditamount;
        htmlData += '</td>';
        htmlData += '</tr>';
        htmlData += '<tr>';
        htmlData += '<td>Description:';
        htmlData += '</td>';
        htmlData += '<td>';
        htmlData += body.data.freightformdescription;
        htmlData += '</td>';
        htmlData += '</tr>';
        htmlData += '</table>';
    }else if (body.type == "defective") {
        htmlData += '<h1>Form: Defective/Concealed Damage/Replacement Material</h1>';
        htmlData += '<table border="1">';
        htmlData += '<tr>';
        htmlData += '<td>Rep:';
        htmlData += '</td>';
        htmlData += '<td>';
        htmlData += body.data.defectiveformrep;
        htmlData += '</td>';
        htmlData += '</tr>';
        htmlData += '<tr>';
        htmlData += '<td>ASF Invoice#:';
        htmlData += '</td>';
        htmlData += '<td>';
        htmlData += body.data.defectiveformasfinvoice;
        htmlData += '</td>';
        htmlData += '</tr>';
        htmlData += '<tr>';
        htmlData += '<td>Carrier:';
        htmlData += '</td>';
        htmlData += '<td>';
        htmlData += body.data.defectiveformcarrier;
        htmlData += '</td>';
        htmlData += '</tr>';
        htmlData += '<tr>';
        htmlData += '<td>Vendor Information:';
        htmlData += '</td>';
        htmlData += '<td>';
        htmlData += body.data.defectiveformvendorinfo;
        htmlData += '</td>';
        htmlData += '</tr>';
        htmlData += '<tr>';
        htmlData += '<td>PO#:';
        htmlData += '</td>';
        htmlData += '<td>';
        htmlData += body.data.defectiveformpono;
        htmlData += '</td>';
        htmlData += '</tr>';
        htmlData += '<tr>';
        htmlData += '<td>Total Claim:';
        htmlData += '</td>';
        htmlData += '<td>';
        htmlData += body.data.defectiveformtotalclaim;
        htmlData += '</td>';
        htmlData += '</tr>';
        htmlData += '<tr>';
        htmlData += '<td>Requested credit amount:';
        htmlData += '</td>';
        htmlData += '<td>';
        htmlData += body.data.defectiveformrequestedcreditamount;
        htmlData += '</td>';
        htmlData += '</tr>';
        htmlData += '</table>';
    }else if (body.type == "showroom") {
        htmlData += '<h1>Form: Showroom Floor/Marketing Co-op</h1>';
        htmlData += '<table border="1">';
        htmlData += '<tr>';
        htmlData += '<td>Rep:';
        htmlData += '</td>';
        htmlData += '<td>';
        htmlData += body.data.showroomformrep;
        htmlData += '</td>';
        htmlData += '</tr>';
        htmlData += '<tr>';
        htmlData += '<td>Customer:';
        htmlData += '</td>';
        htmlData += '<td>';
        htmlData += body.data.showroomformcustomer;
        htmlData += '</td>';
        htmlData += '</tr>';
        htmlData += '<tr>';
        htmlData += '<td>Total $$ Amount requested:';
        htmlData += '</td>';
        htmlData += '<td>';
        htmlData += body.data.showroomformtotalamount;
        htmlData += '</td>';
        htmlData += '</tr>';
        htmlData += '<tr>';
        htmlData += '<td>Product – item code and qty:';
        htmlData += '</td>';
        htmlData += '<td>';
        htmlData += body.data.showroomformproduct;
        htmlData += '</td>';
        htmlData += '</tr>';       
        htmlData += '</table>';
    }else if (body.type == "tradeshow") {
        htmlData += '<h1>Form: Tradeshow/Event Participation</h1>';
        htmlData += '<table border="1">';
        htmlData += '<tr>';
        htmlData += '<td>Rep:';
        htmlData += '</td>';
        htmlData += '<td>';
        htmlData += body.data.tradeshowformrep;
        htmlData += '</td>';
        htmlData += '</tr>';
        htmlData += '<tr>';
        htmlData += '<td>Event Name:';
        htmlData += '</td>';
        htmlData += '<td>';
        htmlData += body.data.tradeshowformeventname;
        htmlData += '</td>';
        htmlData += '</tr>';
        htmlData += '<tr>';
        htmlData += '<td>Date:';
        htmlData += '</td>';
        htmlData += '<td>';
        htmlData += body.data.tradeshowformdate;
        htmlData += '</td>';
        htmlData += '</tr>';
        body.data.vendoramount.forEach(element => {
            htmlData += '<tr>';
            htmlData += '<td>Vendor Participation Amount:';
            htmlData += '</td>';
            htmlData += '<td>';
            htmlData += element.amount;
            htmlData += '</td>';
            htmlData += '</tr>';
        });              
        htmlData += '</table>';
    }
    htmlData += '</body></html>';
    //let cc=["jess.pickman@allsouthflooring.com"];    
    //jenny.flores@allsouthflooring.com
    let info = await MailHelper.sendMail("sagarss191@gmail.com", "Claim Application Form Filled", htmlData, [], req.files.slider_image);   

    return true

}
module.exports = {
    getContectUs,
    deleteContactUs,
    addContactUsSeo,
    getContactUsSeo,
    //website
    addContactUs,
    orderForm,
    CreditApplicationForm,
    ClaimApplicationForm
};