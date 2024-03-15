
const {
  getItems,
  deleteItem,
  getItemById: getBillById,
  updateItem,
  getStatusCounts,
  addItem,
} = require("../../services/bill.service");
const {
  getItemById:getProductById,
}=require("../../services/product.admin.service");
const mainName = 'bill';
const linkprefix = `/admin/${mainName}/`;
class billController {
  getAll = async (req, res, next) => {
    let { status } = req.params;
    let keyword = req.query.keywords;

    let data;
    const statusCounts = await getStatusCounts();

    if (status) {
      data = await getItems(status, keyword);
    } else {
      data = await getItems();
    }
    data.sort((a, b) => a.ordering - b.ordering);

    res.render("admin/bill", { data, statusfilter: this.getStatusFilter(statusCounts, status), keyword, linkprefix });
};


  getForm = async (req, res, next) => {
    let { id } = req.params;
      let data = await getBillById(id);
      const products=[];
      for(let i=0;i<data.list.length;i++){
        products.push(await getProductById(data.list[i].id));
      }
      console.log(products);
      res.render("admin/bill/form", { data ,products});
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
      const billtatus = status === 'active' ? 'inactive' : 'active';
      await updateItem(id, { status: billtatus });
      res.status(200).json({ message: 'Successfully updated status', id, status: billtatus });
    } catch (error) {
      console.error("Error during status update:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
    
};

statusTool = async (req, res, next) => {
  const { action, selectedItems } = req.body;
  let billtatus;
  
  switch (action) {
    case 'set_to_active':
      billtatus = 'active';
      break;
    case 'set_to_inactive':
      billtatus = 'inactive';
      break;
    case 'set_to_delete':
      for (const itemId of selectedItems) {
        await deleteItem(itemId);
      }
      res.json({ success: true });
      return;
    default:
      return res.status(400).json({ error: 'Invalid action' });
  }

  if (billtatus && (billtatus === 'active' || billtatus === 'inactive')) {
    for (const itemId of selectedItems) {
      await updateItem(itemId, { status: billtatus });
    }
    res.json({ success: true });
    return;
  }
};

}


module.exports = new billController();
