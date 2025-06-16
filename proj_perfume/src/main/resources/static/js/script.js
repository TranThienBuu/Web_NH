$(function(){

// User Register validation

	var $userRegister=$("#userRegister");

	$userRegister.validate({
		
		rules:{
			name:{
				required:true,
				lettersonly:true
			}
			,
			email: {
				required: true,
				space: true,
				email: true
			},
			mobileNumber: {
				required: true,
				space: true,
				numericOnly: true,
				minlength: 10,
				maxlength: 12

			},
			password: {
				required: true,
				space: true

			},
			confirmpassword: {
				required: true,
				space: true,
				equalTo: '#pass'

			},
			address: {
				required: true,
				all: true

			},

			city: {
				required: true,
				space: true

			},
			state: {
				required: true,


			},
			pincode: {
				required: true,
				space: true,
				numericOnly: true

			}, img: {
				required: true,
			}
			
		},
		messages:{
			name:{
				required:'name required',
				lettersonly:'invalid name'
			},
			email: {
				required: 'email name must be required',
				space: 'space not allowed',
				email: 'Invalid email'
			},
			mobileNumber: {
				required: 'mob no must be required',
				space: 'space not allowed',
				numericOnly: 'invalid mob no',
				minlength: 'min 10 digit',
				maxlength: 'max 12 digit'
			},

			password: {
				required: 'password must be required',
				space: 'space not allowed'

			},
			confirmpassword: {
				required: 'confirm password must be required',
				space: 'space not allowed',
				equalTo: 'password mismatch'

			},
			address: {
				required: 'address must be required',
				all: 'invalid'

			},

			city: {
				required: 'city must be required',
				space: 'space not allowed'

			},
			state: {
				required: 'state must be required',
				space: 'space not allowed'

			},
			pincode: {
				required: 'pincode must be required',
				space: 'space not allowed',
				numericOnly: 'invalid pincode'

			},
			img: {
				required: 'image required',
			}
		}
	})
 $('#userRegister').off('submit').on('submit', function(e) {
        e.preventDefault();
        var $form = $(this);
        if (!$form.valid()) return;

        var $btn = $form.find('button[type="submit"]');
        $btn.prop('disabled', true);

        var formData = new FormData(this);

        $.ajax({
            url: '/saveUser',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                alert(response.message || 'Đăng ký thành công!');
                if(response.success) {
                    $form[0].reset();
                }
                $btn.prop('disabled', false);
            },
            error: function(xhr) {
                alert('Đăng ký thất bại! ' + (xhr.responseText || ''));
                $btn.prop('disabled', false);
            }
        });
    });
// Orders Validation

var $orders=$("#orders");

$orders.validate({
		rules:{
			firstName:{
				required:true,
				lettersonly:true
			},
			lastName:{
				required:true,
				lettersonly:true
			}
			,
			email: {
				required: true,
				space: true,
				email: true
			},
			mobileNo: {
				required: true,
				space: true,
				numericOnly: true,
				minlength: 10,
				maxlength: 12

			},
			address: {
				required: true,
				all: true

			},

			city: {
				required: true,
				space: true

			},
			state: {
				required: true,


			},
			pincode: {
				required: true,
				space: true,
				numericOnly: true

			},
			paymentType:{
			required: true
			}
		},
		messages:{
			firstName:{
				required:'first required',
				lettersonly:'invalid name'
			},
			lastName:{
				required:'last name required',
				lettersonly:'invalid name'
			},
			email: {
				required: 'email name must be required',
				space: 'space not allowed',
				email: 'Invalid email'
			},
			mobileNo: {
				required: 'mob no must be required',
				space: 'space not allowed',
				numericOnly: 'invalid mob no',
				minlength: 'min 10 digit',
				maxlength: 'max 12 digit'
			}
		   ,
			address: {
				required: 'address must be required',
				all: 'invalid'

			},

			city: {
				required: 'city must be required',
				space: 'space not allowed'

			},
			state: {
				required: 'state must be required',
				space: 'space not allowed'

			},
			pincode: {
				required: 'pincode must be required',
				space: 'space not allowed',
				numericOnly: 'invalid pincode'

			},
			paymentType:{
			required: 'select payment type'
			}
		}	
})

// AJAX add product
$('#addProductForm').submit(function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
        url: '/admin/saveProductAjax', // endpoint backend trả về JSON
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            alert(response.message);
            if(response.success) {
                $('#addProductForm')[0].reset();
            }
        },
        error: function(xhr) {
            alert('Đã có lỗi xảy ra khi thêm sản phẩm!');
        }
    });
});


    // AJAX delete product
    $('.delete-product-btn').click(function() {
        var id = $(this).data('id');
        if(confirm('Bạn chắc chắn muốn xóa sản phẩm này?')) {
            $.post('/admin/deleteProductAjax', {id: id}, function(response) {
                alert(response.message);
                if(response.success) {
                    $('#product-row-' + id).remove();
                }
            }).fail(function() {
                alert('Đã có lỗi xảy ra khi xóa sản phẩm!');
            });
        }
    });

	$('.delete-product-btn').click(function() {
    var id = $(this).data('id');
    if(confirm('Bạn chắc chắn muốn xóa sản phẩm này?')) {
        $.post('/admin/deleteProductAjax', {id: id}, function(response) {
            alert(response.message);
            if(response.success) {
                $('#product-row-' + id).remove();
                // Cập nhật lại tổng số sản phẩm
                var $count = $('#totalProductCount');
                var newCount = parseInt($count.text()) - 1;
                $count.text(newCount);
            }
        }).fail(function() {
            alert('Đã có lỗi xảy ra khi xóa sản phẩm!');
        });
    }
});

// AJAX thêm category
$('#addCategoryForm').submit(function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
        url: '/admin/saveCategoryAjax',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            if(response.success && response.category) {
                alert('Thêm category thành công!');
                $('#addCategoryForm')[0].reset();

                // Thêm dòng mới vào bảng category
                var c = response.category;
                var status = c.isActive ? 'Active' : 'Inactive';
                var rowCount = $('#categoryTableBody tr').length + 1;
                var newRow = `
                    <tr id="category-row-${c.id}">
                        <td>${rowCount}</td>
                        <td>${c.name}</td>
                        <td><img src="/img/category_img/${c.imageName}" width="50"></td>
                        <td>${status}</td>
                        <!-- Thêm các cột action nếu cần -->
                    </tr>
                `;
                $('#categoryTableBody').append(newRow);

            } else {
                alert(response.message || 'Thêm category thất bại!');
            }
        },
        error: function(xhr) {
            alert('Đã có lỗi xảy ra khi thêm category!\n' + xhr.responseText);
        }
    });
});

 
// Reset Password Validation

var $resetPassword=$("#resetPassword");

$resetPassword.validate({
		
		rules:{
			password: {
				required: true,
				space: true

			},
			confirmPassword: {
				required: true,
				space: true,
				equalTo: '#pass'

			}
		},
		messages:{
		   password: {
				required: 'password must be required',
				space: 'space not allowed'

			},
			confirmpassword: {
				required: 'confirm password must be required',
				space: 'space not allowed',
				equalTo: 'password mismatch'

			}
		}	
})
		
	
})



jQuery.validator.addMethod('lettersonly', function(value, element) {
		return /^[^-\s][a-zA-Z_\s-]+$/.test(value);
	});
	
		jQuery.validator.addMethod('space', function(value, element) {
		return /^[^-\s]+$/.test(value);
	});

	jQuery.validator.addMethod('all', function(value, element) {
		return /^[^-\s][a-zA-Z0-9_,.\s-]+$/.test(value);
	});


	jQuery.validator.addMethod('numericOnly', function(value, element) {
		return /^[0-9]+$/.test(value);
	});
