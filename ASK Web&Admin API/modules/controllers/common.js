'use strict';

let collectionManager = require('../managers/common');

let getAllColor = (req, res, next) => {
    return collectionManager
        .getAllColor(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let addColor = (req, res, next) => {
    return collectionManager
        .addColor(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getAllThickness = (req, res, next) => {
    return collectionManager
        .getAllThickness(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let addThickness = (req, res, next) => {
    return collectionManager
        .addThickness(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let getAllWear = (req, res, next) => {
    return collectionManager
        .getAllWear(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let getAllLength = (req, res, next) => {
    return collectionManager
        .getAllLength(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getAllSize = (req, res, next) => {
    return collectionManager
        .getAllSize(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getAllFloor = (req, res, next) => {
    return collectionManager
        .getAllFloor(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let addLength = (req, res, next) => {
    return collectionManager
        .addLength(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let getAllMaterial = (req, res, next) => {
    return collectionManager
        .getAllMaterial(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let addMaterial = (req, res, next) => {
    return collectionManager
        .addMaterial(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let addProduct = (req, res, next) => {
    return collectionManager
        .addProduct(req)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let getProduct = (req, res, next) => {
    return collectionManager
        .getProduct(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let getAllProductCategory = (req, res, next) => {
    return collectionManager
        .getAllProductCategory(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let getAllProductSize = (req, res, next) => {
    return collectionManager
        .getAllProductSize(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let addSize = (req, res, next) => {
    return collectionManager
        .addSize(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let getAllWearLayer = (req, res, next) => {
    return collectionManager
        .getAllWearLayer(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let addWearLayer = (req, res, next) => {
    return collectionManager
        .addWearLayer(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let getAllPad = (req, res, next) => {
    return collectionManager
        .getAllPad(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let addPad = (req, res, next) => {
    return collectionManager
        .addPad(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let getAllCore = (req, res, next) => {
    return collectionManager
        .getAllCore(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let addCore = (req, res, next) => {
    return collectionManager
        .addCore(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let getAllProductListForSubProduct = (req, res, next) => {
    return collectionManager
        .getAllProductListForSubProduct(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let addSubProduct = (req, res, next) => {
    return collectionManager
        .addSubProduct(req)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let duplicateSubProduct = (req, res, next) => {
    return collectionManager
        .duplicateSubProduct(req)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getSubProduct = (req, res, next) => {
    return collectionManager
        .getSubProduct(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getSEODetails = (req, res, next) => {
    return collectionManager
        .getSEODetails(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getAllProjectCategoryList = (req, res, next) => {
    return collectionManager
        .getAllProjectCategoryList(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getAllProjectList = (req, res, next) => {
    return collectionManager
        .getAllProjectList(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let addProject = (req, res, next) => {
    return collectionManager
        .addProject(req)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getAllProjects = (req, res, next) => {
    return collectionManager
        .getAllProjects(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let removeProjects = (req, res, next) => {
    return collectionManager
        .removeProjects(req.params.id)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}


let getProjectDetail = (req, res, next) => {
    return collectionManager
        .getProjectDetail(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let getProjectMiniDetailForWebsite = (req, res, next) => {
    return collectionManager
        .getProjectMiniDetailForWebsite(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let getProjectFullDetailForWebsite = (req, res, next) => {
  return collectionManager
    .getProjectFullDetailForWebsite(req.body)
    .then((data) => {
      let result = {
        status: 200,
        data: data,
      };
      return res.json(result);
    })
    .catch(next);
};
let getSearchResults = (req, res, next) => {
    return collectionManager
      .getSearchResults(req.body)
      .then((data) => {
        let result = {
          status: 200,
          data: data,
        };
        return res.json(result);
      })
      .catch(next);
  };
  let getProjectOverViewData = (req, res, next) => {
    return collectionManager
      .getProjectOverViewData()
      .then((data) => {
        let result = {
          status: 200,
          data: data,
        };
        return res.json(result);
      })
      .catch(next);
  };
  let setimages = (req, res, next) => {
    return collectionManager
      .setimages()
      .then((data) => {
        let result = {
          status: 200,
          data: data,
        };
        return res.json(result);
      })
      .catch(next);
  };
  
module.exports = {
  getAllProjects,
  removeProjects,
  getAllColor,
  addColor,
  addProject,
  getAllThickness,
  addThickness,
  getAllWear,
  getAllLength,
  addLength,
  getAllMaterial,
  addMaterial,
  addProduct,
  getAllProjectList,
  getProduct,
  getProjectDetail,
  getProjectMiniDetailForWebsite,
  getProjectOverViewData,
  getAllProductCategory,
  getAllProductSize,
  getAllSize,
  getAllFloor,
  addSize,
  getAllWearLayer,
  addWearLayer,
  getAllPad,
  addPad,
  getAllCore,
  addCore,
  getAllProductListForSubProduct,
  addSubProduct,
  duplicateSubProduct,
  getSubProduct,
  getSEODetails,
  getAllProjectCategoryList,
  getProjectFullDetailForWebsite,
  getSearchResults
  
};