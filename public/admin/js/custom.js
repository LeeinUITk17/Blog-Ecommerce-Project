

const handleDelete = (link) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      document.location.href = link;
    }
  });
};
const handleUpdateStatus = (id, status,type) => {
  
  $.ajax({
    type: "GET",
    url: `/admin/${type}/changeStatus/${id}/${status}`,
    dataType: "json",
    success: function (response) {
      const newStatus = response.status;
      const newStatusClass = newStatus === 'active' ? 'badge-success' : 'badge-danger';

     
      $(`#status-${id}`).html(`
        <a href="/changeStatus/${id}/${newStatus}">
          <span class="badge ${newStatusClass}">${newStatus}</span>
        </a>
      `);
    },
    error: function (error) {
      console.error('Error updating status:', error);
      
      $(`#status-${id}`).html(`<span class="badge badge-danger">Error updating status</span>`);
    }
  });
};
// const nonhandleUpdateStatus = (id, status) => {
  
//   $.ajax({
//     type: "GET",
//     url: `/admin/category/changeStatus/${id}/${status}`,
//     dataType: "json",
//     success: function (response) {
//       const newStatus = response.status;
//       const newStatusClass = newStatus === 'active' ? 'badge-success' : 'badge-danger';

     
//       $(`#status-${id}`).html(`
//         <a href="/changeStatus/${id}/${newStatus}">
//           <span class="badge ${newStatusClass}">${newStatus}</span>
//         </a>
//       `);
//     },
//     error: function (error) {
//       console.error('Error updating status:', error);
      
//       $(`#status-${id}`).html(`<span class="badge badge-danger">Error updating status</span>`);
//     }
//   });
// };
jQuery(document).ready(function($)  {
  $('#selectAllCheckbox').change(() => {  
    $('input[name="selectedItems"]').prop('checked', $('#selectAllCheckbox').prop('checked'));
  });

  $('input[name="selectedItems"]').change(() => {
    const allCheckboxesChecked = !$('input[name="selectedItems"]:not(:checked)').length;
    $('#selectAllCheckbox').prop('checked', allCheckboxesChecked);
  });

  $('.dropdown-menu a').click(function() {
    const action = $(this).data('action');
    
    const selectedCheckboxes = $('input[name="selectedItems"]:checked');

    if (selectedCheckboxes.length > 0) {
      const selectedItems = selectedCheckboxes.map(function() {
        return $(this).val();
      }).get();

      console.log("Action: " + action);
      console.log("Selected Items: " + selectedItems.join(', '));

      $.ajax({
        type: "post",
        url: "/admin/news/changeStatusTool",
        contentType: "application/json", 
        data: JSON.stringify({
            action: action,
            selectedItems: selectedItems
        }),
        success: function(response) {
            console.log(response);
        },
        error: function(error) {
            console.error(error);
        }
    });    
    } else {
      console.log("No checkboxes selected.");
    }
  });
});

Dropzone.options.myDropzone = {
  url: "/admin/news/dropzone", 
  paramName: "file", 
  maxFilesize: 2, 
  acceptedFiles: ".jpg,.jpeg,.png,.gif", 
  addRemoveLinks: true, 
  dictDefaultMessage: "Drop files here or click to upload", 
  
  init: function () {
      var myDropzone = this;
     
      this.element.querySelector(".start").addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          myDropzone.processQueue(); 
      });
      
      this.element.querySelector(".cancel").addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          myDropzone.removeAllFiles(); 
      });
  }
};


const fetchDataWithSorting = async (status, keyword, sort) => {
  let query = {};
  let sortOption = {};

  if (status === 'all') {
    query = {};
  } else if (status) {
    query.status = status;
  }

  if (keyword) {
    query.$or = [
      { name: new RegExp(keyword, 'i') },
      { description: new RegExp(keyword, 'i') },
    ];
  }

  if (sort === 'orderingDesc') {
    sortOption = { ordering: -1 };
  }

  return await newsModel.find(query).sort(sortOption);
};
const previewImage = (input) => {
  const preview = document.getElementById('avatarPreview');
  const file = input.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      preview.src = e.target.result;
    };

    reader.readAsDataURL(file);
  } else {
    preview.src = '';
  }
};
// document.addEventListener('DOMContentLoaded', function () {
//   const ckeditorForm = async () => {
//       ClassicEditor
//           .create(document.querySelector('#editor'))
//           .catch(error => {
//               console.error(error);
//           });
//   };
//   ckeditorForm();
// });
document.addEventListener('DOMContentLoaded', function () {
  let editor;

  ClassicEditor
      .create(document.querySelector('#editor'))
      .then(newEditor => {
          editor = newEditor;
      })
      .catch(error => {
          console.error(error);
      });

  document.querySelector('#submit').addEventListener('click', () => {
      const editorData = editor.getData();
      console.log('Editor content:', editorData);
  });
});
const highlightKeyword = (text, keyword) => {
  const escapedKeyword = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regex = new RegExp(escapedKeyword, 'gi');
  return text.replace(regex, '<span class="highlight">$&</span>');
};

function calculateExpiryDate() {
  var createDate = new Date("<%= item.createAt %>");
  var daysToAdd = parseInt(document.getElementById('expirateDays').value);
  var expiryDate = new Date(createDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
  var formattedExpiryDate = expiryDate.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  document.getElementById('calculatedExpiryDate').value = formattedExpiryDate;
}

// Event listener for input change
document.getElementById('expirateDays').addEventListener('input', function() {
  calculateExpiryDate();
});