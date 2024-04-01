const path = require("path");
const {
  addItem,
  getItems,
  deleteItem,
  getItemById,
  updateItem,
  getStatusCounts,
} = require("../../services/news.services");
const { imageHelper } = require("../../helper/news.helper");
const { body, validationResult } = require("express-validator");
const mainName = 'news';
const linkprefix = `/admin/${mainName}/`;

const {
  dropUpload,
}=require('../../helper/imagearray.helper');



class NewsController {

  getAll = async (req, res, next) => {
    let { status } = req.params;
    let keyword = req.query.keywords;
    let data;
    const statusCounts = await getStatusCounts();
    status?data=await getItems(status, keyword):data=await getItems();
    data.sort((a, b) => a.ordering - b.ordering);

    res.render("admin/news", { data, statusfilter: this.getStatusFilter(statusCounts, status), keyword });
};


  getForm = async (req, res, next) => {
    let { id } = req.params;
    if (id == "") {
      res.render("admin/news/form");
    } else {
      let data = await getItemById(id);
      res.render("admin/news/form", { data });
    }
  };

  addOrUpdateItem = async (req, res) => {
    const { id } = req.body;
    let errors = validationResult(req);
    console.log(errors);
    let listError = errors.errors;
  
    if (listError.length > 0) {
      let messages = [];
      listError.map((error) => messages.push(error.msg));
      req.flash("danger", messages, false);
      return id
        ? res.redirect(`${linkprefix}form/${id}`)
        : res.redirect(`${linkprefix}form/`);
    }
  
    try {
      if (id) {
        await updateItem(id, req.body);
        req.flash("success", "Update item thành công", false);
      } else {
        await addItem(req.body);
        req.flash("success", "Add item thành công", false);
      }
      res.redirect(`${linkprefix}all`);
    } catch (error) {
      console.error('Error processing form:', error);
      req.flash("danger", "An error occurred", false);
      res.redirect(`${linkprefix}all`);
    }
  };
  
  
  imageUpload = async (req, res, next) => {
    const { id } = req.params;
  
    if (!id) {
      req.flash("danger", "Invalid operation", false);
      return res.redirect(`${linkprefix}all`);
    }
  
    imageHelper(req, res, async (err) => {
      try {
        const filePath = path.join(req.file.filename);
        req.body.file = filePath;
  
        await updateItem(id, { avatar: filePath });
  
        req.flash("success", "Update image thành công", false);
        res.redirect(`${linkprefix}all`);
      } catch (error) {
        console.error('Error processing form:', error);
        req.flash("danger", "An error occurred", false);
        res.redirect(`${linkprefix}all`);
      }
    });
  };
   
//   dropzoneUpload = async (req, res, next) => {
//     console.log('upload called');
//     const { id } = req.params;
//     if (!id) {
//         req.flash("danger", "Invalid operation", false);
//         return res.redirect(`${linkprefix}all`);
//     }
//     console.log(req.files);
//     dropUpload(req, res, async (err) => {
//         try {
//             if (err) {
//                 console.error('Error processing uploaded files:', err);
//                 req.flash("danger", "An error occurred while processing files", false);
//                 return res.redirect(`${linkprefix}all`);
//             }
//             const files = req.files;
//             for (const file of files) {
//                 console.log("Uploaded file:", file.filename);
//                 const filePath = path.join(file.filename);
//                 await updateItem(id, { List: filePath });
//             }

//             req.flash("success", "Update image thành công", false);
//             res.redirect(`${linkprefix}all`);
//         } catch (error) {
//             console.error('Error processing form:', error);
//             req.flash("danger", "An error occurred", false);
//             res.redirect(`${linkprefix}all`);
//         }
//     });
// };

 dropzoneUpload = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
      req.flash("danger", "Invalid operation", false);
      return res.redirect(`${linkprefix}all`);
  }

  try {
      // Check if files are present in the request
      if (!req.files || req.files.length === 0) {
          req.flash("danger", "No files were uploaded", false);
          return res.redirect(`${linkprefix}all`);
      }
      
      // Process each uploaded file
      req.files.forEach(async (file) => {
        console.log("Uploaded file:", file.filename);
        const filePath = file.path;
        const newListImage = { Image: filePath };
        const item = await getItemById(id);
        item.List.push(newListImage);
        await item.save();
    });

      req.flash("success", "Files uploaded successfully", false);
      res.redirect(`${linkprefix}all`);
  } catch (error) {
      console.error('Error processing uploaded files:', error);
      req.flash("danger", "An error occurred while processing files", false);
      res.redirect(`${linkprefix}all`);
  }
};


  deleteItem = async (req, res, next) => {
    let { id } = req.params;
    await deleteItem(id);
    req.flash("success", "Delete item thành công", false);
    res.redirect(`${linkprefix}all`);
  };


  statusCount = async (req, res, next) => {
    try {
      const items = await getItems();
      const statusCounts = await getStatusCounts();

 let status = req.params.status ;
const updatestatusfilter=this.getStatusFilter(statusCounts,status);
status=status||'all';

console.log(status);

      res.render('list', {
        items,
        statusfilter: updatestatusfilter,
        calculateItemCount: this.calculateItemCount,
      });
    } catch (err) {
      console.error('Error fetching items:', err);
      res.status(500).send('Internal Server Error');
    }
  };

  getStatusFilter = (statusCounts, currentStatus) => [
    {
      name: 'All',
      count: statusCounts.All,
      link: currentStatus === 'all' ? 'all' : `${linkprefix}all`,
      class: currentStatus === 'all' ? 'btn m-b-sm btn-success btn-sm' : 'btn m-b-sm default',
    },
    {
      name: 'Active',
      count: statusCounts.Active,
      link: currentStatus === 'active' ? 'active' : `${linkprefix}active`,
      class: currentStatus === 'active' ? 'btn m-b-sm btn-success btn-sm' : 'btn m-b-sm default',
    },
    {
      name: 'Inactive',
      count: statusCounts.Inactive,
      link: currentStatus === 'inactive' ? 'inactive' : `${linkprefix}inactive`,
      class: currentStatus === 'inactive' ? 'btn m-b-sm btn-success btn-sm' : 'btn m-b-sm default',
    },
  ];
  

  calculateItemCount = (itemName, items) => {
    switch (itemName) {
      case 'All':
        return items.length;
      case 'Active':
        return items.filter((item) => item.status === 'active').length;
      case 'Inactive':
        return items.filter((item) => item.status === 'inactive').length;
      default:
        return 0;
    }
  };

  updateStatus = async (req, res, next) => {
    try {
      const { id, status } = req.params;
      const newStatus = status === 'active' ? 'inactive' : 'active';
      await updateItem(id, { status: newStatus });
      res.status(200).json({ message: 'Successfully updated status', id, status: newStatus });
    } catch (error) {
      console.error("Error during status update:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
    
};

statusTool = async (req, res, next) => {
  const { action, selectedItems } = req.body;
  let newStatus;
  
  switch (action) {
    case 'set_to_active':
      newStatus = 'active';
      break;
    case 'set_to_inactive':
      newStatus = 'inactive';
      break;
    case 'set_to_delete':
      for (const itemId of selectedItems) {
        await deleteItem(itemId);
      }
      // setFlashMessage(req, 'success', 'Delete item thành công');
      res.json({ success: true });
      return;
    default:
      return res.status(400).json({ error: 'Invalid action' });
  }

  if (newStatus && (newStatus === 'active' || newStatus === 'inactive')) {
    for (const itemId of selectedItems) {
      await updateItem(itemId, { status: newStatus });
    }
    // setFlashMessage(req, 'success', 'Update item thành công');
    res.json({ success: true });
    return;
  }

  // res.redirect(`${linkprefix}`);

};



}


module.exports = new NewsController();
