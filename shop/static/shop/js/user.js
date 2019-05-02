/* 检查表单密码是否通过 */
function pw_check(pw1, pw2) {
    return pw1.value === pw2.value
}

/* 添加错误信息 */
function append_error_info(input_ele, info) {
    let etr = input_ele.parentNode.parentNode.nextElementSibling;
    let eul = etr.querySelector('ul');

    let eil = document.createElement('li');
    eil.innerText = info;
    eul.appendChild(eil);
}

/* 清除表单的错误提示 */
function clear_errors(form) {
    let errors_lis = form.querySelectorAll('.error ul li');

    for (let i = 0; i < errors_lis.length; i++) {
        let li = errors_lis[i];
        li.parentElement.removeChild(li);
    }
}

/* 表单提交 */
function register_submit() {
    let checked = false;

    try {
        clear_errors(this);

        let pw1 = this.querySelector('#id_password');
        let pw2 = this.querySelector('#id_password_again');

        // 检查两次密码输入是否一致
        if (pw_check(pw1, pw2) === true) {
            let salt = '281495';
            pw1.value = sha256(pw1.value + salt);
            pw2.value = sha256(pw2.value + salt);

            checked = true;
        } else {
            append_error_info(pw1, '两次输入的密码不一致');
            append_error_info(pw2, '两次输入的密码不一致');
        }
    } catch (e) {
        checked = false;
    }

    return checked;
}

window.onload = () => {
    let register_form = document.querySelector('#user_register_form');
    if (register_form) register_form.onsubmit = register_submit;
};
