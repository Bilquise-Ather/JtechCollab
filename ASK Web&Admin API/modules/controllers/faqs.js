'use strict';

let faqsManager = require('../managers/faqs');

let addFaqs = (req, res, next) => {

    return faqsManager
        .addFaqs(req)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getAllFaqs = (req, res, next) => {
    return faqsManager
        .getAllFaqs(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let updateFaqs = (req, res, next) => {
    return faqsManager
        .updateFaqs(req)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let deleteFaqs = (req, res, next) => {
    return faqsManager
        .deleteFaqs(req.params.slider_id)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let getAllFaqsForWebsite = (req, res, next) => {
    return faqsManager
        .getAllFaqsForWebsite(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let addFaqsSeo = (req, res, next) => {
    return faqsManager
        .addFaqsSeo(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getFaqsSeo = (req, res, next) => {
    return faqsManager
        .getFaqsSeo(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let addSearchSeo = (req, res, next) => {
    return faqsManager
        .addSearchSeo(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getSearchSeo = (req, res, next) => {
    return faqsManager
        .getSearchSeo(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let addProjectSeo = (req, res, next) => {
    return faqsManager
        .addProjectSeo(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getProjectSeo = (req, res, next) => {
    return faqsManager
        .getProjectSeo(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let addGallerySeo = (req, res, next) => {
    return faqsManager
        .addGallerySeo(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getGallerySeo = (req, res, next) => {
    return faqsManager
        .getGallerySeo(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let addVisualiserSeo = (req, res, next) => {
    return faqsManager
        .addVisualiserSeo(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getVisualiserSeo = (req, res, next) => {
    return faqsManager
        .getVisualiserSeo(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
module.exports = {
    addFaqs,
    getAllFaqs,
    updateFaqs,
    deleteFaqs,
    getAllFaqsForWebsite,
    addFaqsSeo,
    getFaqsSeo,
    addSearchSeo,
    getSearchSeo,
    addProjectSeo,
    getProjectSeo,
    addVisualiserSeo,
    getVisualiserSeo,
    addGallerySeo,
    getGallerySeo
}